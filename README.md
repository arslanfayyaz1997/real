# Internlytic Technologies — 3D website starter

A React + Vite + Three.js / React Three Fiber starter with a procedural 3D street, office exterior, animated walking character, logo branding, responsive company sections, and a reduced-motion / skip-intro path.

## Run locally
1. Install Node.js (LTS).
2. Extract this ZIP.
3. Open a terminal in the project folder.
4. Run `npm install`
5. Run `npm run dev`
6. Open the local URL Vite prints.

## Build for deployment
Run `npm run build`. Upload the project to a new GitHub repository and import that repository into Vercel. Framework preset: Vite; build command: `npm run build`; output directory: `dist`.

## Logo
The supplied logo is stored in `public/internlytic-logo.jpg`. Replace it with a transparent PNG/SVG if you have one, retaining the filename or updating references.

## Important notes
- This starter builds the 3D scene with procedural geometry, so it doesn't depend on a third-party 3D asset download.
- The character is a simple stylized procedural placeholder with a walking cycle. For a photorealistic human, replace it with a licensed rigged GLB/GLTF model with a walk animation.
- The contact form currently validates locally and opens an email draft; configure a real form backend if you need direct submissions.
- The Apply Now button points to a placeholder URL. Replace `APPLY_URL` in `src/App.jsx` with your current official application form URL.
- This is a separate project starter. It does not modify your existing company website, internship portal, login, Supabase, or certificate verification.

## Upgrade the person to a rigged human
See [`REALISTIC-HUMAN-ASSET.md`](./REALISTIC-HUMAN-ASSET.md) for a free CC0 animated human model source and the steps to add it. The scene now automatically attempts to load `/realistic-walker.glb` and play its first animation. If the file is missing or invalid, it safely falls back to the procedural character. A true photorealistic person plus custom laptop bag/door-entry animation requires a suitable rigged model asset; the bundled fallback is not photorealistic.
