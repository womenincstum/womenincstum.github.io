# Women in CS @ TUM Website

The official website for **Women in Computer Science (WinCS) @ TUM e.V.**, representing a community of women and underrepresented genders studying or interested in Computer Science at the Technical University of Munich.

The live website is available at [womenincstum.github.io](https://womenincstum.github.io/).

---

## 🛠️ Tech Stack

- **Framework:** [TanStack Start](https://tanstack.com/router/v1/docs/start/overview) (React router & SSR framework)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Language:** TypeScript
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Local Development

First, ensure you have Node.js installed. You can use either `npm` or `bun` to manage packages.

### 1. Install Dependencies

Using `npm`:
```bash
npm install
```

Or using `bun`:
```bash
bun install
```

### 2. Start the Development Server

Using `npm`:
```bash
npm run dev
```

Or using `bun`:
```bash
bun run dev
```

Open [http://localhost:3000](http://localhost:3000) (or the port shown in your terminal) to view the site.

---

## 📦 Building & Deployment

This website is hosted via **GitHub Pages** and is configured to serve static files directly from the `/docs` directory on the `main` branch.

### How to Deploy Updates

1. **Build the project locally:**
   ```bash
   npm run build
   ```
   This compiles the project and puts the static files and generated HTML pages inside the `docs/` folder.

2. **Commit and push the changes:**
   After building successfully, commit the modified files (both the source code in `src/` and the build products in `docs/`):
   ```bash
   git add src/ docs/
   git commit -m "chore: deploy updates"
   git push origin main
   ```

> [!WARNING]
> **Do not commit or push the `docs/` folder if the build fails or crashes.**
> If the build fails during the prerendering step (for example, missing route pages or server errors), the `docs/` folder will be incomplete (missing `index.html` pages). Pushing an incomplete build will cause the live website to display 404 errors.
> If the build fails, revert the `docs/` changes using `git checkout -- docs/` and `git clean -fd docs/` until the build issue is fixed.

---

## 📂 Project Structure

```text
├── docs/                # Build output served by GitHub Pages
├── src/
│   ├── assets/          # Images, illustrations, and partner logos
│   ├── components/      # Shared React components (header, footer, UI primitives)
│   ├── data/            # Local data models & configuration (e.g. events list)
│   ├── routes/          # TanStack Router page routes (e.g., events index, detail pages)
│   ├── server.ts        # TanStack Start SSR entrypoint
│   └── styles.css       # Core styles and Tailwind configurations
├── vite.config.ts       # Vite configuration
└── wrangler.jsonc       # Cloudflare Wrangler runtime setup
```

---

## 🤝 Contributing

We welcome contributions from TUM students and the WinCS community!

1. Create a branch for your feature/bugfix: `git checkout -b feature-name`
2. Make your edits inside the `src/` directory.
3. Test locally using `npm run dev`.
4. Open a Pull Request on GitHub.
