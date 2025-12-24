/**
 * 雪花飘落效果
 * 使用 Canvas 绘制雪花粒子
 */

class SnowEffect {
    constructor() {
        this.canvas = document.getElementById('snowCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.snowflakes = [];
        this.maxSnowflakes = 100;
        
        this.init();
        this.animate();
        
        // 监听窗口大小变化
        window.addEventListener('resize', () => this.resize());
    }
    
    init() {
        this.resize();
        this.createSnowflakes();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createSnowflakes() {
        this.snowflakes = [];
        for (let i = 0; i < this.maxSnowflakes; i++) {
            this.snowflakes.push(this.createSnowflake());
        }
    }
    
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
    
    update() {
        this.snowflakes.forEach(flake => {
            flake.y += flake.speed;
            flake.x += flake.wind;
            
            // 添加轻微的摆动效果
            flake.x += Math.sin(flake.y * 0.01) * 0.3;
            
            // 如果雪花飘出屏幕，重置到顶部
            if (flake.y > this.canvas.height) {
                flake.y = -10;
                flake.x = Math.random() * this.canvas.width;
            }
            
            // 水平边界处理
            if (flake.x > this.canvas.width) {
                flake.x = 0;
            } else if (flake.x < 0) {
                flake.x = this.canvas.width;
            }
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.snowflakes.forEach(flake => {
            this.ctx.beginPath();
            this.ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${flake.opacity})`;
            this.ctx.fill();
        });
    }
    
    animate() {
        this.update();
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// 页面加载后初始化雪花效果
document.addEventListener('DOMContentLoaded', () => {
    new SnowEffect();
});

