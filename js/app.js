// Projects configuration
const projects = [
    {
        id: 'lgv',
        name: 'LGV',
        title: 'LGV - Browser MMORPG Wuxia',
        description: 'Браузерная MMORPG в стиле Wuxia. Fullstack: Laravel + Go (WebSocket) + Vue.js. Microservices архитектура',
        tech: ['Laravel', 'Go', 'Vue.js', 'WebSocket', 'Docker'],
        github: 'https://github.com/Fesero/LGV',
        demo: null,
        stars: 0,
        commits: 243,
        thumbnail: 'assets/lgv.png',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
        id: 'tah',
        name: 'Test-Automation-Hub',
        title: 'Test Automation Hub - Monitoring Platform',
        description: 'Платформа для автоматизированного мониторинга и тестирования веб-сайтов. Vue.js frontend + Backend API',
        tech: ['Vue.js', 'PHP', 'API', 'WebSockets', 'Docker'],
        github: 'https://github.com/Fesero/Test-Automation-Hub',
        demo: null,
        stars: 0,
        commits: 156,
        thumbnail: 'assets/tah.png',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
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
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
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
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
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
            <img src="${project.thumbnail}" alt="${project.title}">
        </div>
        <div class="card-content">
            <h3 class="card-title">${project.title}</h3>
            <div class="card-tech">
                ${project.tech.slice(0, 3).map(t => `<span>${t}</span>`).join('')}
            </div>
        </div>
    `;
    
    return card;
}

// Switch project
function switchProject(index) {
    if (index === currentProjectIndex) return;
    
    // Update active state
    document.querySelectorAll('.project-card').forEach((card, i) => {
        card.classList.toggle('active', i === index);
    });
    
    currentProjectIndex = index;
    loadProject(index);
    
    // Reset timer
    videoTimer = 0;
    
    // Scroll card into view
    const cards = document.querySelectorAll('.project-card');
    cards[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

// Load project details
function loadProject(index) {
    const project = projects[index];
    const video = document.getElementById('mainVideo');
    const source = video.querySelector('source');
    
    // Smooth transition
    video.style.opacity = '0';
    
    setTimeout(() => {
        source.src = project.video;
        video.load();
        video.play();
        
        document.getElementById('currentProjectTitle').textContent = project.title;
        document.getElementById('currentProjectDesc').textContent = project.description;
        document.getElementById('currentStars').textContent = project.stars;
        document.getElementById('currentCommits').textContent = project.commits;
        document.getElementById('viewCount').textContent = Math.floor(Math.random() * 5000) + 1000;
        
        // Update tech badges
        const badgesContainer = document.getElementById('currentTechBadges');
        badgesContainer.innerHTML = project.tech.map(tech => 
            `<span class="tech-badge">${tech}</span>`
        ).join('');
        
        // Update buttons
        const viewLiveBtn = document.getElementById('viewLiveBtn');
        const viewCodeBtn = document.getElementById('viewCodeBtn');
        
        if (project.demo) {
            viewLiveBtn.onclick = () => window.open(project.demo, '_blank');
            viewLiveBtn.style.display = 'flex';
            viewLiveBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                </svg>
                ${project.id === 'tahanalyzer' ? 'View on Packagist' : 'View Live Demo'}
            `;
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
        track.scrollBy({ left: -300, behavior: 'smooth' });
    };
    
    document.getElementById('carouselNext').onclick = () => {
        const track = document.getElementById('carouselTrack');
        track.scrollBy({ left: 300, behavior: 'smooth' });
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
        
        // Update projects with real data
        for (const project of projects) {
            const repo = repos.find(r => r.name === project.name);
            if (repo) {
                project.stars = repo.stargazers_count;
                
                // Fetch commits count
                try {
                    const commitsResponse = await fetch(`https://api.github.com/repos/Fesero/${project.name}/commits?per_page=1`);
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
        
        // Reload current project
        loadProject(currentProjectIndex);
        loadCarousel();
        
    } catch (error) {
        console.log('Using fallback data');
    }
}

// Auto-play next project every 30 seconds
setInterval(() => {
    const nextIndex = (currentProjectIndex + 1) % projects.length;
    switchProject(nextIndex);
}, 30000);
