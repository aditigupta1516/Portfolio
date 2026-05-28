document.addEventListener('DOMContentLoaded', () => {
  // --- Reveal on Scroll Animations ---
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        // Once revealed, no need to track it anymore
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(el => revealObserver.observe(el));

  // --- Active Nav Link Highlighting ---
  const sections = document.querySelectorAll('section, header');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const activeId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${activeId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    threshold: 0.5,
    rootMargin: '-20% 0px -60% 0px'
  });
  
  sections.forEach(sec => sectionObserver.observe(sec));

  // --- Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const navLinksList = document.getElementById('nav-links');
  
  if (mobileMenuBtn && navLinksList) {
    mobileMenuBtn.addEventListener('click', () => {
      const isVisible = navLinksList.style.display === 'flex';
      if (isVisible) {
        navLinksList.style.display = '';
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
      } else {
        navLinksList.style.display = 'flex';
        navLinksList.style.flexDirection = 'column';
        navLinksList.style.position = 'absolute';
        navLinksList.style.top = '70px';
        navLinksList.style.left = '0';
        navLinksList.style.width = '100%';
        navLinksList.style.background = 'rgba(15, 23, 42, 0.95)';
        navLinksList.style.border = '1px solid var(--border-color)';
        navLinksList.style.borderRadius = '20px';
        navLinksList.style.padding = '20px';
        navLinksList.style.gap = '16px';
        mobileMenuBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
      }
    });
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
          navLinksList.style.display = '';
          mobileMenuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
      });
    });
  }

  // --- Projects Categorization Filter ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active filter button style
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filterValue = btn.getAttribute('data-filter');
      
      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filterValue === 'all' || categories.includes(filterValue)) {
          card.style.display = '';
          // Re-trigger animation properties
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 3D Interactive Tilt Effect for Photo Card ---
  const photoCard = document.querySelector('.interactive-photo-card');
  
  if (photoCard) {
    photoCard.addEventListener('mousemove', (e) => {
      const rect = photoCard.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position inside element
      const y = e.clientY - rect.top;  // y position inside element
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // Calculate rotation (-15 to 15 degrees max)
      const rotateX = ((centerY - y) / centerY) * 15;
      const rotateY = ((x - centerX) / centerX) * 15;
      
      photoCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });
    
    photoCard.addEventListener('mouseleave', () => {
      photoCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      photoCard.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    });
    
    photoCard.addEventListener('mouseenter', () => {
      photoCard.style.transition = 'none';
    });
  }

  // --- Interactive Form Submit Action ---
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Visual feedback for successful message
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.innerHTML;
      
      submitBtn.innerHTML = '<i class="fa-solid fa-circle-check"></i> Sent Successfully!';
      submitBtn.style.background = 'linear-gradient(90deg, #10b981, #059669)';
      submitBtn.style.boxShadow = '0 0 25px -5px rgba(16, 185, 129, 0.4)';
      submitBtn.disabled = true;
      
      // Reset form
      contactForm.reset();
      
      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.style.background = '';
        submitBtn.style.boxShadow = '';
        submitBtn.disabled = false;
      }, 3500);
    });
  }
});
