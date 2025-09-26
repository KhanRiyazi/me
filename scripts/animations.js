// Advanced Animation System
class AnimationManager {
    constructor() {
        this.animations = new Map();
        this.observer = null;
        this.init();
    }

    init() {
        this.setupIntersectionObserver();
        this.setupScrollAnimations();
        this.setupHoverAnimations();
    }

    setupIntersectionObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateOnScroll(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
    }

    setupScrollAnimations() {
        // Add scroll-reveal to elements
        const elements = document.querySelectorAll('.tech-card, .project-card, .timeline-item, .stat-card');
        elements.forEach(el => {
            el.classList.add('scroll-reveal');
            this.observer.observe(el);
        });
    }

    setupHoverAnimations() {
        // Add hover effects to interactive elements
        const hoverElements = document.querySelectorAll('.cta-button, .project-card, .tech-card');
        hoverElements.forEach(el => {
            el.classList.add('hover-lift');
        });
    }

    animateOnScroll(element) {
        const animationType = element.dataset.animation || 'fadeInUp';
        const delay = element.dataset.delay || 0;

        setTimeout(() => {
            element.style.animation = `${animationType} 0.6s ease-out forwards`;
        }, delay);
    }

    // Typewriter effect
    typewriter(element, text, speed = 50) {
        return new Promise((resolve) => {
            let i = 0;
            element.textContent = '';

            const timer = setInterval(() => {
                if (i < text.length) {
                    element.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(timer);
                    resolve();
                }
            }, speed);
        });
    }

    // Counter animation with easing
    animateCounter(element, target, duration = 2000) {
        const start = parseInt(element.textContent) || 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (target - start) * easeOutQuart);

            element.textContent = this.formatNumber(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    }

    // Particle system for hero section
    createParticleSystem(canvasId, options = {}) {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const particles = [];
        const {
            count = 50,
            color = '#2563eb',
            sizeRange = [1, 3],
            speedRange = [0.2, 0.5]
        } = options;

        function resize() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }

        function createParticles() {
            particles.length = 0;
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    size: Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0],
                    speed: Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0],
                    opacity: Math.random() * 0.5 + 0.3
                });
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach(particle => {
                particle.y -= particle.speed;
                if (particle.y < -particle.size) {
                    particle.y = canvas.height + particle.size;
                    particle.x = Math.random() * canvas.width;
                }

                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = this.hexToRgb(color, particle.opacity);
                ctx.fill();
            });

            requestAnimationFrame(animate.bind(this));
        }

        resize();
        createParticles();
        animate();

        window.addEventListener('resize', () => {
            resize();
            createParticles();
        });
    }

    hexToRgb(hex, opacity = 1) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ?
            `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})`
            : hex;
    }

    // Neural network animation
    createNeuralAnimation(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const nodes = container.querySelectorAll('.neural-node');
        nodes.forEach((node, index) => {
            node.style.animationDelay = `${index * 0.2}s`;
        });
    }

    // Gradient animation
    animateGradient(element, colors, duration = 5000) {
        let currentIndex = 0;

        setInterval(() => {
            const nextIndex = (currentIndex + 1) % colors.length;
            element.style.background = `linear-gradient(135deg, ${colors[currentIndex]} 0%, ${colors[nextIndex]} 100%)`;
            currentIndex = nextIndex;
        }, duration);
    }
}

// Initialize animation manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.animationManager = new AnimationManager();

    // Initialize specific animations
    if (document.getElementById('particleCanvas')) {
        window.animationManager.createParticleSystem('particleCanvas', {
            count: 30,
            color: '#2563eb',
            sizeRange: [1, 2],
            speedRange: [0.1, 0.3]
        });
    }

    // Add scroll reveal to elements
    const scrollRevealElements = document.querySelectorAll('.scroll-reveal');
    scrollRevealElements.forEach(el => {
        window.animationManager.observer.observe(el);
    });
});

// CSS Keyframes for dynamic animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes fadeInLeft {
        from {
            opacity: 0;
            transform: translateX(-30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes fadeInRight {
        from {
            opacity: 0;
            transform: translateX(30px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes scaleIn {
        from {
            opacity: 0;
            transform: scale(0.8);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
    
    @keyframes slideInUp {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);