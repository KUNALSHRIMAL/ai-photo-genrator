# AI Photo Generator

A simple full-stack AI photo generator starter project. The frontend is built with
React, Vite, and Tailwind CSS, while the backend is a FastAPI service that receives
prompt text from the UI.

> Current status: the app sends a prompt from the frontend to the backend and
> displays the backend response. Actual AI image generation is not connected yet.

## Features

- Prompt input UI for entering image generation ideas
- React frontend powered by Vite
- Tailwind CSS styling
- FastAPI backend with CORS enabled
- `/generate` API endpoint for prompt submission
- Placeholder image preview component for future generated images

## Tech Stack

### Frontend

- React 19
- Vite
- Tailwind CSS
- JavaScript

### Backend

- Python
- FastAPI
- Pydantic
- Uvicorn

## Project Structure

```text
ai-photo-genrator/
|-- backend/
|   `-- main.py
|-- frontend/
|   |-- public/
|   |-- src/
|   |   |-- components/
|   |   |   |-- ImagePreview.jsx
|   |   |   |-- Navbar.jsx
|   |   |   `-- Promtbox.jsx
|   |   |-- pages/
|   |   |   |-- Gallery.jsx
|   |   |   |-- Generate.jsx
|   |   |   `-- Home.jsx
|   |   |-- App.jsx
|   |   |-- App.css
|   |   |-- index.css
|   |   `-- main.jsx
|   |-- package.json
|   `-- vite.config.js
`-- README.md
```

## Getting Started

### Prerequisites

Make sure you have these installed:

- Node.js and npm
- Python 3.10 or newer

## Backend Setup

From the project root:

```bash
cd backend
pip install fastapi uvicorn
uvicorn main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

Available endpoints:

```text
GET  /
POST /generate
```

Example `/generate` request body:

```json
{
  "text": "A futuristic city at sunset"
}
```

Example response:

```json
{
  "message": "Prompt Received: A futuristic city at sunset"
}
```

## Frontend Setup

Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run at the URL shown by Vite, usually:

```text
http://localhost:5173
```

## Frontend Scripts

Run these commands inside the `frontend` folder:

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the frontend for production.

```bash
npm run preview
```

Previews the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

## How It Works

1. The user enters a prompt in the frontend.
2. `Generate.jsx` sends the prompt to `http://127.0.0.1:8000/generate`.
3. The FastAPI backend receives the prompt as JSON.
4. The backend returns a confirmation message.
5. The frontend displays the response on the page.

## Next Steps

- Connect the `/generate` endpoint to an AI image generation API
- Return generated image URLs or base64 image data from the backend
- Render generated images with `ImagePreview.jsx`
- Add loading and error states to the prompt flow
- Add real routing for Home, Gallery, and Settings
- Store generated images in a gallery

## Notes

- The project folder name is currently `ai-photo-genrator`, which appears to be
  a misspelling of `ai-photo-generator`.
- `Promtbox.jsx` also appears to be a misspelling of `PromptBox.jsx`.
- `Home.jsx` and `Gallery.jsx` currently exist as empty page files.
