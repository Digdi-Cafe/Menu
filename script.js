// Menu Data Structure
const menuData = [
    {
        id: "classic",
        title: "CLASSIC COFFEE",
        sizes: ["8oz", "12oz", "16oz"],
        items: [
            { name: "Americano", prices: ["₱80", "₱90", "₱110"] },
            { name: "Cafe Latte", prices: ["₱90", "₱100", "₱120"] },
            { name: "Cappuccino", prices: ["₱90", "₱100", "₱120"] }
        ]
    },
    {
        id: "specialty",
        title: "COFFEE SERIES",
        sizes: ["8oz", "12oz", "16oz"],
        items: [
            { name: "Caramel Macchiato", prices: ["₱125", "₱135", "₱155"] },
            { name: "Dark Mocha", prices: ["₱125", "₱135", "₱155"] },
            { name: "White Mocha", prices: ["₱125", "₱135", "₱155"] },
            { name: "Spanish Latte", prices: ["₱105", "₱115", "₱135"] },
            { name: "Hazelnut Latte", prices: ["₱125", "₱135", "₱155"] }
        ]
    },
    {
        id: "matcha",
        title: "MATCHA SERIES",
        sizes: ["8oz", "12oz", "16oz"],
        items: [
            { name: "Dirty Matcha", prices: ["₱110", "₱120", "₱140"] },
            { name: "Matcha Latte", prices: ["₱90", "₱100", "₱120"] }
        ]
    },
    {
        id: "addons",
        title: "ADD ONS",
        sizes: [],
        items: [
            { name: "Espresso Shot", prices: ["₱40"] },
            { name: "Flavored Syrup", prices: ["₱30"] }
        ]
    }
];

// DOM Elements
const main = document.querySelector('main');
const loader = document.querySelector('.loader');
const qrModal = document.getElementById('qrModal');
const showQrBtn = document.getElementById('showQr');
const closeQr = document.querySelector('.close-qr');

// Initialize Menu
function buildMenu() {
    menuData.forEach(section => {
        const sectionEl = document.createElement('section');
        sectionEl.className = 'menu-section';
        sectionEl.id = section.id;
        
        // Create header
        const header = document.createElement('div');
        header.className = 'section-header';
        
        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = section.title;
        
        header.appendChild(title);
        
        // Add sizes if they exist
        if (section.sizes.length > 0) {
            const sizesContainer = document.createElement('div');
            sizesContainer.className = 'sizes';
            
            section.sizes.forEach(size => {
                const sizeEl = document.createElement('span');
                sizeEl.className = 'size';
                sizeEl.textContent = size;
                sizesContainer.appendChild(sizeEl);
            });
            
            header.appendChild(sizesContainer);
        }
        
        sectionEl.appendChild(header);
        
        // Create items
        const itemsContainer = document.createElement('div');
        itemsContainer.className = 'menu-items';
        
        section.items.forEach(item => {
            const itemEl = document.createElement('div');
            itemEl.className = 'menu-item';
            
            const nameEl = document.createElement('div');
            nameEl.className = 'item-name';
            nameEl.textContent = item.name;
            
            const pricesEl = document.createElement('div');
            pricesEl.className = 'item-prices';
            
            item.prices.forEach(price => {
                const priceEl = document.createElement('div');
                priceEl.className = 'price';
                priceEl.textContent = price;
                pricesEl.appendChild(priceEl);
            });
            
            itemEl.appendChild(nameEl);
            itemEl.appendChild(pricesEl);
            itemsContainer.appendChild(itemEl);
        });
        
        sectionEl.appendChild(itemsContainer);
        main.appendChild(sectionEl);
    });
}

// Initialize Intersection Observer
function initObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.menu-section').forEach(section => {
        observer.observe(section);
    });
}

// Handle QR Modal
function setupQrModal() {
    showQrBtn.addEventListener('click', () => {
        qrModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    });
    
    closeQr.addEventListener('click', () => {
        qrModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === qrModal) {
            qrModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Add Haptic Feedback
function addHaptics() {
    const tapElements = document.querySelectorAll('.menu-item, .social-btn, .qr-btn, .float-call');
    
    tapElements.forEach(el => {
        el.addEventListener('click', () => {
            if ('vibrate' in navigator) {
                navigator.vibrate(10);
            }
        });
    });
}

// 3D Tilt Effect
function addTiltEffect() {
    const coffeeCup = document.querySelector('.coffee-cup');
    
    if (window.DeviceOrientationEvent) {
        window.addEventListener('deviceorientation', (e) => {
            const tilt = e.gamma; // -90 to 90
            const rotate = Math.min(Math.max(tilt * 0.3, -15), 15);
            coffeeCup.style.transform = `rotate(${rotate}deg)`;
        });
    }
}

// Initialize Everything
document.addEventListener('DOMContentLoaded', () => {
    buildMenu();
    initObserver();
    setupQrModal();
    addHaptics();
    addTiltEffect();
    
    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });
});

// Service Worker for Offline Use
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful');
            })
            .catch(err => {
                console.log('ServiceWorker registration failed: ', err);
            });
    });
}

// Add this to your existing script.js

// Theme Toggle Functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference or use light mode as default
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-mode', currentTheme === 'dark');
    icon.className = currentTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        
        // Optional: Add haptic feedback
        if ('vibrate' in navigator) {
            navigator.vibrate(10);
        }
    });
}

// Update the initialization function to include theme toggle
document.addEventListener('DOMContentLoaded', () => {
    buildMenu();
    initObserver();
    setupQrModal();
    addHaptics();
    addTiltEffect();
    setupThemeToggle(); // Add this line
    
    // Hide loader after content loads
    window.addEventListener('load', () => {
        setTimeout(() => {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.display = 'none';
            }, 500);
        }, 1500);
    });
});