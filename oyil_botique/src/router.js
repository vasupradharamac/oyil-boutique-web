// Simple hash-based SPA router
export function initRouter(routes) {
  function navigate() {
    const hash = window.location.hash || '#/';
    const pageRoot = document.getElementById('page-root');

    // Find matching route
    let matchedRoute = null;
    let params = {};

    for (const route of routes) {
      const pattern = route.path.replace(/:([^/]+)/g, '([^/]+)');
      const regex = new RegExp(`^${pattern}$`);
      const match = hash.match(regex);

      if (match) {
        matchedRoute = route;
        const paramNames = [...route.path.matchAll(/:([^/]+)/g)].map(m => m[1]);
        paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        break;
      }
    }

    if (!matchedRoute) {
      // Default to home
      matchedRoute = routes.find(r => r.path === '#/') || routes[0];
    }

    // Scroll to top
    window.scrollTo(0, 0);

    // Clear and render
    pageRoot.innerHTML = '';
    pageRoot.appendChild(matchedRoute.component(params));

    // Update active nav links
    document.querySelectorAll('.header-nav a, .mobile-nav-overlay a').forEach(link => {
      const href = link.getAttribute('href');
      if (href === hash || (hash === '#/' && href === '#/')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Re-observe reveal elements
    observeRevealElements();
  }

  window.addEventListener('hashchange', navigate);
  window.addEventListener('load', navigate);

  // Initial load if DOM is ready
  if (document.readyState !== 'loading') {
    navigate();
  }
}

// Scroll reveal with IntersectionObserver
export function observeRevealElements() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    if (!el.classList.contains('revealed')) {
      observer.observe(el);
    }
  });
}
