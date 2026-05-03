# DebArv

Arv's personal portfolio — hosted on GitHub Pages at [debarv.com](https://debarv.com).

## Pages

| Page | File | Description |
|------|------|-------------|
| Home | `index.html` | Profile, skills, experience, education, publications, contact |
| Blogs | `blogs.html` | Blog listing — research posts and articles |
| Projects | `projects.html` | Project showcase grid |
| Chatroom | `chatroom.html` | Real-time Firebase chatroom |
| IG Cleaner | `tools/ig-cleaner.html` | Instagram tracking link remover tool |

## Structure

```
debarv-site/
├── index.html
├── blogs.html
├── projects.html
├── chatroom.html
├── tools/
│   └── ig-cleaner.html
├── css/
│   └── style.css          # Design system — edit colors/fonts here
├── js/
│   └── main.js            # Theme toggle, nav, typing animation
├── assets/                # Profile photo, project images (add here)
└── CNAME                  # debarv.com
```

## Updating Content

**Adding a blog post:**
1. Create `blogs/your-post-slug.html` (copy the structure from `blogs.html`)
2. Add a card entry in `blogs.html`

**Adding a project:**
- Open `projects.html` and add a new `<div class="project-card">` block inside `.grid`

**Updating profile info (after resume review):**
- Skills grid: `index.html` → `#skills` section
- Experience/Education: `index.html` → `#experience` / `#education` timelines
- Contact links: `index.html` → `#contact` section

**Updating the review paper:**
- `index.html` → `#publications` section
- `blogs.html` → the first blog card

## Chatroom Setup

The chatroom requires a free Firebase project. Full step-by-step instructions are written as comments at the **very top of `chatroom.html`**. Summary:

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Firestore** and **Email/Password Authentication**
3. Paste your `firebaseConfig` values into `chatroom.html`
4. Set the Firestore Security Rules (see comments in the file)
5. Log in as `Arv` and get your UID from DevTools console
6. Update the admin UID in the Security Rules

**Note:** The Firebase config is safe to commit publicly — Firebase security comes from Firestore Rules, not hidden keys.

## Design System

Colors and typography live in `css/style.css` as CSS custom properties:

```css
--red:    #e63946   /* primary brand accent */
--green:  #2dc653   /* hover, success, tools */
--yellow: #ffd166   /* tags, highlights */
--bg:     #0d0d0d   /* dark mode background */
```

Dark mode is default. Light mode is toggled via the ☀️ button in the nav and saved to `localStorage`.

## Instagram Link Cleaner

`tools/ig-cleaner.html` strips tracking parameters (`igsh`, `igshid`, `utm_source`, etc.) from Instagram share links. Runs entirely in the browser — no server, no data collected. [Try it →](https://debarv.com/tools/ig-cleaner.html)

## License

Open source. Code is MIT licensed. Content (writing, images) belongs to Arv.
