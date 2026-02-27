/**
 * Lightweight UI Components - Tabs and Carousel
 * Replaces Flowbite functionality with vanilla JavaScript
 * Aligns with Nordic Minimal design system
 */

// ============================================================================
// MODAL FUNCTIONALITY
// ============================================================================

function setupModals() {
  console.log('setupModals called');
  
  // Open modal when clicking open button
  document.querySelectorAll('[data-modal-target]').forEach(button => {
    console.log('Found open button:', button);
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal-target');
      const modal = document.getElementById(modalId);
      console.log('Opening modal:', modalId, modal);
      if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  // Close modal when clicking close button
  document.querySelectorAll('[data-modal-toggle]').forEach(closeBtn => {
    console.log('Found close button:', closeBtn);
    closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const modalId = this.getAttribute('data-modal-toggle');
      const modal = document.getElementById(modalId);
      console.log('Closing modal:', modalId, modal);
      if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Close modal when clicking on the backdrop (outside the content)
  document.querySelectorAll('[role="dialog"]').forEach(modal => {
    modal.addEventListener('click', function(e) {
      if (e.target === this) {
        console.log('Closing modal via backdrop');
        this.classList.add('hidden');
        document.body.style.overflow = '';
      }
    });
  });

  // Close all modals with escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      console.log('Closing modals via escape');
      document.querySelectorAll('[role="dialog"]').forEach(modal => {
        modal.classList.add('hidden');
        document.body.style.overflow = '';
      });
    }
  });
}

// ============================================================================
// CAROUSEL FUNCTIONALITY
// ============================================================================

class CarouselComponent {
  constructor(carouselElement) {
    this.carousel = carouselElement;
    this.items = carouselElement.querySelectorAll('[data-carousel-item]');
    this.prevBtn = carouselElement.querySelector('[data-carousel-prev]');
    this.nextBtn = carouselElement.querySelector('[data-carousel-next]');
    this.indicators = carouselElement.querySelectorAll('[data-carousel-slide-to]');

    if (this.items.length < 2) return;

    this.currentIndex = 0;
    this.init();
  }

  init() {
    // Show first item
    this.showItem(0);

    // Bind events
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.prevSlide());
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.nextSlide());
    }

    // Bind indicator clicks
    this.indicators.forEach((indicator, index) => {
      indicator.addEventListener('click', () => this.showItem(index));
    });

    // Keyboard navigation (for fullscreen carousel)
    document.addEventListener('keydown', (e) => {
      if (!this.carousel.closest('#fullscreen-modal')?.classList.contains('hidden')) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          this.prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          this.nextSlide();
        }
      }
    });
  }

  showItem(index) {
    // Clamp index
    if (index < 0) {
      this.currentIndex = this.items.length - 1;
    } else if (index >= this.items.length) {
      this.currentIndex = 0;
    } else {
      this.currentIndex = index;
    }

    // Hide all items
    this.items.forEach((item, i) => {
      item.classList.add('hidden');
      item.style.opacity = '0';
    });

    // Show current item with fade animation
    const currentItem = this.items[this.currentIndex];
    currentItem.classList.remove('hidden');
    // Trigger reflow to ensure transition plays
    currentItem.offsetHeight;
    currentItem.style.opacity = '1';
    currentItem.style.transition = 'opacity 0.7s ease-in-out';

    // Update indicators
    this.indicators.forEach((indicator, i) => {
      if (i === this.currentIndex) {
        indicator.classList.add('bg-[#e09a00]');
        indicator.classList.remove('bg-gray-300');
      } else {
        indicator.classList.remove('bg-[#e09a00]');
        indicator.classList.add('bg-gray-300');
      }
    });
  }

  prevSlide() {
    this.showItem(this.currentIndex - 1);
  }

  nextSlide() {
    this.showItem(this.currentIndex + 1);
  }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

document.addEventListener('DOMContentLoaded', function() {
  // Initialize modals
  setupModals();

  // Initialize all carousels
  document.querySelectorAll('[data-carousel]').forEach(carouselElement => {
    new CarouselComponent(carouselElement);
  });
});
