# NexusShop 🛒
Multi-vendor e-commerce for Pakistan — Urdu/English with native RTL, COD + WhatsApp checkout.

## Stack
Static SPA (HTML/JS) deployed on Vercel · `nexus_db.json` demo catalog · `sw.js` offline · PWA manifest.

## Structure
- `spa_template.html` — source of truth (styles + app logic)
- `index.html` — generated build (do not edit directly)
- `nexus_db.json` — seed catalog & stores
- `CONTRIBUTIONS.md` / `ATTRIBUTIONS.md` — partnership records (Term Sheet v2, Sections 2 & 5)

## Workflow
Branch → PR → review (24-48h) → merge · deploys from `main` via Vercel · see Working Process v1.

## Local
Edit `spa_template.html`, run the sync script, open `index.html`.
