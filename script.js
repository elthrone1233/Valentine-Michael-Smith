// Global state
let isConnected = false;
let userData = {
    balance: 10000,
    staked: 5000,
    rewards: 1250,
    daysRemaining: 180
};

// DOM Elements
const loadingScreen = document.getElementById('loadingScreen');
const progressFill = document.querySelector('.loading-progress .progress-fill');
const progressText = document.querySelector('.loading-progress .progress-text');
const connectWalletBtn = document.getElementById('connectWallet');
const connectWalletBtn2 = document.getElementById('connectWallet2');
const connectSection = document.getElementById('connectSection');
const stakingSection = document.getElementById('stakingSection');
const actionSection = document.getElementById('actionSection');
const stakeBtn = document.getElementById('stakeBtn');
const claimBtn = document.getElementById('claimBtn');
const stakeModal = document.getElementById('stakeModal');
const stakeAmount = document.getElementById('stakeAmount');
const cancelStake = document.getElementById('cancelStake');
const confirmStake = document.getElementById('confirmStake');
const connectModal = document.getElementById('connectModal');
const connectNow = document.getElementById('connectNow');

// Chatbox Support/FAQ
const chatboxFab = document.getElementById('chatbox-fab');
const chatbox = document.getElementById('chatbox');
const chatboxClose = document.getElementById('chatbox-close');
const chatboxMessages = document.getElementById('chatbox-messages');
const chatboxInput = document.getElementById('chatbox-input');
const chatboxSend = document.getElementById('chatbox-send');

const chatFaqs = [
    {
        q: 'Who are you?',
        a: "I'm the Tesla Dog Robot, an AI-powered security robot designed by Elon Musk. I'm here to protect your home with 6 advanced security features."
    },
    {
        q: 'When will you be launched?',
        a: "I'm scheduled to launch in 2026! Currently being tested at Giga Texas with advanced AI modules and security protocols."
    },
    {
        q: 'Who is your creator?',
        a: 'My creator is Elon Musk, the visionary behind Tesla, SpaceX, and Neuralink. He designed me to be the ultimate home security companion.'
    },
    {
        q: 'What are your security features?',
        a: 'I have 6 advanced features: AI surveillance, vandal protection, intruder detection, automated response systems, remote monitoring, and Tesla network integration.'
    },
    {
        q: 'How much will you cost?',
        a: 'My estimated price is around $5,000 - much more affordable than the Optimus robot! I\'m designed to be accessible to everyone.'
    },
    {
        q: 'What makes you special?',
        a: "I'm the first AI-powered robotic dog designed specifically for home security. I combine Tesla's neural network technology with advanced robotics to provide 24/7 protection."
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    startLoadingScreen();
});

function startLoadingScreen() {
    let progress = 0;
    const totalSteps = 5;
    const stepDuration = 1000; // 1 second per step
    
    const progressInterval = setInterval(() => {
        progress += (100 / totalSteps);
        
        if (progressFill) {
            progressFill.style.width = `${progress}%`;
        }
        if (progressText) {
            progressText.textContent = `${Math.round(progress)}%`;
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            
            // Wait a bit more for the last status line
            setTimeout(() => {
                hideLoadingScreen();
            }, 1000);
        }
    }, stepDuration);
}

function hideLoadingScreen() {
    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        
        // Remove loading screen after transition
        setTimeout(() => {
            if (loadingScreen && loadingScreen.parentNode) {
                loadingScreen.parentNode.removeChild(loadingScreen);
            }
            
            // Initialize the main app
            initializeApp();
            setupEventListeners();
            updateUI();
            startBackgroundAnimations();
            
            if (window.tsParticles) {
                tsParticles.load('tsparticles', {
                    fullScreen: { enable: false },
                    background: { color: 'transparent' },
                    particles: {
                        number: { value: 60 },
                        color: { value: ['#00d4ff', '#00ffff', '#0080ff'] },
                        shape: { type: 'circle' },
                        opacity: { value: 0.5 },
                        size: { value: { min: 1, max: 3 } },
                        move: { enable: true, speed: 1.2, direction: 'none', random: true, straight: false, outModes: 'out' },
                        links: { enable: true, distance: 120, color: '#00d4ff', opacity: 0.2, width: 1 }
                    },
                    interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
                    detectRetina: true
                });
            }

            // FAQ Accordion
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(btn => {
                btn.addEventListener('click', function() {
                    const item = this.parentElement;
                    item.classList.toggle('active');
                    // Fecha outros
                    document.querySelectorAll('.faq-item').forEach(other => {
                        if (other !== item) other.classList.remove('active');
                    });
                });
            });
        }, 1000);
    }
}

function initializeApp() {
    // Add advanced entrance animations
    const elements = document.querySelectorAll('.hero-content, .stat-card, .dashboard-card, .action-terminal');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });

    // Add glitch effect to title
    addGlitchEffect();
    
    // Add terminal boot sequence
    addTerminalBootSequence();
}

function addGlitchEffect() {
    const title = document.querySelector('.hero-title');
    if (title) {
        setInterval(() => {
            if (Math.random() < 0.15) { // 15% chance every interval
                title.style.textShadow = '2px 0 var(--primary-blue), -2px 0 var(--cyan)';
                setTimeout(() => {
                    title.style.textShadow = 'none';
                }, 150);
            }
        }, 3000);
    }
}

function addTerminalBootSequence() {
    const terminals = document.querySelectorAll('.terminal-title');
    terminals.forEach((terminal, index) => {
        const originalText = terminal.textContent;
        terminal.textContent = '';
        
        setTimeout(() => {
            let i = 0;
            const typeInterval = setInterval(() => {
                terminal.textContent += originalText[i];
                i++;
                if (i >= originalText.length) {
                    clearInterval(typeInterval);
                    // Add cursor blink effect
                    terminal.style.borderRight = '2px solid var(--primary-blue)';
                    setInterval(() => {
                        terminal.style.borderRight = terminal.style.borderRight === '2px solid var(--primary-blue)' ? 
                            '2px solid transparent' : '2px solid var(--primary-blue)';
                    }, 600);
                }
            }, 80);
        }, index * 500);
    });
}

function startBackgroundAnimations() {
    // Add scanning effect
    addScanningEffect();
    
    // Add data particles
    createDataParticles();
}

function addScanningEffect() {
    const scanLine = document.createElement('div');
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--primary-blue), transparent);
        z-index: 100;
        animation: scanLine 10s linear infinite;
        pointer-events: none;
        box-shadow: 0 0 20px var(--glow-blue);
    `;
    document.body.appendChild(scanLine);
}

function createDataParticles() {
    const particlesContainer = document.createElement('div');
    particlesContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
    `;
    document.body.appendChild(particlesContainer);
    
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 3px;
            height: 3px;
            background: var(--primary-blue);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: particleFloat ${8 + Math.random() * 15}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 10px var(--glow-blue);
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes scanLine {
        0% { transform: translateY(-100vh); }
        100% { transform: translateY(100vh); }
    }
    
    @keyframes particleFloat {
        0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);

function setupEventListeners() {
    // Efeitos avançados
    addAdvancedEffects();
    addKeyboardShortcuts();

    // Chatbox Tesla Dog Robot AI
    if (chatboxFab && chatbox && chatboxClose) {
        chatboxFab.addEventListener('click', function() {
            chatbox.classList.remove('hidden');
            chatboxFab.style.display = 'none';
        });
        chatboxClose.addEventListener('click', function() {
            chatbox.classList.add('hidden');
            setTimeout(() => { chatboxFab.style.display = 'flex'; }, 300);
        });
        
        // FAQ toggle functionality
        const faqToggle = document.getElementById('faq-toggle');
        const faqContent = document.getElementById('faq-content');
        
        if (faqToggle && faqContent) {
            faqToggle.addEventListener('click', function() {
                faqContent.classList.toggle('collapsed');
                faqToggle.classList.toggle('collapsed');
            });
        }
        
        // FAQ accordion inside chatbox
        const faqQuestions = chatbox.querySelectorAll('.faq-question');
        faqQuestions.forEach((btn, idx) => {
            btn.addEventListener('click', function() {
                const item = this.parentElement;
                const isActive = item.classList.contains('active');
                
                // Fecha todos os outros
                chatbox.querySelectorAll('.faq-item').forEach(other => {
                    other.classList.remove('active');
                });
                
                // Toggle do item atual
                if (!isActive) {
                    item.classList.add('active');
                    // Envia a pergunta para o chat
                    handleUserMessage(chatFaqs[idx].q);
                }
            });
        });
        
        // Enviar mensagem
        function sendChat() {
            const text = chatboxInput.value;
            if (!text.trim()) return;
            handleUserMessage(text);
            chatboxInput.value = '';
        }
        
        if (chatboxSend) {
            chatboxSend.addEventListener('click', sendChat);
        }
        if (chatboxInput) {
            chatboxInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') sendChat();
            });
        }
    }

    // Presale functionality
    const buyPresaleBtn = document.getElementById('buyPresaleBtn');
    const copyPresaleWallet = document.getElementById('copyPresaleWallet');
    const presaleWallet = document.getElementById('presaleWallet');

    if (buyPresaleBtn) {
        buyPresaleBtn.addEventListener('click', function() {
            if (presaleWallet) {
                // Copy wallet address to clipboard
                navigator.clipboard.writeText(presaleWallet.value).then(() => {
                    showCyberNotification('Presale wallet address copied to clipboard!', 'success');
                }).catch(() => {
                    showCyberNotification('Failed to copy wallet address', 'error');
                });
            }
        });
    }

    if (copyPresaleWallet) {
        copyPresaleWallet.addEventListener('click', function() {
            if (presaleWallet) {
                navigator.clipboard.writeText(presaleWallet.value).then(() => {
                    showCyberNotification('Presale wallet address copied!', 'success');
                    // Visual feedback
                    this.textContent = 'Copied!';
                    this.style.background = 'linear-gradient(45deg, #27ca3f, #10b981)';
                    setTimeout(() => {
                        this.textContent = 'Copy';
                        this.style.background = '';
                    }, 2000);
                }).catch(() => {
                    showCyberNotification('Failed to copy wallet address', 'error');
                });
            }
        });
    }

    // Referral functionality
    const copyReferral = document.getElementById('copyReferral');
    const referralLink = document.getElementById('referralLink');
    const claimReferralBtn = document.getElementById('claimReferralBtn');
    const referralModal = document.getElementById('referralModal');
    const claimUSDC = document.getElementById('claimUSDC');
    const claimUSDT = document.getElementById('claimUSDT');
    const cancelReferralClaim = document.getElementById('cancelReferralClaim');

    if (copyReferral) {
        copyReferral.addEventListener('click', function() {
            if (referralLink) {
                navigator.clipboard.writeText(referralLink.value).then(() => {
                    showCyberNotification('Referral link copied!', 'success');
                    // Visual feedback
                    this.textContent = 'Copied!';
                    this.style.background = 'linear-gradient(45deg, #27ca3f, #10b981)';
                    setTimeout(() => {
                        this.textContent = 'Copy Link';
                        this.style.background = '';
                    }, 2000);
                }).catch(() => {
                    showCyberNotification('Failed to copy referral link', 'error');
                });
            }
        });
    }

    if (claimReferralBtn) {
        claimReferralBtn.addEventListener('click', function() {
            if (isConnected) {
                referralModal.classList.remove('hidden');
            } else {
                connectModal.classList.remove('hidden');
            }
        });
    }

    if (claimUSDC) {
        claimUSDC.addEventListener('click', function() {
            showCyberNotification('USDC referral rewards claimed!', 'success');
            referralModal.classList.add('hidden');
        });
    }

    if (claimUSDT) {
        claimUSDT.addEventListener('click', function() {
            showCyberNotification('USDT referral rewards claimed!', 'success');
            referralModal.classList.add('hidden');
        });
    }

    if (cancelReferralClaim) {
        cancelReferralClaim.addEventListener('click', function() {
            referralModal.classList.add('hidden');
        });
    }

    // Close referral modal when clicking outside
    if (referralModal) {
        referralModal.addEventListener('click', function(e) {
            if (e.target === referralModal) referralModal.classList.add('hidden');
        });
    }
}

function addAdvancedEffects() {
    // Add glitch effect to buttons
    const buttons = document.querySelectorAll('.cyber-button, .cyber-button-large');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.textShadow = '0 0 15px var(--primary-blue)';
            addGlitchText(this);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.textShadow = 'none';
            removeGlitchText(this);
        });
    });
    
    // Add data corruption effect to cards
    const cards = document.querySelectorAll('.stat-card, .dashboard-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.borderColor = 'var(--cyan)';
            this.style.boxShadow = '0 0 40px var(--glow-cyan)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.borderColor = 'var(--primary-blue)';
            this.style.boxShadow = '0 0 20px var(--glow-blue)';
        });
    });
}

function addGlitchText(element) {
    const originalText = element.querySelector('.button-text')?.textContent || element.textContent;
    const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    const glitchInterval = setInterval(() => {
        const glitchedText = originalText.split('').map(char => 
            Math.random() < 0.1 ? glitchChars[Math.floor(Math.random() * glitchChars.length)] : char
        ).join('');
        
        if (element.querySelector('.button-text')) {
            element.querySelector('.button-text').textContent = glitchedText;
        } else {
            element.textContent = glitchedText;
        }
    }, 50);
    
    element.glitchInterval = glitchInterval;
}

function removeGlitchText(element) {
    if (element.glitchInterval) {
        clearInterval(element.glitchInterval);
        if (element.querySelector('.button-text')) {
            element.querySelector('.button-text').textContent = element.querySelector('.button-text').textContent.replace(/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/g, '');
        }
    }
}

function addKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K to connect/disconnect wallet
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            toggleWalletConnection();
        }
        
        // Ctrl/Cmd + S to open stake modal
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            if (isConnected) {
                openStakeModal();
            }
        }
        
        // Ctrl/Cmd + R to claim rewards
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            if (isConnected) {
                claimRewards();
            }
        }
    });
}

function toggleWalletConnection() {
    isConnected = !isConnected;
    
    if (isConnected) {
        // Simulate wallet connection with advanced effects
        showCyberNotification('WALLET CONNECTION ESTABLISHED', 'success');
        
        // Update button with connection effect
        const buttons = [connectWalletBtn, connectWalletBtn2];
        buttons.forEach(btn => {
            if (btn) {
                btn.innerHTML = `
                    <span class="button-text">CONNECTED</span>
                    <span class="button-glow"></span>
                `;
                btn.style.background = 'linear-gradient(45deg, #27ca3f, #10b981)';
            }
        });
        
        // Show staking dashboard with slide effect
        setTimeout(() => {
            connectSection.classList.add('hidden');
            stakingSection.classList.remove('hidden');
            actionSection.classList.remove('hidden');
            
            // Animate in the new sections
            [stakingSection, actionSection].forEach(section => {
                section.style.opacity = '0';
                section.style.transform = 'translateY(50px)';
                
                setTimeout(() => {
                    section.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    section.style.opacity = '1';
                    section.style.transform = 'translateY(0)';
                }, 100);
            });
        }, 1000);
    } else {
        // Disconnect wallet
        showCyberNotification('WALLET DISCONNECTED', 'warning');
        
        // Update button
        const buttons = [connectWalletBtn, connectWalletBtn2];
        buttons.forEach(btn => {
            if (btn) {
                btn.innerHTML = `
                    <span class="button-text">CONNECT WALLET</span>
                    <span class="button-glow"></span>
                `;
                btn.style.background = 'linear-gradient(45deg, var(--primary-blue), var(--secondary-blue))';
            }
        });
        
        // Show connect section
        stakingSection.classList.add('hidden');
        actionSection.classList.add('hidden');
        connectSection.classList.remove('hidden');
    }
    
    updateUI();
}

function updateUI() {
    // Update dashboard values with advanced formatting
    if (isConnected) {
        updateDashboardValues();
        updateProgressBar();
        addDataStreamEffect();
    }
}

function updateDashboardValues() {
    // Format numbers with advanced style
    const formatNumber = (num) => {
        return new Intl.NumberFormat('en-US').format(num);
    };
    
    // Update dashboard cards with animation
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            const valueElement = card.querySelector('.card-value');
            const labelElement = card.querySelector('.card-label');
            
            if (valueElement && labelElement) {
                const values = [userData.balance, userData.staked, userData.rewards, userData.daysRemaining];
                const labels = ['AVAILABLE BALANCE', 'STAKED AMOUNT', 'TOTAL REWARDS', 'DAYS REMAINING'];
                
                if (values[index] !== undefined) {
                    animateNumber(valueElement, values[index], formatNumber);
                    labelElement.textContent = labels[index];
                }
            }
        }, index * 300);
    });
}

function animateNumber(element, targetValue, formatter) {
    const startValue = 0;
    const duration = 1500;
    const startTime = performance.now();
    
    function updateNumber(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        const currentValue = Math.floor(startValue + (targetValue - startValue) * progress);
        element.textContent = formatter(currentValue);
        
        if (progress < 1) {
            requestAnimationFrame(updateNumber);
        }
    }
    
    requestAnimationFrame(updateNumber);
}

function updateProgressBar() {
    const progressFill = document.querySelector('.progress-fill');
    const progressPercentage = document.querySelector('.progress-percentage');
    
    if (progressFill && progressPercentage) {
        const percentage = Math.round(((365 - userData.daysRemaining) / 365) * 100);
        
        // Animate progress bar
        progressFill.style.width = '0%';
        setTimeout(() => {
            progressFill.style.width = `${percentage}%`;
        }, 800);
        
        // Animate percentage text
        let currentPercentage = 0;
        const interval = setInterval(() => {
            currentPercentage += 1;
            progressPercentage.textContent = `${currentPercentage}% COMPLETE`;
            
            if (currentPercentage >= percentage) {
                clearInterval(interval);
            }
        }, 30);
    }
}

function addDataStreamEffect() {
    // Add data streaming effect to dashboard
    const dashboard = document.querySelector('.dashboard-grid');
    if (dashboard) {
        const dataStream = document.createElement('div');
        dataStream.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, var(--primary-blue), transparent);
            opacity: 0.1;
            animation: dataStreamFlow 4s linear infinite;
            pointer-events: none;
        `;
        dashboard.appendChild(dataStream);
    }
}

// Add CSS for data stream
const dataStreamStyle = document.createElement('style');
dataStreamStyle.textContent = `
    @keyframes dataStreamFlow {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }
`;

function openStakeModal() {
    stakeModal.classList.remove('hidden');
    stakeAmount.focus();
    
    // Add terminal boot effect
    const modalContent = stakeModal.querySelector('.modal-terminal');
    modalContent.style.transform = 'scale(0.9) translateY(-30px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        modalContent.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
        modalContent.style.transform = 'scale(1) translateY(0)';
        modalContent.style.opacity = '1';
    }, 10);
    
    // Add typing sound effect simulation
    addTypingEffect();
}

function addTypingEffect() {
    const input = document.getElementById('stakeAmount');
    if (input) {
        input.addEventListener('input', function() {
            // Simulate typing sound with visual feedback
            this.style.borderColor = 'var(--cyan)';
            setTimeout(() => {
                this.style.borderColor = 'var(--primary-blue)';
            }, 300);
        });
    }
}

function closeStakeModal() {
    const modalContent = stakeModal.querySelector('.modal-terminal');
    modalContent.style.transform = 'scale(0.9) translateY(-30px)';
    modalContent.style.opacity = '0';
    
    setTimeout(() => {
        stakeModal.classList.add('hidden');
        stakeAmount.value = '';
    }, 500);
}

function confirmStaking() {
    const amount = parseFloat(stakeAmount.value);
    
    if (!amount || amount <= 0) {
        showCyberNotification('INVALID AMOUNT DETECTED', 'error');
        return;
    }
    
    if (amount > userData.balance) {
        showCyberNotification('INSUFFICIENT BALANCE', 'error');
        return;
    }
    
    // Simulate staking transaction with advanced effects
    showCyberNotification('INITIATING STAKING PROTOCOL...', 'info');
    
    // Add processing animation
    const confirmBtn = document.getElementById('confirmStake');
    const originalText = confirmBtn.innerHTML;
    confirmBtn.innerHTML = `
        <span class="button-text">PROCESSING...</span>
    `;
    confirmBtn.disabled = true;
    
    setTimeout(() => {
        // Update user data
        userData.balance -= amount;
        userData.staked += amount;
        
        showCyberNotification(`STAKING SUCCESSFUL: ${formatNumber(amount)} TOKENS DEPLOYED`, 'success');
        closeStakeModal();
        updateUI();
        
        // Restore button
        confirmBtn.innerHTML = originalText;
        confirmBtn.disabled = false;
    }, 4000);
}

function claimRewards() {
    if (userData.rewards <= 0) {
        showCyberNotification('NO REWARDS AVAILABLE FOR WITHDRAWAL', 'info');
        return;
    }
    
    // Simulate claiming transaction
    showCyberNotification('INITIATING REWARD WITHDRAWAL...', 'info');
    
    // Add processing animation
    const claimBtn = document.getElementById('claimBtn');
    const originalText = claimBtn.innerHTML;
    claimBtn.innerHTML = `
        <span class="button-text">PROCESSING...</span>
    `;
    claimBtn.disabled = true;
    
    setTimeout(() => {
        const claimedAmount = userData.rewards;
        userData.rewards = 0;
        userData.balance += claimedAmount;
        
        showCyberNotification(`REWARDS CLAIMED: ${formatNumber(claimedAmount)} TOKENS TRANSFERRED`, 'success');
        updateUI();
        
        // Restore button
        claimBtn.innerHTML = originalText;
        claimBtn.disabled = false;
    }, 4000);
}

function compoundRewards() {
    if (userData.rewards <= 0) {
        showCyberNotification('NO REWARDS AVAILABLE FOR COMPOUNDING', 'info');
        return;
    }
    
    // Simulate compounding transaction
    showCyberNotification('INITIATING REWARD COMPOUNDING...', 'info');
    
    // Add processing animation
    const compoundBtn = document.getElementById('compoundBtn');
    const originalText = compoundBtn.innerHTML;
    compoundBtn.innerHTML = `
        <span class="button-text">PROCESSING...</span>
    `;
    compoundBtn.disabled = true;
    
    setTimeout(() => {
        const compoundedAmount = userData.rewards;
        userData.rewards = 0;
        userData.staked += compoundedAmount;
        
        showCyberNotification(`REWARDS COMPOUNDED: ${formatNumber(compoundedAmount)} TOKENS REINVESTED`, 'success');
        updateUI();
        
        // Restore button
        compoundBtn.innerHTML = originalText;
        compoundBtn.disabled = false;
    }, 4000);
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(num);
}

// Advanced notification system
function showCyberNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.cyber-notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `cyber-notification cyber-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-header">
            <div class="notification-icon">
                <i class="fas ${getNotificationIcon(type)}"></i>
            </div>
            <div class="notification-content">
                <div class="notification-title">${getNotificationTitle(type)}</div>
                <div class="notification-message">${message}</div>
            </div>
            <div class="notification-close">
                <i class="fas fa-times"></i>
            </div>
        </div>
        <div class="notification-progress"></div>
    `;
    
    // Add advanced styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(0, 0, 0, 0.95);
        border: 2px solid var(--primary-blue);
        border-radius: 12px;
        padding: 0;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        max-width: 450px;
        backdrop-filter: blur(20px);
        box-shadow: 0 0 40px var(--glow-blue);
        overflow: hidden;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 10);
    
    // Add close functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    });
    
    // Auto remove after 7 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 7000);
    
    // Add progress bar animation
    const progressBar = notification.querySelector('.notification-progress');
    progressBar.style.cssText = `
        height: 3px;
        background: linear-gradient(90deg, var(--primary-blue), var(--cyan));
        width: 100%;
        animation: notificationProgress 7s linear;
    `;
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'fa-check-circle';
        case 'error': return 'fa-exclamation-triangle';
        case 'warning': return 'fa-exclamation-circle';
        default: return 'fa-info-circle';
    }
}

function getNotificationTitle(type) {
    switch (type) {
        case 'success': return 'SUCCESS';
        case 'error': return 'ERROR';
        case 'warning': return 'WARNING';
        default: return 'INFO';
    }
}

// Add CSS for notification progress
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes notificationProgress {
        0% { width: 100%; }
        100% { width: 0%; }
    }
    
    .cyber-notification .notification-header {
        display: flex;
        align-items: center;
        padding: 20px;
        gap: 15px;
    }
    
    .cyber-notification .notification-icon {
        font-size: 24px;
        color: var(--primary-blue);
    }
    
    .cyber-notification .notification-content {
        flex: 1;
    }
    
    .cyber-notification .notification-title {
        font-family: 'Orbitron', monospace;
        font-size: 14px;
        font-weight: 700;
        color: var(--primary-blue);
        letter-spacing: 1px;
        margin-bottom: 5px;
    }
    
    .cyber-notification .notification-message {
        font-size: 16px;
        color: var(--white);
        line-height: 1.4;
    }
    
    .cyber-notification .notification-close {
        cursor: pointer;
        color: #cccccc;
        transition: color 0.3s ease;
        font-size: 18px;
    }
    
    .cyber-notification .notification-close:hover {
        color: var(--primary-blue);
    }
    
    .cyber-notification-success .notification-icon {
        color: #27ca3f;
    }
    
    .cyber-notification-error .notification-icon {
        color: #ff5f56;
    }
    
    .cyber-notification-warning .notification-icon {
        color: #ffbd2e;
    }
`;
document.head.appendChild(notificationStyle);

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.stat-card, .dashboard-card, .action-terminal');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add click effects to buttons
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
});

// Simulate real-time updates
setInterval(() => {
    if (isConnected && userData.staked > 0) {
        // Simulate daily reward accumulation
        const dailyReward = userData.staked * 0.01; // 1% daily
        userData.rewards += dailyReward;
        updateUI();
    }
}, 30000); // Update every 30 seconds for demo purposes

// Add Easter eggs
let clickCount = 0;
document.addEventListener('click', function() {
    clickCount++;
    if (clickCount === 20) {
        showCyberNotification('🎮 MATRIX PROTOCOL ACTIVATED - YOU FOUND THE SECRET!', 'success');
        clickCount = 0;
        
        // Add special effect
        document.body.style.filter = 'hue-rotate(180deg)';
        setTimeout(() => {
            document.body.style.filter = 'none';
        }, 3000);
    }
});

function addChatMessage(text, sender = 'bot') {
    if (!chatboxMessages) return;
    const msg = document.createElement('div');
    msg.className = `chatbox-message ${sender}`;
    msg.innerHTML = `<div class="chatbox-bubble">${text}</div>`;
    chatboxMessages.appendChild(msg);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

function addTypingAnimation() {
    if (!chatboxMessages) return;
    const typing = document.createElement('div');
    typing.className = 'chatbox-message bot chatbox-typing-row';
    typing.innerHTML = `<div class="chatbox-bubble"><span class="chatbox-typing"><span class="chatbox-typing-dot"></span><span class="chatbox-typing-dot"></span><span class="chatbox-typing-dot"></span></span></div>`;
    chatboxMessages.appendChild(typing);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}

function removeTypingAnimation() {
    const typing = chatboxMessages.querySelector('.chatbox-typing-row');
    if (typing) typing.remove();
}

function handleUserMessage(text) {
    if (!text.trim()) return;
    addChatMessage(text, 'user');
    addTypingAnimation();
    
    // Simula delay de digitação
    setTimeout(() => {
        removeTypingAnimation();
        
        const lowerText = text.toLowerCase();
        let response = '';
        
        // Busca resposta específica baseada em palavras-chave
        if (lowerText.includes('who') && lowerText.includes('you')) {
            response = chatFaqs[0].a;
        } else if (lowerText.includes('when') && (lowerText.includes('launch') || lowerText.includes('release'))) {
            response = chatFaqs[1].a;
        } else if (lowerText.includes('creator') || lowerText.includes('made') || lowerText.includes('elon')) {
            response = chatFaqs[2].a;
        } else if (lowerText.includes('security') || lowerText.includes('features') || lowerText.includes('protect')) {
            response = chatFaqs[3].a;
        } else if (lowerText.includes('cost') || lowerText.includes('price') || lowerText.includes('money')) {
            response = chatFaqs[4].a;
        } else if (lowerText.includes('special') || lowerText.includes('unique') || lowerText.includes('different')) {
            response = chatFaqs[5].a;
        } else if (lowerText.includes('hello') || lowerText.includes('hi') || lowerText.includes('hey')) {
            response = "Hello! I'm the Tesla Dog Robot AI. I'm here to answer your questions about my capabilities and the future of home security!";
        } else if (lowerText.includes('dog') || lowerText.includes('robot')) {
            response = "Yes, I'm a robotic dog! I combine the loyalty and instincts of a real dog with advanced AI technology to provide the ultimate home security experience.";
        } else if (lowerText.includes('tesla') || lowerText.includes('musk')) {
            response = "I'm proud to be part of the Tesla family! Elon Musk designed me to be the next evolution in home security, combining Tesla's neural network technology with advanced robotics.";
        } else {
            response = "That's an interesting question! I'm the Tesla Dog Robot, designed by Elon Musk for home security. Feel free to ask me about my features, launch date, or anything else about my capabilities!";
        }
        
        addChatMessage(response, 'bot');
    }, 1200);
}