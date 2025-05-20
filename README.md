# Puppeteer-FastAPI-n8n-Bot

This project combines **Puppeteer** (Node.js) and **FastAPI** (Python) to automate browser interactions via a unified API, fully orchestrated with Docker and integrable with [n8n](https://n8n.io).

## 🔍 Features

- `POST /screenshot` – Take full page, clipped, or element-based screenshots
- `POST /script` – Execute JavaScript in-page or trigger automation sequences
- Custom Puppeteer control through FastAPI proxy
- Easily extendable and n8n-compatible

## 📦 Architecture

```
📁 puppeteer-fastapi-n8n-bot/
├── docker-compose.yml
├── fastapi/
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
└── server/
    ├── Dockerfile
    ├── index.js
    └── package.json
```

## 🚀 Usage

### Build & Run

```bash
docker compose build
docker compose up -d
```

### Example: Screenshot Request

```bash
curl -X POST http://localhost:8000/screenshot \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "fullPage": true
}'
```

### Example: Script Request

```bash
curl -X POST http://localhost:8000/script \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "actions": [
      "await page.click('#menu')",
      "await page.waitForSelector('#content')"
    ]
}'
```

## 🧩 n8n Integration

Use the HTTP Request node in n8n to:

- Call the `/script` or `/screenshot` endpoints
- Chain browser automation workflows
- Extract and process content automatically

## 🛠️ Dev Notes

- Puppeteer runs headless inside Docker
- Make sure your selectors exist before triggering actions
- To troubleshoot, check `docker-compose logs`

## 📄 License

MIT License. Use it, fork it, improve it.
