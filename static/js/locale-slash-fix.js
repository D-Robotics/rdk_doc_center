(() => {
  const BASE = "/rdk_doc_center";
  const EN_NO_SLASH = `${BASE}/en`;
  const EN_WITH_SLASH = `${BASE}/en/`;
  const EN_INDEX = `${BASE}/en/index.html`;

  function normalizeEnglishPath() {
    const p = window.location.pathname;
    if (p === EN_WITH_SLASH || p === EN_INDEX) {
      window.location.replace(EN_NO_SLASH + window.location.search + window.location.hash);
      return true;
    }
    return false;
  }

  function fixLocaleDropdownLinks() {
    const links = document.querySelectorAll('a[href^="' + EN_WITH_SLASH + '"], a[href="' + EN_WITH_SLASH + '"], a[href="' + EN_INDEX + '"]');
    links.forEach((a) => {
      const href = a.getAttribute("href");
      if (!href) return;
      if (href === EN_WITH_SLASH || href === EN_INDEX) {
        a.setAttribute("href", EN_NO_SLASH);
      } else if (href.startsWith(EN_WITH_SLASH)) {
        // /en/<subpath> -> /en<subpath>
        a.setAttribute("href", EN_NO_SLASH + href.slice(EN_WITH_SLASH.length - 1));
      }
    });
  }

  // If we are already on a broken canonical, redirect ASAP.
  if (normalizeEnglishPath()) return;

  // Fix links after DOM is ready; also handle navbar rerenders.
  const run = () => fixLocaleDropdownLinks();
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", run, { once: true });
  } else {
    run();
  }

  // Observe for client-side re-renders (Docusaurus navbar).
  const obs = new MutationObserver(() => fixLocaleDropdownLinks());
  obs.observe(document.documentElement, { childList: true, subtree: true });
})();

