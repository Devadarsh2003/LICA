import requests
import os
import json
import csv
from openai import OpenAI
from dotenv import load_dotenv
import re

# Load API key from environment variables
load_dotenv()
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")
API_KEY = os.getenv("SCRAPER_API_KEY")

def get_top_products(query):
    # Define the system and user messages
    messages = [
    {
        "role": "system",
        "content": (
            "You are an AI product recommendation assistant. Your task is to provide a list "
            "of the **top 5 best-matching products** based on the user's query. "
            "Interpret vague or ambiguous terms correctly (e.g., 'cycles' should refer to 'bicycles'). "
            "Ensure that each product name is enclosed in *<product name>*. "
            "Focus only on relevant and high-quality products."
        ),
    },
    {
        "role": "user",
        "content": query,
    },
]


    # Check if the API key is set
    # if "PERPLEXITY_API_KEY" not in os.environ:
    #     raise EnvironmentError("Missing PERPLEXITY_API_KEY in environment variables.")

    # Initialize the OpenAI client with the Perplexity API key
    client = OpenAI(api_key=PERPLEXITY_API_KEY, base_url="https://api.perplexity.ai")

    try:
        # Chat completion without streaming
        response = client.chat.completions.create(
            model="llama-3.1-sonar-large-128k-online",
            messages=messages,
        )

        # Access and process the response content
        first_response_content = response.choices[0].message.content

        # Extract product names using regex
        product_names = re.findall(r"##\s*\**([^#\n*]+?)\**\s*$", first_response_content, re.MULTILINE)
        # Return the top 5 product names
        print(f"content:\n{first_response_content}\nproduct : \n{product_names}")
        return first_response_content,product_names[:5]

    except Exception as e:
        print(f"Error fetching product names: {e}")
        return []


def fetch_amazon_product_details(query):
    """
    Fetches the first product details from Amazon for all products in the query list
    and returns the results as a JSON response.

    Args:
        query (str): The search query for fetching product details.

    Returns:
        dict: A dictionary containing the first product details from Amazon.
    """
    # if not API_KEY or not query:
    #     raise ValueError("API key and query must be provided.")

    # Define URL for Amazon scraping
    amazon_url = "https://api.scraperapi.com/structured/amazon/search"

    # Function to process Amazon response
    def process_amazon_response(response_json):
        products = response_json.get('results', []) + response_json.get('ads', [])
        if products:
            product = products[0]
            return {
                'title': product.get('name', 'N/A'),
                'poster': product.get('image', 'N/A'),
                'price': product.get('price_string', 'N/A'),
                'ratings': product.get('stars', 'N/A'),
                'total': product.get('total_reviews', 'N/A'),
                'link': product.get('url', 'N/A'),
            }
        return None

    # Initialize a list to store the details for all products
    all_products_details = []

    # Fetch the top products using the query
    content, top_products = get_top_products(query)
    if not top_products:
        return {"message": "No products were found for the given query."}

    print(f"Top products fetched: {top_products}")
    
    index = 0
    # Fetch details for each product from Amazon
    for product_query in top_products:
        product_data = {"query": product_query, "platforms": {}}
        print(index," product scraped")
        index += 1

        try:
            # Prepare the request payload
            payload = {'api_key': API_KEY, 'query': product_query, 'tld': 'in', 'country':'in'}

            # Make the GET request to Amazon
            response = requests.get(amazon_url, params=payload)
            response.raise_for_status()  # Raise an error for HTTP status codes >= 400

            # Process the Amazon response
            product_data["platforms"]["amazon"] = process_amazon_response(response.json())
        except requests.RequestException as e:
            print(f"Error fetching data from Amazon for query '{product_query}': {e}")
        except Exception as e:
            print(f"Error processing data for Amazon and query '{product_query}': {e}")

        all_products_details.append(product_data)

    # # Store the URLs in a CSV file
    # with open("product_urls.csv", "w", newline="") as csvfile:
    #     writer = csv.writer(csvfile)
    #     writer.writerow(["Product Name", "URL"])  # Writing header

    #     # Write the product details (name and URL) to the CSV file
    #     for product in all_products_details:
    #         product_name = product["query"]
    #         amazon_url = product["platforms"].get("amazon", {}).get("url", "N/A")
    #         writer.writerow([product_name, amazon_url])

    # print("Product URLs have been written to 'product_urls.csv'.")

    return all_products_details

# Example usage
if __name__ == "__main__":
    if "SCRAPER_API_KEY" not in os.environ:
        raise EnvironmentError("Missing SCRAPER_API_KEY in environment variables.")

    user_query = input("Enter your query: ")
    
    # Pass the query to the function
    # product_details = fetch_amazon_product_details(user_query)
    product_details = get_top_products(user_query)
    print(json.dumps(product_details, indent=4))
