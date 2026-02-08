// Projects configuration
const projects = [
    {
        id: 'lgv',
        name: 'LGV',
        title: 'LGV - Laravel Garage Management',
        description: 'Полнофункциональная система управления автосервисом с Laravel и Vue.js',
        tech: ['Laravel', 'Vue.js', 'MySQL', 'Blade'],
        github: 'https://github.com/Fesero/LGV',
        demo: null,
        stars: 0,
        commits: 127,
        thumbnail: 'https://via.placeholder.com/400x200/9147ff/ffffff?text=LGV',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
    },
    {
        id: 'bitrix',
        name: 'BitrixProject',
        title: 'Bitrix CMS Corporate Portal',
        description: 'Корпоративный портал на базе Bitrix Framework с кастомными модулями',
        tech: ['PHP', 'Bitrix', 'JavaScript', 'MySQL'],
        github: 'https://github.com/Fesero/BitrixProject',
        demo: null,
        stars: 0,
        commits: 89,
        thumbnail: 'https://via.placeholder.com/400x200/667eea/ffffff?text=Bitrix',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
    },
    {
        id: 'tah',
        name: 'Test-Automation-Hub',
        title: 'Test Automation Hub',
        description: 'Централизованная платформа для управления автоматизированным тестированием',
        tech: ['Vue.js', 'Node.js', 'MongoDB', 'Docker'],
        github: 'https://github.com/Fesero/Test-Automation-Hub',
        demo: null,
        stars: 0,
        commits: 156,
        thumbnail: 'https://via.placeholder.com/400x200/f093fb/ffffff?text=TAH',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4'
    },
    {
        id: 'tahanalyzer',
        name: 'tahanalyzer',
        title: 'TAH Results Analyzer',
        description: 'Инструмент для анализа и визуализации результатов автоматизированных тестов',
        tech: ['PHP', 'Laravel', 'Chart.js', 'Redis'],
        github: 'https://github.com/Fesero/tahanalyzer',
        demo: null,
        stars: 0,
        commits: 73,
        thumbnail: 'https://via.placeholder.com/400x200/4facfe/ffffff?text=Analyzer',
        video: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4'
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
        const response = await fetch('https://api.github.com/users/Fesero/repos');
        const repos = await response.json();
        
        // Update projects with real data
        projects.forEach(project => {
            const repo = repos.find(r => r.name === project.name);
            if (repo) {
                project.stars = repo.stargazers_count;
                project.commits = repo.size; // Approximate
            }
        });
        
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
