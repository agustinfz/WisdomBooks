# Wisdom Booksellers — A Room Full of Stories

Cozy independent bookshop site. Static site (HTML/CSS/JS) with **Vite** for instant hot reload and fast iteration.

Live dev: `http://localhost:8787` · Stack: HTML5 · CSS3 (custom properties) · Vanilla JS · Vite 8

![Vite](https://img.shields.io/badge/vite-8.x-646CFF) ![Node](https://img.shields.io/badge/node-24.x-339933)

---

## Prerequisites

| Tool | Version | Why |
|------|---------|-----|
| **Node.js** | 20+ (tested on 24.12.0, see `.nvmrc`) | Vite 8 requires Node 20+ |
| **npm** | 10+ (tested on 11.6.2) | Installs deps |

Check:

```bash
node --version  # v24.12.0
npm --version   # 11.6.2
```

**WSL users:** Install the **Linux-native** Node (not the Windows `C:\Program Files\nodejs`). The repo's setup expects `node` from `~/.local/node/bin` so Vite doesn't hit `\\wsl.localhost\...` path bugs. See Troubleshooting.

---

## Quick Start (new machine)

```bash
# 1. Clone
git clone <your-github-url> wisdom-booksellers
cd wisdom-booksellers

# 2. Use correct Node (optional but recommended)
nvm use        # reads .nvmrc → 24.12.0
# or: fnm use / volta pin node@24

# 3. Install
npm ci         # clean install from lockfile (or npm install)

# 4. Dev — hot reload on http://localhost:8787
npm run dev

# 5. Open http://localhost:8787
# Edit styles.css / script.js / index.html → browser updates instantly
```

Stop dev: `Ctrl+C`.

---

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Vite dev server on `http://localhost:8787` with HMR (host: true, strictPort) |
| `npm run build` | Production build → `dist/` (static, ready for GitHub Pages / Netlify / Vercel) |
| `npm run preview` | Preview the `dist/` build on same port 8787 |

All ports are fixed to **8787** in [vite.config.js](./vite.config.js).

---

## Project Structure

```
.
├── index.html      # Single-page site (hero, arrivals, events, visit, contact)
├── styles.css      # Warm paper theme — :root vars for colors (--sage, --wood, --clay …)
├── script.js       # Arrivals/events injection + form/toast/modal logic
├── assets/
│   ├── hero.jpg
│   └── hero.svg
├── vite.config.js  # dev/preview server: port 8787, host true, strictPort
├── package.json    # scripts: dev / build / preview
├── package-lock.json
└── .nvmrc          # pinned Node 24.12.0
```

No build step for CSS/JS in dev — Vite serves files as-is and HMRs them.

---

## Hot Reload & Fast Iteration

Vite injects `[@vite/client]` into `index.html` automatically in dev. Behavior:

- **styles.css** → hot-swapped **without** full page reload (keep scroll/form state)
- **index.html / script.js / assets** → full reload via WebSocket
- Polling not needed; Vite watches with native `fs` events

**Typical loop:**

1. `npm run dev` (once)
2. Edit `styles.css` — save → see change in <100ms
3. Edit `script.js` — save → page reloads, console HMR log in DevTools

> `python -m http.server` was replaced because it has **no watch** — you had to hard-refresh. Vite is the replacement.

---

## Environment Setup (Linux / WSL / macOS)

The repo works on any OS, but **WSL** needs the PATH fix below or you get:

```
Error: Failed to resolve entry for package "vite" …
[plugin externalize-deps] … \\wsl.localhost\Ubuntu\...
```

**Fix — Linux-native Node:**

```bash
# 1. Install Linux Node 24 to ~/.local/node (no sudo needed)
curl -fsSL https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-x64.tar.xz -o /tmp/node.tar.xz
mkdir -p ~/.local/node && tar -xf /tmp/node.tar.xz -C ~/.local/node --strip-components=1

# 2. Symlink so ~/.local/bin wins over Windows npm
ln -sf ~/.local/node/bin/node ~/.local/bin/node
ln -sf ~/.local/node/bin/npm  ~/.local/bin/npm
ln -sf ~/.local/node/bin/npx  ~/.local/bin/npx
ln -sf ~/.local/node/bin/corepack ~/.local/bin/corepack

# 3. Ensure PATH order in ~/.bashrc (and ~/.profile for login shells)
# Add at end of ~/.bashrc:
# if [[ ":$PATH:" != *":$HOME/.local/node/bin:"* ]]; then export PATH="$HOME/.local/node/bin:$PATH"; fi
# if [[ ":$PATH:" != *":$HOME/.local/bin:"* ]]; then export PATH="$HOME/.local/bin:$PATH"; fi
# PATH="$(printf '%s' "$PATH" | awk -v RS=':' '!seen[$0]++' | paste -sd: -)"; export PATH

# 4. Verify
bash -l -c 'which node; which npm; node --version'
# → /home/you/.local/node/bin/node
# → v24.12.0  (not /mnt/c/Program Files/nodejs)
```

This repo's `~/.bashrc` snippet already does the idempotent PATH + dedupe. New clones just need steps 1–2. Or use `nvm`/`fnm`/`volta` instead — any Linux Node 20+ works.

**macOS / native Linux:** Just `node --version` ≥20, no WSL fix needed.

---

## Deployment

```bash
npm run build   # → dist/
```

`dist/` is static — copy to any host. For GitHub Pages:

```bash
npm run build
# push dist/ to gh-pages branch or configure Pages → GitHub Actions (vite build)
```

No env vars required.

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `EACCES` / `rename … binding-win32…` on `npm install` | You installed first with Windows npm. `rm -rf node_modules` (if `Permission denied`, `cmd.exe /c "rmdir /s /q \\wsl.localhost\Ubuntu\home\…\node_modules"`) then `npm install` with Linux npm. |
| Vite `failed to load config from \\wsl.localhost\...` | You're on Windows node. Switch to Linux node (see above). |
| Port 8787 busy | `ss -tlnp \| grep 8787` → `pkill -f "vite.*8787"` or change `vite.config.js` port. |
| Styles not updating | Check `npm run dev` is running. Hard-refresh once, then HMR should take over. Vite caches in `.vite/` — delete it if stale. |
| `vite: command not found` in new shell | `npm` not on PATH. `bash -l -c 'which npm'` should be `~/.local/node/bin/npm`. Fix PATH as above or `npm --version` after new login. |

---

## Pushing to GitHub (when ready)

Repo is already `git init` on branch `main` with `.gitignore` (ignores `node_modules/`, `dist/`). No commits yet — leave history to you:

```bash
git status
git add .gitignore .nvmrc package.json package-lock.json vite.config.js index.html styles.css script.js assets/ README.md
git commit -m "chore: init Vite + docs and gitignore"
git remote add origin https://github.com/<you>/wisdom-booksellers.git
git push -u origin main
```

Don't `git add node_modules/` or `dist/` — they're ignored.

---

## License

No license yet — add one if you publish. For a shop demo, MIT is common.
