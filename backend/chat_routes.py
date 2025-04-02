from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel

from auth import get_current_active_user
from database import User, Chat
from database_config import get_db
from chat import get_response

router = APIRouter(tags=["chat"])

# Schemas
class ChatMessage(BaseModel):
    text: str

class ChatResponse(BaseModel):
    id: int
    message: str
    is_user: bool

    class Config:
        from_attributes = True

# Routes
@router.post("/chat", response_model=ChatResponse)
async def chat(
    request: ChatMessage,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    user_input = request.text
    
    # Save user message
    user_chat = Chat(
        user_id=current_user.id,
        message=user_input,
        is_user=True
    )
    db.add(user_chat)
    db.commit()
    db.refresh(user_chat)
    
    # Get bot response
    bot_response = get_response(user_input)
    
    # Save bot message
    bot_chat = Chat(
        user_id=current_user.id,
        message=bot_response,
        is_user=False
    )
    db.add(bot_chat)
    db.commit()
    db.refresh(bot_chat)
    
    return bot_chat

@router.get("/chat_history", response_model=List[ChatResponse])
async def get_chat_history(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    return db.query(Chat).filter(Chat.user_id == current_user.id).order_by(Chat.timestamp).all()