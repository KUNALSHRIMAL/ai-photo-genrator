from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Prompt(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "Backend Running"}

@app.post("/generate")
def generate(data: Prompt):

    return {
        "message": f"Prompt Received: {data.text}"
    }