# Frago's Nexus Intelligence

> Build smarter. Scale faster.

Sitio web cinematográfico para Frago's Nexus Intelligence — consultoría de IA de élite. Construido con Next.js 15, Motion, Three.js (@react-three/fiber + drei + postprocessing) y Tailwind v3.

## Quickstart

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm run start        # serve production build
```

## Arquitectura

Single-page application con secciones cinematográficas en orden:

```
Loader → Hero → BrandBridge → MorphSection → Stats →
Capacidades → Servicios → TechStack → Anatomy → PorQueNexus →
CaseStudies → Process → Manifesto → CTA → Footer
```

Plus la página `/concepts` con propuestas de logo y escultura 3D.

### Stack
- **Next.js 15** App Router + React 19
- **Motion** (`motion/react`) para animaciones declarativas + scroll-driven
- **@react-three/fiber + drei + postprocessing** para escenas 3D con bloom/ACES
- **Tailwind v3** con tokens custom (`nexus.neon`, `nexus.void`, `text-metallic`, etc.)
- **TypeScript** estricto

### Componentes 3D
- `HeroPlasmaScene.tsx` — partícula synapse en el hero
- `MorphingPlasma.tsx` — 4 formaciones morphing (sphere → hex grid → helix → torus) en MorphSection
- `ParticleField.tsx` — partículas ambient en CTA
- `SculptureConcepts.tsx` — esculturas alternativas en `/concepts`

### Sistema de diseño
- `LogoMark` + `LogoLockup` (`components/brand/`)
- `WordReveal` + `SectionHeader` (`components/reveal/`) — mask reveal palabra-por-palabra
- `MagneticCursor`, `Magnetic`, `TiltCard` (`components/interaction/`)
- `LazyMount` (`components/perf/`) — deferred mount para canvases pesadas
- `IntroProvider` + `CinematicLoader` (`components/intro/`)

## Deploy a Vercel

1. Push el repo a GitHub.
2. En Vercel: New Project → seleccionar el repo.
3. Settings → Environment Variables:
   - `NEXT_PUBLIC_SITE_URL` = `https://tu-dominio.com`
4. Vercel detecta Next.js automáticamente — `vercel.json` aporta headers de seguridad y caché.
5. Region por defecto: `fra1` (cambia si tu audiencia es otra).

### Notas técnicas
- `app/opengraph-image.tsx`, `app/icon.tsx`, `app/apple-icon.tsx` se generan con Edge runtime usando `next/og` (sin assets binarios).
- `app/robots.ts` + `app/sitemap.ts` se generan dinámicos.
- Los componentes Three.js están dinámicos (`next/dynamic` + `ssr:false`) y envueltos en `LazyMount` para diferir hasta que entren al viewport.

## Browser / Performance notes

- WebGL es obligatorio. En navegadores sin WebGL las escenas 3D fallarán silenciosamente.
- DPR clamp [1, 2] para evitar canvases gigantes en pantallas Retina.
- Plasma + scenes usan `frameloop="always"` por defecto — el `LazyMount` evita inicializarlas hasta que se necesitan.
- `prefers-reduced-motion` reduce animaciones CSS pero no detiene WebGL. Mejora futura.

## OneDrive + Windows
Si trabajas el proyecto desde `OneDrive\Documents\...`, OneDrive Files-On-Demand puede romper `.next` con `readlink EINVAL`. Soluciones:

```powershell
attrib +P "<ruta-del-proyecto>" /S /D
```

O junctionar `.next` a `%LOCALAPPDATA%`. Ver memoria interna.

## License
Propiedad de Frago's Nexus Intelligence. Todos los derechos reservados.
