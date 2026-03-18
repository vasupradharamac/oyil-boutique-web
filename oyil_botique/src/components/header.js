// Header component with announcement bar, navigation, and sticky header
export function renderHeader() {
  const header = document.getElementById('header-root');

  header.innerHTML = `
    <header class="site-header" id="site-header">
      <div class="announcement-bar">
        <span>Summer Sale</span> — Up to 40% Off &nbsp;|&nbsp; Free Shipping on Orders above ₹999
      </div>
      <div class="header-main">
        <nav class="header-nav">
          <a href="#/collections">Collections</a>
          <a href="#/collections?category=bridal">Bridal</a>
          <a href="#/collections?category=festive">Festive</a>
        </nav>

        <div class="header-logo">
          <a href="#/">Oyil Boutique</a>
        </div>

        <div class="header-right" style="display:flex;align-items:center;gap:12px;">
          <nav class="header-nav" style="margin-right:8px;">
            <a href="#/about">About Us</a>
            <a href="#/book-appointment">Book Appointment</a>
            <a href="#/contact">Contact</a>
          </nav>
          <div class="header-icons">
            <button aria-label="Search" id="search-btn">
              <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <button aria-label="Wishlist" id="wishlist-btn">
              <svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </button>
            <button aria-label="Shopping Cart" id="cart-btn">
              <svg viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            </button>
            <button aria-label="Account" id="account-btn">
              <svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </button>
          </div>
          <div class="hamburger" id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </header>

    <div class="mobile-nav-overlay" id="mobile-nav">
      <a href="#/">Home</a>
      <a href="#/collections">Collections</a>
      <a href="#/collections?category=bridal">Bridal</a>
      <a href="#/collections?category=festive">Festive</a>
      <a href="#/about">About Us</a>
      <a href="#/book-appointment">Book Appointment</a>
      <a href="#/contact">Contact</a>
    </div>
  `;

  // Sticky header on scroll
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
      if (window.scrollY > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
    lastScroll = window.scrollY;
  });

  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobile-nav');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileNav.classList.toggle('open');
    document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
  });

  // Close mobile nav on link click
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileNav.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}
