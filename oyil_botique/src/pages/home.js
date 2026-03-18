import { categories, products, spotlightItems } from '../data/products.js';

export function HomePage() {
  const page = document.createElement('div');
  page.className = 'home-page';

  page.innerHTML = `
    <!-- Hero Section -->
    <section class="hero" id="hero">
      <img class="hero-poster" src="/images/hero/hero-poster.png" alt="Oyil Boutique — Tradition, Grace, Crafted for You" loading="eager" />
      <video class="hero-video" autoplay muted loop playsinline poster="/images/hero/hero-poster.png" aria-label="Oyil Boutique campaign video showcasing latest festive collection">
        <source src="" type="video/mp4" />
        <source src="" type="video/webm" />
      </video>
      <div class="hero-overlay"></div>
      <div class="hero-content">
        <h1>Tradition. Grace. Crafted for You.</h1>
        <p>Explore the Festival Collection 2025</p>
        <a href="#/collections" class="btn btn--outline">Shop Now</a>
      </div>
    </section>

    <!-- Shop by Category -->
    <section class="section section--large" id="shop-by-category">
      <div class="container">
        <p class="section-label reveal">Shop by Category</p>
        <h2 class="section-title reveal">Explore Our Collections</h2>
        <div class="category-grid" id="category-grid"></div>
      </div>
    </section>

    <!-- Mid-Page Video Strip -->
    <section class="video-strip reveal" id="video-strip">
      <img src="/images/hero/video-poster-festive.png" alt="The Festive Edit Collection" loading="lazy" />
      <video autoplay muted loop playsinline poster="/images/hero/video-poster-festive.png" aria-label="Campaign video for The Festive Edit collection">
        <source src="" type="video/mp4" />
      </video>
      <div class="video-strip-gradient"></div>
      <div class="video-strip-content">
        <p class="section-label">New Collection</p>
        <h2>The Festive Edit</h2>
        <a href="#/collections?category=festive" class="btn btn--outline" style="margin-top:16px;">Explore the Collection →</a>
      </div>
    </section>

    <!-- New Arrivals -->
    <section class="section section--large" id="new-arrivals">
      <div class="container">
        <p class="section-label reveal">Curated For You</p>
        <h2 class="section-title reveal">New Arrivals</h2>
        <div class="h-scroll" id="arrivals-scroll"></div>
      </div>
    </section>

    <!-- In the Spotlight -->
    <section class="section" id="spotlight">
      <div class="container">
        <p class="section-label reveal" style="text-align:center;">In The Spotlight</p>
        <h2 class="section-title section-title--center reveal">Curated Edits</h2>
        <div class="editorial-grid" id="editorial-grid"></div>
      </div>
    </section>

    <!-- Our Story -->
    <section class="split-section reveal" id="our-story">
      <div class="split-content">
        <p class="section-label">Our Story</p>
        <h2 class="section-title">12 Years of Craftsmanship</h2>
        <p>From the looms of Tamil Nadu to your wardrobe — every piece at Oyil Boutique tells a story. Established in 2013 in the cultural heart of Madurai, we've spent over a decade perfecting the art of bridal and ethnic fashion.</p>
        <p>Our journey is woven with dedication, tradition, and an unwavering commitment to quality. Each garment carries the legacy of master artisans and the dreams of countless brides.</p>
        <a href="#/about" class="btn btn--outline-dark" style="align-self:flex-start;margin-top:8px;">Our Story →</a>
      </div>
      <div class="split-media">
        <img src="/images/editorial/about-hero.png" alt="Behind the scenes at Oyil Boutique — handloom weaving" loading="lazy" />
        <div class="play-button" id="story-play-btn" aria-label="Play our story video">
          <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="newsletter-strip reveal" id="newsletter">
      <div class="container" style="max-width:700px;">
        <h3>Enter the World of Oyil Boutique</h3>
        <p style="color:var(--color-text-light);margin-bottom:var(--space-md);font-size:0.9rem;">Subscribe for New Arrivals, Exclusive Offers & Style Inspiration</p>
        <form class="newsletter-form" id="newsletter-form">
          <input type="email" placeholder="Your email address" required aria-label="Email address for newsletter" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </section>
  `;

  // Populate category grid
  const categoryGrid = page.querySelector('#category-grid');
  categories.forEach((cat, i) => {
    const tile = document.createElement('a');
    tile.href = `#/collections?category=${cat.slug}`;
    tile.className = `category-tile reveal reveal-delay-${(i % 3) + 1}`;
    tile.innerHTML = `
      <img src="${cat.image}" alt="${cat.name}" loading="lazy" />
      <div class="category-tile-overlay">
        <span class="category-tile-label">${cat.name}</span>
      </div>
    `;
    categoryGrid.appendChild(tile);
  });

  // Populate new arrivals
  const arrivalsScroll = page.querySelector('#arrivals-scroll');
  products.slice(0, 8).forEach(product => {
    const card = document.createElement('a');
    card.href = `#/product/${product.id}`;
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-card-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy" />
        <div class="product-card-wishlist">
          <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
        </div>
      </div>
      <div class="product-card-info">
        <p class="product-card-name">${product.name}</p>
        <p class="product-card-price">₹${product.price.toLocaleString('en-IN')}</p>
      </div>
    `;
    arrivalsScroll.appendChild(card);
  });

  // Populate editorial grid
  const editorialGrid = page.querySelector('#editorial-grid');
  spotlightItems.forEach((item, i) => {
    const tile = document.createElement('div');
    tile.className = `editorial-tile reveal reveal-delay-${(i % 4) + 1}`;
    tile.innerHTML = `
      <img src="${item.image}" alt="${item.name}" loading="lazy" />
      <div class="editorial-tile-overlay">
        <span class="editorial-tile-label">${item.name}</span>
      </div>
    `;
    editorialGrid.appendChild(tile);
  });

  // Newsletter form handler
  setTimeout(() => {
    const form = page.querySelector('#newsletter-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = form.querySelector('input');
        input.value = '';
        const btn = form.querySelector('button');
        btn.textContent = 'Subscribed ✓';
        btn.style.background = 'var(--color-accent)';
        btn.style.borderColor = 'var(--color-accent)';
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3000);
      });
    }
  }, 100);

  return page;
}
