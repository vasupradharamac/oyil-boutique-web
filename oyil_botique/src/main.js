import '../styles/index.css';
import { initRouter, observeRevealElements } from './router.js';
import { renderHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { HomePage } from './pages/home.js';
import { CollectionsPage } from './pages/collections.js';
import { ProductPage } from './pages/product.js';
import { AboutPage } from './pages/about.js';
import { ContactPage } from './pages/contact.js';
import { AppointmentPage } from './pages/appointment.js';

// Render layout
renderHeader();
renderFooter();

// Initialize router
initRouter([
  { path: '#/', component: HomePage },
  { path: '#/collections', component: CollectionsPage },
  { path: '#/product/:id', component: ProductPage },
  { path: '#/about', component: AboutPage },
  { path: '#/contact', component: ContactPage },
  { path: '#/book-appointment', component: AppointmentPage },
]);

// Add body padding for fixed header
document.body.style.paddingTop = '0';

// Lazy loading for images
if ('IntersectionObserver' in window) {
  const imgObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imgObserver.unobserve(img);
      }
    });
  }, { rootMargin: '100px' });

  // Observe lazily loaded images
  document.querySelectorAll('img[data-src]').forEach(img => {
    imgObserver.observe(img);
  });
}

// Observe reveal elements after initial render
setTimeout(observeRevealElements, 200);
