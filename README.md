# Puppeteer-FastAPI-n8n

Automatisation web avec Puppeteer (Node.js) et FastAPI (Python), interconnectés avec Docker. Idéal pour scraper, exécuter des scripts ou capturer des pages web.

## 🚀 Endpoints disponibles

- `POST /script` → Exécute du JavaScript sur une page et retourne le HTML
- `POST /screenshot` → Capture la page en base64

## ⚙️ Installation

```bash
docker compose build
docker compose up
```

## 📦 Exemple curl

```bash
curl -X POST http://localhost:8000/screenshot \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

## 🧠 Intégration n8n

Utilisez un noeud HTTP avec :
- URL : http://fastapi:8000/screenshot
- Méthode : POST
- Body JSON : `{ "url": "https://example.com" }`
