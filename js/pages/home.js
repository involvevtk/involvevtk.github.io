/* Home page: assembles the sections. Content: data/home.json, about.json, events.json, leadership.json, site.json */
import { runPage } from "../layout.js";
import { loadJSON } from "../core.js";
import { renderHero } from "../render/hero.js";
import { renderVideo } from "../render/video.js";
import { renderAbout } from "../render/about.js";
import { renderEventsTeaser } from "../render/events.js";
import { renderGreenTeaser } from "../render/green.js";
import { renderForestTeaser } from "../render/forest.js";
import { renderMagazine } from "../render/magazine.js";
import { renderLeadership } from "../render/leadership.js";
import { renderContact } from "../render/contact.js";

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
