/*
 * Involve - events data. HAND-EDITED: this file is the only place events live.
 *
 * Each event has these fields:
 *   title        Event name.
 *   description  A short summary (1-3 sentences).
 *   bannerImage  Path to a picture, e.g. "assets/images/events/my-event.jpg"
 *                (about 800 px wide, JPG, under 150 KB is ideal).
 *   readMoreLink Full web address for more details (Facebook post, news...).
 *                Use "" to hide the "Read more" button.
 *   eventDate    Date as "YYYY-MM-DD". Events are sorted newest first.
 *   featured     true = also shown on the Home page, false = Events page only.
 *   sample       (optional) true = shows a "SAMPLE" badge. DELETE this line
 *                (and delete the sample events) when you add real events.
 *
 * To add an event: copy one block (from "{" to "},"), paste it at the top of
 * the list, and change the values. Keep the commas between blocks and keep the
 * text inside straight double quotes.
 */
window.INVOLVE_EVENTS = [
  {
    title: "Sample Event: Tree Planting Drive",
    description:
      "SAMPLE TEXT. A community tree planting morning with volunteers, school students and neighbours. Replace this with a real event.",
    bannerImage: "assets/images/events/sample-2.jpg",
    readMoreLink: "https://www.facebook.com/involvevatakaraofficial",
    eventDate: "2026-06-05",
    featured: true,
    sample: true
  },
  {
    title: "Sample Event: Blood Donation Camp",
    description:
      "SAMPLE TEXT. Volunteers coordinate a one-day blood donation camp with a local hospital. Replace this with a real event.",
    bannerImage: "assets/images/events/sample-1.jpg",
    readMoreLink: "https://www.facebook.com/involvevatakaraofficial",
    eventDate: "2026-01-26",
    featured: true,
    sample: true
  },
  {
    title: "Sample Event: Student Support Programme",
    description:
      "SAMPLE TEXT. Study kits and guidance for deserving students from nearby schools. Replace this with a real event.",
    bannerImage: "assets/images/events/sample-3.jpg",
    readMoreLink: "",
    eventDate: "2025-08-15",
    featured: false,
    sample: true
  }
];
