from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, DateTime, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import os
from dotenv import load_dotenv

load_dotenv()

Base = declarative_base()

# Association table for user favorites
favorites = Table('favorites', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('product_id', Integer, ForeignKey('products.id'))
)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    username = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    chats = relationship("Chat", back_populates="user")
    favorite_products = relationship("Product", secondary=favorites, back_populates="favorited_by")

class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    price = Column(String)
    ratings = Column(String)
    total_reviews = Column(String)
    image_url = Column(String)
    product_url = Column(String)
    platform = Column(String)  # e.g., "amazon", "flipkart"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    favorited_by = relationship("User", secondary=favorites, back_populates="favorite_products")

class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    message = Column(String)
    is_user = Column(Boolean)  # True if message is from user, False if from bot
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    # Relationships
    user = relationship("User", back_populates="chats")