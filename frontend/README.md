# Frontend

This is a web-only React application built with Vite and React Router.

## Development

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Install the backend dependencies and start FastAPI in another terminal from
the repository root:

```bash
pip install -r requirements.txt
python main.py
```

The frontend requests news from `http://localhost:8000/api/news`. Set
`GUARDIAN_API_KEY` in the backend environment for the news provider. Local
development origins on ports 5173 and 4173 are allowed by default. Configure
the backend's `FRONTEND_ORIGINS` environment variable as a comma-separated list
of allowed frontend origins when running outside local development. To use a
different backend URL, create `frontend/.env.local` with
`VITE_API_BASE_URL=http://your-api-host`.

## Routes

- `/` — Home
- `/explore` — Explore

Routes are defined in `src/App.tsx`; page components live in `src/pages/`.
When deploying, configure the web server to serve `index.html` for unknown paths
so direct navigation and refreshes on application routes work.

## Validation

```bash
npm run typecheck
npm run build
```
