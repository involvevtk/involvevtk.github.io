/*
 * Involve - small, optional motion (all of it is switched off for visitors who
 * ask their device for reduced motion):
 *   - scroll reveal: elements with class "reveal" fade/slide up once, staggered by --d
 *   - header gets a hairline + compact height after scrolling
 * Without JS (or if anything here fails) content is simply visible.
 */
export function initMotion() {
  const header = document.getElementById("site-header");
  if (header) {
    const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  const items = document.querySelectorAll(".reveal");
  const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!items.length) return;
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach((n) => n.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
  );
  items.forEach((n) => io.observe(n));
}
