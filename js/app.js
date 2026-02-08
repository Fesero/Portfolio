// Projects configuration
const projects = [
    {
        id: 'lgv',
        name: 'LGV',
        title: 'LGV - Browser MMORPG Wuxia',
        description: 'Браузерная MMORPG в стиле Wuxia. Fullstack: Laravel + Go (WebSocket) + Vue.js',
        tech: ['Laravel', 'Go', 'Vue.js', 'WebSocket', 'Docker'],
        github: 'https://github.com/Fesero/LGV',
        demo: null,
        stars: 0,
        commits: 243,
        thumbnail: 'assets/lgv.png',
        video: 'assets/lgv.mp4'
    },
    {
        id: 'tah',
        name: 'Test-Automation-Hub',
        title: 'Test Automation Hub - Monitoring Platform',
        description: 'Платформа для автоматизированного мониторинга и тестирования веб-сайтов. Vue.js frontend + PHP',
        tech: ['Vue.js', 'PHP', 'API', 'WebSockets', 'Docker'],
        github: 'https://github.com/Fesero/Test-Automation-Hub',
        demo: null,
        stars: 0,
        commits: 156,
        thumbnail: 'assets/tah.png',
        video: 'assets/tah.mp4'
    },
    {
        id: 'tahanalyzer',
        name: 'tahanalyzer',
        title: 'TAH Analyzer - Composer Package',
        description: 'Composer пакет для сбора и анализа результатов тестирования. Интеграция с Test Automation Hub',
        tech: ['PHP', 'Composer', 'PHPUnit', 'Testing'],
        github: 'https://github.com/Fesero/tahanalyzer',
        demo: 'https://packagist.org/packages/fesero/tahanalyzer',
        stars: 0,
        commits: 73,
        thumbnail: 'assets/analyzer.png',
        video: 'assets/analyzer.mp4'
    },
    {
        id: 'bitrix',
        name: 'BitrixProject',
        title: 'Bitrix CMS Learning Project',
        description: 'Учебный проект для изучения Bitrix Framework. Docker окружение для разработки с Bitrix CMS',
        tech: ['PHP', 'Bitrix', 'Docker', 'MySQL'],
        github: 'https://github.com/Fesero/BitrixProject',
        demo: null,
        stars: 0,
        commits: 89,
        thumbnail: 'assets/bitrix.png',
        video: 'assets/bitrix.mp4'
    }
];

let currentProjectIndex = 0;
let videoTimer = 0;
let timerInterval;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCarousel();
    loadProject(0);
    startTimer();
    setupEventListeners();
    fetchGitHubStats();
});

// Netflix-style scroll effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.top-nav');
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Minimize/Maximize profile
const minimizeBtn = document.querySelector('.minimize-btn');
const compactProfile = document.querySelector('.compact-profile');
const profileAvatar = document.querySelector('.profile-avatar-compact');

minimizeBtn.addEventListener('click', () => {
    compactProfile.classList.toggle('minimized');
});

profileAvatar.addEventListener('click', () => {
    if (compactProfile.classList.contains('minimized')) {
        compactProfile.classList.remove('minimized');
    }
});

// Load carousel cards
function loadCarousel() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    
    projects.forEach((project, index) => {
        const card = createProjectCard(project, index);
        track.appendChild(card);
    });
}

// Create project card
function createProjectCard(project, index) {
    const card = document.createElement('div');
    card.className = 'project-card';
    if (index === currentProjectIndex) card.classList.add('active');
    card.onclick = () => switchProject(index);
    
    card.innerHTML = `
        <div class="card-thumbnail">
            <img src="${project.thumbnail}" alt="${project.title}" 
                 onerror="this.src='https://via.placeholder.com/400x220/1a1a1a/9147ff?text=${encodeURIComponent(project.name)}'">
        </div>
        <div class="card-content">
            <h3 class="card-title">${project.title}</h3>
            <div class="card-tech">
                ${project.tech.slice(0, 4).map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Switch project
function switchProject(index) {
    if (index === currentProjectIndex) return;
    
    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    currentProjectIndex = index;
    loadProject(index);
    videoTimer = 0;
    
    const cards = document.querySelectorAll('.project-card');
    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// Load project details
function loadProject(index) {
    const project = projects[index];
    const video = document.getElementById('mainVideo');
    const source = video.querySelector('source');
    
    video.style.opacity = '0';
    
    setTimeout(() => {
        source.src = project.video;
        video.load();
        video.play().catch(() => console.log('Autoplay prevented'));
        
        document.getElementById('currentProjectTitle').textContent = project.title;
        document.getElementById('currentProjectDesc').textContent = project.description;
        document.getElementById('currentStars').textContent = project.stars;
        document.getElementById('currentCommits').textContent = project.commits;
        
        const badgesContainer = document.getElementById('currentTechBadges');
        badgesContainer.innerHTML = project.tech.map(tech => 
            `<span class="tech-badge">${tech.toUpperCase()}</span>`
        ).join('');
        
        const viewLiveBtn = document.getElementById('viewLiveBtn');
        const viewCodeBtn = document.getElementById('viewCodeBtn');
        
        if (project.demo) {
            viewLiveBtn.onclick = () => window.open(project.demo, '_blank');
            viewLiveBtn.style.display = 'flex';
        } else {
            viewLiveBtn.style.display = 'none';
        }
        
        viewCodeBtn.onclick = () => window.open(project.github, '_blank');
        
        video.style.opacity = '1';
    }, 300);
}

// Timer
function startTimer() {
    timerInterval = setInterval(() => {
        videoTimer++;
        const mins = Math.floor(videoTimer / 60).toString().padStart(2, '0');
        const secs = (videoTimer % 60).toString().padStart(2, '0');
        document.getElementById('videoTimer').textContent = `${mins}:${secs}`;
    }, 1000);
}

// Setup event listeners
function setupEventListeners() {
    // Carousel controls
    document.getElementById('carouselPrev').onclick = () => {
        const track = document.getElementById('carouselTrack');
        track.scrollBy({ left: -420, behavior: 'smooth' });
    };
    
    document.getElementById('carouselNext').onclick = () => {
        const track = document.getElementById('carouselTrack');
        track.scrollBy({ left: 420, behavior: 'smooth' });
    };
    
    // Filter buttons
    document.querySelectorAll('.nav-btn[data-filter]').forEach(btn => {
        btn.onclick = () => {
            document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProjects(btn.dataset.filter);
        };
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            const prev = (currentProjectIndex - 1 + projects.length) % projects.length;
            switchProject(prev);
        } else if (e.key === 'ArrowRight') {
            const next = (currentProjectIndex + 1) % projects.length;
            switchProject(next);
        } else if (e.key === ' ') {
            e.preventDefault();
            const video = document.getElementById('mainVideo');
            video.paused ? video.play() : video.pause();
        }
    });
}

// Filter projects
function filterProjects(filter) {
    if (filter === 'all') {
        loadCarousel();
        return;
    }
    
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    
    const filtered = projects.filter(p => 
        p.tech.some(t => t.toLowerCase().includes(filter.toLowerCase()))
    );
    
    filtered.forEach((project, index) => {
        const card = createProjectCard(project, projects.indexOf(project));
        track.appendChild(card);
    });
}

// Fetch real GitHub stats
async function fetchGitHubStats() {
    try {
        const response = await fetch('https://api.github.com/users/Fesero/repos?per_page=100');
        const repos = await response.json();
        
        for (const project of projects) {
            const repo = repos.find(r => r.name === project.name);
            if (repo) {
                project.stars = repo.stargazers_count;
                
                try {
                    const commitsResponse = await fetch(
                        `https://api.github.com/repos/Fesero/${project.name}/commits?per_page=1`
                    );
                    const linkHeader = commitsResponse.headers.get('Link');
                    if (linkHeader) {
                        const match = linkHeader.match(/page=(\d+)>; rel="last"/);
                        if (match) project.commits = parseInt(match[1]);
                    }
                } catch (e) {
                    console.log('Could not fetch commits for', project.name);
                }
            }
        }
        
        loadProject(currentProjectIndex);
        loadCarousel();
        
    } catch (error) {
        console.log('Using fallback data');
    }
}

// Live viewer count animation
setInterval(() => {
    const viewCount = document.getElementById('viewCount');
    const currentCount = parseInt(viewCount.textContent);
    const change = Math.floor(Math.random() * 20) - 10;
    const newCount = Math.max(1000, currentCount + change);
    viewCount.textContent = newCount;
}, 8000);

// Auto-play next project every 30 seconds
setInterval(() => {
    const nextIndex = (currentProjectIndex + 1) % projects.length;
    switchProject(nextIndex);
}, 30000);
