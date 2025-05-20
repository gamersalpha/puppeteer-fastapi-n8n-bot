from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import requests

app = FastAPI()

class ScriptRequest(BaseModel):
    url: str
    script: str

class ScreenshotRequest(BaseModel):
    url: str
    fullPage: bool = False
    selector: str | None = None
    clip: dict | None = None

@app.post("/script")
async def script(request: ScriptRequest):
    try:
        response = requests.post("http://puppeteer-server:3000/script", json=request.dict())
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/screenshot")
async def screenshot(request: ScreenshotRequest):
    try:
        response = requests.post("http://puppeteer-server:3000/screenshot", json=request.dict())
        return response.json()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
