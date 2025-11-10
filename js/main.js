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

    window.showHotspotInfo = showHotspotInfo;

    setupHotspots();
})();
