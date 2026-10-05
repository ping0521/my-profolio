# Deploy this portfolio to GitHub Pages

Live URL (unchanged — forms you already sent keep working):  
**https://ping0521.github.io/my-profolio/mp-app/**

Your repo currently serves whatever is in the `mp-app/` folder on the `main` branch. The live site is still the old Strikingly `index.html`. Replacing it means **building** the React app and **pushing** the build (plus source) to `main`.

## 1. Build

```bash
cd mp-app
npm install
npm run build
```

Output goes to `mp-app/dist/` (already configured with `base: '/my-profolio/mp-app/'`).

## 2. Publish build into `mp-app/` (what Pages serves)

From `mp-app/`:

**PowerShell:**

```powershell
Copy-Item -Force dist\index.html .\index.html
if (Test-Path .\assets) { Remove-Item -Recurse -Force .\assets }
Copy-Item -Recurse -Force dist\assets .\assets
Copy-Item -Recurse -Force dist\projects .\projects -ErrorAction SilentlyContinue
Copy-Item -Recurse -Force dist\audio .\audio -ErrorAction SilentlyContinue
Copy-Item -Force dist\IMG_*.png, dist\IMG_*.jpg .\ -ErrorAction SilentlyContinue
```

Keep `src/` for future edits. Production only uses `index.html` + `assets/` + public files.

## 3. Commit & push

From the **repo root** `my-profolio/`:

```bash
git add mp-app/
git status
git commit -m "Deploy updated React portfolio to GitHub Pages"
git push origin main
```

Wait 1–2 minutes, then hard-refresh:  
https://ping0521.github.io/my-profolio/mp-app/

## Notes

- **Same URL** → LinkedIn / application forms already sent still open the updated site.
- **Piano video** `public/audio/IMG_3039.mov` is ~62 MB. GitHub allows up to 100 MB per file; first push may be slow. If push fails, use [Git LFS](https://git-lfs.com) or host the video elsewhere.
- Do **not** commit `node_modules/`, `backend/node_modules/`, or one-off `_*.py` scripts unless you need them.
- GitHub → **Settings → Pages**: Source should be **Deploy from a branch** → `main` → `/ (root)` (current setup that serves `/mp-app/`).

## Optional: one-command deploy later

```bash
cd mp-app
npm run build
# then run the Copy-Item block above, commit, and push
```
