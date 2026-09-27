/**
 * =======================================================================
 *                    PREMIUM BIO-LINK CORE ENGINE
 * =======================================================================
 * High-performance audio/video synchronization, Discord Lanyard API,
 * Dynamic Discord Server Fetcher, Nitro Badge decoding, 3D tilt interaction,
 * star sparkle cursor emitter, full-screen snap-scrolling with directional reveals,
 * vertical pagination line, dynamic clock, enterprise security & owner control panel.
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. STATE MANAGEMENT
    // -------------------------------------------------------------------
    let currentTrackIdx = 0;
    let isPlaying = false;
    let isMuted = false;
    let currentVolume = 0.75;
    let currentSpeedIdx = 0;
    const playbackSpeeds = [1.0, 1.25, 1.5, 2.0];
    let lyricOffset = 0.0;
    let activeLyricIdx = -1;
    let isScrolling = false;
    let currentSlideIdx = 0;

    // Elements
    const bgVideo = document.getElementById('bg-video');
    const mainAudio = document.getElementById('main-audio');
    const entryOverlay = document.getElementById('entry-overlay');
    const entryBtn = document.getElementById('entry-btn');
    const playBtn = document.getElementById('playBtn');
    const playIcon = document.getElementById('playIcon');
    const pauseIcon = document.getElementById('pauseIcon');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const speedBtn = document.getElementById('speedBtn');
    const volumeToggle = document.getElementById('volumeToggle');
    const volumeSlider = document.getElementById('volumeSlider');
    const progressBarContainer = document.getElementById('progressBarContainer');
    const progressBarFill = document.getElementById('progressBarFill');
    const currentTimeText = document.getElementById('currentTime');
    const totalDurationText = document.getElementById('totalDuration');
    const lyricsScrollContainer = document.getElementById('lyricsScrollContainer');
    const queueToggleBtn = document.getElementById('queueToggleBtn');
    const queuePanel = document.getElementById('queuePanel');
    const queueList = document.getElementById('queueList');
    const audioVisualizer = document.getElementById('audioVisualizer');
    const focusModeToggle = document.getElementById('focusModeToggle');
    const musicSearchInput = document.getElementById('musicSearchInput');

    // Cursor & Security Elements
    const cursorDot = document.getElementById('cursorDot');
    const securityToast = document.getElementById('securityToast');

    // -------------------------------------------------------------------
    // 2. DELICATE STAR SPARKLE CURSOR EMITTER (NO CLUNKY RING)
    // -------------------------------------------------------------------
    let mouseX = -100, mouseY = -100;
    let lastSparkleTime = 0;
    const sparkleChars = ['✦', '✧', '✨', '⋆', '•'];
    const sparkleColors = ['#ffffff', '#ffe599', '#f3e8ff', '#fbcfe8', '#a855f7'];

    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        if (cursorDot) {
            cursorDot.style.left = `${mouseX}px`;
            cursorDot.style.top = `${mouseY}px`;
        }

        // Emit delicate trailing star sparkles
        const now = performance.now();
        if (now - lastSparkleTime > 40) { // ~25 sparkles/sec throttled
            lastSparkleTime = now;
            createMouseSparkle(e.clientX, e.clientY);
        }
    });

    function createMouseSparkle(x, y) {
        const span = document.createElement('span');
        span.className = 'mouse-star-sparkle';
        span.textContent = sparkleChars[Math.floor(Math.random() * sparkleChars.length)];
        
        const size = Math.floor(Math.random() * 8) + 11;
        const color = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        const dx = (Math.random() - 0.5) * 45;
        const dy = (Math.random() - 0.5) * 45 + 15;
        const rot = Math.floor(Math.random() * 180) - 90;

        span.style.left = `${x}px`;
        span.style.top = `${y}px`;
        span.style.fontSize = `${size}px`;
        span.style.color = color;
        span.style.setProperty('--dx', `${dx}px`);
        span.style.setProperty('--dy', `${dy}px`);
        span.style.setProperty('--rot', `${rot}deg`);

        document.body.appendChild(span);
        setTimeout(() => span.remove(), 750);
    }

    function attachCursorHover() {
        document.querySelectorAll('button, a, input, textarea, .badge-item, .widget-card, .about-subcard, .queue-item, .social-icon-link, .pagination-dot').forEach(el => {
            el.addEventListener('mouseenter', () => cursorDot && cursorDot.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorDot && cursorDot.classList.remove('hovering'));
        });
    }
    attachCursorHover();

    // -------------------------------------------------------------------
    // 3. AMBIENT FLOATING SNOWFLAKES & STARS FX
    // -------------------------------------------------------------------
    function initSnowflakes() {
        const container = document.getElementById('snowflakes-container');
        if (!container) return;
        const flakes = ['❄', '❅', '✦', '✧', '⋆'];
        const total = 26;

        for (let i = 0; i < total; i++) {
            const el = document.createElement('div');
            el.className = 'snowflake';
            el.textContent = flakes[Math.floor(Math.random() * flakes.length)];
            el.style.left = `${Math.random() * 100}vw`;
            el.style.animationDuration = `${Math.random() * 8 + 7}s`;
            el.style.animationDelay = `${Math.random() * 10}s`;
            el.style.fontSize = `${Math.random() * 9 + 10}px`;
            el.style.opacity = Math.random() * 0.7 + 0.25;
            container.appendChild(el);
        }
    }
    initSnowflakes();

    // -------------------------------------------------------------------
    // 4. GPU CANVAS AMBIENT PARTICLES (LUMINESCENT DUST)
    // -------------------------------------------------------------------
    const canvas = document.getElementById('ambient-particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width = canvas.width = window.innerWidth;
        let height = canvas.height = window.innerHeight;

        window.addEventListener('resize', () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        });

        const particles = [];
        const maxParticles = 35;

        window.addEventListener('mousemove', (e) => {
            if (particles.length < maxParticles) {
                particles.push({
                    x: e.clientX,
                    y: e.clientY,
                    size: Math.random() * 2 + 0.8,
                    alpha: 0.9,
                    vx: (Math.random() - 0.5) * 1.2,
                    vy: (Math.random() - 0.5) * 1.2
                });
            }
        });

        function animateParticles() {
            ctx.clearRect(0, 0, width, height);
            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                p.alpha -= 0.015;

                ctx.fillStyle = `rgba(216, 180, 254, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                if (p.alpha <= 0) {
                    particles.splice(i, 1);
                    i--;
                }
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();
    }

    // -------------------------------------------------------------------
    // 5. INITIALIZE PROFILE DATA FROM CONFIG.JS
    // -------------------------------------------------------------------
    function initProfile() {
        // 0. Auto-Customizer from Shareable Link URL Parameters
        const urlParams = new URLSearchParams(window.location.search);

        // 0.0 Check if loading a saved client template from CLIENTS_DB via ?u=slug
        if (urlParams.has('u')) {
            const slug = urlParams.get('u').trim().toLowerCase();
            let clientData = null;
            try {
                const db = JSON.parse(localStorage.getItem('CLIENTS_DB')) || {};
                clientData = db[slug];
            } catch(e) {}

            if (clientData) {
                localStorage.setItem('custom_discord_id', clientData.id);
                localStorage.setItem('custom_discord_display_name', clientData.displayName);
                localStorage.setItem('custom_discord_username', clientData.username);
                if (clientData.avatar) localStorage.setItem('custom_discord_avatar', clientData.avatar);
                if (clientData.deco) localStorage.setItem('custom_discord_deco', clientData.deco);
                if (clientData.quote) localStorage.setItem('custom_discord_quote', clientData.quote);
                if (clientData.effect) localStorage.setItem('custom_discord_effect', clientData.effect);
                if (clientData.status) localStorage.setItem('custom_discord_status', clientData.status);
                if (clientData.serverInvite) localStorage.setItem('custom_discord_server', clientData.serverInvite);

                CONFIG.discord.userId = clientData.id;
                CONFIG.profile.displayName = clientData.displayName;
                CONFIG.profile.username = clientData.username;
                CONFIG.profile.tagline = clientData.quote;
                CONFIG.profile.profileEffect = clientData.effect;
                CONFIG.profile.status = clientData.status;
            }
        }

        if (urlParams.has('id')) {
            const pId = urlParams.get('id').trim();
            localStorage.setItem('custom_discord_id', pId);
            CONFIG.discord.userId = pId;
        }
        if (urlParams.has('name')) {
            const pName = urlParams.get('name').trim();
            localStorage.setItem('custom_discord_display_name', pName);
            CONFIG.profile.displayName = pName;
        }
        if (urlParams.has('username')) {
            const pUser = urlParams.get('username').trim();
            localStorage.setItem('custom_discord_username', pUser);
            CONFIG.profile.username = pUser;
        }
        if (urlParams.has('quote')) {
            const pQuote = urlParams.get('quote').trim();
            localStorage.setItem('custom_discord_quote', pQuote);
            CONFIG.profile.tagline = pQuote;
        }
        if (urlParams.has('emojis')) {
            const pEmojis = urlParams.get('emojis').trim();
            localStorage.setItem('custom_discord_emojis', pEmojis);
            CONFIG.profile.statusEmojis = pEmojis;
        }
        if (urlParams.has('status')) {
            const pStatus = urlParams.get('status').trim();
            localStorage.setItem('custom_discord_status', pStatus);
            CONFIG.profile.status = pStatus;
        }
        if (urlParams.has('effect')) {
            const pEffect = urlParams.get('effect').trim();
            localStorage.setItem('custom_discord_effect', pEffect);
            CONFIG.profile.profileEffect = pEffect;
        }
        if (urlParams.has('server')) {
            const pServer = extractInviteCode(urlParams.get('server').trim());
            localStorage.setItem('custom_discord_server', pServer);
            CONFIG.discord.serverInviteCode = pServer;
        }

        // 0.1 12 Aesthetic Templates & Showcase Preview Handler
        const themeParam = urlParams.get('theme') || localStorage.getItem('custom_theme');
        let activeTheme = null;
        if (themeParam && typeof TEMPLATES_REGISTRY !== 'undefined' && Array.isArray(TEMPLATES_REGISTRY)) {
            activeTheme = TEMPLATES_REGISTRY.find(t => t.id === themeParam.toLowerCase());
        }

        if (activeTheme) {
            document.body.classList.add(`theme-${activeTheme.id}`);
            document.documentElement.style.setProperty('--accent-primary', activeTheme.accent);
            document.documentElement.style.setProperty('--accent-purple', activeTheme.accent);
            document.documentElement.style.setProperty('--accent-purple-glow', activeTheme.glow);
            document.documentElement.style.setProperty('--border-glow', activeTheme.glow);

            // If template preview mode (no custom user id or name provided in query)
            const isShowcasePreview = !urlParams.has('u') && !urlParams.has('name') && !urlParams.has('id');
            if (isShowcasePreview) {
                CONFIG.profile.displayName = activeTheme.sampleName;
                CONFIG.profile.username = activeTheme.sampleHandle;
                CONFIG.profile.tagline = activeTheme.sampleQuote;
                CONFIG.profile.statusEmojis = activeTheme.sampleEmojis;
                if (activeTheme.defaultVideo && !localStorage.getItem('custom_bg_video')) {
                    const bv = document.getElementById('bg-video');
                    if (bv) bv.src = activeTheme.defaultVideo;
                }

                // Inject sleek top floating showcase preview banner
                if (!document.getElementById('templatePreviewBanner')) {
                    const banner = document.createElement('div');
                    banner.id = 'templatePreviewBanner';
                    banner.className = 'template-preview-banner';
                    banner.innerHTML = `
                        <span class="template-preview-badge">${activeTheme.badge}</span>
                        <span>Template #${activeTheme.num}: <strong>${activeTheme.name}</strong> • Live Preview</span>
                        <a href="setup.html?theme=${activeTheme.id}" class="template-preview-action-btn">⚡ Use This Template</a>
                    `;
                    document.body.appendChild(banner);
                }
            }
        }

        // 0.2 Check for Discord OAuth2 Implicit Grant Access Token in URL hash (#access_token=...)
        if (window.location.hash && window.location.hash.includes('access_token=')) {
            try {
                const hashParams = new URLSearchParams(window.location.hash.substring(1));
                const token = hashParams.get('access_token');
                if (token) {
                    fetch('https://discord.com/api/v10/users/@me', {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                    .then(res => res.json())
                    .then(me => {
                        if (me && me.id) {
                            localStorage.setItem('custom_discord_id', me.id);
                            CONFIG.discord.userId = me.id;
                            const dName = me.global_name || me.username;
                            localStorage.setItem('custom_discord_display_name', dName);
                            CONFIG.profile.displayName = dName;
                            localStorage.setItem('custom_discord_username', me.username);
                            CONFIG.profile.username = me.username;
                            if (me.avatar) {
                                const isGif = me.avatar.startsWith('a_');
                                const avUrl = `https://cdn.discordapp.com/avatars/${me.id}/${me.avatar}.${isGif ? 'gif' : 'png'}?size=512`;
                                localStorage.setItem('custom_discord_avatar', avUrl);
                                CONFIG.profile.avatar = avUrl;
                            }
                            if (me.avatar_decoration_data && me.avatar_decoration_data.asset) {
                                const dec = `https://cdn.discordapp.com/avatar-decoration-presets/${me.avatar_decoration_data.asset}.png`;
                                localStorage.setItem('custom_discord_deco', dec);
                                CONFIG.profile.avatarDecoration = dec;
                            }
                            history.replaceState(null, '', window.location.pathname + window.location.search);
                            initProfile();
                            initDiscordLanyard();
                        }
                    })
                    .catch(e => console.warn('Discord OAuth2 error:', e));
                }
            } catch (e) {}
        }

        document.title = CONFIG.profile.pageTitle || "DANGER SHAWON | mjshahon";

        // 1. Display Name & Handle
        const storedDisplayName = localStorage.getItem('custom_discord_display_name');
        const displayName = storedDisplayName || CONFIG.profile.displayName || "DANGER SHAWON";
        const storedUsername = localStorage.getItem('custom_discord_username');
        const username = storedUsername || CONFIG.profile.username || "mjshahon";

        const profileDisplayNameEl = document.getElementById('profileDisplayName');
        if (profileDisplayNameEl) profileDisplayNameEl.textContent = displayName;

        const entryTitleGlimmer = document.getElementById('entryTitleGlimmer');
        if (entryTitleGlimmer) entryTitleGlimmer.textContent = displayName;

        const profileUsernameEl = document.getElementById('profileUsername');
        if (profileUsernameEl) profileUsernameEl.textContent = username;

        const discordUsernameEl = document.getElementById('discordUsername');
        if (discordUsernameEl) discordUsernameEl.textContent = displayName;

        // 2. Custom Status Quote & Emojis
        const storedQuote = localStorage.getItem('custom_discord_quote');
        const quote = storedQuote !== null ? storedQuote : (CONFIG.profile.tagline || "\"Legends don't announce themselves. They\"");
        const statusQuoteEl = document.getElementById('profileStatusQuote');
        if (statusQuoteEl) statusQuoteEl.textContent = quote;

        const storedEmojis = localStorage.getItem('custom_discord_emojis');
        const emojis = storedEmojis !== null ? storedEmojis : (CONFIG.profile.statusEmojis || "🎮 🖥️ ⚔️ ⚙️");
        const statusEmojisEl = document.getElementById('profileStatusEmojis');
        if (statusEmojisEl) statusEmojisEl.textContent = emojis;

        // 3. Status indicator (dnd, online, idle)
        const storedStatus = localStorage.getItem('custom_discord_status');
        const status = storedStatus || CONFIG.profile.status || "dnd";
        const mainAvatarStatus = document.getElementById('mainAvatarStatus');
        if (mainAvatarStatus) mainAvatarStatus.className = `main-avatar-status ${status}`;

        const profileStatusPronoun = document.getElementById('profileStatusPronoun');
        if (profileStatusPronoun) profileStatusPronoun.textContent = status;

        const discordStatusDot = document.getElementById('discordStatusDot');
        if (discordStatusDot) discordStatusDot.className = `status-dot ${status}`;

        const discordCustomStatus = document.getElementById('discordCustomStatus');
        if (discordCustomStatus) discordCustomStatus.innerHTML = `<span>${quote}</span>`;

        const discordActivity = document.getElementById('discordActivity');
        if (discordActivity) discordActivity.textContent = status === 'dnd' ? 'DO NOT DISTURB' : status.toUpperCase();

        // 4. Discord Shop Profile Effect: White Roses Frame
        const storedEffect = localStorage.getItem('custom_discord_effect');
        const effect = storedEffect || CONFIG.profile.profileEffect || "white_roses";
        const profileEffectEl = document.getElementById('discordProfileEffect');
        if (profileEffectEl) {
            if (effect === 'none') {
                profileEffectEl.classList.add('hidden');
            } else {
                profileEffectEl.classList.remove('hidden');
            }
        }

        // 5. Avatar & Decoration
        if (CONFIG.profile.avatar) {
            document.getElementById('mainAvatar').src = CONFIG.profile.avatar;
            document.getElementById('discordAvatar').src = CONFIG.profile.avatar;
        }
        if (CONFIG.profile.avatarDecoration) {
            const deco = document.getElementById('avatarDecoration');
            if (deco) {
                deco.src = CONFIG.profile.avatarDecoration;
                deco.style.display = 'block';
            }
        }
        if (!CONFIG.profile.verified) {
            const vBadge = document.getElementById('verifiedBadge');
            if (vBadge) vBadge.style.display = 'none';
        }
        document.getElementById('aboutBioText').innerHTML = CONFIG.profile.bioDescription || "";
        document.getElementById('footerLocation').textContent = CONFIG.profile.location || "Bangladesh";
        document.getElementById('visitorCount').textContent = (CONFIG.profile.viewsOffset || 14280).toLocaleString();

        // Render Default Badges immediately so they are ALWAYS visible
        renderDefaultBadges();
        renderSocialIcons();
        renderSkills();
        renderProjects();
        renderCustomButtons();
        renderQueue();
        attachCursorHover();
    }

    // -------------------------------------------------------------------
    // 6. DEFAULT NITRO & PRESTIGE BADGES RENDERER
    // -------------------------------------------------------------------
    function renderDefaultBadges() {
        const wrapper = document.querySelector('.badges-wrapper');
        if (!wrapper) return;
        wrapper.innerHTML = '';

        const badges = [
            {
                tooltip: "Discord Nitro Subscriber",
                icon: `<svg class="nitro-glow-badge" viewBox="0 0 24 24" fill="#f43f5e"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/></svg>`
            },
            {
                tooltip: "Server Booster (Level 3)",
                icon: `<svg class="nitro-glow-badge" viewBox="0 0 24 24" fill="#ec4899"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>`
            },
            {
                tooltip: "Active Developer",
                icon: `<svg viewBox="0 0 24 24" fill="#10b981"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/></svg>`
            },
            {
                tooltip: "HypeSquad Bravery",
                icon: `<svg viewBox="0 0 24 24" fill="#8b5cf6"><polygon points="12 2 2 12 12 22 22 12 12 2"/></svg>`
            },
            {
                tooltip: "Diamond Access",
                icon: `<svg viewBox="0 0 24 24" fill="#3b82f6"><polygon points="6 3 18 3 22 9 12 22 2 9 6 3"/></svg>`
            },
            {
                tooltip: "Crown Owner",
                icon: `<svg viewBox="0 0 24 24" fill="#eab308"><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z"/></svg>`
            }
        ];

        badges.forEach(b => {
            const item = document.createElement('div');
            item.className = 'badge-item';
            item.setAttribute('data-tooltip', b.tooltip);
            item.innerHTML = b.icon;
            wrapper.appendChild(item);
        });
        attachCursorHover();
    }

    // -------------------------------------------------------------------
    // 7. SOCIAL ICONS RENDERER
    // -------------------------------------------------------------------
    function renderSocialIcons() {
        const row = document.getElementById('socialIconsRow');
        row.innerHTML = '';

        const iconSVGs = {
            facebook: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7.5v-3H10V9.69c0-2.47 1.47-3.83 3.72-3.83 1.08 0 2.21.19 2.21.19v2.43h-1.24c-1.23 0-1.61.76-1.61 1.54V12h2.74l-.44 3h-2.3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg>`,
            instagram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0 3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`,
            tiktok: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74a2.89 2.89 0 0 1 2.31-4.64a2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>`,
            threads: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c2.42 0 4.64-.86 6.37-2.3l-1.44-1.44C15.58 19.34 13.88 20 12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8c4.27 0 7.74 3.35 7.98 7.57a3.02 3.02 0 0 1-2.98 3.43c-.88 0-1.64-.42-2.1-1.07A4.47 4.47 0 0 1 12 16.5c-2.48 0-4.5-2.02-4.5-4.5S9.52 7.5 12 7.5c1.47 0 2.78.71 3.6 1.8l1.45-1.45A6.47 6.47 0 0 0 12 5.5C8.41 5.5 5.5 8.41 5.5 12s2.91 6.5 6.5 6.5c1.55 0 2.97-.55 4.09-1.47A5.02 5.02 0 0 0 21 13c0-5.52-4.48-10-10-10zm0 7.5c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5-1.12-2.5-2.5-2.5z"/></svg>`,
            x: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>`,
            github: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>`,
            telegram: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.96 1.25-5.54 3.67-.52.36-1 .53-1.42.52-.47-.01-1.37-.26-2.03-.48-.82-.27-1.47-.42-1.42-.88.03-.24.37-.49 1.02-.75 3.99-1.74 6.66-2.89 8.01-3.45 3.81-1.59 4.6-1.87 5.12-1.88.11 0 .37.03.54.17.14.12.18.28.2.45-.02.07-.02.13-.03.2z"/></svg>`,
            discord: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M14.82 4.26a10.14 10.14 0 0 0-.53 1.1a14.66 14.66 0 0 0-4.58 0a10.14 10.14 0 0 0-.53-1.1a16 16 0 0 0-4.13 1.3a17.33 17.33 0 0 0-3 11.59a16.6 16.6 0 0 0 5.07 2.59A12.89 12.89 0 0 0 8.23 18a9.65 9.65 0 0 1-1.71-.83a3.39 3.39 0 0 0 .42-.33a11.66 11.66 0 0 0 10.12 0q.21.18.42.33a10.84 10.84 0 0 1-1.71.84a12.41 12.41 0 0 0 1.08 1.78a16.44 16.44 0 0 0 5.06-2.59a17.22 17.22 0 0 0-3-11.59a16.09 16.09 0 0 0-4.09-1.35zM8.68 14.81a1.94 1.94 0 0 1-1.8-2a1.93 1.93 0 0 1 1.8-2a1.93 1.93 0 0 1 1.8 2a1.93 1.93 0 0 1-1.8 2zm6.64 0a1.94 1.94 0 0 1-1.8-2a1.93 1.93 0 0 1 1.8-2a1.92 1.92 0 0 1 1.8 2a1.92 1.92 0 0 1 1.8 2a1.92 1.92 0 0 1-1.8 2z"/></svg>`,
            linkedin: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.74a1.45 1.45 0 1 0 0 2.9 1.45 1.45 0 0 0 0-2.9z"/></svg>`,
            whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.78 2.72 4.31 3.81.6.26 1.07.42 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.3z"/></svg>`,
            pinterest: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.367 18.62 0 12.017 0z"/></svg>`
        };

        for (const [platform, url] of Object.entries(CONFIG.socials || {})) {
            if (!url) continue;
            const a = document.createElement('a');
            a.className = 'social-icon-link';
            a.href = url;
            a.target = '_blank';
            a.rel = 'noopener noreferrer';
            a.title = platform.charAt(0).toUpperCase() + platform.slice(1);
            a.innerHTML = iconSVGs[platform] || `<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="8"/></svg>`;
            row.appendChild(a);
        }
    }

    // -------------------------------------------------------------------
    // 8. SKILLS, PROJECTS & BUTTONS RENDERER
    // -------------------------------------------------------------------
    function renderSkills() {
        const container = document.getElementById('skillsContainer');
        if (!container) return;
        container.innerHTML = '';
        (CONFIG.skills || []).forEach(skill => {
            const pill = document.createElement('div');
            pill.className = 'skill-pill';
            pill.innerHTML = `<img src="${skill.icon}" alt="${skill.name}"> <span>${skill.name}</span>`;
            container.appendChild(pill);
        });
    }

    function renderProjects() {
        const grid = document.getElementById('projectsGrid');
        if (!grid) return;
        grid.innerHTML = '';
        (CONFIG.projects || []).forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <div class="project-preview">
                    <img src="${p.preview}" alt="${p.title}">
                </div>
                <div class="project-body">
                    <div class="project-name">${p.title}</div>
                    <div class="project-desc">${p.description}</div>
                    <div class="project-tags">
                        ${(p.tags || []).map(t => `<span class="project-tag">${t}</span>`).join('')}
                    </div>
                    <a href="${p.linkUrl}" target="_blank" class="project-link-btn">${p.linkText || 'View Project'}</a>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    function renderCustomButtons() {
        const grid = document.getElementById('customButtonsGrid');
        if (!grid) return;
        grid.innerHTML = '';
        (CONFIG.customButtons || []).forEach(btn => {
            const a = document.createElement('a');
            a.className = 'custom-premium-btn';
            a.href = btn.url;
            a.target = '_blank';
            a.innerHTML = `
                <span>${btn.title}</span>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
            `;
            grid.appendChild(a);
        });
    }

    // -------------------------------------------------------------------
    // 8.9 DYNAMIC BACKGROUND VIDEO HANDLER (CUSTOM MP4 / YOUTUBE STREAM / PLAYLIST)
    // -------------------------------------------------------------------
    function applyCustomBackgroundVideo() {
        const urlParams = new URLSearchParams(window.location.search);
        const customBg = urlParams.get('bg') || localStorage.getItem('custom_bg_video');
        const ytBgContainer = document.getElementById('yt-bg-container');

        if (!customBg) {
            if (ytBgContainer) {
                ytBgContainer.style.display = 'none';
                ytBgContainer.innerHTML = '';
            }
            if (bgVideo) bgVideo.style.display = 'block';
            return false;
        }

        // Check if YouTube link
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = customBg.match(regExp);
        const ytId = (match && match[2].length === 11) ? match[2] : null;

        if (ytId) {
            if (bgVideo) bgVideo.style.display = 'none';
            if (ytBgContainer) {
                ytBgContainer.style.display = 'block';
                if (!ytBgContainer.querySelector('iframe')) {
                    ytBgContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
                }
            }
            return true;
        } else {
            if (ytBgContainer) {
                ytBgContainer.style.display = 'none';
                ytBgContainer.innerHTML = '';
            }
            if (bgVideo) {
                bgVideo.style.display = 'block';
                if (bgVideo.getAttribute('data-custom-src') !== customBg) {
                    bgVideo.setAttribute('data-custom-src', customBg);
                    bgVideo.src = customBg;
                    bgVideo.play().catch(() => {});
                }
            }
            return true;
        }
    }

    // -------------------------------------------------------------------
    // 9. MUSIC & VIDEO SYNCHRONIZATION SYSTEM (PRIMARY TRACK: YAD)
    // -------------------------------------------------------------------
    function loadTrack(index, autoPlay = true) {
        if (!CONFIG.playlist || CONFIG.playlist.length === 0) return;
        currentTrackIdx = (index + CONFIG.playlist.length) % CONFIG.playlist.length;
        const track = CONFIG.playlist[currentTrackIdx];

        // Update Track Meta
        document.getElementById('currentTrackTitle').textContent = track.title;
        document.getElementById('currentTrackArtist').textContent = track.artist;
        document.getElementById('currentTrackCover').src = track.coverUrl;

        // Update Background Video & Audio
        const hasCustomBg = applyCustomBackgroundVideo();
        if (!hasCustomBg) {
            bgVideo.src = track.videoUrl;
            bgVideo.playbackRate = playbackSpeeds[currentSpeedIdx];
        }
        mainAudio.src = track.audioUrl;
        mainAudio.playbackRate = playbackSpeeds[currentSpeedIdx];

        renderLyrics(track.lyrics || []);
        updateQueueActive();

        if (autoPlay && isPlaying) {
            playMedia();
        }
    }

    function playMedia() {
        isPlaying = true;
        playIcon.style.display = 'none';
        pauseIcon.style.display = 'block';
        if (audioVisualizer) audioVisualizer.classList.add('playing');

        bgVideo.muted = isMuted;
        bgVideo.volume = currentVolume;
        mainAudio.muted = isMuted;
        mainAudio.volume = currentVolume;

        mainAudio.play().catch(e => console.log('Audio play error:', e));
        
        const ytBg = document.getElementById('yt-bg-container');
        if (!ytBg || ytBg.style.display === 'none') {
            bgVideo.play().catch(e => console.log('Video play error:', e));
        }
    }

    function pauseMedia() {
        isPlaying = false;
        playIcon.style.display = 'block';
        pauseIcon.style.display = 'none';
        if (audioVisualizer) audioVisualizer.classList.remove('playing');

        mainAudio.pause();
        const ytBg = document.getElementById('yt-bg-container');
        if (!ytBg || ytBg.style.display === 'none') {
            bgVideo.pause();
        }
    }

    function togglePlay() {
        if (isPlaying) {
            pauseMedia();
        } else {
            playMedia();
        }
    }

    mainAudio.addEventListener('timeupdate', () => {
        const cur = mainAudio.currentTime;
        const dur = mainAudio.duration || 1;
        const percent = (cur / dur) * 100;
        progressBarFill.style.width = `${percent}%`;

        currentTimeText.textContent = formatTime(cur);
        totalDurationText.textContent = formatTime(dur);

        // Keep video synced with audio only when playing playlist-synced video
        const hasCustomBg = !!(new URLSearchParams(window.location.search).get('bg') || localStorage.getItem('custom_bg_video'));
        if (!hasCustomBg && Math.abs(bgVideo.currentTime - cur) > 0.25) {
            bgVideo.currentTime = cur;
        }

        highlightLyrics(cur + lyricOffset);
    });

    mainAudio.addEventListener('ended', () => {
        loadTrack(currentTrackIdx + 1, true);
    });

    progressBarContainer.addEventListener('click', (e) => {
        const rect = progressBarContainer.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const width = rect.width;
        const duration = mainAudio.duration;
        if (duration) {
            const newTime = (clickX / width) * duration;
            mainAudio.currentTime = newTime;
            const hasCustomBg = !!(new URLSearchParams(window.location.search).get('bg') || localStorage.getItem('custom_bg_video'));
            if (!hasCustomBg) {
                bgVideo.currentTime = newTime;
            }
        }
    });

    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    speedBtn.addEventListener('click', () => {
        currentSpeedIdx = (currentSpeedIdx + 1) % playbackSpeeds.length;
        const speed = playbackSpeeds[currentSpeedIdx];
        speedBtn.textContent = `${speed.toFixed(1)}x`;
        mainAudio.playbackRate = speed;
        bgVideo.playbackRate = speed;
    });

    prevBtn.addEventListener('click', () => loadTrack(currentTrackIdx - 1, true));
    nextBtn.addEventListener('click', () => loadTrack(currentTrackIdx + 1, true));
    playBtn.addEventListener('click', togglePlay);

    volumeSlider.addEventListener('input', (e) => {
        currentVolume = parseFloat(e.target.value);
        mainAudio.volume = currentVolume;
        bgVideo.volume = currentVolume;
        isMuted = (currentVolume === 0);
    });

    volumeToggle.addEventListener('click', () => {
        isMuted = !isMuted;
        mainAudio.muted = isMuted;
        bgVideo.muted = isMuted;
        volumeSlider.value = isMuted ? 0 : currentVolume;
    });

    // -------------------------------------------------------------------
    // 10. SYNCHRONIZED LYRICS ENGINE
    // -------------------------------------------------------------------
    function renderLyrics(lyrics) {
        lyricsScrollContainer.innerHTML = '';
        activeLyricIdx = -1;
        if (!lyrics || lyrics.length === 0) {
            lyricsScrollContainer.innerHTML = `<div class="lyrics-line active">♪ Instrumental / Lyrical Edit ♪</div>`;
            return;
        }
        lyrics.forEach((item, idx) => {
            const div = document.createElement('div');
            div.className = 'lyrics-line';
            div.dataset.time = item.time;
            div.dataset.idx = idx;
            div.textContent = item.text;
            lyricsScrollContainer.appendChild(div);
        });
    }

    function highlightLyrics(currentTime) {
        const lines = lyricsScrollContainer.querySelectorAll('.lyrics-line');
        if (!lines || lines.length === 0) return;

        let activeIdx = -1;
        lines.forEach((line, idx) => {
            const time = parseFloat(line.dataset.time || 0);
            if (currentTime >= time) {
                activeIdx = idx;
            }
        });

        if (activeIdx !== activeLyricIdx && activeIdx !== -1) {
            activeLyricIdx = activeIdx;
            lines.forEach(l => l.classList.remove('active'));
            const activeLine = lines[activeIdx];
            if (activeLine && lyricsScrollContainer) {
                activeLine.classList.add('active');
                const targetScroll = activeLine.offsetTop - (lyricsScrollContainer.clientHeight / 2) + (activeLine.clientHeight / 2);
                lyricsScrollContainer.scrollTo({ top: Math.max(0, targetScroll), behavior: 'smooth' });
            }
        }
    }

    document.getElementById('syncMinusBtn').addEventListener('click', () => {
        lyricOffset -= 0.5;
    });
    document.getElementById('syncPlusBtn').addEventListener('click', () => {
        lyricOffset += 0.5;
    });

    // -------------------------------------------------------------------
    // 11. QUEUE DRAWER & PLAYLIST SELECTOR
    // -------------------------------------------------------------------
    function renderQueue() {
        queueList.innerHTML = '';
        document.getElementById('queueTotalCount').textContent = `${CONFIG.playlist.length} Songs`;

        CONFIG.playlist.forEach((track, idx) => {
            const item = document.createElement('div');
            item.className = `queue-item ${idx === currentTrackIdx ? 'active' : ''}`;
            item.innerHTML = `
                <img src="${track.coverUrl}" class="queue-item-cover" alt="Cover">
                <div class="queue-item-meta">
                    <div class="queue-item-title">${track.title}</div>
                    <div class="queue-item-artist">${track.artist}</div>
                </div>
                <span style="font-size:11px; color:var(--text-sub);">#${idx + 1}</span>
            `;
            item.addEventListener('click', () => {
                loadTrack(idx, true);
                playMedia();
            });
            queueList.appendChild(item);
        });
    }

    function updateQueueActive() {
        const items = queueList.querySelectorAll('.queue-item');
        items.forEach((item, idx) => {
            if (idx === currentTrackIdx) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }

    if (queueToggleBtn) {
        queueToggleBtn.addEventListener('click', () => {
            if (queuePanel.style.display === 'none' || !queuePanel.style.display) {
                queuePanel.style.display = 'block';
            } else {
                queuePanel.style.display = 'none';
            }
        });
    }

    // Music Search Bar
    if (musicSearchInput) {
        musicSearchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            const items = queueList.querySelectorAll('.queue-item');
            if (queuePanel.style.display === 'none') {
                queuePanel.style.display = 'block';
            }
            items.forEach((item, idx) => {
                const trk = CONFIG.playlist[idx];
                const match = trk.title.toLowerCase().includes(query) || trk.artist.toLowerCase().includes(query);
                item.style.display = match ? 'flex' : 'none';
            });
        });
    }

    // Focus Mode Toggle
    if (focusModeToggle) {
        focusModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('focus-mode-active');
        });
    }

    // -------------------------------------------------------------------
    // 12. LUXURY AUDIO CHIME & INSTANT ENTRY UNLOCK
    // -------------------------------------------------------------------
    let hasEntered = false;

    function unlockAndEnter() {
        if (hasEntered) return;
        hasEntered = true;
        isScrolling = true;

        playEntryChime();
        if (entryOverlay) entryOverlay.classList.add('fade-out');
        document.body.classList.add('entered');

        // Guarantee viewport stays locked on Slide 0 (Profile)
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        currentSlideIdx = 0;
        updatePaginationLineFill(0);

        // Immediately trigger Slide 0's active state and shimmer
        const bioCard = document.getElementById('bioCard');
        if (bioCard) {
            bioCard.classList.add('shimmer-active');
            setTimeout(() => bioCard.classList.remove('shimmer-active'), 2000);
        }

        loadTrack(0, true);
        playMedia();

        // Prevent accidental gesture/wheel momentum from dragging to section 1 right after click
        setTimeout(() => {
            isScrolling = false;
        }, 750);
    }

    function playEntryChime() {
        try {
            const ctx = new (window.AudioContext || window.webkitAudioContext)();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.setValueAtTime(520, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.35);
            gain.gain.setValueAtTime(0.12, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.start();
            osc.stop(ctx.currentTime + 0.7);
        } catch(e) {}
    }

    // Set title on entry veil
    const entryTitleGlimmer = document.getElementById('entryTitleGlimmer');
    if (entryTitleGlimmer) {
        entryTitleGlimmer.textContent = CONFIG.profile.displayName || 'DANGER SHAWON';
    }

    if (entryBtn) {
        entryBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            unlockAndEnter();
        });
    }

    // Click anywhere on overlay to enter
    if (entryOverlay) {
        entryOverlay.addEventListener('click', unlockAndEnter);
    }

    // Wheel or keypress triggers instant unlock as well
    window.addEventListener('wheel', () => {
        if (!hasEntered && entryOverlay && !entryOverlay.classList.contains('fade-out')) {
            unlockAndEnter();
        }
    }, { passive: true });

    window.addEventListener('keydown', (e) => {
        if (!hasEntered && (e.code === 'Space' || e.code === 'Enter')) {
            unlockAndEnter();
        }
    });

    // Auto-enter if configured or previously entered
    if (CONFIG.entryScreen && CONFIG.entryScreen.autoEnter) {
        setTimeout(unlockAndEnter, 300);
    }

    // -------------------------------------------------------------------
    // 13. PRECISE ONE-SECTION-AT-A-TIME SCROLL SYSTEM
    // -------------------------------------------------------------------
    const sections = [
        document.getElementById('section-profile'),
        document.getElementById('section-music'),
        document.getElementById('section-about'),
        document.getElementById('section-projects'),
        document.getElementById('section-links'),
        document.getElementById('section-thanks')
    ];
    const paginationDots = document.querySelectorAll('.pagination-dot');

    let scrollLockTimer = null;
    let wheelDeltaAccumulator = 0;
    let wheelResetTimer = null;
    const WHEEL_THRESHOLD = 50;

    function scrollToSection(index) {
        if (index < 0 || index >= sections.length) return;
        const targetSection = sections[index];
        if (!targetSection) return;

        if (index !== 1) {
            document.body.classList.remove('focus-mode-active');
            const focusToggle = document.getElementById('focusModeToggle');
            if (focusToggle) {
                focusToggle.querySelector('.focus-icon-expand')?.classList.remove('hidden');
                focusToggle.querySelector('.focus-icon-shrink')?.classList.add('hidden');
            }
        }

        isScrolling = true;
        currentSlideIdx = index;

        // Smooth scroll to the top offset of the targeted section
        const targetTop = targetSection.offsetTop;
        window.scrollTo({
            top: targetTop,
            behavior: 'smooth'
        });

        // Update active class on sections
        sections.forEach((sec, idx) => {
            if (!sec) return;
            if (idx === index) {
                sec.classList.add('active-slide');
            } else {
                sec.classList.remove('active-slide');
            }
        });

        // Update pagination dots
        paginationDots.forEach((dot, idx) => {
            if (idx === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Update vertical line fill
        updatePaginationLineFill(index);

        // Run typewriter if navigating to About Me (Slide 2)
        if (index === 2) {
            runAboutMeTypewriter();
        }

        // Release scroll lock cleanly after smooth scroll completes (600ms)
        clearTimeout(scrollLockTimer);
        scrollLockTimer = setTimeout(() => {
            isScrolling = false;
        }, 600);
    }

    function updatePaginationLineFill(index) {
        const fillEl = document.getElementById('paginationLineFill');
        if (fillEl && sections.length > 1) {
            const progress = (index / (sections.length - 1)) * 100;
            fillEl.style.height = `${progress}%`;
        }
    }

    // Intercept Wheel Event with deliberate delta accumulation (no accidental dragging)
    window.addEventListener('wheel', (e) => {
        if (!document.body.classList.contains('entered')) return;

        // Allow natural scroll inside search results, lyrics, queue, or modals
        if (e.target.closest('#adminPanel') ||
            e.target.closest('#musicSearchInput') ||
            e.target.closest('.lyrics-scroll') ||
            e.target.closest('.music-queue-panel') ||
            e.target.closest('.contact-modal-overlay') ||
            e.target.closest('.discord-modal-overlay')) {
            return;
        }

        if (isScrolling) {
            e.preventDefault();
            return;
        }

        // Accumulate delta to prevent micro-touch accidental drags
        wheelDeltaAccumulator += e.deltaY;
        clearTimeout(wheelResetTimer);
        wheelResetTimer = setTimeout(() => {
            wheelDeltaAccumulator = 0;
        }, 220);

        if (Math.abs(wheelDeltaAccumulator) >= WHEEL_THRESHOLD) {
            e.preventDefault();
            const direction = wheelDeltaAccumulator > 0 ? 1 : -1;
            wheelDeltaAccumulator = 0;

            if (direction > 0 && currentSlideIdx < sections.length - 1) {
                scrollToSection(currentSlideIdx + 1);
            } else if (direction < 0 && currentSlideIdx > 0) {
                scrollToSection(currentSlideIdx - 1);
            }
        }
    }, { passive: false });

    // Touch Swipe Navigation for Mobile
    let touchStartY = 0;
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
        if (!document.body.classList.contains('entered')) return;
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
        if (!document.body.classList.contains('entered')) return;
        if (e.target.closest('#adminPanel') ||
            e.target.closest('.lyrics-scroll') ||
            e.target.closest('.music-queue-panel') ||
            e.target.closest('.contact-modal-overlay') ||
            e.target.closest('.discord-modal-overlay')) {
            return;
        }

        if (isScrolling) {
            e.preventDefault();
            return;
        }

        const touchEndY = e.touches[0].clientY;
        const diffY = touchStartY - touchEndY;
        const diffX = touchStartX - e.touches[0].clientX;

        if (Math.abs(diffY) > 50 && Math.abs(diffY) > Math.abs(diffX)) {
            e.preventDefault();
            if (diffY > 0) {
                if (currentSlideIdx < sections.length - 1) {
                    scrollToSection(currentSlideIdx + 1);
                }
            } else {
                if (currentSlideIdx > 0) {
                    scrollToSection(currentSlideIdx - 1);
                }
            }
            touchStartY = touchEndY;
        }
    }, { passive: false });

    // Keyboard Arrow Keys Navigation
    window.addEventListener('keydown', (e) => {
        if (!document.body.classList.contains('entered')) return;
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'ArrowDown' || e.key === 'PageDown') {
            e.preventDefault();
            if (!isScrolling && currentSlideIdx < sections.length - 1) {
                scrollToSection(currentSlideIdx + 1);
            }
        } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
            e.preventDefault();
            if (!isScrolling && currentSlideIdx > 0) {
                scrollToSection(currentSlideIdx - 1);
            }
        }
    });

    // Pagination Dots Click Navigation
    paginationDots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.getAttribute('data-target'), 10);
            if (!isNaN(index)) {
                scrollToSection(index);
            }
        });
    });

    // Passive Scroll Proximity Tracker (for smooth pagination update)
    window.addEventListener('scroll', () => {
        if (isScrolling) return;
        const viewportCenter = window.innerHeight / 2;
        let activeIndex = 0;
        let minDiff = Infinity;

        sections.forEach((sec, idx) => {
            if (!sec) return;
            const rect = sec.getBoundingClientRect();
            const secCenter = rect.top + rect.height / 2;
            const diff = Math.abs(secCenter - viewportCenter);
            if (diff < minDiff) {
                minDiff = diff;
                activeIndex = idx;
            }
        });

        if (activeIndex !== currentSlideIdx) {
            currentSlideIdx = activeIndex;
            sections.forEach((sec, idx) => {
                if (!sec) return;
                if (idx === activeIndex) {
                    sec.classList.add('active-slide');
                } else {
                    sec.classList.remove('active-slide');
                }
            });
            paginationDots.forEach((dot, idx) => {
                if (idx === activeIndex) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
            updatePaginationLineFill(activeIndex);
        }
    }, { passive: true });

    // Typewriter Effect for About Me Bio Text
    let typewriterTimer = null;
    function runAboutMeTypewriter() {
        const descEl = document.getElementById('aboutBioText');
        if (!descEl) return;
        if (!descEl.dataset.fullHtml) {
            descEl.dataset.fullHtml = descEl.innerHTML;
        }

        clearTimeout(typewriterTimer);
        const fullHtml = descEl.dataset.fullHtml;
        descEl.innerHTML = '';
        let charIdx = 0;

        function typeNext() {
            if (charIdx < fullHtml.length) {
                // If encountering an HTML tag, write the whole tag at once
                if (fullHtml[charIdx] === '<') {
                    const closeIdx = fullHtml.indexOf('>', charIdx);
                    if (closeIdx !== -1) {
                        descEl.innerHTML += fullHtml.substring(charIdx, closeIdx + 1);
                        charIdx = closeIdx + 1;
                    } else {
                        descEl.innerHTML += fullHtml[charIdx++];
                    }
                } else {
                    descEl.innerHTML += fullHtml[charIdx++];
                }
                typewriterTimer = setTimeout(typeNext, 12);
            }
        }
        typeNext();
    }

    // -------------------------------------------------------------------
    // 14. REAL DISCORD PROFILE & SERVER ENGINE (USER ID & INVITE SYNC)
    // -------------------------------------------------------------------
    function extractInviteCode(input) {
        if (!input) return '';
        let str = input.trim().split('?')[0].split('#')[0];
        str = str.replace(/^(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/|discord\.com\/invite\/)/i, '');
        return str.replace(/\/+$/, '').trim();
    }

    function initDiscordLanyard() {
        // Read URL parameters if provided (e.g. ?id=1525762942081962096&server=YOURCODE)
        const urlParams = new URLSearchParams(window.location.search);
        const paramId = urlParams.get('id');
        const paramServer = urlParams.get('server');
        if (paramId && !localStorage.getItem('custom_discord_id')) {
            localStorage.setItem('custom_discord_id', paramId.trim());
        }
        if (paramServer && !localStorage.getItem('custom_discord_server')) {
            localStorage.setItem('custom_discord_server', paramServer.trim());
        }

        const storedId = localStorage.getItem('custom_discord_id');
        const userId = storedId || CONFIG.discord.userId || '1525762942081962096';

        // 1. Fetch Discord Profile via Lanyard API
        fetch(`https://api.lanyard.rest/v1/users/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data.success && data.data) {
                    const d = data.data;
                    const u = d.discord_user;

                    // Display Name & Handle
                    const globalName = u.global_name || u.username;
                    if (globalName && !localStorage.getItem('custom_discord_display_name')) {
                        const profileDisplayName = document.getElementById('profileDisplayName');
                        if (profileDisplayName) profileDisplayName.textContent = globalName;
                        const discordUsername = document.getElementById('discordUsername');
                        if (discordUsername) discordUsername.textContent = globalName;
                    }
                    if (u.username) {
                        const profileUsername = document.getElementById('profileUsername');
                        if (profileUsername) profileUsername.textContent = u.username;
                    }

                    // Avatar (.gif if animated Nitro avatar, else .png)
                    if (u.avatar) {
                        const isGif = u.avatar.startsWith('a_');
                        const avatarExt = isGif ? 'gif' : 'png';
                        const avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${u.avatar}.${avatarExt}?size=512`;
                        document.getElementById('mainAvatar').src = avatarUrl;
                        document.getElementById('discordAvatar').src = avatarUrl;
                    }

                    // Avatar Decoration
                    const decoImg = document.getElementById('avatarDecoration');
                    if (u.avatar_decoration_data && u.avatar_decoration_data.asset) {
                        decoImg.src = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`;
                        decoImg.style.display = 'block';
                    }

                    // Live Status Dot & Avatar Indicator
                    const statusVal = d.discord_status || 'dnd';
                    const dot = document.getElementById('discordStatusDot');
                    if (dot) dot.className = `status-dot ${statusVal}`;
                    const mainDot = document.getElementById('mainAvatarStatus');
                    if (mainDot) mainDot.className = `main-avatar-status ${statusVal}`;
                    const pronounEl = document.getElementById('profileStatusPronoun');
                    if (pronounEl) pronounEl.textContent = statusVal;

                    // Custom Status & Activity
                    const customStatus = d.activities ? d.activities.find(a => a.type === 4) : null;
                    if (customStatus && customStatus.state) {
                        document.getElementById('discordCustomStatus').innerHTML = `<span>${customStatus.state}</span>`;
                        if (!localStorage.getItem('custom_discord_quote')) {
                            const quoteEl = document.getElementById('profileStatusQuote');
                            if (quoteEl) quoteEl.textContent = `"${customStatus.state}"`;
                        }
                    }

                    const spotify = d.spotify;
                    const gameActivity = d.activities ? d.activities.find(a => a.type === 0) : null;
                    if (spotify) {
                        document.getElementById('discordActivity').textContent = `Listening to ${spotify.song} - ${spotify.artist}`;
                    } else if (gameActivity) {
                        document.getElementById('discordActivity').textContent = `Playing ${gameActivity.name}`;
                    } else {
                        document.getElementById('discordActivity').textContent = (statusVal === 'dnd' ? 'DO NOT DISTURB' : statusVal).toUpperCase();
                    }
                } else {
                    console.log('User not monitored in Lanyard guild. Calling universal Discord lookup...');
                    fetchDiscordUserUniversal(userId);
                }
            })
            .catch(err => {
                console.log('Lanyard error, calling universal Discord lookup:', err);
                fetchDiscordUserUniversal(userId);
            });

        // 2. Fetch Discord Server Widgets (Slide 0 & Slide 2)
        const storedServer = localStorage.getItem('custom_discord_server');
        const serverCode = storedServer || CONFIG.discord.serverInviteCode || '';
        if (serverCode) {
            fetchDiscordServer(serverCode, 'discordServerName', 'discordServerOnline', 'discordServerMembers', 'discordJoinBtn', 'discordServerIcon');
        }
        const secondCode = CONFIG.discord.secondServerInviteCode || '';
        if (secondCode) {
            fetchDiscordServer(secondCode, 'secondServerName', 'secondServerOnline', null, 'secondServerJoinBtn', 'secondServerIcon');
        }
    }

    function fetchDiscordUserUniversal(userId) {
        if (!userId) return;
        fetch(`https://japi.rest/discord/v1/user/${userId}`)
            .then(res => res.json())
            .then(data => {
                if (data && data.data && data.data.username) {
                    const u = data.data;
                    const globalName = u.global_name || u.username;

                    const profileDisplayName = document.getElementById('profileDisplayName');
                    if (profileDisplayName && (!localStorage.getItem('custom_discord_display_name') || localStorage.getItem('custom_discord_id') === userId)) {
                        profileDisplayName.textContent = globalName;
                    }

                    const discordUsername = document.getElementById('discordUsername');
                    if (discordUsername) discordUsername.textContent = globalName;

                    const profileUsername = document.getElementById('profileUsername');
                    if (profileUsername) profileUsername.textContent = u.username;

                    // Exact Avatar URL
                    let avatarUrl = u.avatarURL;
                    if (!avatarUrl && u.avatar) {
                        const isGif = u.avatar.startsWith('a_');
                        avatarUrl = `https://cdn.discordapp.com/avatars/${userId}/${u.avatar}.${isGif ? 'gif' : 'png'}?size=512`;
                    }
                    if (avatarUrl) {
                        const mainAvatar = document.getElementById('mainAvatar');
                        if (mainAvatar) mainAvatar.src = avatarUrl;
                        const discordAvatar = document.getElementById('discordAvatar');
                        if (discordAvatar) discordAvatar.src = avatarUrl;
                    }

                    // Avatar Decoration
                    if (u.avatar_decoration_data && u.avatar_decoration_data.asset) {
                        const decoUrl = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`;
                        const decoImg = document.getElementById('avatarDecoration');
                        if (decoImg) {
                            decoImg.src = decoUrl;
                            decoImg.style.display = 'block';
                        }
                    }

                    // Default status to DND
                    const dot = document.getElementById('discordStatusDot');
                    if (dot) dot.className = 'status-dot dnd';
                    const mainDot = document.getElementById('mainAvatarStatus');
                    if (mainDot) mainDot.className = 'main-avatar-status dnd';
                    const pronounEl = document.getElementById('profileStatusPronoun');
                    if (pronounEl) pronounEl.textContent = 'dnd';
                    const actEl = document.getElementById('discordActivity');
                    if (actEl) actEl.textContent = 'DO NOT DISTURB';
                }
            })
            .catch(err => console.log('Universal Discord lookup info:', err));
    }

    function fetchDiscordServer(inviteInput, nameId, onlineId, membersId, joinBtnId, iconId) {
        if (!inviteInput) return;
        const cleanCode = extractInviteCode(inviteInput);
        if (!cleanCode) return;

        const joinBtn = document.getElementById(joinBtnId);
        if (joinBtn) joinBtn.href = `https://discord.gg/${cleanCode}`;

        const directUrl = `https://discord.com/api/v10/invites/${cleanCode}?with_counts=true`;

        fetch(directUrl)
            .then(res => {
                if (!res.ok) throw new Error('Invite fetch status: ' + res.status);
                return res.json();
            })
            .then(data => {
                if (data && data.guild) {
                    const g = data.guild;
                    if (nameId && document.getElementById(nameId)) {
                        document.getElementById(nameId).textContent = g.name;
                    }
                    const online = data.approximate_presence_count ?? data.profile?.online_count ?? 0;
                    const members = data.approximate_member_count ?? data.profile?.member_count ?? 0;

                    if (onlineId && document.getElementById(onlineId)) {
                        if (nameId === 'secondServerName') {
                            document.getElementById(onlineId).textContent = `${online.toLocaleString()} Online - ${members.toLocaleString()} Members`;
                        } else {
                            document.getElementById(onlineId).textContent = `${online.toLocaleString()} Online`;
                        }
                    }
                    if (membersId && document.getElementById(membersId)) {
                        document.getElementById(membersId).textContent = `${members.toLocaleString()} Members`;
                    }
                    if (iconId && document.getElementById(iconId)) {
                        if (g.icon) {
                            const isGif = g.icon.startsWith('a_');
                            const ext = isGif ? 'gif' : 'png';
                            document.getElementById(iconId).src = `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${ext}?size=128`;
                        }
                    }

                    // Also synchronize second server widget on Slide 2 if empty or matching
                    if (nameId === 'discordServerName') {
                        const secName = document.getElementById('secondServerName');
                        if (secName && (!secName.textContent || secName.textContent === 'Community Hub')) {
                            secName.textContent = g.name;
                        }
                        const secOnline = document.getElementById('secondServerOnline');
                        if (secOnline && (secOnline.textContent === 'Discord Community' || !secOnline.textContent)) {
                            secOnline.textContent = `${online.toLocaleString()} Online - ${members.toLocaleString()} Members`;
                        }
                        const secJoin = document.getElementById('secondServerJoinBtn');
                        if (secJoin && (!secJoin.href || secJoin.href.endsWith('#'))) {
                            secJoin.href = `https://discord.gg/${cleanCode}`;
                        }
                        const secIcon = document.getElementById('secondServerIcon');
                        if (secIcon && g.icon) {
                            const isGif = g.icon.startsWith('a_');
                            const ext = isGif ? 'gif' : 'png';
                            secIcon.src = `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.${ext}?size=128`;
                        }
                    }
                }
            })
            .catch(e => {
                console.log('Discord server fetch info:', e);
                const nameEl = document.getElementById(nameId);
                if (nameEl && (!nameEl.textContent || nameEl.textContent === '--')) {
                    nameEl.textContent = `discord.gg/${cleanCode}`;
                }
            });
    }

    // -------------------------------------------------------------------
    // 15. QUICK DISCORD CONNECT MODAL WIRING
    // -------------------------------------------------------------------
    const discordQuickBtn = document.getElementById('discordQuickBtn');
    const cardConnectDiscordBtn = document.getElementById('cardConnectDiscordBtn');
    const discordModalOverlay = document.getElementById('discordModalOverlay');
    const discordModalClose = document.getElementById('discordModalClose');
    const discordQuickForm = document.getElementById('discordQuickForm');
    const discordInputUserId = document.getElementById('discordInputUserId');
    const discordInputServerCode = document.getElementById('discordInputServerCode');
    const discordInputDisplayName = document.getElementById('discordInputDisplayName');
    const discordInputStatus = document.getElementById('discordInputStatus');
    const discordInputQuote = document.getElementById('discordInputQuote');
    const discordInputEmojis = document.getElementById('discordInputEmojis');
    const discordInputProfileEffect = document.getElementById('discordInputProfileEffect');
    const discordResetBtn = document.getElementById('discordResetBtn');

    function openDiscordModal() {
        if (discordInputUserId) discordInputUserId.value = localStorage.getItem('custom_discord_id') || CONFIG.discord.userId || '1525762942081962096';
        if (discordInputServerCode) discordInputServerCode.value = localStorage.getItem('custom_discord_server') || CONFIG.discord.serverInviteCode || '';
        if (discordInputDisplayName) discordInputDisplayName.value = localStorage.getItem('custom_discord_display_name') || CONFIG.profile.displayName || 'DANGER SHAWON';
        if (discordInputStatus) discordInputStatus.value = localStorage.getItem('custom_discord_status') || CONFIG.profile.status || 'dnd';
        if (discordInputQuote) discordInputQuote.value = localStorage.getItem('custom_discord_quote') || CONFIG.profile.tagline || "\"Legends don't announce themselves. They\"";
        if (discordInputEmojis) discordInputEmojis.value = localStorage.getItem('custom_discord_emojis') || CONFIG.profile.statusEmojis || '🎮 🖥️ ⚔️ ⚙️';
        if (discordInputProfileEffect) discordInputProfileEffect.value = localStorage.getItem('custom_discord_effect') || CONFIG.profile.profileEffect || 'white_roses';
        discordModalOverlay.classList.add('open');
    }

    if (discordQuickBtn) {
        discordQuickBtn.addEventListener('click', openDiscordModal);
    }
    if (cardConnectDiscordBtn) {
        cardConnectDiscordBtn.addEventListener('click', openDiscordModal);
    }
    if (discordModalClose) {
        discordModalClose.addEventListener('click', () => discordModalOverlay.classList.remove('open'));
    }
    if (discordQuickForm) {
        discordQuickForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const uid = discordInputUserId ? discordInputUserId.value.trim() : '';
            const srv = discordInputServerCode ? extractInviteCode(discordInputServerCode.value.trim()) : '';
            const dName = discordInputDisplayName ? discordInputDisplayName.value.trim() : '';
            const statusVal = discordInputStatus ? discordInputStatus.value : 'dnd';
            const quoteVal = discordInputQuote ? discordInputQuote.value.trim() : '';
            const emojisVal = discordInputEmojis ? discordInputEmojis.value.trim() : '';
            const effectVal = discordInputProfileEffect ? discordInputProfileEffect.value : 'white_roses';

            if (uid) {
                localStorage.setItem('custom_discord_id', uid);
                CONFIG.discord.userId = uid;
            }
            if (srv) {
                localStorage.setItem('custom_discord_server', srv);
                CONFIG.discord.serverInviteCode = srv;
            }
            if (dName) {
                localStorage.setItem('custom_discord_display_name', dName);
                CONFIG.profile.displayName = dName;
            }
            if (statusVal) {
                localStorage.setItem('custom_discord_status', statusVal);
                CONFIG.profile.status = statusVal;
            }
            if (quoteVal) {
                localStorage.setItem('custom_discord_quote', quoteVal);
                CONFIG.profile.tagline = quoteVal;
            }
            if (emojisVal) {
                localStorage.setItem('custom_discord_emojis', emojisVal);
                CONFIG.profile.statusEmojis = emojisVal;
            }
            if (effectVal) {
                localStorage.setItem('custom_discord_effect', effectVal);
                CONFIG.profile.profileEffect = effectVal;
            }

            initProfile();
            initDiscordLanyard();
            discordModalOverlay.classList.remove('open');
            showSecurityToast('⚡ Discord Profile & Server synced successfully!');
        });
    }

    if (discordResetBtn) {
        discordResetBtn.addEventListener('click', () => {
            localStorage.removeItem('custom_discord_id');
            localStorage.removeItem('custom_discord_server');
            localStorage.removeItem('custom_discord_display_name');
            localStorage.removeItem('custom_discord_status');
            localStorage.removeItem('custom_discord_quote');
            localStorage.removeItem('custom_discord_emojis');
            localStorage.removeItem('custom_discord_effect');

            if (discordInputUserId) discordInputUserId.value = '1525762942081962096';
            if (discordInputServerCode) discordInputServerCode.value = '';
            if (discordInputDisplayName) discordInputDisplayName.value = 'DANGER SHAWON';
            if (discordInputStatus) discordInputStatus.value = 'dnd';
            if (discordInputQuote) discordInputQuote.value = "\"Legends don't announce themselves. They\"";
            if (discordInputEmojis) discordInputEmojis.value = '🎮 🖥️ ⚔️ ⚙️';
            if (discordInputProfileEffect) discordInputProfileEffect.value = 'white_roses';

            initProfile();
            initDiscordLanyard();
            discordModalOverlay.classList.remove('open');
            showSecurityToast('🔄 Reset back to Shahon default profile!');
        });
    }

    // Direct widget click triggers
    const widgetEditUserBtn = document.getElementById('widgetEditUserBtn');
    if (widgetEditUserBtn) {
        widgetEditUserBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDiscordModal();
        });
    }
    const widgetEditServerBtn = document.getElementById('widgetEditServerBtn');
    if (widgetEditServerBtn) {
        widgetEditServerBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            openDiscordModal();
        });
    }
    const userStatusWidget = document.getElementById('userStatusWidget');
    if (userStatusWidget) {
        userStatusWidget.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const handleEl = document.getElementById('profileUsername');
                const handle = handleEl ? handleEl.textContent.trim() : 'mjshahon';
                navigator.clipboard.writeText(handle).then(() => {
                    if (typeof showSecurityToast === 'function') {
                        showSecurityToast(`Copied Discord handle: @${handle}`);
                    }
                });
            }
        });
    }
    const discordServerWidgetCard = document.getElementById('discordServerWidgetCard');
    if (discordServerWidgetCard) {
        discordServerWidgetCard.addEventListener('click', (e) => {
            if (!e.target.closest('a') && !e.target.closest('button')) {
                const joinBtn = document.getElementById('discordJoinBtn');
                if (joinBtn && joinBtn.href && !joinBtn.href.endsWith('#')) {
                    window.open(joinBtn.href, '_blank');
                }
            }
        });
    }

    // Periodic live sync (every 12 seconds)
    setInterval(initDiscordLanyard, 12000);

    // -------------------------------------------------------------------
    // 16. AESTHETIC CLOCK & TIMEZONE ENGINE
    // -------------------------------------------------------------------
    function updateClock() {
        const timezone = CONFIG.profile.timezone || 'Asia/Dhaka';
        const now = new Date();

        try {
            const timeStr = now.toLocaleTimeString('en-US', { timeZone: timezone, hour12: true });
            const digitalEl = document.getElementById('digitalClock');
            if (digitalEl) digitalEl.textContent = timeStr;

            const parts = now.toLocaleTimeString('en-US', { timeZone: timezone, hour12: false }).split(':');
            const h = parseInt(parts[0], 10) % 12;
            const m = parseInt(parts[1], 10);
            const s = parseInt(parts[2], 10);

            const hourDeg = (h * 30) + (m * 0.5);
            const minDeg = (m * 6) + (s * 0.1);
            const secDeg = s * 6;

            const hourHand = document.getElementById('hourHand');
            const minuteHand = document.getElementById('minuteHand');
            const secondHand = document.getElementById('secondHand');

            if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;
            if (minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${minDeg}deg)`;
            if (secondHand) secondHand.style.transform = `translateX(-50%) rotate(${secDeg}deg)`;

            const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            const dayName = days[now.getDay()];
            const monthName = months[now.getMonth()];
            const dayNum = now.getDate();

            const dateEl = document.getElementById('timezoneDate');
            if (dateEl) dateEl.textContent = `${dayName}, ${monthName} ${dayNum} - GMT+6`;

            const localEl = document.getElementById('userLocalClock');
            if (localEl) localEl.textContent = `shahon's time: ${parts[0]}:${parts[1]} (BST)`;
        } catch (e) {}
    }
    setInterval(updateClock, 1000);
    updateClock();

    // -------------------------------------------------------------------
    // 17. 3D TILT PHYSICS FOR PROFILE CARD
    // -------------------------------------------------------------------
    const cardWrapper = document.getElementById('profile-card-wrapper');
    const bioCard = document.getElementById('bioCard');

    if (cardWrapper && bioCard) {
        cardWrapper.addEventListener('mousemove', (e) => {
            const rect = cardWrapper.getBoundingClientRect();
            const x = e.clientX - rect.left - (rect.width / 2);
            const y = e.clientY - rect.top - (rect.height / 2);

            const rotateX = -(y / rect.height) * 14;
            const rotateY = (x / rect.width) * 14;

            bioCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`;
        });

        cardWrapper.addEventListener('mouseleave', () => {
            bioCard.style.transform = `rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    }

    // -------------------------------------------------------------------
    // 18. CONTACT FORM & DISCORD WEBHOOK
    // -------------------------------------------------------------------
    const contactBtn = document.getElementById('contactBtn');
    const contactOverlay = document.getElementById('contactOverlay');
    const contactCloseBtn = document.getElementById('contactCloseBtn');
    const contactForm = document.getElementById('contactForm');

    if (contactBtn) contactBtn.addEventListener('click', () => contactOverlay.classList.add('open'));
    if (contactCloseBtn) contactCloseBtn.addEventListener('click', () => contactOverlay.classList.remove('open'));

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contactName').value;
            const info = document.getElementById('contactInfo').value;
            const msg = document.getElementById('contactMsg').value;

            const webhookUrl = CONFIG.security.webhooks.contact;
            if (webhookUrl && webhookUrl.startsWith('https://discord.com/api/webhooks/')) {
                fetch(webhookUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        embeds: [{
                            title: '📩 New Message from Bio-Link Portfolio',
                            color: 0xa855f7,
                            fields: [
                                { name: 'Name', value: name, inline: true },
                                { name: 'Contact Info', value: info, inline: true },
                                { name: 'Message', value: msg }
                            ],
                            timestamp: new Date().toISOString()
                        }]
                    })
                }).then(() => {
                    alert('Your message has been sent successfully!');
                    contactOverlay.classList.remove('open');
                    contactForm.reset();
                }).catch(err => {
                    alert('Could not send via webhook: ' + err);
                });
            } else {
                alert(`Message captured!\nFrom: ${name} (${info})\n"${msg}"\n(Add your Discord Webhook in config.js to receive instant notifications!)`);
                contactOverlay.classList.remove('open');
                contactForm.reset();
            }
        });
    }

    // -------------------------------------------------------------------
    // 19. OWNER CONTROL PANEL (ADMIN DASHBOARD)
    // -------------------------------------------------------------------
    const adminPanel = document.getElementById('adminPanel');
    const adminCloseBtn = document.getElementById('adminCloseBtn');
    const adminApplyBtn = document.getElementById('adminApplyBtn');
    const copyConfigBtn = document.getElementById('copyConfigBtn');

    window.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyA') {
            e.preventDefault();
            openAdminPanel();
        }
    });

    function openAdminPanel() {
        const pass = prompt('Enter Admin Password:');
        if (pass === CONFIG.security.adminPassword) {
            populateAdminData();
            adminPanel.classList.add('open');
        } else if (pass !== null) {
            alert('❌ Incorrect Password');
        }
    }

    if (adminCloseBtn) adminCloseBtn.addEventListener('click', () => adminPanel.classList.remove('open'));

    const adminTabBtns = document.querySelectorAll('.admin-tab-btn');
    const adminPanes = document.querySelectorAll('.admin-tab-pane');
    adminTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            adminTabBtns.forEach(b => b.classList.remove('active'));
            adminPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.tab;
            document.getElementById(`tab-${target}`).classList.add('active');

            if (target === 'export') {
                updateExportCode();
            }
        });
    });

    function populateAdminData() {
        document.getElementById('adminUsername').value = CONFIG.profile.username;
        document.getElementById('adminAvatar').value = CONFIG.profile.avatar;
        document.getElementById('adminBio').value = CONFIG.profile.bioDescription;
        document.getElementById('adminDiscordId').value = CONFIG.discord.userId;
        document.getElementById('adminServer1').value = CONFIG.discord.serverInviteCode;
        document.getElementById('adminServer2').value = CONFIG.discord.secondServerInviteCode;

        const plContainer = document.getElementById('adminPlaylistContainer');
        if (plContainer) {
            plContainer.innerHTML = '';
            CONFIG.playlist.forEach((track, idx) => {
                const row = document.createElement('div');
                row.style.background = 'rgba(255,255,255,0.03)';
                row.style.padding = '8px 12px';
                row.style.marginBottom = '6px';
                row.style.borderRadius = '6px';
                row.style.display = 'flex';
                row.style.justifyContent = 'space-between';
                row.innerHTML = `<span><strong>#${idx + 1}</strong> ${track.title}</span> <span style="color:var(--text-sub);">${track.artist}</span>`;
                plContainer.appendChild(row);
            });
        }

        updateExportCode();
    }

    function updateExportCode() {
        document.getElementById('configExportCode').textContent = "const CONFIG = " + JSON.stringify(CONFIG, null, 4) + ";";
    }

    if (adminApplyBtn) {
        adminApplyBtn.addEventListener('click', () => {
            CONFIG.profile.username = document.getElementById('adminUsername').value;
            CONFIG.profile.avatar = document.getElementById('adminAvatar').value;
            CONFIG.profile.bioDescription = document.getElementById('adminBio').value;
            CONFIG.discord.userId = document.getElementById('adminDiscordId').value;
            CONFIG.discord.serverInviteCode = document.getElementById('adminServer1').value;
            CONFIG.discord.secondServerInviteCode = document.getElementById('adminServer2').value;

            initProfile();
            initDiscordLanyard();
            updateExportCode();
            alert('✅ Settings applied in current preview!');
        });
    }

    if (copyConfigBtn) {
        copyConfigBtn.addEventListener('click', () => {
            navigator.clipboard.writeText("const CONFIG = " + JSON.stringify(CONFIG, null, 4) + ";")
                .then(() => alert('📋 Configuration code copied to clipboard! Paste it into config.js.'));
        });
    }

    // -------------------------------------------------------------------
    // 20. HIGH-LEVEL ENTERPRISE SECURITY & DEVTOOLS BLOCKER
    // -------------------------------------------------------------------
    function showSecurityToast(msg) {
        if (!securityToast) return;
        if (msg) securityToast.querySelector('span').textContent = msg;
        securityToast.classList.add('show');
        setTimeout(() => securityToast.classList.remove('show'), 3500);
    }

    if (CONFIG.security && CONFIG.security.blockRightClick) {
        document.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showSecurityToast('🛡️ Security Active: Right click is restricted.');
        });
    }

    if (CONFIG.security && CONFIG.security.blockDevTools) {
        document.addEventListener('keydown', (e) => {
            // Block F12, Ctrl+Shift+I/J/C, Ctrl+U, Ctrl+S, Ctrl+P
            if (e.keyCode === 123 ||
                (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74 || e.keyCode === 67)) ||
                (e.ctrlKey && (e.keyCode === 85 || e.keyCode === 83 || e.keyCode === 80))
            ) {
                e.preventDefault();
                showSecurityToast('🛡️ Security Active: Developer inspection is disabled.');
            }
        });

        // Debugger trap loop
        setInterval(() => {
            const startTime = performance.now();
            debugger;
            if (performance.now() - startTime > 100) {
                showSecurityToast('⚠️ Security Active: Developer inspection detected.');
            }
        }, 2000);
    }

    // Disable image drag & text select
    document.addEventListener('dragstart', (e) => e.preventDefault());

    // -------------------------------------------------------------------
    // 21. KICKOFF
    // -------------------------------------------------------------------
    initProfile();
    initDiscordLanyard();
    loadTrack(0, false);
});
