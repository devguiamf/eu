# Media assets

Drop real assets in here and point to them from the content files — no
component code needs to change.

## Hero (Section 1 — Home)

- File: any name, e.g. `hero-loop.mp4` (or `.webm`) or `hero-loop.gif`.
- Set in [`src/content/profile.ts`](../../src/content/profile.ts):
  ```ts
  heroMediaSrc: "/media/hero-loop.mp4",
  heroMediaType: "video", // or "gif"
  ```
- Recommended: a transparent-looking loop (dark background matching `--color-ink`
  works just as well as true alpha video), roughly 16:9 or taller, under ~4MB,
  muted, seamless loop.

## Portrait (Section 2 — Trajetória)

- File: e.g. `portrait.jpg` or an animated `portrait.gif`.
- Set in [`src/content/profile.ts`](../../src/content/profile.ts):
  ```ts
  portraitSrc: "/media/portrait.jpg",
  ```
- Recommended aspect ratio: 4:5 (portrait).

## Project previews (Section 4 — Projetos)

- Files: e.g. `projects/aurora-dashboard.mp4`.
- Set per project in [`src/content/projects.ts`](../../src/content/projects.ts):
  ```ts
  mediaSrc: "/media/projects/aurora-dashboard.mp4",
  mediaType: "video", // or "gif"
  ```
- Recommended: looping muted video, 16:9, under ~6MB each (they autoplay/hover-play).

## No assets yet?

Every slot renders a procedural gradient + grain placeholder (see
`variant` on each project / `MediaSlot`) so the layout looks finished
even before real media exists.
