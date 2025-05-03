from fastapi import APIRouter
from app.auth import create_access_token

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/login")
def login():
    token = create_access_token({"sub": "user"})
    return {"access_token": token, "token_type": "bearer"}
