# Involve Cultural and Charitable Society – static website

Plain HTML, CSS and vanilla JavaScript. No framework, no build step, no server, no database, no login.
Intended to be hosted on **GitHub Pages** at **https://involve.org.in**.

> Involve Cultural and Charitable Society, Vatakara, Kozhikode (Dist.), Kerala · Reg. No. KKD/CA/378/2016 · Affiliated to Nehru Yuva Kendra Sangathan

## Folder structure

```
index.html                 Home (hero, intro video, About, events teaser, Green + Forest teasers, Petrichore, office bearers, contact)
events.html                All events (rendered from js/events-data.js)
green.html                 Green Project (info only)
forest.html                Involve Forest
social-media-links.html    Facebook, YouTube, Instagram, LinkedIn, X
privacy.html               Short privacy policy for a static site
404.html                   Not-found page (GitHub Pages serves it automatically)
sitemap.xml, robots.txt    SEO files
CNAME                      Custom domain for GitHub Pages (involve.org.in)
.nojekyll                  Tells GitHub Pages to serve files as-is
favicon.ico, *.png         Favicons / app icons
css/style.css              All styles
js/config.js               Office phone number (single place to edit)
js/events-data.js          Event list (hand-edited)
js/events.js               Renders events on events.html and the home teaser
js/main.js                 Mobile menu, phone buttons, forest video autoplay rules
assets/images/             Logo, posters, event banners, people, About images
assets/video/              involve-intro.mp4, involve-forest.mp4
assets/icons/sprite.svg    Social/contact icons
```

The header and footer are repeated in every HTML file (no includes on purpose). If you change the menu or footer, edit all 7 pages.

## Preview locally

```
cd involve-static
python3 -m http.server 8080
```
Open http://localhost:8080. (Open it through a server, not by double-clicking the file, so that scripts and videos load properly.)

## Change the office phone number

Edit **`js/config.js`** and set `PHONE` in international format, e.g. `"+919876543210"`.
This one value drives the Call button, the WhatsApp button and the displayed number.
While it is still `+91XXXXXXXXXX` (the placeholder) the buttons are disabled and the page says "Office number coming soon".

## How to add an event

1. Put a banner image in `assets/images/events/` (about 1200×675 px, JPG, under ~200 KB).
2. Open **`js/events-data.js`** and add an object to the list:

```js
{
  title: "Tree Planting Drive 2026",
  description: "One or two sentences about the event.",
  bannerImage: "assets/images/events/tree-planting-2026.jpg",
  readMoreLink: "https://example.com/full-story",   // or "" to hide the Read more button
  eventDate: "2026-06-05",                          // YYYY-MM-DD
  featured: true                                    // true = also shown on the home page (max 4 newest)
}
```
3. Delete the three `sample: true` events once you have real ones.
4. Order in the file does not matter; the site sorts by date, newest first. Save, commit, push.

## Placeholder content to replace

The original Cloudinary images/videos were no longer available when this site was built, so these files are clearly-labelled placeholders using the final file names. Replace them with the real files (same name, or update the HTML):

- `assets/video/involve-intro.mp4`, `assets/images/intro-poster.jpg`
- `assets/video/involve-forest.mp4`, `assets/images/forest-poster.jpg`
- `assets/images/about/our-story.jpg`, `our-mission.jpg`, `our-vision.jpg`
- `assets/images/petrichore-cover.jpg`
- `assets/images/people/*.jpg` (officer photos – currently initials avatars)
- `assets/images/events/sample-*.jpg`
- `assets/images/og-image.jpg` (social share image, 1200×630)

Keep videos under ~25 MB (GitHub warns at 50 MB, blocks at 100 MB). Compress with:
```
ffmpeg -i in.mp4 -vf "scale=-2:720" -c:v libx264 -crf 28 -preset slow -an -movflags +faststart out.mp4
```
(drop `-an` for the intro video if it has sound).

## Deploy to GitHub Pages with involve.org.in

1. Create a GitHub repository and push this folder to the `main` branch.
2. Repo **Settings → Pages**: Source = *Deploy from a branch*, branch `main`, folder `/ (root)`.
3. The `CNAME` file already contains `involve.org.in`; in Settings → Pages confirm the custom domain and tick **Enforce HTTPS** once the certificate is ready.
4. At your DNS provider for `involve.org.in`:
   - `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (optional) `CNAME` for `www` → `<your-github-user>.github.io`
5. Wait for DNS to propagate (minutes to a few hours).

`404.html` uses root-absolute paths (`/css/style.css`), which is correct for a custom domain served at the root.

## Notes

- No cookies, no analytics, no forms, no data collection.
- Social links open the third-party sites; see `privacy.html`.
