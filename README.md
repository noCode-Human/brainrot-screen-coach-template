# Brainrot Screen Coach Template

A playful static app template that turns screen-time guilt into a tiny brain-health dashboard. Users enter their daily doomscrolling minutes, watch their brain avatar react, start a focus recovery timer, and copy a shareable status update.

Built for **noCode Human** as a free vibe-coded template.

![Brainrot Screen Coach preview](assets/mascots/brain-pet-default.png)

## What it includes

- Manual screen-time sliders for TikTok/Reels, X/Threads, YouTube Shorts, Reddit, and message checking
- Brain health score from `0–100`
- Cute brain mascot states for healthy, medium, and overloaded usage
- Local browser history for a 7-day chart
- Focus recovery timer
- Copyable share text
- Responsive dark dashboard UI
- No build step, no backend, no account system

## Demo idea

> “Your screen-time chart is boring, so I made it rot your brain in real time.”

This template is intentionally simple: it proves the emotional loop before you spend time on a real mobile app, native Screen Time integrations, accounts, or subscriptions.

## Quick start

Open it directly:

```bash
open index.html
```

Or serve it locally:

```bash
python3 -m http.server 8080
# then open http://localhost:8080
```

You can also use any static server:

```bash
npx serve .
```

## File structure

```text
.
├── index.html              # App markup
├── styles.css              # Responsive dashboard styling
├── app.js                  # Sliders, scoring, localStorage, timer, share text
├── assets/mascots/         # Brain mascot images
├── BRIEF.md                # Product/market notes
└── MISSING.md              # What a real production version would need
```

## How the scoring works

The app stores usage in `localStorage` and calculates a weighted “rot” score:

- TikTok / Reels: heavier penalty
- YouTube Shorts: heavier penalty
- X / Threads: standard penalty
- Reddit: lighter penalty
- Message checking: lightest penalty
- Focus sessions add recovery points

You can customize the weights in `app.js`:

```js
const APPS = [
  { key: 'tiktok', label: 'TikTok / Reels', weight: 1.2 },
  { key: 'x', label: 'X / Threads', weight: 1.0 },
  { key: 'youtube', label: 'YouTube Shorts', weight: 1.1 },
  { key: 'reddit', label: 'Reddit', weight: 0.8 },
  { key: 'messages', label: 'Messages checking', weight: 0.45 }
];
```

## Customize it

Easy edits:

- Change app categories in `APPS`
- Adjust the daily goal with `DAILY_GOAL`
- Adjust the max visual scale with `MAX_SCROLL`
- Replace mascot images in `assets/mascots/`
- Update colors in `:root` inside `styles.css`
- Rename the app in `index.html`

## Deploy

Because this is plain HTML/CSS/JS, you can host it anywhere:

- GitHub Pages
- Netlify
- Vercel
- Cloudflare Pages
- Carrd/Framer embed as static files

For GitHub Pages, enable Pages for the repo and serve from the `main` branch root.

## Production upgrade ideas

This v0 is a browser prototype. A real product could add:

- iOS Screen Time / DeviceActivity integration
- Android Digital Wellbeing integrations
- Real app blocking
- Login and synced history
- Share-card image export
- Widgets and push notifications
- Friend challenges / leaderboards
- Premium mascot packs

See `MISSING.md` for the realistic missing pieces.

## Privacy

This template does not send data anywhere. Usage and history stay in the user’s browser via `localStorage`.

## License

MIT — fork it, remix it, ship it.

Made with 🧠 by noCode Human.
