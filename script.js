// All JavaScript code from website/script.js
// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('hidden');
  });
}

// Close mobile menu when a link is clicked
const mobileMenuLinks = mobileMenu.querySelectorAll('a');
mobileMenuLinks.forEach(link => {
  link.addEventListener('click', function() {
    mobileMenu.classList.add('hidden');
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Navbar background change on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', function() {
  if (window.scrollY > 100) {
    navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
  } else {
    navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
  }
});

// Contact Form Handler
function handleContactForm(event) {
  event.preventDefault();
  
  const name = event.target.name.value.trim();
  const email = event.target.email.value.trim();
  const store = event.target.store.value.trim();
  const message = event.target.message.value.trim();
  
  // Validate form
  if (!name || !email || !message) {
    alert('Please fill in all required fields!');
    return;
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address!');
    return;
  }
  
  // Create mailto link
  const subject = 'New Service Inquiry from ' + name;
  const body = `Name: ${name}\nEmail: ${email}\nStore/Platform: ${store}\n\nMessage:\n${message}`;
  const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open mail client
  window.location.href = mailtoLink;
  
  // Reset form
  event.target.reset();
}

// Add animation to elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements with fade-in animation
document.querySelectorAll('section').forEach(section => {
  section.style.opacity = '0';
  section.style.transform = 'translateY(20px)';
  section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(section);
});

// Portfolio hover effect (optional enhancement)
document.querySelectorAll('.group').forEach(item => {
  item.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-8px)';
  });
  
  item.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// Service card hover animation
document.querySelectorAll('.group').forEach(card => {
  card.style.transition = 'all 0.3s ease';
});

// Dynamic year in footer
document.addEventListener('DOMContentLoaded', function() {
  const yearElement = document.querySelector('p:contains("© 2024")');
  if (yearElement) {
    const currentYear = new Date().getFullYear();
    yearElement.textContent = `© ${currentYear} Muhammad Kamran. All rights reserved.`;
  }
});

// Tab Navigation (if needed for future expansion)
function openTab(tabName) {
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tab => {
    tab.style.display = 'none';
  });
  
  const tabElement = document.getElementById(tabName);
  if (tabElement) {
    tabElement.style.display = 'block';
  }
}

// Add scroll spy to navigation
window.addEventListener('scroll', function() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('nav a');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').slice(1) === current) {
      link.classList.add('active');
      link.style.color = '#2563eb';
    } else {
      link.style.color = '';
    }
  });
});

// Lazy loading for images (if added in future)
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => imageObserver.observe(img));
}

// Counter Animation (for statistics - optional)
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);
  
  const counter = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target;
      clearInterval(counter);
    } else {
      element.textContent = Math.floor(current);
    }
  }, 16);
}

// Form submission analytics (optional - for tracking)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    // You can add analytics tracking here
    console.log('Contact form submitted');
  });
}

// Print friendly styles
window.addEventListener('beforeprint', function() {
  document.body.classList.add('print-mode');
});

window.addEventListener('afterprint', function() {
  document.body.classList.remove('print-mode');
});

// Keyboard shortcuts (optional)
document.addEventListener('keydown', function(event) {
  // Press 'C' to scroll to contact section
  if (event.key === 'c' || event.key === 'C') {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
});

// Performance monitoring
window.addEventListener('load', function() {
  if (performance && performance.timing) {
    const pageLoadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Page load time: ' + pageLoadTime + 'ms');
  }
});

// Prevent console errors in production
window.addEventListener('error', function(event) {
  // Could send error to logging service
  console.error('Error occurred:', event.error);
});
