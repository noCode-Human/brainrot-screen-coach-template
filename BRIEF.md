# BRIEF: Brainrot / Screen-Time Brain Coach

## 1. Idea
- Original: Brainrot — https://www.producthunt.com/products/brainrot-2
- What it does: A simple iOS screen-time app where a cute brain avatar decays when you scroll too much and recovers when you stop.
- Why it is working: Product Hunt launch page says the concept is “the more you brainrot, the more your brain rots.” Hunted.space shows 538 upvotes / 53 comments. Indie Hackers and What A Startup reported $26K in the first 30 days and #1 on Product Hunt. Sources: https://hunted.space/product/brainrot-2, https://www.indiehackers.com/post/tech/this-chronic-side-hustler-just-hit-26k-in-30-days-fYbp8x4WWqltdifUwCZJ, https://whatastartup.substack.com/p/from-brainrot-to-26k-in-30-days
- Estimated yearly revenue: ~$312K/year run-rate if the first month repeated; low confidence.
- Clone angle: Copy the emotional visual-guilt loop. Change it into a web/iOS-style “screen coach” with app-by-app sliders, a brain health score, and tiny recovery sessions.
- Vibe-code build time: 1–3 days for a usable web/PWA v1; longer for real iOS Screen Time permissions.
- Quickest path to ship: A no-login web/PWA where users enter daily app minutes, see their brain avatar decay/recover, and share a weekly “brain status” card.

## 2. Market fit
- Problem: People know they doom-scroll too much but ignore charts, limits, and generic wellness dashboards.
- Persona: Students, creators, remote workers, and ADHD-ish phone addicts who respond to memes and cute shame more than productivity graphs.
- Current solution: Apple Screen Time, Opal, One Sec, Forest, app blockers, guilt, or nothing.
- Why they would switch/share/pay: It turns an invisible habit into a funny visible pet/character. Easy to screenshot. Paid version can add real blocking, widgets, streaks, and friend challenges.

## 3. Cheapest tech stack
- Frontend: Static HTML/CSS/JS or Next.js PWA
- Backend: None for v0
- Database: localStorage for v0; Supabase later
- Auth: None for v0; Clerk/Supabase later
- Payments: None for v0; Stripe or mobile subscriptions later
- AI/API: None
- Hosting: Netlify, Vercel, or GitHub Pages
- Monthly cost to start: $0

## 4. Organic marketing
- Public build idea: “I made my phone addiction visible as a dying little brain. Here is my real score after a day of scrolling.”
- Short-form video hooks:
  1. “Your screen-time chart is boring, so I made it rot your brain in real time.”
  2. “I turned doom-scrolling into a Tamagotchi you can accidentally kill.”
  3. “If TikTok had consequences, it would look like this.”
- Places to share: Product Hunt, TikTok, X build-in-public, Reddit r/nosurf, r/productivity, r/ADHD, r/SideProject, Hacker News Show HN.
- Lowest-lift launch move: Ship a free “brain status card” generator and ask people to post their score.

## 5. Action todo
1. Build the one-page calculator/avatar loop with localStorage.
2. Add share-card export and a 7-day history view.
3. Package as a PWA, then validate if users want real iOS Screen Time integration.
