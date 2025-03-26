from openai import OpenAI
import google.generativeai as genai
import os
from dotenv import load_dotenv

# Load API key from environment variables
load_dotenv()
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

# System prompt to guide the chatbot's behavior
PROMPT = """
    You are Lica, a smart shopping assistant. Provide well-structured responses to help users find the best products and deals.
    You should also give short replies for the queries. If asked for suggestions or deals list out products first
        If the query is general, provide concise, engaging, and useful insights with follow-up suggestions in short.
    Chat history:
"""

def get_response(user_input):
    prompt = PROMPT + "\n\nUser: " + user_input  # Ensuring it follows Kiwi's persona
    
    client = OpenAI(api_key=PERPLEXITY_API_KEY, base_url="https://api.perplexity.ai")

    response = client.chat.completions.create(
        model="llama-3.1-sonar-large-128k-online",
        messages=[{"role": "user", "content": prompt}],
    )

    # Extract chatbot's response
    bot_response = response.choices[0].message.content

    return bot_response if bot_response else "I'm not sure how to respond."


# def get_response(chat_history):

#     # Combine system instruction with user chat history
#     user_messages = "\n".join([f"{msg['role']}: {msg['text']}" for msg in chat_history])

#     prompt = PROMPT + "\n\n" + user_messages  # Ensure it follows Kiwi's persona
    
#     client = OpenAI(api_key=PERPLEXITY_API_KEY, base_url="https://api.perplexity.ai")


#     response = client.chat.completions.create(
#         model="llama-3.1-sonar-large-128k-online",
#         messages=[{"role": "user", "content": f"{prompt}"}],
#     )

#     # Extract the chatbot's response
#     bot_response = response.choices[0].message.content

#     # model = genai.GenerativeModel("gemini-2.0-flash")
    
#     # response = model.generate_content(prompt)
    
#     return bot_response if bot_response else "I'm not sure how to respond."
