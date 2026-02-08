<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fesero - Portfolio Stream</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <!-- Top Navigation -->
    <nav class="top-nav">
        <div class="nav-left">
            <div class="logo">
                <svg width="32" height="32" viewBox="0 0 32 32">
                    <circle cx="16" cy="16" r="14" fill="#9147ff"/>
                    <path d="M12 10h2v8h-2zm6 0h2v8h-2z" fill="white"/>
                </svg>
                <span>PORTFOLIO</span>
            </div>
        </div>
        
        <div class="nav-center">
            <button class="nav-btn active" data-filter="all">Все проекты</button>
            <button class="nav-btn" data-filter="php">PHP</button>
            <button class="nav-btn" data-filter="vue">Vue.js</button>
            <button class="nav-btn" data-filter="laravel">Laravel</button>
        </div>
        
        <div class="nav-right">
            <a href="https://github.com/Fesero" target="_blank" class="github-btn">
                <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                </svg>
                GitHub
            </a>
        </div>
    </nav>

    <!-- Main Content -->
    <main class="main-content">
        <!-- Video Player -->
        <div class="video-player" id="videoPlayer">
            <video id="mainVideo" autoplay muted loop playsinline>
                <source src="" type="video/mp4">
            </video>
            
            <!-- Video Overlay -->
            <div class="video-gradient"></div>
            
            <!-- Top Info -->
            <div class="video-top-info">
                <div class="live-indicator">
                    <span class="live-dot"></span>
                    <span class="live-text">SHOWCASE</span>
                </div>
                <div class="viewer-count">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M8 3C4.5 3 1.7 5.3 1 8c.7 2.7 3.5 5 7 5s6.3-2.3 7-5c-.7-2.7-3.5-5-7-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                        <circle cx="8" cy="8" r="1.5"/>
                    </svg>
                    <span id="viewCount">0</span>
                </div>
            </div>
            
            <!-- Center Info -->
            <div class="video-center-info">
                <h1 class="project-title" id="currentProjectTitle">Loading Project...</h1>
                <p class="project-description" id="currentProjectDesc">Initializing...</p>
            </div>
            
            <!-- Bottom Info -->
            <div class="video-bottom-info">
                <div class="project-meta">
                    <div class="tech-badges" id="currentTechBadges">
                        <span class="tech-badge">Loading...</span>
                    </div>
                    <div class="project-stats">
                        <span class="stat">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
                            </svg>
                            <span id="currentStars">0</span>
                        </span>
                        <span class="stat">
                            <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                                <path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878z"/>
                            </svg>
                            <span id="currentCommits">0</span> commits
                        </span>
                    </div>
                </div>
                <div class="project-actions">
                    <button class="action-btn primary" id="viewLiveBtn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0z"/>
                            <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                        </svg>
                        View Live Demo
                    </button>
                    <button class="action-btn secondary" id="viewCodeBtn">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M4.72 3.22a.75.75 0 011.06 1.06L2.06 8l3.72 3.72a.75.75 0 11-1.06 1.06L.47 8.53a.75.75 0 010-1.06l4.25-4.25zm6.56 0a.75.75 0 10-1.06 1.06L13.94 8l-3.72 3.72a.75.75 0 101.06 1.06l4.25-4.25a.75.75 0 000-1.06l-4.25-4.25z"/>
                        </svg>
                        Source Code
                    </button>
                </div>
            </div>
            
            <!-- Time Display -->
            <div class="video-time">
                <span id="videoTimer">00:00</span>
            </div>
        </div>

        <!-- Streamer Info (Right Sidebar) -->
        <aside class="streamer-info">
            <div class="streamer-card">
                <img src="https://github.com/Fesero.png" alt="Fesero" class="streamer-avatar">
                <div class="streamer-details">
                    <h3 class="streamer-name">Fesero</h3>
                    <p class="streamer-title">Web Developer</p>
                    <div class="subscriber-count">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        <span id="subscriberCount">243K</span> followers
                    </div>
                </div>
                <div class="tech-stack-mini">
                    <span>PHP</span>
                    <span>Laravel</span>
                    <span>Vue.js</span>
                    <span>MySQL</span>
                </div>
            </div>
            
            <div class="contact-buttons">
                <a href="mailto:your@email.com" class="contact-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                    </svg>
                    Email
                </a>
                <a href="https://t.me/yourusername" target="_blank" class="contact-btn">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z"/>
                    </svg>
                    Telegram
                </a>
            </div>
        </aside>
    </main>

    <!-- Bottom Carousel -->
    <div class="bottom-carousel">
        <div class="carousel-header">
            <h2>Upnext</h2>
            <div class="carousel-controls">
                <button class="carousel-control prev" id="carouselPrev">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
                    </svg>
                </button>
                <button class="carousel-control next" id="carouselNext">
                    <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
                        <path d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                </button>
            </div>
        </div>
        <div class="carousel-track" id="carouselTrack">
            <!-- Cards will be inserted here by JS -->
        </div>
    </div>

    <script src="js/app.js"></script>
</body>
</html>
