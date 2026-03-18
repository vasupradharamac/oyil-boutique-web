export function AppointmentPage() {
  const page = document.createElement('div');
  page.className = 'appointment-page';

  page.innerHTML = `
    <!-- Appointment Hero -->
    <section class="appointment-hero">
      <div class="container container--narrow">
        <p class="section-label reveal">Private Styling Experience</p>
        <h1 class="section-title section-title--center reveal" style="margin-bottom:var(--space-sm);">Book Your Appointment</h1>
        <p class="reveal" style="color:var(--color-text-light);max-width:600px;margin:0 auto;line-height:1.8;font-size:0.95rem;">
          Visit our Madurai store for a personalized styling session. Whether you're a bride-to-be, shopping for a festive occasion, or looking for everyday elegance — our expert stylists are here to help you find your perfect look.
        </p>
      </div>
    </section>

    <!-- Appointment Form -->
    <section class="section section--large">
      <div class="container">
        <div class="appointment-form-section reveal" id="appointment-form-wrapper">
          <form class="appointment-form" id="appointment-form">
            <div class="form-row">
              <div>
                <label for="appt-name">Full Name *</label>
                <input type="text" id="appt-name" placeholder="Your full name" required />
              </div>
              <div>
                <label for="appt-phone">Phone Number *</label>
                <input type="tel" id="appt-phone" placeholder="+91 XXXXX XXXXX" required />
              </div>
            </div>

            <div class="form-row">
              <div>
                <label for="appt-email">Email Address</label>
                <input type="email" id="appt-email" placeholder="your@email.com" />
              </div>
              <div>
                <label for="appt-occasion">Occasion *</label>
                <select id="appt-occasion" required>
                  <option value="" disabled selected>Select occasion</option>
                  <option value="bridal">Bridal Shopping</option>
                  <option value="festive">Festive / Wedding Guest</option>
                  <option value="casual">Casual / Everyday</option>
                  <option value="custom">Custom / Tailoring</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div class="form-row">
              <div>
                <label for="appt-date">Preferred Date *</label>
                <input type="date" id="appt-date" required />
              </div>
              <div>
                <label for="appt-time">Preferred Time *</label>
                <select id="appt-time" required>
                  <option value="" disabled selected>Select time</option>
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="12:00">12:00 PM</option>
                  <option value="13:00">1:00 PM</option>
                  <option value="14:00">2:00 PM</option>
                  <option value="15:00">3:00 PM</option>
                  <option value="16:00">4:00 PM</option>
                  <option value="17:00">5:00 PM</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="19:00">7:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label for="appt-message">Additional Notes</label>
              <textarea id="appt-message" placeholder="Any specific requirements or styles you're looking for..."></textarea>
            </div>

            <div style="text-align:center;margin-top:var(--space-sm);">
              <button type="submit" class="btn btn--primary" style="min-width:220px;">Book Appointment</button>
            </div>
          </form>

          <div class="appointment-success" id="appointment-success">
            <svg viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke-linecap="round" stroke-linejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke-linecap="round" stroke-linejoin="round"/></svg>
            <h2 style="margin-bottom:var(--space-sm);">Appointment Booked!</h2>
            <p style="color:var(--color-text-light);line-height:1.8;max-width:450px;margin:0 auto var(--space-md);">
              Thank you for booking with Oyil Boutique. We'll confirm your appointment via phone or email shortly.
            </p>
            <a href="#/" class="btn btn--outline-dark">Continue Shopping</a>
          </div>
        </div>

        <!-- Store Visit Info -->
        <div class="reveal" style="max-width:700px;margin:var(--space-2xl) auto 0;text-align:center;">
          <div class="pdp-divider" style="margin-bottom:var(--space-lg);"></div>
          <p class="section-label">Visit Our Store</p>
          <h3 style="margin-bottom:var(--space-md);">Store Information</h3>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;text-align:center;">
            <div>
              <svg viewBox="0 0 24 24" style="width:28px;height:28px;stroke:var(--color-accent);fill:none;stroke-width:1.5;margin-bottom:8px;"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              <p style="font-size:0.85rem;color:var(--color-text-light);">Reliance Building, 1, 2A<br>Anna Nagar Main Road<br>Madurai - 625020</p>
            </div>
            <div>
              <svg viewBox="0 0 24 24" style="width:28px;height:28px;stroke:var(--color-accent);fill:none;stroke-width:1.5;margin-bottom:8px;"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              <p style="font-size:0.85rem;color:var(--color-text-light);">Mon – Sat: 10 AM – 8 PM<br>Sunday: 11 AM – 6 PM</p>
            </div>
            <div>
              <svg viewBox="0 0 24 24" style="width:28px;height:28px;stroke:var(--color-accent);fill:none;stroke-width:1.5;margin-bottom:8px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              <p style="font-size:0.85rem;color:var(--color-text-light);"><a href="tel:8524890839">85248 90839</a></p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;

  // Form handler
  setTimeout(() => {
    const form = page.querySelector('#appointment-form');
    const success = page.querySelector('#appointment-success');

    // Set minimum date to today
    const dateInput = page.querySelector('#appt-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.setAttribute('min', today);
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        form.style.display = 'none';
        success.classList.add('show');
      });
    }
  }, 100);

  return page;
}
