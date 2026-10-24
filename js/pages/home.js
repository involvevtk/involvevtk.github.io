/* Home page: assembles the sections. Content: data/home.json, about.json, events.json, leadership.json, site.json */
import { runPage } from "../layout.js?v=202610242053";
import { loadJSON } from "../core.js?v=202610242053";
import { renderHero } from "../render/hero.js?v=202610242053";
import { renderVideo } from "../render/video.js?v=202610242053";
import { renderAbout } from "../render/about.js?v=202610242053";
import { renderEventsTeaser } from "../render/events.js?v=202610242053";
import { renderGreenTeaser } from "../render/green.js?v=202610242053";
import { renderForestTeaser } from "../render/forest.js?v=202610242053";
import { renderMagazine } from "../render/magazine.js?v=202610242053";
import { renderLeadership } from "../render/leadership.js?v=202610242053";
import { renderContact } from "../render/contact.js?v=202610242053";

runPage("home", async ({ site, social, main }) => {
  const [home, about, events, people] = await Promise.all([
    loadJSON("home"), loadJSON("about"), loadJSON("events"), loadJSON("leadership"),
  ]);
  renderHero(main, home, site);
  renderAbout(main, about, site);
  renderVideo(main, home);
  renderEventsTeaser(main, home, events);
  renderGreenTeaser(main, home, site);
  renderForestTeaser(main, home);
  renderMagazine(main, home, site);
  renderContact(main, home, site, social);
  renderLeadership(main, home, people);
  return { seo: home.seo };
});
