/* =============================================
   PORTFOLIO WEBSITE - SCRIPT.JS
   All data is centralized at the top for easy editing
   ============================================= */

// ======================
// PERSONAL DATA (CHANGE THESE!)
// ======================
const DATA = {
    name: "Kiran Siddarth",
    greeting: "Hello, I'm",
    taglines: [
        "AI & ML Enthusiast",
        "Cyber Security Learner",
        "Python Developer",
        "NLP & LLM Builder",
        "Linux Enthusiast"
    ],
    heroDescription: "Building production-ready intelligent systems with LLMs, transformers, and clean Python code.",
    email: "kiranselva2004@gmail.com",
    phone: "+91-9342848440",
    location: "Chennai, India",
    linkedin: "https://www.linkedin.com/in/kiran-siddarth-b85b52313",
    github: "https://github.com/Kiransid2004",

    about: `AI & ML undergraduate with hands-on experience building LLM-powered and transformer-based chatbots using Flask and external APIs. Strong in Python, NLP pipelines, and model evaluation. Seeking an entry-level AI / Software role focused on production-ready intelligent systems.`,

    education: [
        {
            institution: "Panimalar Engineering College",
            degree: "B.Tech – Artificial Intelligence and Machine Learning",
            year: "2022 – 2026",
            detail: "CGPA: 7.02"
        },
        {
            institution: "St. Vincent School",
            degree: "Higher Secondary Education",
            year: "2020 – 2022",
            detail: ""
        }
    ],

    skills: [
        {
            category: "Languages",
            icon: "💻",
            items: ["Python", "SQL"]
        },
        {
            category: "Frameworks & Tools",
            icon: "🔧",
            items: ["Flask", "REST APIs", "Git", "GitHub", "VS Code", "Jupyter Notebook"]
        },
        {
            category: "AI / ML",
            icon: "🤖",
            items: ["Hugging Face Transformers", "LLM APIs (Gemini)", "Prompt Engineering", "Sentiment & Emotion Classification"]
        },
        {
            category: "Data Libraries",
            icon: "📊",
            items: ["Pandas", "NumPy", "Matplotlib"]
        },
        {
            category: "Core Concepts",
            icon: "🧠",
            items: ["NLP Basics", "API Integration", "Model Evaluation Metrics", "Secure Credential Storage"]
        }
    ],

    projects: [
        {
            title: "Sentibee – Sentiment Analysis Chatbot",
            date: "July 2025",
            description: [
                "Built Flask chatbot using Google Gemini API for sentiment detection and recommendation.",
                "Achieved ~86% sentiment classification accuracy on labeled test prompts.",
                "Maintained average response time under 2 seconds."
            ],
            tech: ["Python", "Flask", "Gemini API", "NLP"],
            liveDemo: "https://sentibee-chatbot-live.onrender.com/",
            github: ""
        },
        {
            title: "HealHive – Emotion Aware Chatbot",
            date: "June 2025",
            description: [
                "Developed transformer-based emotion classifier with Flask backend.",
                "Reached 84% accuracy and F1-score 0.82.",
                "Integrated YouTube Data API for emotion-based content delivery."
            ],
            tech: ["Python", "Transformers", "Flask", "YouTube API"],
            liveDemo: "",
            github: ""
        },
        {
            title: "SecurePass – Password Manager",
            date: "March 2025",
            description: [
                "Built Python password manager with strong password generator.",
                "Enforced strength validation and tested on 100+ passwords.",
                "Implemented structured secure credential storage workflow."
            ],
            tech: ["Python", "Security", "CLI"],
            liveDemo: "",
            github: "https://github.com/Kiransid2004/Securepass.git"
        },
        {
            title: "Autonomous Line Following Robot",
            date: "April 2025",
            description: [
                "Designed IR-sensor based line-following robot with feedback control.",
                "Achieved >95% path tracking accuracy.",
                "Reduced deviation through calibrated sensor thresholds."
            ],
            tech: ["Arduino", "IR Sensors", "Robotics"],
            liveDemo: "",
            github: ""
        }
    ],

    certifications: [
        { title: "Principles of Generative AI", org: "Infosys Springboard", icon: "🎓" },
        { title: "Cyber Security Fundamentals", org: "NASSCOM", icon: "🔒" },
        { title: "Data Analytics and Visualization", org: "Forage", icon: "📈" },
        { title: "Network and Network Security", org: "Prompt Infotech", icon: "🌐" }
    ],

    languages: ["English (Fluent)", "Tamil (Fluent)"]
};

// ======================
// DOM CONTENT LOADED
// ======================
document.addEventListener('DOMContentLoaded', () => {
    initTypingEffect();
    initScrollReveal();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initTerminalNav();
});

// ======================
// TERMINAL NAVIGATOR
// ======================
function initTerminalNav() {
    const cmds = document.querySelectorAll('.tnav-cmd');
    const input = document.getElementById('tnav-input');
    const output = document.getElementById('tnav-output');
    if (!input || !output) return;

    // Lock scrolling initially — user must use terminal to navigate
    document.body.classList.add('scroll-locked');

    // Command → section mapping
    const commandMap = {};
    cmds.forEach(cmd => {
        const key = cmd.dataset.cmd.toLowerCase();
        const target = cmd.dataset.target;
        commandMap[key] = target;
    });

    // Alias shortcuts
    const aliases = {
        'about': 'about', 'skills': 'skills', 'projects': 'projects',
        'education': 'education', 'certs': 'certifications', 'certifications': 'certifications',
        'contact': 'contact', '1': 'about', '2': 'skills', '3': 'projects',
        '4': 'education', '5': 'certifications', '6': 'contact'
    };

    // Response messages per section
    const responses = {
        about: 'Loading about.md... Navigating to About section ✓',
        skills: 'Fetching installed packages... Navigating to Skills ✓',
        projects: 'Listing project directory... Navigating to Projects ✓',
        education: 'Reading git log... Navigating to Education ✓',
        certifications: 'Reading ~/.certs... Navigating to Certifications ✓',
        contact: 'Executing contact_me.sh... Navigating to Contact ✓'
    };

    // Navigate to section with response
    function navigateToSection(sectionId, cmdText) {
        // Highlight active command
        cmds.forEach(c => c.classList.remove('active'));
        cmds.forEach(c => { if (c.dataset.target === sectionId) c.classList.add('active'); });

        // Show response
        const msg = responses[sectionId] || 'Navigating...';
        output.innerHTML = `
            <div class="tnav-resp-cmd">$ ${cmdText}</div>
            <div class="tnav-resp-msg">${msg}</div>
        `;

        // Unlock scroll and navigate after short delay
        setTimeout(() => {
            document.body.classList.remove('scroll-locked');
            const el = document.getElementById(sectionId);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 600);
    }

    // Click handler for command rows
    cmds.forEach(cmd => {
        cmd.addEventListener('click', () => {
            const target = cmd.dataset.target;
            const cmdText = cmd.dataset.cmd;
            input.value = cmdText;
            navigateToSection(target, cmdText);
        });
    });

    // Keyboard input handler
    input.addEventListener('keydown', (e) => {
        if (e.key !== 'Enter') return;
        const val = input.value.trim().toLowerCase();
        if (!val) return;

        // Check 'help' command
        if (val === 'help' || val === '--help' || val === 'man') {
            output.innerHTML = `
                <div class="tnav-resp-cmd">$ ${input.value}</div>
                <div class="tnav-resp-msg">Available commands:</div>
                <div class="tnav-resp-msg">  cat ./about.md &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; — About me</div>
                <div class="tnav-resp-msg">  pip list --skills &nbsp;&nbsp; — Tech stack</div>
                <div class="tnav-resp-msg">  ls -la ~/projects/ &nbsp; — Projects</div>
                <div class="tnav-resp-msg">  git log --education &nbsp;— Education</div>
                <div class="tnav-resp-msg">  cat ~/.certs &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; — Certifications</div>
                <div class="tnav-resp-msg">  ./contact_me.sh &nbsp;&nbsp;&nbsp;&nbsp; — Contact</div>
                <div class="tnav-resp-msg">  clear &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;— Clear output</div>
                <div class="tnav-resp-msg">  Or type a number (1-6) or section name</div>
            `;
            input.value = '';
            return;
        }

        // Check 'clear' command
        if (val === 'clear' || val === 'cls') {
            output.innerHTML = '';
            cmds.forEach(c => c.classList.remove('active'));
            input.value = '';
            return;
        }

        // Try exact match in commandMap
        let sectionId = commandMap[val];

        // Try aliases
        if (!sectionId) sectionId = aliases[val];

        // Try partial match
        if (!sectionId) {
            for (const [key, target] of Object.entries(commandMap)) {
                if (key.includes(val) || val.includes(target)) {
                    sectionId = target;
                    break;
                }
            }
        }

        if (sectionId) {
            navigateToSection(sectionId, input.value);
        } else {
            output.innerHTML = `
                <div class="tnav-resp-cmd">$ ${input.value}</div>
                <div class="tnav-resp-err">bash: ${input.value}: command not found</div>
                <div class="tnav-resp-msg">Type 'help' to see available commands.</div>
            `;
        }

        input.value = '';
    });
}

// ======================
// TYPING EFFECT
// ======================
function initTypingEffect() {
    const el = document.getElementById('typed-text');
    if (!el) return;

    const words = DATA.taglines;
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            el.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50;
        } else {
            el.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 400; // pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// ======================
// SCROLL REVEAL
// ======================
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

// ======================
// NAVBAR SCROLL EFFECT
// ======================
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        // Scrolled state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ======================
// MOBILE MENU
// ======================
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (!hamburger) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks.classList.toggle('open');
        document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navLinks.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

// ======================
// SMOOTH SCROLL
// ======================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}
