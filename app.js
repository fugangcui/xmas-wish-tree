/**
 * Christmas Wishing Tree - Main Application Logic
 * An interactive Christmas tree where users can make wishes and celebrate
 */

class ChristmasTree {
    constructor() {
        this.wishes = [];
        this.isLit = false;
        this.isMusicPlaying = false;
        this.selectedColor = '#e74c3c';
        
        // Ornament positions (relative to container)
        this.ornamentPositions = [
            // Layer 1
            { x: 85, y: 45, used: false },
            { x: 115, y: 50, used: false },
            { x: 135, y: 45, used: false },
            // Layer 2
            { x: 70, y: 85, used: false },
            { x: 100, y: 90, used: false },
            { x: 130, y: 85, used: false },
            { x: 150, y: 90, used: false },
            // Layer 3
            { x: 55, y: 140, used: false },
            { x: 85, y: 145, used: false },
            { x: 115, y: 140, used: false },
            { x: 145, y: 145, used: false },
            { x: 165, y: 140, used: false },
            // Layer 4
            { x: 40, y: 200, used: false },
            { x: 70, y: 205, used: false },
            { x: 100, y: 200, used: false },
            { x: 130, y: 205, used: false },
            { x: 160, y: 200, used: false },
            { x: 180, y: 205, used: false },
            // Layer 5
            { x: 25, y: 260, used: false },
            { x: 55, y: 265, used: false },
            { x: 85, y: 260, used: false },
            { x: 115, y: 265, used: false },
            { x: 145, y: 260, used: false },
            { x: 175, y: 265, used: false },
            { x: 195, y: 260, used: false },
        ];
        
        this.init();
    }
    
    /**
     * Initialize the application
     */
    init() {
        this.loadWishes();
        this.createLights();
        this.renderWishes();
        this.bindEvents();
        this.updateBlessingMessage();
        
        // Check if tree was previously lit
        if (localStorage.getItem('treeLit') === 'true') {
            this.isLit = true;
            document.querySelector('.tree').classList.add('lit');
            this.turnOnAllLights();
        }
    }
    
    /**
     * Create Christmas lights on the tree
     */
    createLights() {
        const container = document.getElementById('lightsContainer');
        const lightColors = ['red', 'yellow', 'blue', 'green'];
        
        // Light positions
        const lightPositions = [
            // Layer 1
            { x: 100, y: 30 }, { x: 120, y: 35 },
            // Layer 2
            { x: 75, y: 70 }, { x: 95, y: 75 }, { x: 115, y: 70 }, { x: 135, y: 75 }, { x: 145, y: 70 },
            // Layer 3
            { x: 55, y: 120 }, { x: 75, y: 125 }, { x: 95, y: 120 }, { x: 115, y: 125 },
            { x: 135, y: 120 }, { x: 155, y: 125 }, { x: 165, y: 120 },
            // Layer 4
            { x: 35, y: 175 }, { x: 55, y: 180 }, { x: 75, y: 175 }, { x: 95, y: 180 },
            { x: 115, y: 175 }, { x: 135, y: 180 }, { x: 155, y: 175 }, { x: 175, y: 180 }, { x: 185, y: 175 },
            // Layer 5
            { x: 20, y: 235 }, { x: 40, y: 240 }, { x: 60, y: 235 }, { x: 80, y: 240 },
            { x: 100, y: 235 }, { x: 120, y: 240 }, { x: 140, y: 235 }, { x: 160, y: 240 },
            { x: 180, y: 235 }, { x: 200, y: 240 },
        ];
        
        lightPositions.forEach((pos, index) => {
            const light = document.createElement('div');
            light.className = `light ${lightColors[index % 4]}`;
            light.style.left = `${pos.x}px`;
            light.style.top = `${pos.y}px`;
            light.style.animationDelay = `${Math.random() * 2}s`;
            container.appendChild(light);
        });
    }
    
    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Wish button
        document.getElementById('wishBtn').addEventListener('click', () => {
            this.openWishModal();
        });
        
        // Light up button
        document.getElementById('lightBtn').addEventListener('click', () => {
            this.lightUpTree();
        });
        
        // Fireworks button
        document.getElementById('fireworkBtn').addEventListener('click', () => {
            if (typeof fireworks !== 'undefined') {
                fireworks.launch(8);
            }
        });
        
        // Music control
        document.getElementById('musicBtn').addEventListener('click', () => {
            this.toggleMusic();
        });
        
        // Close modal button
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeWishModal();
        });
        
        // Close modal on backdrop click
        document.getElementById('wishModal').addEventListener('click', (e) => {
            if (e.target.id === 'wishModal') {
                this.closeWishModal();
            }
        });
        
        // Character count
        document.getElementById('wishInput').addEventListener('input', (e) => {
            document.getElementById('charCount').textContent = e.target.value.length;
        });
        
        // Color selection
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-option').forEach(b => {
                    b.classList.remove('selected');
                    b.setAttribute('aria-checked', 'false');
                });
                e.target.classList.add('selected');
                e.target.setAttribute('aria-checked', 'true');
                this.selectedColor = e.target.dataset.color;
            });
        });
        
        // Submit wish
        document.getElementById('submitWish').addEventListener('click', () => {
            this.submitWish();
        });
        
        // Keyboard events
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeWishModal();
            }
        });
    }
    
    /**
     * Open the wish modal with a random default blessing
     */
    openWishModal() {
        const input = document.getElementById('wishInput');
        const charCount = document.getElementById('charCount');
        
        // Get random default wish from i18n
        const defaultWishes = typeof i18n !== 'undefined' ? i18n.getDefaultWishes() : ['Merry Christmas! 🎄'];
        const randomWish = defaultWishes[Math.floor(Math.random() * defaultWishes.length)];
        input.value = randomWish;
        charCount.textContent = randomWish.length;
        
        document.getElementById('wishModal').classList.add('show');
        input.focus();
        input.select(); // Select text for easy editing
    }
    
    /**
     * Close the wish modal and reset input
     */
    closeWishModal() {
        document.getElementById('wishModal').classList.remove('show');
        document.getElementById('wishInput').value = '';
        document.getElementById('charCount').textContent = '0';
    }
    
    /**
     * Submit a new wish and add it to the tree
     */
    submitWish() {
        const input = document.getElementById('wishInput');
        const text = input.value.trim();
        
        if (!text) {
            input.focus();
            return;
        }
        
        // Find available position
        const availablePosition = this.ornamentPositions.find(p => !p.used);
        
        if (!availablePosition) {
            const msg = typeof i18n !== 'undefined' ? i18n.t('treeFull') : 'The tree is full of wishes! 🎄';
            alert(msg);
            return;
        }
        
        const wish = {
            id: Date.now(),
            text: text,
            color: this.selectedColor,
            position: availablePosition,
            createdAt: new Date().toISOString()
        };
        
        availablePosition.used = true;
        this.wishes.push(wish);
        this.saveWishes();
        this.renderOrnament(wish);
        this.closeWishModal();
        
        // Celebration effect
        if (typeof fireworks !== 'undefined') {
            setTimeout(() => {
                fireworks.launch(3);
            }, 300);
        }
    }
    
    /**
     * Render a single ornament on the tree
     * @param {Object} wish - The wish object to render
     */
    renderOrnament(wish) {
        const container = document.getElementById('ornamentsContainer');
        
        const ornament = document.createElement('div');
        ornament.className = 'ornament';
        ornament.style.backgroundColor = wish.color;
        ornament.style.left = `${wish.position.x}px`;
        ornament.style.top = `${wish.position.y}px`;
        ornament.dataset.wishId = wish.id;
        ornament.setAttribute('role', 'button');
        ornament.setAttribute('tabindex', '0');
        ornament.setAttribute('aria-label', 'View wish');
        
        // Mouse/touch events to show wish
        ornament.addEventListener('mouseenter', (e) => this.showWishTooltip(e, wish));
        ornament.addEventListener('mouseleave', () => this.hideWishTooltip());
        ornament.addEventListener('focus', (e) => this.showWishTooltip(e, wish));
        ornament.addEventListener('blur', () => this.hideWishTooltip());
        ornament.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.showWishTooltip(e, wish);
        });
        ornament.addEventListener('touchend', () => {
            setTimeout(() => this.hideWishTooltip(), 2000);
        });
        
        container.appendChild(ornament);
        
        // Entrance animation
        ornament.style.transform = 'scale(0)';
        ornament.style.transition = 'transform 0.3s ease-out';
        setTimeout(() => {
            ornament.style.transform = 'scale(1)';
        }, 50);
    }
    
    /**
     * Show wish tooltip
     * @param {Event} event - The triggering event
     * @param {Object} wish - The wish to display
     */
    showWishTooltip(event, wish) {
        const tooltip = document.getElementById('wishTooltip');
        tooltip.textContent = wish.text;
        tooltip.classList.add('show');
        tooltip.setAttribute('aria-hidden', 'false');
        
        const rect = event.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top - tooltipRect.height - 10;
        
        // Boundary checks
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    }
    
    /**
     * Hide the wish tooltip
     */
    hideWishTooltip() {
        const tooltip = document.getElementById('wishTooltip');
        tooltip.classList.remove('show');
        tooltip.setAttribute('aria-hidden', 'true');
    }
    
    /**
     * Render all saved wishes
     */
    renderWishes() {
        this.wishes.forEach(wish => {
            // Mark position as used
            const pos = this.ornamentPositions.find(
                p => p.x === wish.position.x && p.y === wish.position.y
            );
            if (pos) pos.used = true;
            
            this.renderOrnament(wish);
        });
    }
    
    /**
     * Light up the Christmas tree with animation
     */
    lightUpTree() {
        const btnText = document.getElementById('lightBtn').querySelector('[data-i18n="btnLight"]');
        
        if (this.isLit) {
            // Turn off lights
            this.isLit = false;
            localStorage.setItem('treeLit', 'false');
            document.querySelector('.tree').classList.remove('lit');
            this.turnOffAllLights();
            btnText.textContent = typeof i18n !== 'undefined' ? i18n.t('btnLight') : 'Light Up Tree';
            return;
        }
        
        this.isLit = true;
        localStorage.setItem('treeLit', 'true');
        
        const tree = document.querySelector('.tree');
        tree.classList.add('lighting');
        
        const lights = document.querySelectorAll('.light');
        const totalLights = lights.length;
        
        // Light up from bottom to top
        lights.forEach((light, index) => {
            const delay = (totalLights - index) * 80;
            setTimeout(() => {
                light.classList.add('on');
            }, delay);
        });
        
        // After lighting complete
        setTimeout(() => {
            tree.classList.remove('lighting');
            tree.classList.add('lit');
            btnText.textContent = typeof i18n !== 'undefined' ? i18n.t('btnLightOff') : 'Turn Off Lights';
            
            // Celebration fireworks
            if (typeof fireworks !== 'undefined') {
                fireworks.launch(5);
            }
        }, totalLights * 80 + 500);
    }
    
    /**
     * Turn on all lights immediately
     */
    turnOnAllLights() {
        document.querySelectorAll('.light').forEach(light => {
            light.classList.add('on');
        });
        const btnText = document.getElementById('lightBtn').querySelector('[data-i18n="btnLight"]');
        btnText.textContent = typeof i18n !== 'undefined' ? i18n.t('btnLightOff') : 'Turn Off Lights';
    }
    
    /**
     * Turn off all lights
     */
    turnOffAllLights() {
        document.querySelectorAll('.light').forEach(light => {
            light.classList.remove('on');
        });
    }
    
    /**
     * Toggle background music playback
     */
    toggleMusic() {
        const audio = document.getElementById('bgMusic');
        const btn = document.getElementById('musicBtn');
        const icon = document.getElementById('musicIcon');
        
        if (this.isMusicPlaying) {
            audio.pause();
            this.isMusicPlaying = false;
            btn.classList.remove('playing');
            icon.textContent = '🔇';
        } else {
            audio.play().catch(e => {
                console.log('Audio playback requires user interaction:', e);
            });
            this.isMusicPlaying = true;
            btn.classList.add('playing');
            icon.textContent = '🎵';
        }
    }
    
    /**
     * Save wishes to localStorage
     */
    saveWishes() {
        localStorage.setItem('christmasWishes', JSON.stringify(this.wishes));
    }
    
    /**
     * Load wishes from localStorage
     */
    loadWishes() {
        const saved = localStorage.getItem('christmasWishes');
        if (saved) {
            try {
                this.wishes = JSON.parse(saved);
            } catch (e) {
                this.wishes = [];
            }
        }
    }
    
    /**
     * Update the blessing message (handled by i18n)
     */
    updateBlessingMessage() {
        if (typeof i18n !== 'undefined') {
            i18n.updateBlessing();
        }
    }
}

// Initialize application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new ChristmasTree();
});
