document.addEventListener('DOMContentLoaded', () => {
    // Navbar Toggle
    const bar = document.getElementById('bar');
    const navbar = document.getElementById('navbar');
    const close = document.getElementById('close');

    if (bar) {
        bar.addEventListener('click', () => {
            navbar.classList.add('active');
        });
    }

    if (close) {
        close.addEventListener('click', () => {
            navbar.classList.remove('active');
        });
    }

    // Newsletter Form Submission
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            const email = document.getElementById('email').value;
            
            try {
                const response = await fetch('/api/newsletter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email })
                });
                
                if (response.ok) {
                    document.getElementById('confirmation-message').style.display = 'block';
                    newsletterForm.reset();
                }
            } catch (error) {
                console.error('Newsletter error:', error);
                alert('Failed to subscribe. Please try again.');
            }
        });
    }

    // Check if user is logged in
    const token = localStorage.getItem('token');
    const loginLink = document.querySelector('a[href="login.html"]');
    const signupLink = document.querySelector('a[href="signup.html"]');
    
    if (token && loginLink) {
        loginLink.innerHTML = '<i class="fas fa-tachometer-alt"></i>';
        loginLink.href = 'prot.html';
    }
    
    if (token && signupLink) {
        signupLink.innerHTML = '<i class="fas fa-sign-out-alt"></i>';
        signupLink.href = '#';
        signupLink.addEventListener('click', () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = 'index.html';
        });
    }
});

// ============= SERVICES SLIDER JAVASCRIPT =============

class ServicesSlider {
    constructor(container) {
        this.container = document.querySelector(container);
        this.track = this.container.querySelector('.slider-track');
        this.slides = this.container.querySelectorAll('.slider-slide');
        this.prevButton = this.container.querySelector('.slider-prev');
        this.nextButton = this.container.querySelector('.slider-next');
        this.dots = this.container.querySelectorAll('.slider-dot');
        this.progressBar = this.container.querySelector('.slider-progress');
        
        this.currentSlide = 0;
        this.isPlaying = true;
        this.autoplayInterval = null;
        this.touchStartX = 0;
        this.touchEndX = 0;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.showSlide(0);
        this.startAutoplay();
        this.addTouchSupport();
        this.animateSlideContent();
    }
    
    setupEventListeners() {
        this.prevButton.addEventListener('click', () => this.prevSlide());
        this.nextButton.addEventListener('click', () => this.nextSlide());
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => this.goToSlide(index));
        });
        
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.startAutoplay());
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
    }
    
    showSlide(index) {
        if (index < 0) index = this.slides.length - 1;
        if (index >= this.slides.length) index = 0;
        
        this.currentSlide = index;
        
        // Update track position
        const translateX = -index * 100;
        this.track.style.transform = `translateX(${translateX}%)`;
        
        // Update active dot
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        // Animate slide content
        this.animateSlideContent();
        
        // Reset progress bar
        if (this.progressBar) {
            this.progressBar.style.animation = 'none';
            void this.progressBar.offsetWidth; // Trigger reflow
            this.progressBar.style.animation = 'slideProgress 5s linear infinite';
        }
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    goToSlide(index) {
        this.showSlide(index);
    }
    
    startAutoplay() {
        this.isPlaying = true;
        this.autoplayInterval = setInterval(() => {
            if (this.isPlaying) {
                this.nextSlide();
            }
        }, 5000);
    }
    
    pauseAutoplay() {
        this.isPlaying = false;
        clearInterval(this.autoplayInterval);
        if (this.progressBar) {
            this.progressBar.style.animationPlayState = 'paused';
        }
    }
    
    addTouchSupport() {
        this.track.addEventListener('touchstart', (e) => {
            this.touchStartX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchmove', (e) => {
            this.touchEndX = e.touches[0].clientX;
        });
        
        this.track.addEventListener('touchend', () => {
            const diff = this.touchStartX - this.touchEndX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    this.prevSlide();
                }
            }
        });
    }
    
    animateSlideContent() {
        const currentSlideElement = this.slides[this.currentSlide];
        const elements = currentSlideElement.querySelectorAll('h2, p, .slider-icons, .btn');
        
        elements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 100 * index);
        });
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const slider = new ServicesSlider('.slider-wrapper');
});