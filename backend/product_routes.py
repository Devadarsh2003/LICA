from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from auth import get_current_active_user
from database import User, Product
from database_config import get_db
from recommend import fetch_amazon_product_details

router = APIRouter(tags=["products"])

# Schemas
class ProductBase(BaseModel):
    title: str
    price: str
    ratings: str
    total_reviews: str = None
    image_url: str
    product_url: str
    platform: str

class ProductCreate(ProductBase):
    pass

class ProductOut(ProductBase):
    id: int

    class Config:
        from_attributes = True

class SearchQuery(BaseModel):
    query: str

# Routes
@router.post("/get_recommendations", response_model=List[ProductOut])
async def get_recommendations(
    request: SearchQuery,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    product_details = fetch_amazon_product_details(request.query)
    
    # Convert product details to database models and save
    saved_products = []
    for product_data in product_details:
        if "platforms" in product_data and "amazon" in product_data["platforms"]:
            amazon_data = product_data["platforms"]["amazon"]
            if amazon_data:
                # Check if product already exists
                existing_product = db.query(Product).filter(
                    Product.product_url == amazon_data["link"]
                ).first()
                
                if existing_product:
                    saved_products.append(existing_product)
                else:
                    # Create new product
                    db_product = Product(
                        title=amazon_data["title"],
                        price=amazon_data["price"],
                        ratings=amazon_data["ratings"],
                        total_reviews=amazon_data["total"],
                        image_url=amazon_data["poster"],
                        product_url=amazon_data["link"],
                        platform="amazon"
                    )
                    db.add(db_product)
                    db.commit()
                    db.refresh(db_product)
                    saved_products.append(db_product)
    
    return saved_products

@router.post("/favorites/{product_id}")
async def add_to_favorites(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if product exists
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Add to favorites if not already there
    if product not in current_user.favorite_products:
        current_user.favorite_products.append(product)
        db.commit()
    
    return {"message": "Product added to favorites"}

@router.delete("/favorites/{product_id}")
async def remove_from_favorites(
    product_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    # Check if product exists
    product = db.query(Product).filter(Product.id == product_id).first()
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Remove from favorites if there
    if product in current_user.favorite_products:
        current_user.favorite_products.remove(product)
        db.commit()
    
    return {"message": "Product removed from favorites"}

@router.get("/favorites", response_model=List[ProductOut])
async def get_favorites(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return current_user.favorite_productss