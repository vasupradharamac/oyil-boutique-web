import { products } from '../data/products.js';

export function CollectionsPage() {
  const page = document.createElement('div');
  page.className = 'collections-page';

  // Parse URL params for category filter
  const urlParams = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const activeCategory = urlParams.get('category') || '';

  const allCategories = ['Sarees', 'Salwars', 'Half Sarees', 'Kids', 'Festive Collections', 'Bridal Wear'];
  const fabrics = ['Kanchipuram Silk', 'Banarasi Silk', 'Kanjeevaram Silk', 'Georgette', 'Cotton Silk', 'Cotton', 'Velvet', 'Pure Silk', 'Silk Velvet', 'Silk'];
  const occasions = ['Wedding', 'Festive', 'Casual', 'Bridal'];
  const priceRanges = ['Under ₹5,000', '₹5,000 - ₹10,000', '₹10,000 - ₹20,000', 'Above ₹20,000'];

  page.innerHTML = `
    <div class="page-header">
      <div class="container">
        <p class="section-label">Our Collection</p>
        <h1 class="section-title section-title--center">${getCategoryTitle(activeCategory)}</h1>
      </div>
    </div>
    <div class="container">
      <div class="shop-layout">
        <aside class="filter-sidebar" id="filter-sidebar">
          <div class="filter-group open">
            <div class="filter-group-title" data-group="category">Category</div>
            <div class="filter-options">
              ${allCategories.map(cat => `
                <label class="filter-option">
                  <input type="checkbox" value="${cat}" name="category" ${isCategoryMatch(cat, activeCategory) ? 'checked' : ''} />
                  ${cat}
                </label>
              `).join('')}
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-group-title" data-group="fabric">Fabric</div>
            <div class="filter-options">
              ${fabrics.map(f => `
                <label class="filter-option">
                  <input type="checkbox" value="${f}" name="fabric" />
                  ${f}
                </label>
              `).join('')}
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-group-title" data-group="occasion">Occasion</div>
            <div class="filter-options">
              ${occasions.map(o => `
                <label class="filter-option">
                  <input type="checkbox" value="${o}" name="occasion" />
                  ${o}
                </label>
              `).join('')}
            </div>
          </div>
          <div class="filter-group">
            <div class="filter-group-title" data-group="price">Price Range</div>
            <div class="filter-options">
              ${priceRanges.map(p => `
                <label class="filter-option">
                  <input type="checkbox" value="${p}" name="price" />
                  ${p}
                </label>
              `).join('')}
            </div>
          </div>
        </aside>

        <div>
          <div class="product-grid" id="product-grid"></div>
          <div class="pagination" id="pagination"></div>
        </div>
      </div>
    </div>
    <div style="height:var(--space-2xl);"></div>
  `;

  // Filter toggle
  setTimeout(() => {
    page.querySelectorAll('.filter-group-title').forEach(title => {
      title.addEventListener('click', () => {
        title.parentElement.classList.toggle('open');
      });
    });

    // Filter functionality
    const checkboxes = page.querySelectorAll('.filter-sidebar input[type="checkbox"]');
    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => renderProducts());
    });

    renderProducts();
  }, 50);

  function renderProducts() {
    const grid = page.querySelector('#product-grid');
    const paginationEl = page.querySelector('#pagination');
    grid.innerHTML = '';

    // Get active filters
    const checkedCategories = [...page.querySelectorAll('input[name="category"]:checked')].map(c => c.value);
    const checkedFabrics = [...page.querySelectorAll('input[name="fabric"]:checked')].map(c => c.value);
    const checkedOccasions = [...page.querySelectorAll('input[name="occasion"]:checked')].map(c => c.value);

    let filtered = products.filter(p => {
      if (checkedCategories.length && !checkedCategories.includes(p.category)) return false;
      if (checkedFabrics.length && !checkedFabrics.includes(p.fabric)) return false;
      if (checkedOccasions.length && !checkedOccasions.includes(p.occasion)) return false;
      return true;
    });

    if (filtered.length === 0) {
      grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;padding:var(--space-2xl);color:var(--color-text-muted);font-size:1.1rem;">No products found matching your filters.</p>';
      paginationEl.innerHTML = '';
      return;
    }

    filtered.forEach((product, i) => {
      const card = document.createElement('a');
      card.href = `#/product/${product.id}`;
      card.className = `product-card reveal reveal-delay-${(i % 3) + 1}`;
      card.innerHTML = `
        <div class="product-card-image">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <div class="product-card-wishlist">
            <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
          </div>
        </div>
        <div class="product-card-info">
          <p class="product-card-name">${product.name}</p>
          <p class="product-card-price">
            ₹${product.price.toLocaleString('en-IN')}
            ${product.originalPrice ? `<span style="text-decoration:line-through;color:var(--color-text-muted);margin-left:8px;font-size:0.82rem;">₹${product.originalPrice.toLocaleString('en-IN')}</span>` : ''}
          </p>
        </div>
      `;
      grid.appendChild(card);
    });

    // Simple pagination display
    paginationEl.innerHTML = `
      <button class="active">1</button>
      <button>2</button>
      <button>3</button>
      <button>→</button>
    `;
  }

  return page;
}

function getCategoryTitle(slug) {
  const titles = {
    bridal: 'Bridal Collection',
    festive: 'Festive Collection',
    sarees: 'Sarees',
    salwars: 'Salwars',
    'half-sarees': 'Half Sarees',
    kids: 'Kids Collection',
  };
  return titles[slug] || 'All Collections';
}

function isCategoryMatch(categoryName, urlSlug) {
  if (!urlSlug) return false;
  const mapping = {
    bridal: 'Bridal Wear',
    festive: 'Festive Collections',
    sarees: 'Sarees',
    salwars: 'Salwars',
    'half-sarees': 'Half Sarees',
    kids: 'Kids',
  };
  return mapping[urlSlug] === categoryName;
}
