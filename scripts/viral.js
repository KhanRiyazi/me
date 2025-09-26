// Viral Effects and Social Features
class ViralEffects {
    constructor() {
        this.viewCount = 1247;
        this.shareCount = 0;
        this.init();
    }

    init() {
        this.initializeViewCounter();
        this.initializeShareTracking();
        this.initializeSocialProof();
        this.initializeEngagementFeatures();
    }

    // View Counter with Real-time Updates
    initializeViewCounter() {
        const viewCountElement = document.getElementById('viewCount');
        if (!viewCountElement) return;

        // Simulate real-time view updates
        this.updateViewCounter(viewCountElement);

        // Increase view count periodically
        setInterval(() => {
            this.viewCount += Math.floor(Math.random() * 5) + 1;
            this.updateViewCounter(viewCountElement);
        }, 30000); // Update every 30 seconds
    }

    updateViewCounter(element) {
        this.animateNumber(element, this.viewCount, 1000);
    }

    animateNumber(element, target, duration) {
        const start = parseInt(element.textContent.replace(/,/g, '')) || 0;
        const startTime = performance.now();

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (target - start) * easeOut);

            element.textContent = current.toLocaleString();

            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        };

        requestAnimationFrame(animate);
    }

    // Share Tracking
    initializeShareTracking() {
        // Track share events
        document.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const platform = e.target.closest('.share-btn').classList[1];
                this.trackShare(platform);
            });
        });
    }

    trackShare(platform) {
        this.shareCount++;

        // Simulate API call to track shares
        console.log(`Shared on ${platform}. Total shares: ${this.shareCount}`);

        // Show share confirmation
        this.showShareConfirmation(platform);
    }

    showShareConfirmation(platform) {
        const messages = {
            twitter: "Thanks for sharing on Twitter! 🐦",
            linkedin: "Professional share on LinkedIn! 💼",
            facebook: "Shared on Facebook! 👍",
            'copy-link': "Link copied to clipboard! 📋"
        };

        this.showFloatingMessage(messages[platform] || "Thanks for sharing!");
    }

    // Social Proof Elements
    initializeSocialProof() {
        this.createLiveActivityIndicator();
        this.createRecentViewers();
    }

    createLiveActivityIndicator() {
        const viralCounter = document.querySelector('.viral-counter');
        if (!viralCounter) return;

        // Add live activity pulses
        setInterval(() => {
            this.createActivityPulse(viralCounter);
        }, 5000);
    }

    createActivityPulse(container) {
        const pulse = document.createElement('div');
        pulse.className = 'activity-pulse';
        pulse.style.cssText = `
            position: absolute;
            top: 50%;
            left: 10px;
            width: 6px;
            height: 6px;
            background: #10b981;
            border-radius: 50%;
            animation: pulse 2s infinite;
        `;

        container.style.position = 'relative';
        container.appendChild(pulse);

        setTimeout(() => pulse.remove(), 2000);
    }

    createRecentViewers() {
        // Simulate recent viewer activity
        setInterval(() => {
            this.showRecentViewer();
        }, 15000);
    }

    showRecentViewer() {
        const locations = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'Toronto'];
        const names = ['Alex', 'Sam', 'Taylor', 'Jordan', 'Casey', 'Morgan'];

        const location = locations[Math.floor(Math.random() * locations.length)];
        const name = names[Math.floor(Math.random() * names.length)];

        this.showFloatingMessage(`${name} from ${location} is viewing this page`);
    }

    // Engagement Features
    initializeEngagementFeatures() {
        this.addScrollReactions();
        this.addReadingTime();
        this.addAchievementSystem();
    }

    addScrollReactions() {
        let lastScrollPosition = 0;
        let scrollDirection = 'down';

        window.addEventListener('scroll', () => {
            const currentPosition = window.pageYOffset;
            scrollDirection = currentPosition > lastScrollPosition ? 'down' : 'up';
            lastScrollPosition = currentPosition;

            // Trigger reactions at specific scroll points
            this.triggerScrollReaction(currentPosition, scrollDirection);
        });
    }

    triggerScrollReaction(position, direction) {
        const milestones = [500, 1000, 1500, 2000, 2500];

        milestones.forEach(milestone => {
            if (Math.abs(position - milestone) < 10) {
                this.showFloatingMessage('🎯 Great progress! Keep exploring...');
            }
        });
    }

    addReadingTime() {
        const content = document.querySelector('main').textContent;
        const wordCount = content.split(/\s+/).length;
        const readingTime = Math.ceil(wordCount / 200); // 200 wpm

        // Add reading time indicator
        this.createReadingTimeIndicator(readingTime);
    }

    createReadingTimeIndicator(minutes) {
        const indicator = document.createElement('div');
        indicator.className = 'reading-time';
        indicator.innerHTML = `📖 ${minutes} min read`;
        indicator.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 30px;
            background: var(--bg-card);
            padding: 10px 15px;
            border-radius: 20px;
            font-size: 0.9rem;
            box-shadow: var(--shadow);
            z-index: 99;
            border: 1px solid var(--border-color);
        `;

        document.body.appendChild(indicator);
    }

    addAchievementSystem() {
        this.trackAchievements();
    }

    trackAchievements() {
        const achievements = {
            '50%_scroll': { unlocked: false, message: '📖 Halfway through! Knowledge seeker!' },
            '90%_scroll': { unlocked: false, message: '🎯 Almost there! Dedicated learner!' },
            'share': { unlocked: false, message: '📤 Sharing is caring! Community builder!' },
            'time_5min': { unlocked: false, message: '⏱️ 5 minutes invested! Committed explorer!' }
        };

        // Track scroll depth
        window.addEventListener('scroll', () => {
            const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

            if (scrollPercent > 50 && !achievements['50%_scroll'].unlocked) {
                this.unlockAchievement(achievements['50%_scroll'].message);
                achievements['50%_scroll'].unlocked = true;
            }

            if (scrollPercent > 90 && !achievements['90%_scroll'].unlocked) {
                this.unlockAchievement(achievements['90%_scroll'].message);
                achievements['90%_scroll'].unlocked = true;
            }
        });

        // Track time spent
        setTimeout(() => {
            if (!achievements['time_5min'].unlocked) {
                this.unlockAchievement(achievements['time_5min'].message);
                achievements['time_5min'].unlocked = true;
            }
        }, 300000); // 5 minutes
    }

    unlockAchievement(message) {
        this.showFloatingMessage(message);
    }

    // Utility Functions
    showFloatingMessage(message) {
        const messageEl = document.createElement('div');
        messageEl.className = 'floating-message';
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--primary-color);
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            box-shadow: var(--shadow-lg);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            max-width: 300px;
            text-align: center;
        `;

        document.body.appendChild(messageEl);

        // Animate in
        setTimeout(() => {
            messageEl.style.transform = 'translateX(0)';
        }, 100);

        // Animate out and remove
        setTimeout(() => {
            messageEl.style.transform = 'translateX(100%)';
            setTimeout(() => messageEl.remove(), 300);
        }, 3000);
    }
}

// Social Sharing Functions
function shareOnTwitter() {
    const text = 'Check out Rizwan Khan\'s amazing journey in Mathematics, Peace Studies, and AI!';
    const url = window.location.href;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnLinkedIn() {
    const url = window.location.href;
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
}

function shareOnFacebook() {
    const url = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
}

function copyPageLink() {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
        // Show copied confirmation
        if (window.viralEffects) {
            window.viralEffects.showFloatingMessage('Link copied to clipboard! 📋');
        }
    }).catch(err => {
        console.error('Failed to copy link: ', err);
    });
}

// Popup Functions
function showEducationPopup() {
    showPopup('educationPopup', 'Education Foundation (2010-2014)');
}

function showTeachingPopup() {
    showPopup('teachingPopup', 'Teaching Innovation (2015-2018)');
}

function showPeacePopup() {
    showPopup('peacePopup', 'Peace Studies Integration (2019-2020)');
}

function showAIPopup() {
    showPopup('aiPopup', 'AI Revolution (2021-Present)');
}

function showPortfolioPopup() {
    showPopup('portfolioPopup', 'Complete Portfolio');
}

function showPopup(popupId, title) {
    // Create popup content based on ID
    const popup = document.createElement('div');
    popup.className = 'popup active';
    popup.innerHTML = `
        <div class="popup-content">
            <button class="popup-close" onclick="closePopup(this)">&times;</button>
            <h3>${title}</h3>
            <div class="popup-body">
                ${getPopupContent(popupId)}
            </div>
        </div>
    `;

    document.body.appendChild(popup);

    // Add animation
    setTimeout(() => {
        popup.classList.add('show');
    }, 10);
}

function closePopup(button) {
    const popup = button.closest('.popup');
    popup.classList.remove('show');
    setTimeout(() => {
        popup.remove();
    }, 300);
}

function getPopupContent(popupId) {
    const content = {
        educationPopup: `
            <p>Built strong foundations in mathematics and pedagogy with a focus on digital literacy.</p>
            <ul>
                <li>Advanced Mathematics Degree</li>
                <li>Digital Teaching Certifications</li>
                <li>Educational Technology Training</li>
            </ul>
        `,
        teachingPopup: `
            <p>Integrated technology into classroom instruction and developed digital teaching methodologies.</p>
            <ul>
                <li>Interactive Learning Platforms</li>
                <li>Digital Assessment Tools</li>
                <li>Remote Teaching Solutions</li>
            </ul>
        `,
        peacePopup: `
            <p>Applied mathematical thinking to conflict resolution in digital spaces.</p>
            <ul>
                <li>Peace Education Frameworks</li>
                <li>Conflict Resolution Algorithms</li>
                <li>Digital Peacebuilding</li>
            </ul>
        `,
        aiPopup: `
            <p>Leading the integration of artificial intelligence with mathematics education.</p>
            <ul>
                <li>AI-Powered Learning Systems</li>
                <li>Machine Learning Applications</li>
                <li>Adaptive Learning Technologies</li>
            </ul>
        `,
        portfolioPopup: `
            <p>Complete digital portfolio showcasing all projects and achievements.</p>
            <div class="portfolio-links">
                <a href="https://khanriyazi.github.io/portfolio-responsive-complete/" target="_blank">My Portfolio</a>
                <a href="http://khan.affiliatemath.xyz/" target="_blank">AI Learning Platform</a>
                <a href="greatclick.html" target="_blank">To find the Great click</a>
                <a href="main.html" target="_blank">FastAPI</a>
            </div>
        `
    };

    return content[popupId] || '<p>Content coming soon...</p>';
}

// Initialize viral effects when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.viralEffects = new ViralEffects();
});

// Export functions for global access
window.shareOnTwitter = shareOnTwitter;
window.shareOnLinkedIn = shareOnLinkedIn;
window.shareOnFacebook = shareOnFacebook;
window.copyPageLink = copyPageLink;
window.showEducationPopup = showEducationPopup;
window.showTeachingPopup = showTeachingPopup;
window.showPeacePopup = showPeacePopup;
window.showAIPopup = showAIPopup;
window.showPortfolioPopup = showPortfolioPopup;
window.closePopup = closePopup;