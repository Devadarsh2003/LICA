# LICA - AI-Powered Product Comparison and Chatbot

LICA is an AI-powered system that helps users find the best product deals by comparing prices across multiple e-commerce platforms. It also includes a chatbot for interactive assistance.

## 🚀 Features
- **Product Recommendation:** Fetches the top 5 product suggestions based on user queries.
- **Price Comparison:** Scrapes Amazon, Flipkart, and eBay for the best prices.
- **Chatbot Assistance:** Uses Perplexity API for conversational queries.
- **Authentication:** Implements JWT authentication for secure access.
- **Full-Stack Development:** Built with FastAPI (backend) and React (frontend).

## 📂 Project Structure
```
LICA/
│-- .venv/              # Virtual environment
│-- backend/
│   ├── chat.py        # Chatbot API
│   ├── main.py        # FastAPI server
│   ├── recommend.py   # Recommendation logic
│   ├── requirements.txt # Backend dependencies
│-- frontend/
│   ├── src/
│   │   ├── App.jsx    # Main React app
│   │   ├── css/       # Stylesheets
│   │   ├── main.jsx   # Entry point
│   ├── public/
│   ├── package.json   # Frontend dependencies
│-- .gitignore
│-- README.md
```

## 🛠 Installation & Setup

### Backend Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/Devadarsh2003/LICA.git
   cd LICA/backend
   ```
2. **Set up a virtual environment:**
   ```sh
   python -m venv .venv
   source .venv/bin/activate  # (On Windows: .venv\Scripts\activate)
   ```
3. **Install dependencies:**
   ```sh
   pip install -r requirements.txt
   ```
4. **Run the FastAPI server:**
   ```sh
   uvicorn main:app --reload
   ```

### Frontend Setup
1. **Navigate to the frontend folder:**
   ```sh
   cd ../frontend
   ```
2. **Install dependencies:**
   ```sh
   npm install
   ```
3. **Start the React app:**
   ```sh
   npm run dev
   ```

## 🎯 Usage
- Enter a product name in the chatbot.
- The chatbot fetches top product recommendations.
- It scrapes multiple platforms to find the lowest price.
- The best deals are displayed with links to purchase.

## 📌 API Endpoints
- `POST /chat` → Handles chatbot interactions.
- `POST /recommend` → Fetches product recommendations.
- `GET /products` → Returns the best-priced products.

## 🛡 Authentication
- Users must authenticate via JWT tokens to access certain endpoints.

## 🤝 Contributing
1. Fork the repo
2. Create a new branch (`feature-name`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature-name`)
5. Open a pull request

## 📄 License
This project is **open-source** and available under the MIT License.

---
Developed with ❤️ by Devadarsh

