/**
 * 许愿圣诞树 - 主逻辑
 */

class ChristmasTree {
    constructor() {
        this.wishes = [];
        this.isLit = false;
        this.isMusicPlaying = false;
        this.selectedColor = '#e74c3c';
        
        // 默认祝福语列表
        this.defaultWishes = [
            '愿新的一年健康平安，万事顺遂 🌟',
            '祝家人朋友幸福快乐，心想事成 ❤️',
            '愿2026年事业有成，财源广进 💰',
            '希望世界和平，人人幸福 🌍',
            '愿所爱之人都能平安喜乐 🎄',
            '新的一年要更加努力，实现梦想 ✨',
            '祝自己和家人身体健康 💪',
            '愿友情长存，爱情甜蜜 💕',
            '希望能遇见更好的自己 🌈',
            '愿所有的美好都如期而至 🎁',
            '祝学业进步，考试顺利 📚',
            '愿工作顺利，升职加薪 🚀',
            '希望能去更多地方旅行 ✈️',
            '愿每一天都充满阳光和希望 ☀️',
            '祝福所有人圣诞快乐，新年快乐 🎅',
        ];
        
        // 装饰球可放置的位置（相对于容器）
        this.ornamentPositions = [
            // 第一层
            { x: 85, y: 45, used: false },
            { x: 115, y: 50, used: false },
            { x: 135, y: 45, used: false },
            // 第二层
            { x: 70, y: 85, used: false },
            { x: 100, y: 90, used: false },
            { x: 130, y: 85, used: false },
            { x: 150, y: 90, used: false },
            // 第三层
            { x: 55, y: 140, used: false },
            { x: 85, y: 145, used: false },
            { x: 115, y: 140, used: false },
            { x: 145, y: 145, used: false },
            { x: 165, y: 140, used: false },
            // 第四层
            { x: 40, y: 200, used: false },
            { x: 70, y: 205, used: false },
            { x: 100, y: 200, used: false },
            { x: 130, y: 205, used: false },
            { x: 160, y: 200, used: false },
            { x: 180, y: 205, used: false },
            // 第五层
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
    
    init() {
        this.loadWishes();
        this.createLights();
        this.renderWishes();
        this.bindEvents();
        this.updateBlessingMessage();
        
        // 检查是否之前已点亮
        if (localStorage.getItem('treeLit') === 'true') {
            this.isLit = true;
            document.querySelector('.tree').classList.add('lit');
            this.turnOnAllLights();
        }
    }
    
    // 创建彩灯
    createLights() {
        const container = document.getElementById('lightsContainer');
        const lightColors = ['red', 'yellow', 'blue', 'green'];
        
        // 彩灯位置
        const lightPositions = [
            // 第一层
            { x: 100, y: 30 }, { x: 120, y: 35 },
            // 第二层
            { x: 75, y: 70 }, { x: 95, y: 75 }, { x: 115, y: 70 }, { x: 135, y: 75 }, { x: 145, y: 70 },
            // 第三层
            { x: 55, y: 120 }, { x: 75, y: 125 }, { x: 95, y: 120 }, { x: 115, y: 125 },
            { x: 135, y: 120 }, { x: 155, y: 125 }, { x: 165, y: 120 },
            // 第四层
            { x: 35, y: 175 }, { x: 55, y: 180 }, { x: 75, y: 175 }, { x: 95, y: 180 },
            { x: 115, y: 175 }, { x: 135, y: 180 }, { x: 155, y: 175 }, { x: 175, y: 180 }, { x: 185, y: 175 },
            // 第五层
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
    
    // 绑定事件
    bindEvents() {
        // 许愿按钮
        document.getElementById('wishBtn').addEventListener('click', () => {
            this.openWishModal();
        });
        
        // 点亮按钮
        document.getElementById('lightBtn').addEventListener('click', () => {
            this.lightUpTree();
        });
        
        // 烟花按钮
        document.getElementById('fireworkBtn').addEventListener('click', () => {
            if (typeof fireworks !== 'undefined') {
                fireworks.launch(8);
            }
        });
        
        // 音乐控制
        document.getElementById('musicBtn').addEventListener('click', () => {
            this.toggleMusic();
        });
        
        // 关闭弹窗
        document.getElementById('modalClose').addEventListener('click', () => {
            this.closeWishModal();
        });
        
        // 点击弹窗外部关闭
        document.getElementById('wishModal').addEventListener('click', (e) => {
            if (e.target.id === 'wishModal') {
                this.closeWishModal();
            }
        });
        
        // 字数统计
        document.getElementById('wishInput').addEventListener('input', (e) => {
            document.getElementById('charCount').textContent = e.target.value.length;
        });
        
        // 颜色选择
        document.querySelectorAll('.color-option').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.color-option').forEach(b => b.classList.remove('selected'));
                e.target.classList.add('selected');
                this.selectedColor = e.target.dataset.color;
            });
        });
        
        // 提交愿望
        document.getElementById('submitWish').addEventListener('click', () => {
            this.submitWish();
        });
        
        // 键盘事件
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeWishModal();
            }
        });
    }
    
    // 打开许愿弹窗
    openWishModal() {
        const input = document.getElementById('wishInput');
        const charCount = document.getElementById('charCount');
        
        // 随机选择一条默认祝福语
        const randomWish = this.defaultWishes[Math.floor(Math.random() * this.defaultWishes.length)];
        input.value = randomWish;
        charCount.textContent = randomWish.length;
        
        document.getElementById('wishModal').classList.add('show');
        input.focus();
        input.select(); // 选中文字，方便用户直接修改
    }
    
    // 关闭许愿弹窗
    closeWishModal() {
        document.getElementById('wishModal').classList.remove('show');
        document.getElementById('wishInput').value = '';
        document.getElementById('charCount').textContent = '0';
    }
    
    // 提交愿望
    submitWish() {
        const input = document.getElementById('wishInput');
        const text = input.value.trim();
        
        if (!text) {
            input.focus();
            return;
        }
        
        // 找到可用位置
        const availablePosition = this.ornamentPositions.find(p => !p.used);
        
        if (!availablePosition) {
            alert('圣诞树上已经挂满了愿望呢！🎄');
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
        
        // 小庆祝效果
        if (typeof fireworks !== 'undefined') {
            setTimeout(() => {
                fireworks.launch(3);
            }, 300);
        }
    }
    
    // 渲染单个装饰球
    renderOrnament(wish) {
        const container = document.getElementById('ornamentsContainer');
        
        const ornament = document.createElement('div');
        ornament.className = 'ornament';
        ornament.style.backgroundColor = wish.color;
        ornament.style.left = `${wish.position.x}px`;
        ornament.style.top = `${wish.position.y}px`;
        ornament.dataset.wishId = wish.id;
        
        // 鼠标/触摸事件显示愿望
        ornament.addEventListener('mouseenter', (e) => this.showWishTooltip(e, wish));
        ornament.addEventListener('mouseleave', () => this.hideWishTooltip());
        ornament.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.showWishTooltip(e, wish);
        });
        ornament.addEventListener('touchend', () => {
            setTimeout(() => this.hideWishTooltip(), 2000);
        });
        
        container.appendChild(ornament);
        
        // 添加出现动画
        ornament.style.transform = 'scale(0)';
        ornament.style.transition = 'transform 0.3s ease-out';
        setTimeout(() => {
            ornament.style.transform = 'scale(1)';
        }, 50);
    }
    
    // 显示愿望提示
    showWishTooltip(event, wish) {
        const tooltip = document.getElementById('wishTooltip');
        tooltip.textContent = wish.text;
        tooltip.classList.add('show');
        
        const rect = event.target.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + rect.width / 2 - tooltipRect.width / 2;
        let top = rect.top - tooltipRect.height - 10;
        
        // 边界检查
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
    
    // 隐藏愿望提示
    hideWishTooltip() {
        document.getElementById('wishTooltip').classList.remove('show');
    }
    
    // 渲染所有愿望
    renderWishes() {
        this.wishes.forEach(wish => {
            // 标记位置为已使用
            const pos = this.ornamentPositions.find(
                p => p.x === wish.position.x && p.y === wish.position.y
            );
            if (pos) pos.used = true;
            
            this.renderOrnament(wish);
        });
    }
    
    // 点亮圣诞树
    lightUpTree() {
        if (this.isLit) {
            // 已经亮了，再点一次关闭
            this.isLit = false;
            localStorage.setItem('treeLit', 'false');
            document.querySelector('.tree').classList.remove('lit');
            this.turnOffAllLights();
            document.getElementById('lightBtn').querySelector('span:last-child').textContent = '点亮圣诞树';
            return;
        }
        
        this.isLit = true;
        localStorage.setItem('treeLit', 'true');
        
        const tree = document.querySelector('.tree');
        tree.classList.add('lighting');
        
        const lights = document.querySelectorAll('.light');
        const totalLights = lights.length;
        
        // 从下往上逐个点亮
        lights.forEach((light, index) => {
            const delay = (totalLights - index) * 80;
            setTimeout(() => {
                light.classList.add('on');
            }, delay);
        });
        
        // 点亮完成后
        setTimeout(() => {
            tree.classList.remove('lighting');
            tree.classList.add('lit');
            document.getElementById('lightBtn').querySelector('span:last-child').textContent = '熄灭彩灯';
            
            // 放烟花庆祝
            if (typeof fireworks !== 'undefined') {
                fireworks.launch(5);
            }
        }, totalLights * 80 + 500);
    }
    
    // 打开所有灯
    turnOnAllLights() {
        document.querySelectorAll('.light').forEach(light => {
            light.classList.add('on');
        });
        document.getElementById('lightBtn').querySelector('span:last-child').textContent = '熄灭彩灯';
    }
    
    // 关闭所有灯
    turnOffAllLights() {
        document.querySelectorAll('.light').forEach(light => {
            light.classList.remove('on');
        });
    }
    
    // 音乐控制
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
                console.log('音频播放需要用户交互:', e);
            });
            this.isMusicPlaying = true;
            btn.classList.add('playing');
            icon.textContent = '🎵';
        }
    }
    
    // 保存愿望到本地
    saveWishes() {
        localStorage.setItem('christmasWishes', JSON.stringify(this.wishes));
    }
    
    // 从本地加载愿望
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
    
    // 更新祝福语
    updateBlessingMessage() {
        const blessings = [
            '愿你的每一个愿望都能实现 🌟',
            '圣诞快乐，新年幸福 🎄',
            '愿温暖与爱陪伴你度过每一天 ❤️',
            '愿你拥有一个美好的圣诞节 🎅',
            '愿幸福如雪花般落满你的窗台 ❄️',
            '愿新的一年充满希望与惊喜 ✨',
            '平安夜，愿平安与你同在 🕯️',
            '愿圣诞的钟声带给你好运 🔔'
        ];
        
        const blessing = blessings[Math.floor(Math.random() * blessings.length)];
        document.getElementById('blessing').textContent = blessing;
    }
}

// 初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ChristmasTree();
});

