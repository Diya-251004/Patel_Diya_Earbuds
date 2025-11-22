(function() {

    const hotspotInfo = [
        {
            id: 'hotspot-1',
            title: 'Dynamic Audio Driver',
            description: 'Custom-tuned 12mm drivers produce rich bass and crystal-clear highs. Engineered for music lovers who demand premium sound quality.',
            image: 'images/driver.png'
        },
        {
            id: 'hotspot-2',
            title: 'Smart Touch Panel',
            description: 'Gesture-based controls let you manage playback and calls effortlessly. Customize touch commands through the companion app.',
            image: 'images/touch.png'
        },
        {
            id: 'hotspot-3',
            title: 'Adaptive Noise Control',
            description: 'Intelligent noise cancellation adapts to your environment. Switch between transparency mode and full noise blocking instantly.',
            image: 'images/anc.png'
        },
        {
            id: 'hotspot-4',
            title: 'Extended Power Cell',
            description: 'Advanced battery technology delivers 10 hours of continuous playback. Quick charge provides 2 hours of use in just 15 minutes.',
            image: 'images/battery.png'
        }
    ];

    function findHotspot(hotspotItem, idToFind) {
        return hotspotItem.id === idToFind;
    }

    function setupHotspots() {
        const infoBox = document.querySelector('#hotspotInfoContent');
        if (infoBox) {
            infoBox.innerHTML = '<p class="default-message">Click on the hotspots on the 3D model to learn more about each feature.</p>';
        }
    }

    function showInfo(infoBox) {
        infoBox.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        infoBox.style.opacity = '1';
        infoBox.style.transform = 'translateY(0)';
    }

    function showHotspotInfo(hotspotId) {
        const infoBox = document.querySelector('#hotspotInfoContent');
        let foundData = null;
        
        for (let i = 0; i < hotspotInfo.length; i++) {
            if (findHotspot(hotspotInfo[i], hotspotId)) {
                foundData = hotspotInfo[i];
                break;
            }
        }
        
        if (infoBox && foundData) {
            infoBox.innerHTML = '<img src="' + foundData.image + '" alt="' + foundData.title + '"><h3>' + foundData.title + '</h3><p>' + foundData.description + '</p>';
            infoBox.style.opacity = '0';
            infoBox.style.transform = 'translateY(10px)';
            
            setTimeout(function animateInfo() {
                showInfo(infoBox);
            }, 10);
        }
    }

    function handleHotspotClick(event) {
        const hotspotId = event.target.getAttribute('data-hotspot-id');
        if (hotspotId) {
            showHotspotInfo(hotspotId);
        }
    }

    function setupHotspotListeners() {
        const hotspotButtons = document.querySelectorAll('.Hotspot');
        for (let i = 0; i < hotspotButtons.length; i++) {
            hotspotButtons[i].addEventListener('click', handleHotspotClick);
        }
    }

    window.showHotspotInfo = showHotspotInfo;

    function toggleMenu() {
        const nav = document.querySelector('#mainNav');
        const menuButton = document.querySelector('#menuToggle');
        
        if (nav && menuButton) {
            nav.classList.toggle('open');
            menuButton.classList.toggle('open');
            
            const isOpen = nav.classList.contains('open');
            menuButton.setAttribute('aria-expanded', isOpen);
        }
    }

    function handleNavLinkClick() {
        const nav = document.querySelector('#mainNav');
        const menuButton = document.querySelector('#menuToggle');
        if (nav && menuButton) {
            nav.classList.remove('open');
            menuButton.classList.remove('open');
            menuButton.setAttribute('aria-expanded', 'false');
        }
    }

    function closeMenuOnLinkClick() {
        const navLinks = document.querySelectorAll('#mainNav a');
        for (let i = 0; i < navLinks.length; i++) {
            navLinks[i].addEventListener('click', handleNavLinkClick);
        }
    }

    function setupMenuToggle() {
        const menuButton = document.querySelector('#menuToggle');
        if (menuButton) {
            menuButton.addEventListener('click', toggleMenu);
        }
        closeMenuOnLinkClick();
    }

    setupHotspots();
    setupHotspotListeners();
    setupMenuToggle();

    function updateXrayDivisor(value) {
        const divisor = document.querySelector('#xrayDivisor');
        const xrayImage = document.querySelector('.xray-image-xray');
        if (divisor) {
            divisor.style.left = value + '%';
        }
        if (xrayImage) {
            xrayImage.style.clipPath = 'inset(0 ' + (100 - value) + '% 0 0)';
        }
    }

    function handleSliderInput(event) {
        const value = event.target.value;
        updateXrayDivisor(value);
    }

    function setupSliderListener() {
        const slider = document.querySelector('#xraySlider');
        if (slider) {
            slider.addEventListener('input', handleSliderInput);
        }
    }

    window.moveSlider = function(value) {
        updateXrayDivisor(value);
    };

    const totalFrames = 91;
    const frameArray = [];
    
    for (let i = 0; i < totalFrames; i++) {
        let frameNum = i;
        let frameString = '';
        
        if (frameNum < 10) {
            frameString = '000' + frameNum;
        } else if (frameNum < 100) {
            frameString = '00' + frameNum;
        } else {
            frameString = '0' + frameNum;
        }
        
        frameArray.push('animation/explode' + frameString + '.jpg');
    }

    function handleImageError(event) {
    }

    function preloadFirstFrame() {
        const frameElement = document.querySelector('#sequenceFrame');
        if (frameElement && frameArray.length > 0) {
            frameElement.addEventListener('error', handleImageError);
            frameElement.src = frameArray[0];
            frameElement.style.display = 'block';
        }
    }

    function initScrollAnimation() {
        const frameElement = document.querySelector('#sequenceFrame');
        if (!frameElement) {
            return;
        }

        let currentIndex = 0;

        if (frameArray.length > 0) {
            frameElement.src = frameArray[0];
        }

        gsap.registerPlugin(ScrollTrigger);

        ScrollTrigger.create({
            trigger: '.scroll-animation-section',
            start: 'top top',
            end: '+=300%',
            scrub: 1,
            pin: true,
            onUpdate: function updateFrame(self) {
                const progress = self.progress;
                const newIndex = Math.min(Math.floor(progress * (totalFrames - 1)), totalFrames - 1);
                
                if (newIndex !== currentIndex && newIndex >= 0 && newIndex < frameArray.length) {
                    currentIndex = newIndex;
                    frameElement.src = frameArray[currentIndex];
                }
            }
        });
    }

    function initXraySlider() {
        const slider = document.querySelector('#xraySlider');
        if (slider) {
            updateXrayDivisor(slider.value);
        }
    }

    function initScrollAnimations() {
        gsap.registerPlugin(ScrollTrigger);

        const introSection = document.querySelector('.intro-section');
        if (introSection) {
            gsap.from('.intro-content h1', {
                scrollTrigger: {
                    trigger: '.intro-section',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power2.out'
            });

            gsap.from('.intro-content p', {
                scrollTrigger: {
                    trigger: '.intro-section',
                    start: 'top 75%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.2,
                ease: 'power2.out'
            });
        }

        const xraySection = document.querySelector('.xray-section');
        if (xraySection) {
            gsap.from('.xray-title', {
                scrollTrigger: {
                    trigger: '.xray-section',
                    start: 'top 85%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power2.out'
            });

            gsap.from('.xray-comparison', {
                scrollTrigger: {
                    trigger: '.xray-wrapper',
                    start: 'top 80%',
                    toggleActions: 'play none none none'
                },
                opacity: 0,
                scale: 0.9,
                duration: 1,
                ease: 'power2.out'
            });
        }
    }

    initXraySlider();
    setupSliderListener();
    preloadFirstFrame();
    initScrollAnimation();
    initScrollAnimations();
})();
