# Security — public repository

## Environment file

Use **`.env`** locally (not `.env.local`). Copy from `.env.example` on your machine only:

```bash
cp .env.example .env
```

All of these are **gitignored** and must never be pushed: `.env`, `.env.*`, `.env.example`, `env.example`.

Next.js reads `.env` automatically for `npm run dev` and `npm run build`.

## Production (Vercel)

Copy the **same variable names** from `.env` into Vercel → Settings → Environment Variables. Vercel does not use your local `.env` file from the repo.

## Never commit

- `.env` with real `RESEND_API_KEY` or private emails
- `.pem`, `credentials.json`

## If a key was leaked

1. Rotate the key in Resend immediately.
2. Remove it from git history if it was pushed.
