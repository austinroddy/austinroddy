// Retro-inspired JavaScript with Matrix effects and retro UI interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all retro effects
    initMatrixEffect();
    initTypingEffect();
    initRetroControls();
    initGlitchEffects();
    initCRTEffects();
});

// Matrix digital rain effect
function initMatrixEffect() {
    const matrixBg = document.querySelector('.matrix-bg');
    
    // Create falling characters
    for (let i = 0; i < 50; i++) {
        createMatrixCharacter(matrixBg);
    }
}

function createMatrixCharacter(container) {
    const char = document.createElement('div');
    char.className = 'matrix-char';
    char.textContent = String.fromCharCode(0x30A0 + Math.random() * 96); // Japanese katakana
    char.style.position = 'absolute';
    char.style.color = '#00ff00';
    char.style.fontSize = '20px';
    char.style.fontFamily = 'monospace';
    char.style.textShadow = '0 0 5px #00ff00';
    char.style.left = Math.random() * 100 + '%';
    char.style.top = '-20px';
    char.style.opacity = '0.7';
    char.style.zIndex = '-1';
    
    container.appendChild(char);
    
    // Animate falling
    animateMatrixChar(char);
}

function animateMatrixChar(char) {
    const duration = 3000 + Math.random() * 4000;
    const startTime = Date.now();
    
    function update() {
        const elapsed = Date.now() - startTime;
        const progress = elapsed / duration;
        
        if (progress < 1) {
            char.style.top = (progress * 120 - 20) + '%';
            char.style.opacity = 0.7 - (progress * 0.5);
            requestAnimationFrame(update);
        } else {
            char.remove();
            // Create new character after delay
            setTimeout(() => {
                if (document.querySelector('.matrix-bg')) {
                    createMatrixCharacter(document.querySelector('.matrix-bg'));
                }
            }, Math.random() * 2000);
        }
    }
    
    requestAnimationFrame(update);
}

// Typing effect for terminal
function initTypingEffect() {
    const typingText = document.querySelector('.typing-text');
    if (!typingText) return;
    
    const originalHTML = typingText.innerHTML;
    typingText.innerHTML = '';
    
    let charIndex = 0;
    const typeSpeed = 50; // milliseconds per character
    
    function typeNextChar() {
        if (charIndex < originalHTML.length) {
            const char = originalHTML.charAt(charIndex);
            if (char === '<') {
                // Handle HTML tags
                const tagEnd = originalHTML.indexOf('>', charIndex);
                if (tagEnd !== -1) {
                    const tag = originalHTML.substring(charIndex, tagEnd + 1);
                    typingText.innerHTML += tag;
                    charIndex = tagEnd + 1;
                } else {
                    typingText.innerHTML += char;
                    charIndex++;
                }
            } else {
                typingText.innerHTML += char;
                charIndex++;
            }
            
            // Scroll to bottom of terminal
            const terminalContent = document.querySelector('.terminal-content');
            terminalContent.scrollTop = terminalContent.scrollHeight;
            
            setTimeout(typeNextChar, typeSpeed);
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeNextChar, 1000);
}

// Retro control buttons functionality
function initRetroControls() {
    const controls = document.querySelectorAll('.control');
    
    controls.forEach(control => {
        control.addEventListener('click', function() {
            const action = this.textContent;
            
            // Add retro click sound effect (visual feedback)
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
            
            // Handle different control actions
            switch(action) {
                case '_':
                    minimizeWindow();
                    break;
                case '□':
                    maximizeWindow();
                    break;
                case '×':
                    closeWindow();
                    break;
            }
        });
    });
}

function minimizeWindow() {
    const container = document.querySelector('.container');
    container.style.transform = 'scale(0.8)';
    container.style.opacity = '0.5';
    container.style.transition = 'all 0.3s ease';
    
    setTimeout(() => {
        container.style.transform = 'scale(1)';
        container.style.opacity = '1';
    }, 1000);
}

function maximizeWindow() {
    const container = document.querySelector('.container');
    container.style.transform = 'scale(1.05)';
    container.style.transition = 'all 0.2s ease';
    
    setTimeout(() => {
        container.style.transform = 'scale(1)';
    }, 200);
}

function closeWindow() {
    const container = document.querySelector('.container');
    container.style.transform = 'scale(0.1)';
    container.style.opacity = '0';
    container.style.transition = 'all 0.5s ease';
    
    setTimeout(() => {
        container.style.transform = 'scale(1)';
        container.style.opacity = '1';
    }, 1000);
}

// Glitch effects for Matrix feel
function initGlitchEffects() {
    const terminal = document.querySelector('.terminal-window');
    if (!terminal) return;
    
    // Random glitch effect
    setInterval(() => {
        if (Math.random() < 0.1) { // 10% chance every interval
            triggerGlitch(terminal);
        }
    }, 3000);
}

function triggerGlitch(element) {
    const originalTransform = element.style.transform;
    
    // Quick glitch animation
    element.style.transform = 'translate(-2px, 2px) skew(2deg)';
    element.style.filter = 'hue-rotate(90deg)';
    
    setTimeout(() => {
        element.style.transform = 'translate(2px, -2px) skew(-2deg)';
    }, 50);
    
    setTimeout(() => {
        element.style.transform = originalTransform;
        element.style.filter = 'none';
    }, 100);
}

// CRT effects
function initCRTEffects() {
    // Add scan line movement
    const scanLine = document.createElement('div');
    scanLine.className = 'scan-line';
    scanLine.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, transparent, rgba(0, 255, 0, 0.3), transparent);
        z-index: 9999;
        pointer-events: none;
        animation: scan-line 8s linear infinite;
    `;
    
    document.body.appendChild(scanLine);
    
    // Add CSS animation for scan line
    const style = document.createElement('style');
    style.textContent = `
        @keyframes scan-line {
            0% { transform: translateY(-100vh); }
            100% { transform: translateY(100vh); }
        }
    `;
    document.head.appendChild(style);
}

// Retro button interactions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('retro-button')) {
        // Add retro button click effect
        e.target.style.transform = 'scale(0.95)';
        e.target.style.boxShadow = 'inset 2px 2px 0 rgba(0, 0, 0, 0.3)';
        
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
            e.target.style.boxShadow = 'inset 1px 1px 0 rgba(255, 255, 255, 0.5)';
        }, 150);
    }
});

// Matrix-style cursor effect
document.addEventListener('mousemove', function(e) {
    const cursor = document.querySelector('.matrix-cursor') || createMatrixCursor();
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

function createMatrixCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'matrix-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, rgba(0, 255, 0, 0.8) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: screen;
        animation: cursor-pulse 2s ease-in-out infinite;
    `;
    
    document.body.appendChild(cursor);
    
    // Add cursor pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes cursor-pulse {
            0%, 100% { transform: scale(1); opacity: 0.8; }
            50% { transform: scale(1.5); opacity: 0.4; }
        }
    `;
    document.head.appendChild(style);
    
    return cursor;
}

// Retro card interactions
document.addEventListener('mouseover', function(e) {
    if (e.target.closest('.retro-card')) {
        const card = e.target.closest('.retro-card');
        card.style.transform = 'translateY(-2px)';
        card.style.boxShadow = `
            inset 2px 2px 0 rgba(255, 255, 255, 0.5),
            inset -2px -2px 0 rgba(0, 0, 0, 0.3),
            0 8px 16px rgba(0, 0, 0, 0.3)
        `;
        card.style.transition = 'all 0.2s ease';
    }
});

document.addEventListener('mouseout', function(e) {
    if (e.target.closest('.retro-card')) {
        const card = e.target.closest('.retro-card');
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = `
            inset 2px 2px 0 rgba(255, 255, 255, 0.5),
            inset -2px -2px 0 rgba(0, 0, 0, 0.3)
        `;
    }
});

// Terminal blinking cursor effect
function addBlinkingCursor() {
    const terminal = document.querySelector('.terminal-content');
    if (!terminal) return;
    
    const cursor = document.createElement('span');
    cursor.className = 'blinking-cursor';
    cursor.textContent = '|';
    cursor.style.cssText = `
        color: #00ff00;
        animation: blink 1s infinite;
    `;
    
    terminal.appendChild(cursor);
    
    // Add blinking animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes blink {
            0%, 50% { opacity: 1; }
            51%, 100% { opacity: 0; }
        }
    `;
    document.head.appendChild(style);
}

// Initialize blinking cursor after typing effect
setTimeout(addBlinkingCursor, 8000);

// Easter egg: Konami code for special Matrix effect
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

document.addEventListener('keydown', function(e) {
    konamiCode.push(e.code);
    
    if (konamiCode.length > konamiSequence.length) {
        konamiCode.shift();
    }
    
    if (konamiCode.join(',') === konamiSequence.join(',')) {
        triggerMatrixMode();
        konamiCode = [];
    }
});

function triggerMatrixMode() {
    document.body.style.filter = 'hue-rotate(180deg) saturate(2)';
    document.body.style.animation = 'matrix-mode 5s ease-in-out';
    
    // Add matrix mode animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes matrix-mode {
            0%, 100% { filter: hue-rotate(180deg) saturate(2); }
            50% { filter: hue-rotate(360deg) saturate(3) contrast(1.5); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        document.body.style.filter = 'none';
        document.body.style.animation = 'none';
    }, 5000);
}
