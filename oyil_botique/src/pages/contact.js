export function ContactPage() {
  const page = document.createElement('div');
  page.className = 'contact-page';

  page.innerHTML = `
    <div class="page-header">
      <div class="container">
        <p class="section-label">Get in Touch</p>
        <h1 class="section-title section-title--center">Contact Us</h1>
      </div>
    </div>

    <section class="section" style="padding-top:0;">
      <div class="container">
        <div class="contact-layout">
          <div class="reveal">
            <h3 style="margin-bottom:var(--space-md);">Send Us a Message</h3>
            <form class="contact-form" id="contact-form">
              <div>
                <label for="contact-name">Name</label>
                <input type="text" id="contact-name" placeholder="Your full name" required />
              </div>
              <div>
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" placeholder="your@email.com" required />
              </div>
              <div>
                <label for="contact-message">Message</label>
                <textarea id="contact-message" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" class="btn btn--primary">Send Message</button>
            </form>
          </div>

          <div class="reveal reveal-delay-2">
            <h3 style="margin-bottom:var(--space-lg);">Contact Information</h3>
            <div class="contact-info-item">
              <svg viewBox="0 0 24 24"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <div>
                <h5>Visit Our Store</h5>
                <p>Reliance Building, 1, 2A<br>Anna Nagar Main Road<br>Madurai, Tamil Nadu - 625020</p>
              </div>
            </div>
            <div class="contact-info-item">
              <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <div>
                <h5>Phone</h5>
                <p><a href="tel:8524890839">85248 90839</a></p>
              </div>
            </div>
            <div class="contact-info-item">
              <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              <div>
                <h5>Email</h5>
                <p><a href="mailto:support@oyilboutique.com">support@oyilboutique.com</a></p>
              </div>
            </div>
            <div class="contact-info-item">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <div>
                <h5>Working Hours</h5>
                <p>Mon – Sat: 10:00 AM – 8:00 PM<br>Sunday: 11:00 AM – 6:00 PM</p>
              </div>
            </div>

            <div class="contact-map reveal">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3930.2!2d78.12!3d9.92!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMadurai!5e0!3m2!1sen!2sin!4v1234567890"
                loading="lazy"
                title="Oyil Boutique Store Location - Madurai"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Contact form handler
  setTimeout(() => {
    const form = page.querySelector('#contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = form.querySelector('button[type="submit"]');
        btn.textContent = 'Message Sent ✓';
        btn.style.background = 'var(--color-accent)';
        btn.style.borderColor = 'var(--color-accent)';
        form.querySelectorAll('input, textarea').forEach(el => el.value = '');
        setTimeout(() => {
          btn.textContent = 'Send Message';
          btn.style.background = '';
          btn.style.borderColor = '';
        }, 3000);
      });
    }
  }, 100);

  return page;
}
