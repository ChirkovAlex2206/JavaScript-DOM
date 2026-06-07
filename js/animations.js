// ========== ОБЩАЯ АНИМАЦИЯ ПРИ СКРОЛЛЕ ==========
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.gallery-item, .form-group, .hero-content');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

// ========== ОПРЕДЕЛЕНИЕ СТРАНИЦЫ ПО НАЛИЧИЮ ЭЛЕМЕНТОВ ==========
const isHomePage = () => document.querySelector('.hero') !== null;
const isPortfolioPage = () => document.querySelector('.gallery-container') !== null;
const isContactPage = () => document.querySelector('.contact-section') !== null;

// ========== СТРАНИЦА 1: ГЛАВНАЯ ==========
if (isHomePage()) {
    const heroSection = document.querySelector('.hero');
    const exploreBtn = document.getElementById('exploreBtn');

    // 1. Параллакс при движении мыши (фон плавно смещается)
    if (heroSection) {
        // Устанавливаем градиентный фон, который будет двигаться
        heroSection.style.background = 'radial-gradient(circle at 30% 40%, #2a2a4a, #0a0a1a)';
        heroSection.style.backgroundSize = '200% 200%';
        heroSection.style.transition = 'background-position 0.05s linear';

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            heroSection.style.backgroundPosition = `${x}% ${y}%`;
        });
    }

    // 2. Клавиша M – переключение тёмной/светлой темы (с сохранением в localStorage)
    function toggleTheme() {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    }
    // Загружаем сохранённую тему
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
    }
    window.addEventListener('keydown', (e) => {
        if (e.key === 'm' || e.key === 'M') {
            toggleTheme();
        }
    });

    // 3. Стрелки – меняют цветовую схему hero-блока (но не всей страницы)
    if (heroSection) {
        window.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'ArrowUp':
                    heroSection.style.background = 'linear-gradient(135deg, #1e3c72, #2a5298)';
                    break;
                case 'ArrowDown':
                    heroSection.style.background = 'linear-gradient(135deg, #2c3e50, #3498db)';
                    break;
                case 'ArrowLeft':
                    heroSection.style.background = 'radial-gradient(circle at 20% 30%, #ff6b6b, #8b0000)';
                    break;
                case 'ArrowRight':
                    heroSection.style.background = 'radial-gradient(circle at 80% 70%, #4ecdc4, #1a2a3a)';
                    break;
                default: break;
            }
            heroSection.style.backgroundSize = '200% 200%';
        });
    }

    // 4. Кнопка: пульсация при наведении + анимация клика
    if (exploreBtn) {
        exploreBtn.addEventListener('mouseenter', () => {
            exploreBtn.style.animation = 'pulse 0.8s infinite';
        });
        exploreBtn.addEventListener('mouseleave', () => {
            exploreBtn.style.animation = '';
        });
        exploreBtn.addEventListener('click', () => {
            exploreBtn.style.transform = 'scale(0.95)';
            setTimeout(() => {
                exploreBtn.style.transform = '';
                alert('Добро пожаловать в мир творчества! (это демо-сайт)');
            }, 150);
        });
    }
}

// ========== СТРАНИЦА 2: ПОРТФОЛИО ==========
if (isPortfolioPage()) {
    const items = document.querySelectorAll('.gallery-item');
    const activeInfo = document.getElementById('activeProjectInfo');
    let currentIndex = 0;

    function updateActive(index) {
        items.forEach((item, i) => {
            if (i === index) {
                item.style.border = '3px solid #ff6b6b';
                item.style.transform = 'scale(1.02)';
                if (activeInfo) {
                    const title = item.querySelector('.overlay')?.innerText || 'Проект';
                    activeInfo.textContent = `Активный проект: ${title}`;
                }
            } else {
                item.style.border = 'none';
                item.style.transform = 'scale(1)';
            }
        });
    }

    if (items.length) {
        updateActive(0);
        // Навигация клавишами A (влево) и D (вправо)
        window.addEventListener('keydown', (e) => {
            if (e.key === 'a' || e.key === 'A') {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
                updateActive(currentIndex);
                e.preventDefault();
            } else if (e.key === 'd' || e.key === 'D') {
                currentIndex = (currentIndex + 1) % items.length;
                updateActive(currentIndex);
                e.preventDefault();
            }
        });
        // Клик по элементу
        items.forEach((item, idx) => {
            item.addEventListener('click', () => {
                const name = item.querySelector('.overlay')?.innerText || 'проект';
                alert(`Вы выбрали ${name}`);
            });
        });
    }
}

// ========== СТРАНИЦА 3: КОНТАКТЫ ==========
if (isContactPage()) {
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const feedback = document.getElementById('formFeedback');
    const submitBtn = document.getElementById('submitBtn');

    // Анимация полей при фокусе / потере фокуса (увеличение родителя)
    const formGroups = document.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        const input = group.querySelector('input, textarea');
        if (!input) return;
        input.addEventListener('focus', () => {
            group.style.transform = 'scale(1.02)';
            group.style.transition = '0.2s';
        });
        input.addEventListener('blur', () => {
            group.style.transform = 'scale(1)';
        });
        // Hover на поле – меняем цвет фона
        input.addEventListener('mouseenter', () => {
            input.style.backgroundColor = '#2a2a36';
        });
        input.addEventListener('mouseleave', () => {
            input.style.backgroundColor = '#1e1e2a';
        });
    });

    // Отправка формы с валидацией
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = nameInput.value.trim();
            const email = emailInput.value.trim();
            const message = messageInput.value.trim();
            if (!name || !email || !message) {
                feedback.textContent = 'Пожалуйста, заполните все поля!';
                feedback.style.color = '#ff6b6b';
                feedback.style.animation = 'shake 0.4s';
                setTimeout(() => feedback.style.animation = '', 400);
                return;
            }
            feedback.textContent = 'Сообщение отправлено! Спасибо :)';
            feedback.style.color = '#6bff6b';
            form.reset();
            if (submitBtn) {
                submitBtn.style.transform = 'scale(0.95)';
                setTimeout(() => submitBtn.style.transform = '', 200);
            }
        });
    }

    // Отправка по клавише Enter в любом поле (если форма валидна)
    const allFields = [nameInput, emailInput, messageInput];
    allFields.forEach(field => {
        if (field) {
            field.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    e.preventDefault();
                    // Симулируем клик по кнопке отправки
                    if (submitBtn) submitBtn.click();
                }
            });
        }
    });
}

// Запускаем анимацию появления элементов
animateOnScroll();

// Добавляем стиль для анимации пульсации кнопки (если его ещё нет)
if (!document.querySelector('#pulseKeyframes')) {
    const style = document.createElement('style');
    style.id = 'pulseKeyframes';
    style.textContent = `
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        @keyframes shake {
            0% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
            100% { transform: translateX(0); }
        }
    `;
    document.head.appendChild(style);
}