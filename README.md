<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

## Run and deploy your AI Studio app

This contains everything you need to run your app locally and deploy a static build that you can open from any machine (including work PCs where you can’t install Node.js).

View your app in AI Studio: `https://ai.studio/apps/drive/101AuJhREME5T22qeBFxdy1_rjaNoWcFd`

### Run Locally (on a machine where you CAN install tools)

**Prerequisites:** **Node.js** installed

1. **Install dependencies:**
   `npm install`
2. **Set your API key (optional, only if needed):**
   Set the `GEMINI_API_KEY` in `.env.local` to your Gemini API key.
3. **Run the app in dev mode:**
   `npm run dev`

### Build a static version (no installs needed on work PC)

On the same machine where you can run the dev server:

1. **Build the app:**
   `npm run build`
2. This creates a `dist` folder containing static HTML/CSS/JS files.

You now have two main options:

- **Option A – Host it (recommended):**
  - Upload the `dist` folder to any static hosting service (GitHub Pages, Netlify, Vercel, etc.).
  - You’ll get a URL like `https://your-site.example.com` that you can open from your work PC with **no installations required**.

- **Option B – Copy the static files:**
  - Copy the entire `dist` folder to your work PC (for example via USB or a shared drive).
  - Serve it with any simple static file server if possible (for example `npx serve dist` on a machine that has Node.js), or host it internally.

In all cases, the app code and its functions remain exactly the same; only the way it is served changes.

### GitHub Pages (recommended for work PCs)

This repo includes a GitHub Actions workflow that can build and deploy `dist/` to GitHub Pages automatically on every push to `main`.

1. **Create a GitHub repo** and push this project to the `main` branch.
2. In GitHub: **Settings → Pages**
   - **Build and deployment**: select **GitHub Actions**
3. Push a commit to `main`. The workflow will run and publish your site.
4. Open the published Pages URL on your work PC (no installs required).

Note: opening `dist/index.html` by double-clicking (file://) may show a blank page in some browsers due to module/security restrictions. Hosting via HTTPS (GitHub Pages) avoids that.
