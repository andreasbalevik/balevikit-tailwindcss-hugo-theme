/**
 * Lightweight UI Components — Carousel, Dropdown, Modal
 */

// ============================================================================
// MODAL FUNCTIONALITY
// ============================================================================

function setupModals() {
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.getElementById(this.getAttribute('data-modal-target'));
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  document.querySelectorAll('[data-modal-toggle]').forEach(closeBtn => {
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modal = document.getElementById(this.getAttribute('data-modal-toggle'));
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  document.querySelectorAll('[role="dialog"]').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        this.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      document.querySelectorAll('[role="dialog"]').forEach(modal => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
  });
}

// ============================================================================
// DROPDOWN FUNCTIONALITY
// ============================================================================

function setupDropdowns() {
  document.querySelectorAll('[data-dropdown-toggle]').forEach(button => {
    button.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdown = document.getElementById(this.getAttribute('data-dropdown-toggle'));
      if (dropdown) {
        dropdown.classList.toggle('hidden');
        this.setAttribute('aria-expanded', !dropdown.classList.contains('hidden'));
      }
    });
  });

  document.addEventListener('click', function(e) {
    document.querySelectorAll('[data-dropdown-toggle]').forEach(button => {
      const dropdown = document.getElementById(button.getAttribute('data-dropdown-toggle'));
      if (dropdown && !dropdown.classList.contains('hidden')) {
        if (!button.contains(e.target) && !dropdown.contains(e.target)) {
          dropdown.classList.add('hidden');
          button.setAttribute('aria-expanded', 'false');
        }
      }
    });
  });
}

// ============================================================================
// CAROUSEL FUNCTIONALITY
// ============================================================================

class CarouselComponent {
  constructor(element) {
    this.el = element;
    this.items = element.querySelectorAll('[data-carousel-item]');
    this.prevBtn = element.querySelector('[data-carousel-prev]');
    this.nextBtn = element.querySelector('[data-carousel-next]');
    this.indicators = element.querySelectorAll('[data-carousel-slide-to]');
    this.currentIndex = 0;
    this.peer = null;

    if (this.items.length === 0) return;
    this.init();
  }

  init() {
    this.showItem(0);
    if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prevSlide());
    if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.indicators.forEach((ind, i) => ind.addEventListener('click', () => this.showItem(i)));
  }

  showItem(index) {
    if (index < 0) this.currentIndex = this.items.length - 1;
    else if (index >= this.items.length) this.currentIndex = 0;
    else this.currentIndex = index;

    this.items.forEach(item => {
      item.classList.add('hidden');
      item.style.opacity = '0';
    });

    const current = this.items[this.currentIndex];
    current.classList.remove('hidden');
    current.offsetHeight; // trigger reflow for transition
    current.style.opacity = '1';
    current.style.transition = 'opacity 0.7s ease-in-out';

    this.indicators.forEach((ind, i) => {
      ind.classList.toggle('bg-primary', i === this.currentIndex);
      ind.classList.toggle('bg-gray-300', i !== this.currentIndex);
    });

    // Sync peer carousel (main <-> fullscreen)
    if (this.peer) {
      this.peer.currentIndex = this.currentIndex;
      this.peer.updateDisplay();
    }
  }

  updateDisplay() {
    this.items.forEach(item => {
      item.classList.add('hidden');
      item.style.opacity = '0';
    });

    const current = this.items[this.currentIndex];
    current.classList.remove('hidden');
    current.offsetHeight;
    current.style.opacity = '1';
    current.style.transition = 'opacity 0.7s ease-in-out';

    this.indicators.forEach((ind, i) => {
      ind.classList.toggle('bg-primary', i === this.currentIndex);
      ind.classList.toggle('bg-gray-300', i !== this.currentIndex);
    });
  }

  prevSlide() { this.showItem(this.currentIndex - 1); }
  nextSlide() { this.showItem(this.currentIndex + 1); }
}

// ============================================================================
// MOBILE MENU FUNCTIONALITY
// ============================================================================

function setupMobileMenu() {
  const button = document.querySelector('[data-collapse-toggle="navbar-sticky"]');
  const menu = document.getElementById('navbar-sticky');
  if (!button || !menu) return;

  function setMenu(open) {
    if (open) {
      menu.classList.remove('hidden');
      button.setAttribute('aria-expanded', 'true');
      button.setAttribute('aria-label', 'Lukk navigasjonsmeny');
      button.querySelector('.closed-icon')?.classList.add('hidden');
      button.querySelector('.open-icon')?.classList.remove('hidden');
    } else {
      menu.classList.add('hidden');
      button.setAttribute('aria-expanded', 'false');
      button.setAttribute('aria-label', 'Åpne navigasjonsmeny');
      button.querySelector('.closed-icon')?.classList.remove('hidden');
      button.querySelector('.open-icon')?.classList.add('hidden');
    }
  }

  let locked = false;

  button.addEventListener('click', function() {
    if (locked) return;
    setMenu(menu.classList.contains('hidden'));
  });

  menu.querySelectorAll('a[href]').forEach(function(link) {
    link.addEventListener('click', function() {
      if (window.innerWidth < 1024) {
        setMenu(false);
        locked = true;
        setTimeout(function() { locked = false; }, 400);
      }
    });
  });
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  setupMobileMenu();
  setupModals();
  setupDropdowns();

  // Initialize all carousels and store by ID
  const carousels = new Map();
  document.querySelectorAll('[data-carousel]').forEach(el => {
    const instance = new CarouselComponent(el);
    if (el.id) carousels.set(el.id, instance);
  });

  // Link main <-> fullscreen carousel pairs via data-carousel-sync
  carousels.forEach((instance, id) => {
    const peerId = instance.el.dataset.carouselSync;
    if (peerId && carousels.has(peerId)) {
      const peer = carousels.get(peerId);
      instance.peer = peer;
      peer.peer = instance;
    }
  });

  // Fullscreen open buttons
  document.querySelectorAll('[data-open-modal]').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();
      const modal = document.getElementById(btn.dataset.openModal);
      if (!modal) return;

      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';

      // Sync fullscreen to current main slide
      const fsId = modal.dataset.carouselFullscreenModal;
      const mainId = btn.closest('[data-carousel]')?.id;
      if (fsId && mainId && carousels.has(fsId) && carousels.has(mainId)) {
        carousels.get(fsId).currentIndex = carousels.get(mainId).currentIndex;
        carousels.get(fsId).updateDisplay();
      }
    });
  });

  // Fullscreen close buttons and backdrop click
  document.querySelectorAll('[data-close-modal]').forEach(el => {
    el.addEventListener('click', e => {
      // Only close if clicking the backdrop itself (not children), or if it's a button
      if (el.tagName === 'BUTTON' || e.target === el) {
        const modal = document.getElementById(el.dataset.closeModal);
        if (modal) {
          modal.classList.add('hidden');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // Keyboard navigation for open fullscreen modals
  document.addEventListener('keydown', e => {
    document.querySelectorAll('[data-carousel-fullscreen-modal]').forEach(modal => {
      if (modal.classList.contains('hidden')) return;
      const fsId = modal.dataset.carouselFullscreenModal;
      const fs = carousels.get(fsId);
      if (!fs) return;

      if (e.key === 'Escape') {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        fs.prevSlide();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        fs.nextSlide();
      }
    });
  });
});
