# Site Update Instructions

Quick reference for updating debarv.com. All changes are made by editing HTML files directly — no build step needed.

---

## Deploying Changes

After any edit, push to GitHub and the site updates automatically via GitHub Pages.

```bash
git add -A
git commit -m "your message here"
git push
```

The live site at debarv.com updates within ~60 seconds.

---

## Adding a Blog Post

**File:** `blogs.html`

Copy this block and paste it inside the `<div class="grid grid-2">` section, above the existing article:

```html
<article class="post-card">
  <div class="tags">
    <span class="tag">Tag One</span>
    <span class="tag">Tag Two</span>
    <span class="tag tag-outline">Published · Mon YYYY</span>
  </div>
  <h3>Your Blog Title Here</h3>
  <p class="post-meta">
    A. Kolekar &nbsp;·&nbsp; Publication or Platform Name
  </p>
  <p>
    One or two sentences describing what the post is about.
  </p>
  <div class="card-footer">
    <a href="URL_OR_FILENAME" target="_blank" rel="noopener" class="btn btn-outline btn-sm">
      Read →
    </a>
  </div>
</article>
```

**For a post on the site itself** (not an external link), create a new file like `blog-your-slug.html`, copy the structure from `blogs.html`, and set `href="blog-your-slug.html"`.

---

## Adding a Work Experience Entry

**File:** `index.html` — find the `<div class="unified-timeline">` section.

Copy this block and paste it at the **top** of the timeline (newest entries go first):

```html
<div class="tl-item tl-work">
  <div class="tl-header">
    <span class="tl-badge tl-badge-work">Work</span>
    <span class="tl-date">Mon YYYY – Mon YYYY</span>
  </div>
  <p class="tl-role">Your Role / Title</p>
  <p class="tl-org">Company Name · City or Remote</p>
  <ul class="tl-bullets">
    <li>What you did — keep it one line, action-oriented.</li>
    <li>Another bullet if needed.</li>
  </ul>
</div>
```

For a **current role** (no end date), use:
```html
<span class="tl-date tl-current">Mon YYYY – Present</span>
```

---

## Adding an Education Entry

**File:** `index.html` — same `<div class="unified-timeline">` section.

```html
<div class="tl-item tl-edu">
  <div class="tl-header">
    <span class="tl-badge tl-badge-edu">Education</span>
    <span class="tl-date">Mon YYYY – Mon YYYY</span>
  </div>
  <p class="tl-role">Degree Name</p>
  <p class="tl-org">Institution Name · GPA / CGPA: X.XX</p>
  <ul class="tl-bullets">
    <li>Relevant coursework or achievement (optional).</li>
  </ul>
</div>
```

---

## Completing an Education Entry (Removing "Present")

**File:** `index.html`

Find the entry by searching for the institution name. Change:
```html
<span class="tl-date tl-current">Mon YYYY – Present</span>
```
to:
```html
<span class="tl-date">Mon YYYY – Mon YYYY</span>
```

Also remove the `tl-current` class from any `<p>` tags inside that entry if present.

---

## Adding a Project Card

**File:** `projects.html` — find the `<div class="grid grid-3">` section.

```html
<div class="project-card">
  <div>
    <div style="display:flex;align-items:center;gap:0.6rem;margin-bottom:0.75rem;">
      <span style="font-size:1.4rem;">🔧</span>
      <h3>Project Name</h3>
    </div>
    <p>One to three sentences describing what the project does and why it matters.</p>
  </div>
  <div class="tags">
    <span class="tag">Language</span>
    <span class="tag">Framework</span>
    <span class="tag tag-outline">Category</span>
  </div>
  <div class="project-card-footer">
    <a href="https://github.com/49asvk/REPO" target="_blank" rel="noopener" class="btn btn-outline btn-sm">GitHub →</a>
    <!-- Optional live demo button: -->
    <!-- <a href="URL" class="btn btn-green btn-sm">Try it →</a> -->
  </div>
</div>
```

---

## Updating Skills

**File:** `index.html` — find the `<div class="skills-grid">` section.

Each skill is one block:
```html
<div class="skill-item"><div class="icon">🛠️</div><span>Skill Name</span></div>
```

Pick any emoji that fits. Add or remove these blocks freely — the grid auto-fills.

---

## Updating Contact Links

**File:** `index.html` — find the `<section class="section" id="contact">` section.

Each link follows this pattern:
```html
<a href="URL" target="_blank" rel="noopener" class="contact-link">
  <!-- SVG icon here -->
  Display Text
</a>
```

To change an email address, search for `mailto:` and update both the `href` and the visible text.

---

## Updating the About Bio

**File:** `index.html` — find `<div class="about-text">`.

Edit the `<p>` paragraphs directly. Keep it to 2–3 short paragraphs.

---

## Changing the Profile Photo

1. Replace `assets/Profile.jpg` with your new photo (same filename keeps it automatic).
2. Or save the new photo with a different name and update `index.html`:
   ```html
   <img src="assets/YOUR_FILENAME.jpg" alt="Atharv Kolekar" />
   ```

---

## Chatroom — Firebase Setup

The chatroom reads admin permissions from Firestore. Nothing sensitive is stored in the code.

### First-time setup
1. **Firebase Console → Authentication → Sign-in method** → Enable Email/Password and Google.
2. **Authentication → Settings → Authorised domains** → Add `debarv.com` and `49asvk.github.io`.
3. **Firestore → Rules** → Replace with:
   ```
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /messages/{message} {
         allow read: if true;
         allow create: if request.auth != null;
         allow delete: if request.auth.uid == "YOUR_ADMIN_UID";
       }
       match /users/{userId} {
         allow read: if true;
         allow create, update: if request.auth.uid == userId;
       }
       match /config/{doc} {
         allow read: if true;
         allow write: if false;
       }
     }
   }
   ```
   Replace `YOUR_ADMIN_UID` with your UID (Firebase Console → Authentication → Users → your row → User UID column).

4. **Firestore → Start collection** → Collection ID: `config` → Document ID: `site` → Add field:
   - Field name: `adminUid` · Type: string · Value: your UID

5. **Paste your Firebase config** into the `firebaseConfig` object in `chatroom.html`.

### Adding another admin
Update the Firestore Rule to check multiple UIDs:
```
allow delete: if request.auth.uid in ["UID_ONE", "UID_TWO"];
```
Then update the `config/site` document — add the secondary UID to a field if you want to display their crown badge too.

---

## Instagram Link Cleaner — Separate Repo

The hosted version lives at `tools/ig-cleaner.html` in this repo (linked from projects.html and debarv.com/tools/ig-cleaner.html).

For the standalone showcase repo:
1. Create a new GitHub repo (e.g. `instagram-link-cleaner`).
2. Copy `tools/ig-cleaner-standalone.html` into that repo as `index.html`.
3. Enable GitHub Pages on that repo (Settings → Pages → Deploy from main branch).
4. Update the GitHub link in the file from `49asvk/instagram-link-cleaner` to your actual repo name if different.

The standalone file has zero external dependencies — no CDN, no shared CSS — so it works anywhere.

---

## Adding a New Page

1. Copy `blogs.html` as your starting template (it's the simplest page).
2. Rename it (e.g. `talks.html`).
3. Update the `<title>` and page content.
4. Add a nav link in **all four pages** (`index.html`, `blogs.html`, `projects.html`, `chatroom.html`):
   ```html
   <li><a href="talks.html">Talks</a></li>
   ```
   And in each mobile nav:
   ```html
   <a href="talks.html">Talks</a>
   ```
5. Add a footer link in all four pages too.
