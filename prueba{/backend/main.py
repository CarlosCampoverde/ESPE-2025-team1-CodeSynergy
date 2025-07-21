from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/universidades")
async def get_universidades(country: str):
    url = f"http://universities.hipolabs.com/search?country={country}"
    async with httpx.AsyncClient() as client:
        response = await client.get(url)
        return response.json()
