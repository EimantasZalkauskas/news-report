import json
import os
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import Request, urlopen

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

load_dotenv()
app = FastAPI()

frontend_origins = os.getenv(
    "FRONTEND_ORIGINS",
    "http://localhost:5173,http://127.0.0.1:5173,"
    "http://localhost:4173,http://127.0.0.1:4173",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        origin.strip() for origin in frontend_origins.split(",") if origin.strip()
    ],
    allow_credentials=False,
    allow_methods=["GET"],
    allow_headers=["*"],
)

CATEGORY_SELECTION = "US news"
GUARDIAN_API_URL = "https://content.guardianapis.com/search"


@app.get("/")
def home():
    return "Home Route"


@app.get("/api/news")
def get_news(category: str = "Latest", page_size: int = 10):
    api_key = os.getenv("GUARDIAN_API_KEY")
    if not api_key:
        raise HTTPException(
            status_code=503, detail="News provider API key is not configured"
        )
    if category == "":
        category = "Latest"
    query = urlencode(
        {
            "q": category,
            "page-size": page_size,
            "api-key": api_key,
        }
    )
    request = Request(
        f"{GUARDIAN_API_URL}?{query}",
        headers={"Accept": "application/json"},
    )

    try:
        with urlopen(request, timeout=10) as response:
            return json.load(response)
    except HTTPError as error:
        raise HTTPException(
            status_code=502,
            detail=f"News provider returned HTTP {error.code}",
        ) from error
    except (URLError, TimeoutError) as error:
        raise HTTPException(
            status_code=502, detail="Unable to reach the news provider"
        ) from error
    except json.JSONDecodeError as error:
        raise HTTPException(
            status_code=502, detail="News provider returned invalid JSON"
        ) from error
