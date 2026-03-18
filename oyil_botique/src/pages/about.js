export function AboutPage() {
  const page = document.createElement('div');
  page.className = 'about-page';

  page.innerHTML = `
    <!-- About Hero -->
    <section class="about-hero">
      <img src="/images/editorial/about-hero.png" alt="Handloom weaving at Oyil Boutique — preserving Indian textile heritage" loading="eager" />
      <div class="hero-overlay"></div>
      <div class="about-hero-content">
        <h1>Our Story</h1>
        <p>Weaving Dreams Since 2013</p>
      </div>
    </section>

    <!-- Brand Story -->
    <section class="section section--large">
      <div class="container container--narrow" style="text-align:center;">
        <p class="section-label reveal">Heritage & Craftsmanship</p>
        <h2 class="section-title section-title--center reveal">A Legacy of Elegance</h2>
        <div class="reveal" style="max-width:750px;margin:0 auto;">
          <p style="color:var(--color-text-light);line-height:2;margin-bottom:var(--space-md);font-size:1rem;">
            Born in the cultural heart of Madurai, Tamil Nadu, Oyil Boutique was founded in 2013 with a singular vision — to bring the finest Indian ethnic fashion to women who appreciate the beauty of tradition blended with contemporary elegance.
          </p>
          <p style="color:var(--color-text-light);line-height:2;margin-bottom:var(--space-md);font-size:1rem;">
            Our name, "Oyil," draws from the graceful Tamil dance form, embodying the fluidity, beauty, and artistic expression that defines our brand. Every garment we curate tells a story — of skilled artisans, of time-honored techniques passed down through generations, and of the rich textile heritage of South India.
          </p>
          <p style="color:var(--color-text-light);line-height:2;font-size:1rem;">
            From handpicked Kanchipuram silks to contemporary designer salwars, from bridal masterpieces to everyday elegance — we believe every woman deserves to feel extraordinary. Our commitment to quality, authenticity, and personal service has made us a trusted name for hundreds of brides and fashion-conscious women across Tamil Nadu and beyond.
          </p>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="section" style="background:var(--color-bg-warm);">
      <div class="container">
        <div class="timeline reveal">
          <div class="timeline-item">
            <div class="timeline-year">2013</div>
            <p class="timeline-desc">Founded in the heart of Madurai, Tamil Nadu</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">12+</div>
            <p class="timeline-desc">Years of expertise in bridal & ethnic fashion</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">500+</div>
            <p class="timeline-desc">Brides dressed in our finest creations</p>
          </div>
          <div class="timeline-item">
            <div class="timeline-year">1000+</div>
            <p class="timeline-desc">Curated designs across all collections</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Craft -->
    <section class="split-section reveal">
      <div class="split-content">
        <p class="section-label">Our Craft</p>
        <h2 class="section-title">The Art of Indian Fashion</h2>
        <p>Every thread we select, every pattern we weave, every color we choose is a tribute to India's extraordinary textile traditions. From the silk looms of Kanchipuram to the chikankari workshops of Lucknow — we bring you the very best.</p>
        <p>Our in-house design team works closely with master artisans to create pieces that honor tradition while embracing modern silhouettes. The result? Fashion that transcends time.</p>
      </div>
      <div class="split-media">
        <img src="/images/editorial/about-hero.png" alt="The art of Indian textile craftsmanship" loading="lazy" />
        <div class="play-button" aria-label="Play craftsmanship video">
          <svg viewBox="0 0 24 24"><polygon points="5 3 19 12 5 21 5 3"/></svg>
        </div>
      </div>
    </section>

    <!-- Store Details -->
    <section class="section section--large">
      <div class="container container--narrow" style="text-align:center;">
        <p class="section-label reveal">Visit Us</p>
        <h2 class="section-title section-title--center reveal">Our Store</h2>
        <div class="reveal" style="max-width:600px;margin:0 auto;">
          <p style="color:var(--color-text-light);line-height:2;font-size:1rem;margin-bottom:var(--space-md);">
            We invite you to experience the world of Oyil Boutique in person. Step into our store and discover curated collections, personalized styling consultations, and the finest fabrics from across India.
          </p>
          <p style="font-size:1rem;margin-bottom:8px;">
            <strong>Reliance Building, 1, 2A</strong><br>
            Anna Nagar Main Road<br>
            Madurai, Tamil Nadu - 625020
          </p>
          <p style="color:var(--color-text-light);margin-bottom:var(--space-md);font-size:0.95rem;">
            Phone: <a href="tel:8524890839" style="color:var(--color-accent);">85248 90839</a>
          </p>
          <a href="#/book-appointment" class="btn btn--primary">Book an Appointment</a>
        </div>
      </div>
    </section>
  `;

  return page;
}
