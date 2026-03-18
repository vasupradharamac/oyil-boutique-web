import { products } from '../data/products.js';

export function ProductPage(params) {
  const page = document.createElement('div');
  page.className = 'product-page';

  const productId = parseInt(params.id);
  const product = products.find(p => p.id === productId);

  if (!product) {
    page.innerHTML = `
      <div class="page-header">
        <div class="container" style="text-align:center;min-height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center;">
          <h1>Product Not Found</h1>
          <p style="margin-top:var(--space-sm);color:var(--color-text-muted);">The product you're looking for doesn't exist.</p>
          <a href="#/collections" class="btn btn--outline-dark" style="margin-top:var(--space-md);">Back to Collections</a>
        </div>
      </div>
    `;
    return page;
  }

  // Get related products (same category, different id)
  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4);
  // If not enough, add random ones
  while (related.length < 4) {
    const remaining = products.filter(p => p.id !== product.id && !related.includes(p));
    if (remaining.length === 0) break;
    related.push(remaining[Math.floor(Math.random() * remaining.length)]);
  }

  page.innerHTML = `
    <div class="page-header" style="padding-bottom:0;">
      <div class="container">
        <p class="pdp-breadcrumb">
          <a href="#/">Home</a> / <a href="#/collections">Collections</a> / <a href="#/collections?category=${product.category.toLowerCase().replace(/\s+/g, '-')}">${product.category}</a> / ${product.name}
        </p>
      </div>
    </div>

    <section class="section" style="padding-top:var(--space-md);">
      <div class="container">
        <div class="pdp-layout">
          <div class="pdp-gallery reveal">
            <div class="pdp-main-image" id="pdp-main-image">
              <img src="${product.images[0]}" alt="${product.name}" />
            </div>
            <div class="pdp-thumbnails" id="pdp-thumbnails">
              ${product.images.map((img, i) => `
                <div class="pdp-thumbnail ${i === 0 ? 'active' : ''}" data-src="${img}">
                  <img src="${img}" alt="${product.name} view ${i + 1}" />
                </div>
              `).join('')}
            </div>
          </div>

          <div class="pdp-info reveal reveal-delay-2">
            <h1 class="pdp-name">${product.name}</h1>
            <p class="pdp-price">
              ₹${product.price.toLocaleString('en-IN')}
              ${product.originalPrice ? `<span style="text-decoration:line-through;color:var(--color-text-muted);margin-left:12px;font-size:0.95rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
            </p>

            <div class="pdp-divider"></div>

            <p style="color:var(--color-text-light);line-height:1.8;margin-bottom:var(--space-md);">${product.description}</p>

            ${product.sizes.length > 1 ? `
              <p class="pdp-label">Select Size</p>
              <div class="size-options">
                ${product.sizes.map((size, i) => `
                  <button class="size-btn ${i === 1 ? 'active' : ''}" data-size="${size}">${size}</button>
                `).join('')}
              </div>
            ` : '<p style="font-size:0.85rem;color:var(--color-text-muted);margin-bottom:var(--space-md);">One Size</p>'}

            <div class="pdp-actions">
              <button class="btn btn--primary" id="add-to-cart-btn">Add to Cart</button>
              <button class="btn btn--outline-dark" id="add-to-wishlist-btn">
                <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:currentColor;fill:none;stroke-width:1.5;margin-right:8px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                Wishlist
              </button>
            </div>

            <div class="pdp-divider"></div>

            <div class="pdp-details">
              <dl>
                <dt>Fabric</dt>
                <dd>${product.fabric}</dd>
                <dt>Occasion</dt>
                <dd>${product.occasion}</dd>
                <dt>Care Instructions</dt>
                <dd>${product.care}</dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- You May Also Like -->
    <section class="section section--large" id="related-products">
      <div class="container">
        <p class="section-label reveal" style="text-align:center;">You May Also Like</p>
        <h2 class="section-title section-title--center reveal">Recommended For You</h2>
        <div class="product-grid" style="grid-template-columns:repeat(4,1fr);" id="related-grid"></div>
      </div>
    </section>
  `;

  // Populate related products
  const relatedGrid = page.querySelector('#related-grid');
  related.forEach((p, i) => {
    const card = document.createElement('a');
    card.href = `#/product/${p.id}`;
    card.className = `product-card reveal reveal-delay-${(i % 4) + 1}`;
    card.innerHTML = `
      <div class="product-card-image">
        <img src="${p.image}" alt="${p.name}" loading="lazy" />
      </div>
      <div class="product-card-info">
        <p class="product-card-name">${p.name}</p>
        <p class="product-card-price">₹${p.price.toLocaleString('en-IN')}</p>
      </div>
    `;
    relatedGrid.appendChild(card);
  });

  // Interactivity
  setTimeout(() => {
    // Thumbnail click
    page.querySelectorAll('.pdp-thumbnail').forEach(thumb => {
      thumb.addEventListener('click', () => {
        page.querySelectorAll('.pdp-thumbnail').forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        const mainImg = page.querySelector('#pdp-main-image img');
        mainImg.src = thumb.dataset.src;
      });
    });

    // Size selection
    page.querySelectorAll('.size-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        page.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
      });
    });

    // Add to cart
    const cartBtn = page.querySelector('#add-to-cart-btn');
    if (cartBtn) {
      cartBtn.addEventListener('click', () => {
        cartBtn.textContent = 'Added ✓';
        cartBtn.style.background = 'var(--color-accent)';
        cartBtn.style.borderColor = 'var(--color-accent)';
        setTimeout(() => {
          cartBtn.textContent = 'Add to Cart';
          cartBtn.style.background = '';
          cartBtn.style.borderColor = '';
        }, 2000);
      });
    }

    // Add to wishlist
    const wishBtn = page.querySelector('#add-to-wishlist-btn');
    if (wishBtn) {
      wishBtn.addEventListener('click', () => {
        wishBtn.innerHTML = `
          <svg viewBox="0 0 24 24" style="width:16px;height:16px;stroke:var(--color-cta);fill:var(--color-cta);stroke-width:1.5;margin-right:8px;"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          Added
        `;
      });
    }
  }, 100);

  return page;
}
