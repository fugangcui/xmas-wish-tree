/**
 * Fireworks Effect
 * Canvas-based fireworks particle animation
 */

class FireworksEffect {
    constructor() {
        this.canvas = document.getElementById('fireworksCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.rockets = [];
        this.isAnimating = false;
        
        // Firework colors
        this.colors = [
            '#ff4444', '#ffdd44', '#44ff88', '#44aaff', 
            '#ff44aa', '#ffaa44', '#aa44ff', '#ffffff'
        ];
        
        this.init();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    /**
     * Initialize canvas
     */
    init() {
        this.resize();
    }
    
    /**
     * Resize canvas to match window size
     */
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    /**
     * Launch multiple fireworks
     * @param {number} count - Number of fireworks to launch
     */
    launch(count = 5) {
        for (let i = 0; i < count; i++) {
            setTimeout(() => {
                this.createRocket();
            }, i * 300);
        }
        
        if (!this.isAnimating) {
            this.isAnimating = true;
            this.animate();
        }
    }
    
    /**
     * Create a single rocket
     */
    createRocket() {
        const x = Math.random() * this.canvas.width * 0.6 + this.canvas.width * 0.2;
        const targetY = Math.random() * this.canvas.height * 0.3 + this.canvas.height * 0.1;
        
        this.rockets.push({
            x: x,
            y: this.canvas.height,
            targetY: targetY,
            speed: 8 + Math.random() * 4,
            color: this.colors[Math.floor(Math.random() * this.colors.length)],
            trail: []
        });
    }
    
    /**
     * Create explosion particles at position
     * @param {number} x - X coordinate
     * @param {number} y - Y coordinate
     * @param {string} color - Explosion color
     */
    explode(x, y, color) {
        const particleCount = 80 + Math.floor(Math.random() * 40);
        
        // Main explosion particles
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 / particleCount) * i;
            const speed = 2 + Math.random() * 4;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: color,
                alpha: 1,
                decay: 0.015 + Math.random() * 0.01,
                size: 2 + Math.random() * 2
            });
        }
        
        // Add sparkle effects
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 1 + Math.random() * 2;
            
            this.particles.push({
                x: x,
                y: y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                color: '#ffffff',
                alpha: 1,
                decay: 0.03 + Math.random() * 0.02,
                size: 1 + Math.random()
            });
        }
    }
    
    /**
     * Update rockets and particles
     */
    update() {
        // Update rockets
        for (let i = this.rockets.length - 1; i >= 0; i--) {
            const rocket = this.rockets[i];
            
            // Save trail positions
            rocket.trail.push({ x: rocket.x, y: rocket.y });
            if (rocket.trail.length > 10) {
                rocket.trail.shift();
            }
            
            rocket.y -= rocket.speed;
            
            // Explode when reaching target height
            if (rocket.y <= rocket.targetY) {
                this.explode(rocket.x, rocket.y, rocket.color);
                this.rockets.splice(i, 1);
            }
        }
        
        // Update particles
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.05; // Gravity
            p.vx *= 0.99; // Air resistance
            p.vy *= 0.99;
            p.alpha -= p.decay;
            
            if (p.alpha <= 0) {
                this.particles.splice(i, 1);
            }
        }
        
        // Stop animation if nothing to render
        if (this.particles.length === 0 && this.rockets.length === 0) {
            this.isAnimating = false;
        }
    }
    
    /**
     * Draw rockets and particles
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Draw rocket trails
        this.rockets.forEach(rocket => {
            // Trail
            rocket.trail.forEach((point, index) => {
                const alpha = index / rocket.trail.length * 0.5;
                this.ctx.beginPath();
                this.ctx.arc(point.x, point.y, 2, 0, Math.PI * 2);
                this.ctx.fillStyle = `rgba(255, 200, 100, ${alpha})`;
                this.ctx.fill();
            });
            
            // Rocket head
            this.ctx.beginPath();
            this.ctx.arc(rocket.x, rocket.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = rocket.color;
            this.ctx.fill();
        });
        
        // Draw particles
        this.particles.forEach(p => {
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.globalAlpha = p.alpha;
            this.ctx.fill();
            this.ctx.globalAlpha = 1;
        });
    }
    
    /**
     * Animation loop
     */
    animate() {
        if (!this.isAnimating) return;
        
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Create global fireworks instance
let fireworks;

document.addEventListener('DOMContentLoaded', () => {
    fireworks = new FireworksEffect();
});
