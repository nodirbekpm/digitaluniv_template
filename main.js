// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  console.log('DigitalUniv Landing Page Loading...');
  
  // Mobile Navigation Toggle
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
      }
    });
  }

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const headerOffset = 80;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar background change on scroll
  let lastScrollY = window.scrollY;
  
  window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScrollY = window.scrollY;
    
    if (navbar) {
      if (currentScrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
      } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
      }
    }
    
    lastScrollY = currentScrollY;
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
      }
    });
  }, observerOptions);

  // Observe all elements with data-aos attribute
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });

  // Counter animation for statistics
  const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    counters.forEach(counter => {
      const target = parseInt(counter.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      const increment = target / (duration / 16); // 60fps
      let current = 0;
      let hasAnimated = false;
      
      const updateCounter = () => {
        if (hasAnimated) return;
        hasAnimated = true;
        
        const animate = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current).toLocaleString();
            requestAnimationFrame(animate);
          } else {
            counter.textContent = target.toLocaleString();
          }
        };
        animate();
      };
      
      // Start animation when element is visible
      const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !hasAnimated) {
            updateCounter();
          }
        });
      }, { threshold: 0.5 });
      
      counterObserver.observe(counter);
    });
  };

  // Initialize counter animations
  animateCounters();

  // Chart bar animations
  const animateChartBars = () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    const heights = ['60%', '80%', '45%', '95%'];
    
    const chartObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          chartBars.forEach((bar, index) => {
            setTimeout(() => {
              bar.style.setProperty('--target-height', heights[index]);
              bar.style.height = heights[index];
              bar.classList.add('animate');
            }, index * 200);
          });
          chartObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer) {
      chartObserver.observe(chartContainer);
    }
  };

  // Initialize chart animations
  animateChartBars();

  // FAQ Accordion functionality
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.parentElement;
      const isActive = faqItem.classList.contains('active');
      
      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });
      
      // Open clicked item if it wasn't active
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // Testimonial slider functionality
  let currentTestimonial = 0;
  const testimonials = [
    {
      quote: "DigitalUniv transformed our KPI tracking completely. What used to take weeks now happens automatically.",
      author: "Dr. A. N.",
      title: "Dean of Academic Affairs, University X",
      image: "https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "The library management system has revolutionized how our students access resources. Queue times dropped by 80%.",
      author: "Prof. M. K.",
      title: "Head Librarian, Technical University",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      quote: "Course enrollment and credit management is now seamless. Our administrative workload reduced significantly.",
      author: "Dr. S. L.",
      title: "Registrar, State University",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const updateTestimonial = (index) => {
    const testimonialCard = document.querySelector('.testimonial-card');
    const testimonial = testimonials[index];
    
    if (testimonialCard && testimonial) {
      testimonialCard.innerHTML = `
        <div class="testimonial-content">
          <div class="testimonial-quote">
            "${testimonial.quote}"
          </div>
          <div class="testimonial-author">
            <img src="${testimonial.image}" alt="${testimonial.author}" loading="lazy">
            <div class="author-info">
              <div class="author-name">${testimonial.author}</div>
              <div class="author-title">${testimonial.title}</div>
            </div>
          </div>
          <div class="testimonial-rating">
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
          </div>
        </div>
      `;
      
      // Update nav dots
      document.querySelectorAll('.nav-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
  };

  // Initialize testimonial slider
  document.querySelectorAll('.nav-dot').forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentTestimonial = index;
      updateTestimonial(currentTestimonial);
    });
  });

  // Auto-rotate testimonials
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
  }, 5000);

  // Form handling for CTAs
  document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent.includes('Book') || btn.textContent.includes('Demo')) {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // In a real implementation, this would open a demo booking modal
        showNotification('Demo booking form would open here. Contact: support@digitaluniv.uz');
      });
    }
  });

  // Pricing card interactions
  document.querySelectorAll('.pricing-card .btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const planName = btn.closest('.pricing-card').querySelector('.pricing-title').textContent;
      
      if (btn.textContent.includes('Contact')) {
        showNotification(`Contact sales for ${planName} plan: support@digitaluniv.uz`);
      } else {
        showNotification(`Starting ${planName} plan signup process...`);
      }
    });
  });

  // Investment request deck button
  const investmentBtn = document.querySelector('#investment .btn-primary');
  if (investmentBtn) {
    investmentBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showNotification('Investor deck request form would open here. Contact: investors@digitaluniv.uz');
    });
  }

  // Subtle parallax effect for hero section
  let ticking = false;
  
  const updateParallax = () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.dashboard-mockup');
    if (parallaxElement && scrolled < window.innerHeight) {
      const speed = scrolled * 0.3;
      parallaxElement.style.transform = `perspective(1000px) rotateY(-5deg) rotateX(5deg) translateY(${speed}px)`;
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  // Lazy loading for images
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        img.classList.remove('loading');
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    imageObserver.observe(img);
  });

  // Notification system
  function showNotification(message) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      background: #005CFF;
      color: white;
      padding: 16px 24px;
      border-radius: 8px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
      z-index: 10000;
      max-width: 400px;
      font-size: 0.9rem;
      transform: translateX(100%);
      transition: transform 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove after 5 seconds
    setTimeout(() => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 5000);
  }

  // Handle window resize for responsive adjustments
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      // Recalculate any size-dependent elements
      const dashboardMockup = document.querySelector('.dashboard-mockup');
      if (dashboardMockup && window.innerWidth <= 768) {
        dashboardMockup.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
      }
    }, 250);
  });

  // Performance optimization: Debounce scroll events
  let scrollTimeout;
  const debouncedScroll = () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      // Any additional scroll-based functionality can go here
    }, 10);
  };

  window.addEventListener('scroll', debouncedScroll, { passive: true });

  console.log('DigitalUniv Landing Page Loaded Successfully! 🎓');
});

// Error handling for missing elements
window.addEventListener('error', (e) => {
  console.warn('Non-critical error:', e.message);
});

// Prevent layout shift by ensuring fonts are loaded
if ('fonts' in document) {
  document.fonts.ready.then(() => {
    document.body.classList.add('fonts-loaded');
  });
}