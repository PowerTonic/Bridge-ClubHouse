/**
 * BRIDGE CLUBHOUSE - MAIN JAVASCRIPT
 * ===================================
 */

(function($) {
    'use strict';

    // ========================================
    // NAVIGATION
    // ========================================

    // Navbar scroll effect
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 100) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    // Mobile menu toggle
    $('.nav-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });

    // Close mobile menu when clicking a link
    $('.nav-link').on('click', function() {
        $('.nav-menu').removeClass('active');
        $('.nav-toggle').removeClass('active');
    });

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        const target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            $('html, body').animate({
                scrollTop: target.offset().top - 80
            }, 800, 'swing');
        }
    });

    // ========================================
    // HERO SLIDESHOW
    // ========================================

    let currentSlide = 0;
    const slides = $('.hero-slide');
    const slideCount = slides.length;
    const slideInterval = 5000; // 5 seconds

    function nextSlide() {
        slides.eq(currentSlide).removeClass('active');
        currentSlide = (currentSlide + 1) % slideCount;
        slides.eq(currentSlide).addClass('active');
    }

    // Auto-advance slideshow
    if (slideCount > 1) {
        setInterval(nextSlide, slideInterval);
    }

    // ========================================
    // SCROLL ANIMATIONS
    // ========================================

    function checkScroll() {
        $('.fade-in').each(function() {
            const elementTop = $(this).offset().top;
            const elementBottom = elementTop + $(this).outerHeight();
            const viewportTop = $(window).scrollTop();
            const viewportBottom = viewportTop + $(window).height();

            if (elementBottom > viewportTop && elementTop < viewportBottom) {
                $(this).addClass('visible');
            }
        });
    }

    $(window).on('scroll', checkScroll);
    $(document).ready(checkScroll);

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
            isPlaying = false;
        } else {
            bgMusic.play().catch(function(error) {
                console.log('Audio playback failed:', error);
            });
            $(this).find('.music-icon').html('<i class="fas fa-pause"></i>');
            isPlaying = true;
        }
    });

    // ========================================
    // IMAGE LAZY LOADING
    // ========================================

    $('img').on('load', function() {
        $(this).addClass('loaded');
    });

    // ========================================
    // PAGE LOAD ANIMATIONS
    // ========================================

    $(window).on('load', function() {
        $('body').addClass('loaded');
        checkScroll();
    });

    // ========================================
    // CONTACT FORM (if exists)
    // ========================================

    $('#contactForm').on('submit', function(e) {
        e.preventDefault();

        // Get form data
        const formData = {
            name: $('#name').val(),
            email: $('#email').val(),
            phone: $('#phone').val(),
            message: $('#message').val()
        };

        // Basic validation
        if (!formData.name || !formData.email || !formData.message) {
            alert('Please fill in all required fields.');
            return;
        }

        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            alert('Please enter a valid email address.');
            return;
        }

        // Show success message
        $('.form-success').fadeIn();
        this.reset();

        // Hide success message after 5 seconds
        setTimeout(function() {
            $('.form-success').fadeOut();
        }, 5000);
    });

    // ========================================
    // GALLERY LIGHTBOX (if on gallery page)
    // ========================================

    $('.gallery-item').on('click', function(e) {
        e.preventDefault();
        const imgSrc = $(this).find('img').attr('src');

        // Create lightbox
        const lightbox = $('<div class="lightbox"></div>');
        const lightboxImg = $('<img src="' + imgSrc + '">');
        const closeBtn = $('<span class="lightbox-close">&times;</span>');

        lightbox.append(closeBtn).append(lightboxImg);
        $('body').append(lightbox);

        // Fade in lightbox
        setTimeout(function() {
            lightbox.addClass('active');
        }, 10);

        // Close lightbox
        lightbox.on('click', function() {
            $(this).removeClass('active');
            setTimeout(function() {
                lightbox.remove();
            }, 300);
        });
    });

    // ========================================
    // PARALLAX EFFECT
    // ========================================

    $(window).on('scroll', function() {
        const scrolled = $(window).scrollTop();
        $('.hero-slideshow').css('transform', 'translateY(' + (scrolled * 0.5) + 'px)');
    });

    // ========================================
    // UTILITY FUNCTIONS
    // ========================================

    // Prevent default for empty links
    $('a[href="#"]').on('click', function(e) {
        e.preventDefault();
    });

    // Add smooth hover effects to images
    $('.split-image img, .amenity-image, .gallery-item img').hover(
        function() {
            $(this).css('transform', 'scale(1.05)');
        },
        function() {
            $(this).css('transform', 'scale(1)');
        }
    );

})(jQuery);
