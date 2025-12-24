/**
 * Snow Effect
 * Canvas-based snowfall particle animation
 */

class SnowEffect {
    constructor() {
        this.canvas = document.getElementById('snowCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.maxSnowflakes = 100;
        
        this.init();
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.resize());
    }
    
    /**
     * Initialize canvas and create snowflakes
     */
    init() {
        this.resize();
        this.createSnowflakes();
    }
    
    /**
     * Resize canvas to match window size
     */
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    /**
     * Create initial set of snowflakes
     */
    createSnowflakes() {
        this.snowflakes = [];
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.snowflakes.push(this.createSnowflake());
        }
    }
    
    /**
     * Create a single snowflake with random properties
     * @returns {Object} Snowflake object
     */
    createSnowflake() {
        return {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            wind: Math.random() * 0.5 - 0.25,
            opacity: Math.random() * 0.5 + 0.3
        };
    }
    
    /**
     * Update snowflake positions
     */
    update() {
        this.snowflakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += flake.wind;
            
            // Add gentle swaying motion
            flake.x += Math.sin(flake.y * 0.01) * 0.3;
            
            // Reset snowflake if it goes off screen (bottom)
            if (flake.y > this.canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * this.canvas.width;
            }
            
            // Wrap around horizontal edges
            if (flake.x > this.canvas.width) {
                flake.x = 0;
            } else if (flake.x < 0) {
                flake.x = this.canvas.width;
            }
        });
    }
    
    /**
     * Draw all snowflakes on canvas
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.snowflakes.forEach(flake => {
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            this.ctx.fill();
        });
    }
    
    /**
     * Animation loop
     */
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Initialize snow effect on DOM ready
document.addEventListener('DOMContentLoaded', () => {
    new SnowEffect();
});
