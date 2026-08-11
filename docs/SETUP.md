# Local Setup — Fast Iteration Cheatsheet

Copy-paste for a new machine. ~60s to hot reload.

```bash
# prerequisites: git, curl, tar, awk
git clone <url> && cd wisdom-booksellers

# Node 24 — pick ONE:
nvm use                    # if you use nvm (reads .nvmrc)
# or Linux-native install (WSL — avoids Windows path bug):
curl -fsSL https://nodejs.org/dist/v24.12.0/node-v24.12.0-linux-x64.tar.xz -o /tmp/node.tar.xz
mkdir -p ~/.local/node && tar -xf /tmp/node.tar.xz -C ~/.local/node --strip-components=1
ln -sf ~/.local/node/bin/node ~/.local/bin/node
ln -sf ~/.local/node/bin/npm  ~/.local/bin/npm
ln -sf ~/.local/node/bin/npx  ~/.local/bin/npx
bash -l -c 'node --version; npm --version'  # must be Linux, not /mnt/c/Program Files/nodejs

# deps
npm ci

# dev
npm run dev
# → http://localhost:8787  (Vite injects @vite/client, HMR on)
```

Edit `styles.css` → instant CSS swap. Edit `index.html`/`script.js` → auto reload. No manual refresh.

Stop: Ctrl+C. Build: `npm run build`. Preview: `npm run preview`.
