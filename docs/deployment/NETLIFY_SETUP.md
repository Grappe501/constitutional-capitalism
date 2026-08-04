# Netlify Setup Checklist

## Book Site

1. Import GitHub repo `Grappe501/constitutional-capitalism`
2. Site name suggestion: `constitutional-capitalism`
3. Base directory: `apps/book-site`
4. Build command: `cd ../.. && corepack enable && pnpm install --frozen-lockfile && pnpm --filter book-site build`
5. Publish directory: `dist`
6. Production branch: `main`
7. Deploy and record URL in `data/deployments/deployment_status.json`

## Build Board

1. Import the **same** repo as a second site
2. Site name suggestion: `constitutional-capitalism-board`
3. Base directory: `apps/build-board`
4. Build command: `cd ../.. && corepack enable && pnpm install --frozen-lockfile && pnpm --filter build-board build`
5. Publish directory: `dist`
6. Production branch: `main`
7. Enable Netlify site access protection before sensitive planning content
8. Record URL only after confirmation

Config references: `netlify.book.toml`, `netlify.board.toml`.

