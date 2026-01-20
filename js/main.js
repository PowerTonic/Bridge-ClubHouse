/**
 * BRIDGE CLUBHOUSE - PREMIUM JAVASCRIPT
 * =====================================
 * Advanced animations, scroll effects, and premium interactions
 */

(function($) {
    'use strict';

    // ========================================
    // PREMIUM SCROLL ANIMATIONS
    // ========================================

    // Intersection Observer for scroll-triggered animations
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add stagger delay based on element position in view
                const staggerDelay = entry.target.dataset.stagger || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, staggerDelay * 100);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Observe all animated elements
    function initScrollAnimations() {
        const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in, .reveal-image');

        animatedElements.forEach((el, index) => {
            // Auto-assign stagger delays to grid items
            if (el.closest('.amenities-grid') || el.closest('.menu-grid')) {
                el.dataset.stagger = index % 4;
            }
            animationObserver.observe(el);
        });
    }

    // ========================================
    // PREMIUM PARALLAX EFFECTS
    // ========================================

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroSlideshow = document.querySelector('.hero-slideshow');
        const heroContent = document.querySelector('.hero-content');

        if (heroSlideshow && scrolled < window.innerHeight) {
            // Smooth parallax for hero background
            heroSlideshow.style.transform = `translateY(${scrolled * 0.4}px) scale(${1 + scrolled * 0.0002})`;

            // Fade and move hero content
            if (heroContent) {
                const opacity = Math.max(0, 1 - scrolled / (window.innerHeight * 0.6));
                const translateY = scrolled * 0.3;
                heroContent.style.opacity = opacity;
                heroContent.style.transform = `translateY(${translateY}px)`;
            }
        }

        // Parallax for split images
        document.querySelectorAll('.split-image img').forEach(img => {
            const rect = img.getBoundingClientRect();
            const inView = rect.top < window.innerHeight && rect.bottom > 0;

            if (inView) {
                const parallaxValue = (rect.top - window.innerHeight / 2) * 0.1;
                img.style.transform = `translateY(${parallaxValue}px) scale(1.08)`;
            }
        });

        ticking = false;
    }

    function requestParallaxUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // ========================================
    // NAVIGATION ENHANCEMENTS
    // ========================================

    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');

    function handleNavbarScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show navbar on scroll direction
        if (scrollTop > lastScrollTop && scrollTop > 500) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScrollTop = scrollTop;
    }

    // Mobile menu toggle with animation
    $('.nav-toggle').on('click', function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');
        $('body').toggleClass('menu-open');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').on('click', function() {
        $('.nav-menu').removeClass('active');
        $('.nav-toggle').removeClass('active');
        $('body').removeClass('menu-open');
    });

    // Smooth scrolling for anchor links with easing
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 1000, 'swing');
        }
    });

    // ========================================
    // HERO SLIDESHOW WITH SMOOTH TRANSITIONS
    // ========================================

    let currentSlide = 0;
    const slides = $('.hero-slide');
    const slideCount = slides.length;
    const slideInterval = 6000;

    function nextSlide() {
        const currentEl = slides.eq(currentSlide);
        currentSlide = (currentSlide + 1) % slideCount;
        const nextEl = slides.eq(currentSlide);

        // Smooth transition
        currentEl.removeClass('active');
        nextEl.addClass('active');

        // Add subtle zoom effect to active slide image
        nextEl.find('img').css('transform', 'scale(1.05)');
        setTimeout(() => {
            nextEl.find('img').css('transform', 'scale(1)');
        }, 100);
    }

    if (slideCount > 1) {
        setInterval(nextSlide, slideInterval);
    }

    // ========================================
    // MAGNETIC BUTTON EFFECT
    // ========================================

    function initMagneticButtons() {
        const buttons = document.querySelectorAll('.btn, .amenity-card');

        buttons.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                const strength = 0.15;
                this.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
            });

            btn.addEventListener('mouseleave', function() {
                this.style.transform = 'translate(0, 0)';
            });
        });
    }

    // ========================================
    // PREMIUM CURSOR EFFECTS
    // ========================================

    function initCursorEffects() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.className = 'cursor-dot';
        document.body.appendChild(cursorDot);

        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;

            // Instant dot movement
            cursorDot.style.left = mouseX + 'px';
            cursorDot.style.top = mouseY + 'px';
        });

        // Smooth cursor follow
        function animateCursor() {
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;

            cursorX += dx * 0.15;
            cursorY += dy * 0.15;

            cursor.style.left = cursorX + 'px';
            cursor.style.top = cursorY + 'px';

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor hover effects
        const hoverElements = document.querySelectorAll('a, button, .btn, .amenity-card, .nav-toggle');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('cursor-hover');
                cursorDot.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('cursor-hover');
                cursorDot.classList.remove('cursor-hover');
            });
        });
    }

    // ========================================
    // BACKGROUND MUSIC PLAYER
    // ========================================

    const musicPlayer = $('#musicPlayer');
    const bgMusic = $('#bgMusic')[0];
    let isPlaying = false;

    musicPlayer.on('click', function() {
        if (isPlaying) {
            bgMusic.pause();
            $(this).find('.music-icon').html('<i class="fas fa-music"></i>');
            $(this).removeClass('playing');
            isPlaying = false;
        } else {
            bgMusic.play().catch(function(error) {
                console.log('Audio playback failed:', error);
            });
            $(this).find('.music-icon').html('<i class="fas fa-pause"></i>');
            $(this).addClass('playing');
            isPlaying = true;
        }
    });

    // ========================================
    // SMOOTH REVEAL FOR SECTION HEADERS
    // ========================================

    function initSectionHeaderAnimations() {
        const headers = document.querySelectorAll('.section-header');

        headers.forEach(header => {
            const title = header.querySelector('.section-title');
            const subtitle = header.querySelector('.section-subtitle');

            if (title) {
                title.classList.add('fade-in');
                title.dataset.stagger = 0;
            }
            if (subtitle) {
                subtitle.classList.add('fade-in');
                subtitle.dataset.stagger = 1;
            }
        });
    }

    // ========================================
    // IMAGE LAZY LOADING WITH FADE
    // ========================================

    function initLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');

        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, {
            rootMargin: '100px'
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // ========================================
    // CONTACT FORM WITH ANIMATIONS
    // ========================================

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val()
        };

        if (!formData.name || !formData.email || !formData.message) {
            shakeElement(this);
            return;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            shakeElement($('#email')[0]);
            return;
        }

        // Success animation
        $(this).addClass('submitted');
        $('.form-success').fadeIn();
        this.reset();

        setTimeout(function() {
            $('.form-success').fadeOut();
        }, 5000);
    });

    function shakeElement(el) {
        el.classList.add('shake');
        setTimeout(() => el.classList.remove('shake'), 500);
    }

    // ========================================
    // GALLERY LIGHTBOX
    // ========================================

    $('.gallery-item, .amenity-card').on('click', function(e) {
        if ($(this).is('a[href]') && !$(this).hasClass('gallery-item')) return;

        if ($(this).hasClass('gallery-item')) {
            e.preventDefault();
            const imgSrc = $(this).find('img').attr('src');
            const title = $(this).find('.amenity-title').text() || '';

            const lightbox = $(`
                <div class="lightbox">
                    <div class="lightbox-content">
                        <span class="lightbox-close">&times;</span>
                        <img src="${imgSrc}" alt="${title}">
                        ${title ? `<p class="lightbox-title">${title}</p>` : ''}
                    </div>
                </div>
            `);

            $('body').append(lightbox);

            setTimeout(function() {
                lightbox.addClass('active');
            }, 10);

            lightbox.on('click', function(e) {
                if (e.target === this || $(e.target).hasClass('lightbox-close')) {
                    $(this).removeClass('active');
                    setTimeout(function() {
                        lightbox.remove();
                    }, 300);
                }
            });
        }
    });

    // ========================================
    // SCROLL PROGRESS INDICATOR
    // ========================================

    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrolled = (window.pageYOffset / scrollHeight) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    // ========================================
    // PAGE LOAD ANIMATIONS
    // ========================================

    $(window).on('load', function() {
        // Remove loading state
        $('body').addClass('loaded');

        // Trigger initial scroll check
        initScrollAnimations();

        // Initialize all premium effects
        setTimeout(() => {
            initSectionHeaderAnimations();
            initScrollAnimations();
        }, 100);
    });

    // ========================================
    // SCROLL EVENT LISTENERS
    // ========================================

    window.addEventListener('scroll', function() {
        requestParallaxUpdate();
        handleNavbarScroll();
    }, { passive: true });

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // Prevent context menu on images (optional luxury feature)
    $('img').on('contextmenu', function(e) {
        e.preventDefault();
    });

    // ========================================
    // INITIALIZE ON DOM READY
    // ========================================

    $(document).ready(function() {
        initScrollAnimations();
        initMagneticButtons();
        initScrollProgress();
        initLazyLoading();

        // Only init custom cursor on desktop
        if (window.innerWidth > 1024) {
            // initCursorEffects(); // Uncomment for custom cursor
        }

        // Add loaded class for initial animations
        setTimeout(() => {
            document.body.classList.add('dom-loaded');
        }, 100);
    });

})(jQuery);
