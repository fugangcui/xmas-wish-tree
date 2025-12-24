/**
 * 多语言支持 - i18n
 */

const i18n = {
    // 当前语言
    currentLang: 'en',
    
    // 语言包
    languages: {
        en: {
            // 页面标题
            pageTitle: '🎄 Christmas Wishing Tree - Merry Christmas!',
            
            // 主页面
            subtitle: 'Write your wishes and hang them on the tree',
            btnWish: 'Make a Wish',
            btnLight: 'Light Up Tree',
            btnLightOff: 'Turn Off Lights',
            btnFirework: 'Fireworks',
            music: 'Music',
            copyright: 'Merry Christmas · Happy Holidays',
            
            // 弹窗
            modalTitle: '✨ Write Your Wish',
            wishPlaceholder: 'Write your Christmas wish here...',
            colorPicker: 'Choose ornament color:',
            btnSubmit: '🎄 Hang on Tree',
            
            // 颜色
            colorRed: 'Red',
            colorGold: 'Gold',
            colorBlue: 'Blue',
            colorSilver: 'Silver',
            colorPurple: 'Purple',
            colorGreen: 'Green',
            
            // 提示
            treeFull: 'The tree is full of wishes! 🎄',
            
            // 祝福语
            blessings: [
                'May all your wishes come true 🌟',
                'Merry Christmas and Happy New Year 🎄',
                'Wishing you warmth and love ❤️',
                'May your holidays be filled with joy 🎅',
                'Peace and happiness to you ❄️',
                'May the new year bring you hope ✨',
                'Wishing you health and happiness 💪',
                'May love and friendship surround you 💕',
                'Here\'s to new adventures 🌈',
                'May good things come your way 🎁',
            ],
            
            // 默认愿望
            defaultWishes: [
                'Wishing for health and happiness in the new year 🌟',
                'May my family and friends be happy ❤️',
                'Success and prosperity in 2026 💰',
                'World peace and happiness for all 🌍',
                'May all my loved ones be safe 🎄',
                'Working harder to achieve my dreams ✨',
                'Health for myself and family 💪',
                'May friendships last and love grow 💕',
                'Becoming a better version of myself 🌈',
                'May all good things come in time 🎁',
                'Academic success and growth 📚',
                'Career advancement and success 🚀',
                'Travel to more places ✈️',
                'Every day filled with sunshine ☀️',
                'Merry Christmas to everyone! 🎅',
            ],
            
            // 语言按钮
            langText: 'EN',
        },
        
        zh: {
            // 页面标题
            pageTitle: '🎄 许愿圣诞树 - Merry Christmas!',
            
            // 主页面
            subtitle: '写下你的愿望，挂在圣诞树上',
            btnWish: '许个愿望',
            btnLight: '点亮圣诞树',
            btnLightOff: '熄灭彩灯',
            btnFirework: '放烟花',
            music: '音乐',
            copyright: '平安夜快乐 · 圣诞节快乐',
            
            // 弹窗
            modalTitle: '✨ 写下你的愿望',
            wishPlaceholder: '在这里写下你的圣诞愿望...',
            colorPicker: '选择装饰球颜色：',
            btnSubmit: '🎄 挂上圣诞树',
            
            // 颜色
            colorRed: '红色',
            colorGold: '金色',
            colorBlue: '蓝色',
            colorSilver: '银色',
            colorPurple: '紫色',
            colorGreen: '绿色',
            
            // 提示
            treeFull: '圣诞树上已经挂满了愿望呢！🎄',
            
            // 祝福语
            blessings: [
                '愿你的每一个愿望都能实现 🌟',
                '圣诞快乐，新年幸福 🎄',
                '愿温暖与爱陪伴你度过每一天 ❤️',
                '愿你拥有一个美好的圣诞节 🎅',
                '愿幸福如雪花般落满你的窗台 ❄️',
                '愿新的一年充满希望与惊喜 ✨',
                '平安夜，愿平安与你同在 🕯️',
                '愿圣诞的钟声带给你好运 🔔',
            ],
            
            // 默认愿望
            defaultWishes: [
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
            ],
            
            // 语言按钮
            langText: '中文',
        }
    },
    
    // 初始化
    init() {
        // 从 localStorage 读取语言设置，默认根据浏览器语言
        const savedLang = localStorage.getItem('xmasLang');
        if (savedLang) {
            this.currentLang = savedLang;
        } else {
            // 根据浏览器语言自动选择
            const browserLang = navigator.language || navigator.userLanguage;
            this.currentLang = browserLang.startsWith('zh') ? 'zh' : 'en';
        }
        
        this.applyLanguage();
        this.bindEvents();
    },
    
    // 绑定事件
    bindEvents() {
        document.getElementById('langBtn').addEventListener('click', () => {
            this.toggleLanguage();
        });
    },
    
    // 切换语言
    toggleLanguage() {
        this.currentLang = this.currentLang === 'en' ? 'zh' : 'en';
        localStorage.setItem('xmasLang', this.currentLang);
        this.applyLanguage();
    },
    
    // 应用语言
    applyLanguage() {
        const lang = this.languages[this.currentLang];
        
        // 更新页面标题
        document.title = lang.pageTitle;
        
        // 更新 HTML lang 属性
        document.documentElement.lang = this.currentLang === 'zh' ? 'zh-CN' : 'en';
        
        // 更新所有带 data-i18n 属性的元素
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (lang[key]) {
                el.textContent = lang[key];
            }
        });
        
        // 更新 placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.getAttribute('data-i18n-placeholder');
            if (lang[key]) {
                el.placeholder = lang[key];
            }
        });
        
        // 更新 title 属性
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.getAttribute('data-i18n-title');
            if (lang[key]) {
                el.title = lang[key];
            }
        });
        
        // 更新语言按钮
        document.getElementById('langText').textContent = lang.langText;
        
        // 更新祝福语
        this.updateBlessing();
    },
    
    // 更新祝福语
    updateBlessing() {
        const blessings = this.languages[this.currentLang].blessings;
        const blessing = blessings[Math.floor(Math.random() * blessings.length)];
        document.getElementById('blessing').textContent = blessing;
    },
    
    // 获取翻译
    t(key) {
        return this.languages[this.currentLang][key] || key;
    },
    
    // 获取默认愿望列表
    getDefaultWishes() {
        return this.languages[this.currentLang].defaultWishes;
    },
    
    // 获取随机祝福语
    getRandomBlessing() {
        const blessings = this.languages[this.currentLang].blessings;
        return blessings[Math.floor(Math.random() * blessings.length)];
    }
};

// 页面加载后初始化
document.addEventListener('DOMContentLoaded', () => {
    i18n.init();
});

