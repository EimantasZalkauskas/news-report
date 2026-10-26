import requests
from bs4 import BeautifulSoup
from fastapi import FastAPI

app = FastAPI()


@app.get("/")
def home():
    res = requests.get(
        "https://docs.google.com/spreadsheets/d/1rEEQpx12WtN5eeH1bykQPjnkpEJCV_YjKhMffqCpSYc/edit?gid=0#gid=0"
    )
    soup = BeautifulSoup(res.text, "html.parser")
    table = soup.find("table")
    for row in table.find_all("tr"):
        columns = row.find_all(["th", "td"])
        print([column.text for column in columns])
    return "Hello World"
