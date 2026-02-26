/**
 * Lightweight UI Components - Tabs and Carousel
 * Replaces Flowbite functionality with vanilla JavaScript
 * Aligns with Nordic Minimal design system
 */

// ============================================================================
// TABS FUNCTIONALITY
// ============================================================================

class TabsComponent {
  constructor(tabElement) {
    this.tabElement = tabElement;
    this.tabs = tabElement.querySelectorAll('[role="tab"]');
    this.contentContainer = document.querySelector(
      tabElement.getAttribute('data-tabs-toggle')
    );

    if (!this.contentContainer) return;

    this.activeClasses = (tabElement.getAttribute('data-tabs-active-classes') || '').split(' ');
    this.inactiveClasses = (tabElement.getAttribute('data-tabs-inactive-classes') || '').split(' ');

    this.init();
  }

  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.selectTab(index));
      
      // Set first tab as active on initialization
      if (index === 0) {
        this.selectTab(index);
      }
    });
  }

  selectTab(index) {
    // Hide all tabs and remove active classes
    this.tabs.forEach((tab, i) => {
      const targetId = tab.getAttribute('data-tabs-target');
      const targetPanel = document.querySelector(targetId);

      if (i === index) {
        // Show this tab
        tab.setAttribute('aria-selected', 'true');
        this.activeClasses.forEach(cls => {
          if (cls) tab.classList.add(cls);
        });
        this.inactiveClasses.forEach(cls => {
          if (cls) tab.classList.remove(cls);
        });

        if (targetPanel) {
          targetPanel.classList.remove('hidden');
        }
      } else {
        // Hide other tabs
        tab.setAttribute('aria-selected', 'false');
        this.inactiveClasses.forEach(cls => {
          if (cls) tab.classList.add(cls);
        });
        this.activeClasses.forEach(cls => {
          if (cls) tab.classList.remove(cls);
        });

        if (targetPanel) {
          targetPanel.classList.add('hidden');
        }
      }
    });
  }
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
  // Initialize all tabs
  document.querySelectorAll('[role="tablist"][data-tabs-toggle]').forEach(tabElement => {
    new TabsComponent(tabElement);
  });

  // Initialize all carousels
  document.querySelectorAll('[data-carousel]').forEach(carouselElement => {
    new CarouselComponent(carouselElement);
  });
});
