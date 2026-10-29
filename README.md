# Involve - website

Static website for **Involve Cultural and Charitable Society**, Vatakara, Kozhikode, Kerala.
Plain HTML, CSS and JavaScript. No framework, no build step, no database.
Live at <https://involve.org.in/>.

All text lives in JSON files in [`data/`](data/). The pages are small HTML shells that load those files with JavaScript, so **you update the site by editing a data file, not the code**.

## Folder structure

```
.
├── index.html                  Home
├── events.html                 Events
├── green.html                  Green Project
├── forest.html                 Involve Forest
├── social-media-links.html     Social media links
├── privacy.html                Privacy & Terms
├── 404.html                    "Page not found"
├── data/                       <- ALL CONTENT (edit these)
│   ├── site.json                 name, address, email, phone, menu, footer, souvenir link, SEO defaults
│   ├── social.json               social media links
│   ├── home.json                 home page texts (hero, facts, video, teasers, contact)
│   ├── about.json                "Who We Are": Our Story / Mission / Vision
│   ├── events.json               events list
│   ├── green.json                Green Project page
│   ├── forest.json               Involve Forest page
│   ├── privacy.json              Privacy & Terms page
│   └── leadership.json           office bearers (empty = section hidden)
├── js/                         code (no need to edit for content changes)
│   ├── core.js                   helpers: load JSON, build elements, links, phone check
│   ├── layout.js                 header, menu, footer, SEO tags (built from data/site.json)
│   ├── motion.js                 scroll reveal and header-on-scroll
│   ├── pages/                    one small script per page (home, events, green, ...)
│   └── render/                   one renderer per home section (hero, about, events, ...)
├── css/
│   ├── base.css                  colours, type, buttons, motion
│   ├── layout.css                header, menu, footer
│   ├── components.css            lists, events, social icons, leadership
│   └── pages.css                 page and section specific styles
├── assets/
│   ├── images/                   logo, section photos, placeholders, share image
│   ├── icons/sprite.svg          social and contact icons
│   └── video/                    intro video (placeholder)
├── sitemap.xml, robots.txt
└── favicon.ico, favicon-32x32.png, apple-touch-icon.png, android-chrome-512x512.png
```

## How to update content

General rules for every JSON file:

* Change only the text between the quotes. Keep the quotes, commas, `[ ]` and `{ }`.
* Each file has a `_help` line at the top; it is ignored by the site.
* A mistake (for example a missing comma) makes that page show "this page could not load". Paste the file into <https://jsonlint.com> to find it.
* In longer texts you can use `[link text](https://example.com)` for a link, `**bold**` for bold, `{{email}}` for the office email and `{{phone}}` for the office phone.
* Images go in `assets/images/`; write their path in the JSON, for example `"assets/images/events/camp.jpg"`.

### `data/site.json` - details used on every page

| Field | What it does |
|---|---|
| `name`, `fullName`, `orgType`, `tagline` | organisation name shown in header, footer and search results |
| `siteUrl` | public address of the site (used for search/share tags). **Change it when the domain changes** |
| `address` | list of address lines |
| `registrationNumber`, `affiliation` | shown in footer and contact section |
| `email` | office email (shown in footer, contact, privacy page, no-JS message) |
| `phone` | the ONE office phone number, see below |
| `whatsappMessage` | first message when someone taps WhatsApp |
| `souvenir` | `title`, `url` (flip-book link) and `cover` image of the souvenir magazine |
| `nav` | main menu: `label` and `href` for each item (order = order on screen) |
| `footer` | footer headings, extra links and the copyright line |
| `socialPage` | heading, intro and search text of the social media page |
| `seo` | default page title and description |

**Office phone.** `phone` currently holds the placeholder `+91XXXXXXXXXX`. While it is not a real number the site hides every phone, Call and WhatsApp item. To switch them on, replace it with the number in international format, for example `"+919876543210"` (plus sign, country code, digits only). This is the only place the number is stored.

### `data/social.json` - social media

A list; one entry per network: `id` (`facebook`, `youtube`, `instagram`, `linkedin`, `x`), `label`, `handle` (shown on the Social page) and `url`. Delete an entry to hide it; to add a network, add its icon to `assets/icons/sprite.svg` first.

### `data/home.json` - home page texts

`hero` (small heading, title, subtitle, text, buttons), `facts` (the four-column strip: `label` and `value`), `video` (title, `src`, `poster`), `events` (heading and how many to show, `maxItems`), `green`, `forest`, `magazine`, `leadership` (heading only) and `contact` (headings and intro).

### `data/about.json` - Who We Are

`eyebrow`, `title`, `intro` and `cards`: the three rows (Our Story, Mission, Vision), each with `title`, `text` and optionally `image`, `imageAlt`. With no image the row is text only.

### `data/events.json` - events

Add one block per event inside `"events": [ ... ]`, newest anywhere (the site sorts by date):

```json
{
  "title": "Tree Planting Drive",
  "description": "Short description, one or two sentences.",
  "bannerImage": "assets/images/events/tree-planting.jpg",
  "readMoreLink": "https://example.com/report",
  "eventDate": "2026-06-05",
  "featured": true
}
```

* `eventDate` must be `YYYY-MM-DD`. Future dates get an "Upcoming" label.
* `featured: true` shows the event on the home page (the first three are used).
* `bannerImage` and `readMoreLink` are optional; leave them out to hide the image or link.
* The three current events (Tree Planting Drive, Blood Donation Camp, Student Support Programme) are **made-up samples with no label**. Replace them with real events before promoting the site.
* With no `bannerImage` the event shows as a clean text row (no empty image box).
* Year filter buttons on the Events page appear automatically.

### `data/green.json`, `data/forest.json`, `data/privacy.json` - inner pages

Each holds the page `seo` (title and description), heading text and `paragraphs` (a list; one entry per paragraph). `green.json` also has `list` (the "Green Life we promote" items) and `actions` (buttons). `forest.json` has the English `summary` and the Malayalam `paragraphs`. `privacy.json` has `sections`, each with `heading`, `paragraphs` and optionally `list`; set `ordered: true` for a numbered list or `collapsible` for a fold-out.

### `data/leadership.json` - office bearers

Currently an empty list `[]`, so the whole section is **hidden**. When the correct details are ready, add entries and the section appears on the home page automatically:

```json
[
  { "name": "Full Name", "role": "President", "photo": "assets/images/people/full-name.jpg" },
  { "name": "Full Name", "role": "Secretary" }
]
```

`photo` is optional. Square or 4:5 portraits work best.

## No JavaScript

Every page contains a `<noscript>` message with the office email and links to all pages. If the office email changes, update it in `data/site.json` **and** in the `<noscript>` block of each HTML file.

## Preview on your computer

```
python3 -m http.server 8080
```

Open <http://localhost:8080>. (Opening the HTML files directly from disk does not work because browsers block `fetch` on `file://`.)

## Publishing (GitHub Pages)

The site is served from the `main` branch by GitHub Pages. Commit and push your change; it is live in about a minute:

```
git add -A && git commit -m "Update content" && git push origin main
```

Editing a JSON file directly on github.com (pencil icon) and committing also works.

### Domain and hosting (live)

* Repo: `involvevtk/involvevtk.github.io` (GitHub user `involvevtk`), branch `main`, served by GitHub Pages.
* Domain `involve.org.in` is registered at **GoDaddy** and its DNS is managed there, nameservers `ns63`/`ns64.domaincontrol.com` (Amazon Route 53 is no longer used; Cloudflare is an option). The `CNAME` file holds `involve.org.in`. "Enforce HTTPS" is on in the repo's Pages settings.
* GoDaddy DNS: four `A` records for `@` pointing to GitHub Pages (`185.199.108.153`, `.109.153`, `.110.153`, `.111.153`) and a `CNAME` for `www` pointing to `involvevtk.github.io`.
* `siteUrl`, `sitemap.xml`, `robots.txt` and the canonical/`og:url` tags already use `https://involve.org.in/`.
* There is no server, database or login. The old site (Express/React/MongoDB, events stored in a database) has been replaced by this one.

## Design notes

* Colours: black, white and greys, with the two logo colours (blue `#146cb4`, orange `#f47800`) for some headings, labels and links. Defined at the top of `css/base.css`.
* Flat design: no shadows, no gradients. Motion (fade-in on scroll, hover lines) is switched off automatically for visitors who prefer reduced motion.
* Accessibility: skip link, visible keyboard focus, 44px tap targets, alt text for images.
* Each section has its own look (plain, grey band, dark band, photo band) with smooth transitions between them. No cards.
* Photos: `green-forest.jpg` (Green Project) and `forest-poster.jpg` (birds over a forest canopy, behind the home Involve Forest band) are AI-generated stand-ins. `intro-poster.png`, `petrichore-cover.jpg` and `assets/video/involve-intro.mp4` are placeholders (the real signature video is still to come). Replace with real files of the same name or update the paths in the JSON.
* The home Forest band shows `forest.poster` as a photo; add `"video": "assets/video/xyz.mp4"` to `home.json` → `forest` to play a muted looping video over it on wide screens.


## Clean URLs

Pages are served without `.html` on GitHub Pages (for example `/green` for `green.html`). Always link to the clean form (`events`, `green`, `./#contact`). The plain `python3 -m http.server` preview does not understand clean URLs, so open `localhost:8080/green.html` there, or run `python3 serve.py` instead, which handles clean URLs.

## Analytics

Google Analytics 4 is set in `data/site.json` under `analytics` (`measurementId`, `hosts`). Set `measurementId` to `""` to turn it off. It only runs on the live domain, never on localhost. The GA4 property (ID `G-MD2RY6P5RH`) sits in the owner's personal Google account (dipakchandranp), not a shared Involve account. Tracked events: page views, `click_call`, `click_whatsapp`, `click_email`, `click_social`, `click_outbound`. The privacy page mentions it; keep that text if you keep analytics.

## Dark / light theme

The sun/moon button in the header switches theme. The choice is saved in a cookie (`involve-theme`, one year); with no cookie the device setting is used. Colours for both themes are the CSS variables at the top of `css/base.css` (`html[data-theme="dark"]` block). `js/theme-init.js` runs first in each page's `<head>` to avoid a flash; `js/theme.js` builds the button.

## Before every push: refresh the cache version

GitHub Pages lets browsers keep files for about 10 minutes. To make phones pick up changes immediately, run this before you commit:

```
python3 tools/bump-version.py
```

It stamps a new `?v=` number on all CSS and JS links. Content in `data/` is always fetched fresh, so editing only data files needs nothing extra (an image replaced under the same file name can still take up to 10 minutes; use a new file name to see it at once).

## Colours: always use variables

Colours are written only in the two variable blocks at the top of `css/base.css` (`:root` for light, `html[data-theme="dark"]` for dark). Everywhere else use `var(--name)`. Run this before pushing; it fails if a hard-coded colour sneaks in:

```
python3 tools/check-colors.py
```

Placeholder images in `assets/images/` are transparent PNGs, so they follow the theme background; real photos are slightly dimmed in dark mode.

## Checking before every push

Every change is checked on phone (390px) and desktop (1280px) widths, in both light and dark theme, before it is pushed. Run `python3 serve.py` (clean URLs, port 8080) and look at every page, or use a headless browser such as Playwright to screenshot each page in both themes (set the `involve-theme` cookie to `light`/`dark`). Look for: empty or plain-looking blocks, the same image shown twice, text with poor contrast in either theme, sideways scrolling on phones, and console errors.

Push checklist:

```
python3 tools/check-colors.py      # no hard-coded colours
python3 tools/bump-version.py      # new cache version
git add -A && git commit -m "..." && git push origin main
```

## Still to do (waiting for real content)

* Office phone number (`data/site.json` → `phone`; Call/WhatsApp buttons stay hidden until set).
* Office bearers: President, General Secretary, Treasurer (`data/leadership.json`).
* Real events to replace the three samples (`data/events.json`).
* The full signature video (current file is a 3-second placeholder) and real photos.
* A real link for "Involve by Law", if there is one.

## For an AI assistant picking this up

Read this whole file first. Owner's standing preferences: minimal, formal, flat organisation-style design; black/white/grey with the logo blue/orange only for some headings, labels and links; no cards, shadows or 3D; lots of whitespace; mobile first; English only; clean URLs; all content in `data/*.json`; colours only through the variables in `css/base.css`; dark and light themes both working; short replies; check everything on mobile and desktop in both themes before pushing.
