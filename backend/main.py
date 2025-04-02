# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from recommend import fetch_amazon_product_details
# import google.generativeai as genai
# import os
# from dotenv import load_dotenv
# import re
# from chat import get_response


# # Initialize FastAPI
# app = FastAPI()

# # Allow frontend to communicate with backend
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# class TextRequest(BaseModel):
#     text: str
#     user_id: str  # Keeping user_id in case it's needed for future use

# class ProductRequest(BaseModel):
#     query: str  

# # Chat endpoint (No chat history)
# @app.post("/chat")
# async def chat(request: TextRequest):
#     user_input = request.text

#     # Get chatbot response directly (without storing history)
#     bot_response = get_response(user_input)

#     return {"response": bot_response}


# @app.post("/get_recommendations")
# async def get_recommendations(request: ProductRequest):
#     query = request.query

#     product_details = fetch_amazon_product_details(query)

#     return {"products": product_details}


# # Run FastAPI
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)


    
# # In-memory storage for chat history
# # user_chat_history = {}

# # # Define request model
# # class TextRequest(BaseModel):
# #     text: str
# #     user_id: str  # To track chat history per user


# # class ProductRequest(BaseModel):
# #     query: str  

# # # Chat endpoint
# # @app.post("/chat")
# # async def chat(request: TextRequest):
# #     user_id = request.user_id
# #     user_input = request.text

# #     # Initialize chat history if new user
# #     if user_id not in user_chat_history:
# #         user_chat_history[user_id] = []

# #     # Add user message to history
# #     user_chat_history[user_id].append({"role": "user", "text": user_input})

# #     # Get chatbot response
# #     bot_response = get_response(user_chat_history[user_id])

# #     # Add bot response to history
# #     user_chat_history[user_id].append({"role": "bot", "text": bot_response})

# #     return {"response": bot_response}






from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from dotenv import load_dotenv

# Import database
from database import Base
from database_config import engine, get_db

# Import routers
from user_routes import router as user_router
from product_routes import router as product_router
from chat_routes import router as chat_router

# Create database tables
Base.metadata.create_all(bind=engine)

# Load environment variables
load_dotenv()

# Initialize FastAPI
app = FastAPI(title="Lica API", description="API for the Lica shopping assistant")

# Allow frontend to communicate with backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(user_router, prefix="/api")
app.include_router(product_router, prefix="/api")
app.include_router(chat_router, prefix="/api")

# Health check endpoint
@app.get("/")
async def root():
    return {"status": "Lica API is running"}
    

# Run FastAPI
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)