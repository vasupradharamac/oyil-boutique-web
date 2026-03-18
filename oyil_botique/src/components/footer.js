// Footer component
export function renderFooter() {
  const footer = document.getElementById('footer-root');

  footer.innerHTML = `
    <footer class="site-footer">
      <div class="footer-grid">
        <div class="footer-col">
          <p class="footer-brand-tagline">"Tradition. Grace. Crafted for You."</p>
          <p>From the heart of Madurai, bringing 12+ years of expertise in bridal & ethnic fashion to your wardrobe.</p>
          <div class="footer-social">
            <a href="https://instagram.com" aria-label="Instagram" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
            </a>
            <a href="https://youtube.com" aria-label="YouTube" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </a>
            <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/></svg>
            </a>
          </div>
        </div>
        <div class="footer-col">
          <h4>Explore</h4>
          <a href="#/collections">Shop All</a>
          <a href="#/about">About Us</a>
          <a href="#/collections?category=festive">Collections</a>
          <a href="#/">FAQs</a>
        </div>
        <div class="footer-col">
          <h4>Customer Care</h4>
          <a href="#/contact">Contact Us</a>
          <a href="#">Returns & Exchange</a>
          <a href="#">Shipping Policy</a>
          <a href="#">Size Guide</a>
        </div>
        <div class="footer-col">
          <h4>Reach Us</h4>
          <p>Reliance Building, 1, 2A, Anna Nagar Main Road, Madurai, Tamil Nadu - 625020</p>
          <p style="margin-top:12px;">
            <strong>Phone:</strong> <a href="tel:8524890839">85248 90839</a><br>
            <strong>Email:</strong> <a href="mailto:support@oyilboutique.com">support@oyilboutique.com</a>
          </p>
        </div>
      </div>
      <div class="footer-bottom">
        <div class="container">
          © 2025 Oyil Boutique. All rights reserved. &nbsp;|&nbsp; <a href="#">Terms & Conditions</a> &nbsp;|&nbsp; <a href="#">Privacy Policy</a>
        </div>
      </div>
    </footer>
  `;
}
