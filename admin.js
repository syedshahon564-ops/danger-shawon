/**
 * =======================================================================
 *               STANDALONE MASTER ADMIN DASHBOARD LOGIC (admin.js)
 * =======================================================================
 * Real-time Split Screen Live Card Preview, Multi-strategy Discord API Tester,
 * Client Shareable Link Generator, Dynamic Config Exporter & Syncer.
 * =======================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. STATE INITIALIZATION FROM CONFIG & LOCALSTORAGE
    // -------------------------------------------------------------------
    const state = {
        userId: localStorage.getItem('custom_discord_id') || (CONFIG.discord && CONFIG.discord.userId) || '1525762942081962096',
        displayName: localStorage.getItem('custom_discord_display_name') || (CONFIG.profile && CONFIG.profile.displayName) || 'DANGER SHAWON',
        username: localStorage.getItem('custom_discord_username') || (CONFIG.profile && CONFIG.profile.username) || 'mjshahon',
        quote: localStorage.getItem('custom_discord_quote') || (CONFIG.profile && CONFIG.profile.tagline) || "\"Legends don't announce themselves. They\"",
        emojis: localStorage.getItem('custom_discord_emojis') || (CONFIG.profile && CONFIG.profile.statusEmojis) || '🎮 🖥️ ⚔️ ⚙️',
        status: localStorage.getItem('custom_discord_status') || (CONFIG.profile && CONFIG.profile.status) || 'dnd',
        effect: localStorage.getItem('custom_discord_effect') || (CONFIG.profile && CONFIG.profile.profileEffect) || 'white_roses',
        avatar: (CONFIG.profile && CONFIG.profile.avatar) || './assets/media/shahon_avatar.png',
        avatarDeco: (CONFIG.profile && CONFIG.profile.avatarDecoration) || './assets/media/avatar_decoration.png',
        bio: (CONFIG.profile && CONFIG.profile.bioDescription) || '',
        location: (CONFIG.profile && CONFIG.profile.location) || 'Bangladesh',
        timezone: (CONFIG.profile && CONFIG.profile.timezone) || 'Asia/Dhaka',
        views: (CONFIG.profile && CONFIG.profile.viewsOffset) || 14280,
        serverInvite: localStorage.getItem('custom_discord_server') || (CONFIG.discord && CONFIG.discord.serverInviteCode) || '',
        secondServerInvite: (CONFIG.discord && CONFIG.discord.secondServerInviteCode) || '',
        socials: Object.assign({}, CONFIG.socials || {})
    };

    // -------------------------------------------------------------------
    // 2. TAB SWITCHING SYSTEM
    // -------------------------------------------------------------------
    const tabBtns = document.querySelectorAll('.sidebar-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.dataset.tab;
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            const pane = document.getElementById(`pane-${target}`);
            if (pane) pane.classList.add('active');

            if (target === 'export') {
                generateClientShareLink();
                renderExportCode();
            }
        });
    });

    // -------------------------------------------------------------------
    // 3. FORM ELEMENTS BINDING
    // -------------------------------------------------------------------
    const el = {
        displayName: document.getElementById('inputDisplayName'),
        username: document.getElementById('inputUsername'),
        userId: document.getElementById('inputUserId'),
        status: document.getElementById('inputStatus'),
        quote: document.getElementById('inputQuote'),
        emojis: document.getElementById('inputEmojis'),
        effect: document.getElementById('inputEffect'),
        avatar: document.getElementById('inputAvatar'),
        avatarDeco: document.getElementById('inputAvatarDeco'),
        bio: document.getElementById('inputBio'),
        location: document.getElementById('inputLocation'),
        timezone: document.getElementById('inputTimezone'),
        views: document.getElementById('inputViews'),
        serverInvite: document.getElementById('inputServerInvite'),
        secondServerInvite: document.getElementById('inputSecondServerInvite')
    };

    function populateForm() {
        if (el.displayName) el.displayName.value = state.displayName;
        if (el.username) el.username.value = state.username;
        if (el.userId) el.userId.value = state.userId;
        if (el.status) el.status.value = state.status;
        if (el.quote) el.quote.value = state.quote;
        if (el.emojis) el.emojis.value = state.emojis;
        if (el.effect) el.effect.value = state.effect;
        if (el.avatar) el.avatar.value = state.avatar;
        if (el.avatarDeco) el.avatarDeco.value = state.avatarDeco;
        if (el.bio) el.bio.value = state.bio;
        if (el.location) el.location.value = state.location;
        if (el.timezone) el.timezone.value = state.timezone;
        if (el.views) el.views.value = state.views;
        if (el.serverInvite) el.serverInvite.value = state.serverInvite;
        if (el.secondServerInvite) el.secondServerInvite.value = state.secondServerInvite;

        // Socials
        if (CONFIG.socials) {
            Object.keys(CONFIG.socials).forEach(key => {
                const inp = document.getElementById(`social_${key}`);
                if (inp) inp.value = state.socials[key] || '';
            });
        }
    }

    // -------------------------------------------------------------------
    // 4. REAL-TIME LIVE PREVIEW CARD ENGINE
    // -------------------------------------------------------------------
    function updateLivePreview() {
        const prevName = document.getElementById('prevDisplayName');
        if (prevName) prevName.textContent = el.displayName ? el.displayName.value : state.displayName;

        const prevUser = document.getElementById('prevUsername');
        if (prevUser) prevUser.textContent = el.username ? el.username.value : state.username;

        const prevQuote = document.getElementById('prevQuote');
        if (prevQuote) prevQuote.textContent = el.quote ? el.quote.value : state.quote;

        const prevEmojis = document.getElementById('prevEmojis');
        if (prevEmojis) prevEmojis.textContent = el.emojis ? el.emojis.value : state.emojis;

        const prevStatusVal = el.status ? el.status.value : state.status;
        const prevDot = document.getElementById('prevStatusDot');
        if (prevDot) prevDot.className = `status-dot ${prevStatusVal}`;
        const prevAvatarDot = document.getElementById('prevAvatarStatus');
        if (prevAvatarDot) prevAvatarDot.className = `main-avatar-status ${prevStatusVal}`;
        const prevPronoun = document.getElementById('prevPronoun');
        if (prevPronoun) prevPronoun.textContent = prevStatusVal;

        const prevEffectVal = el.effect ? el.effect.value : state.effect;
        const prevEffectEl = document.getElementById('prevDiscordProfileEffect');
        if (prevEffectEl) {
            if (prevEffectVal === 'none') {
                prevEffectEl.style.display = 'none';
            } else {
                prevEffectEl.style.display = 'block';
            }
        }

        const prevAvatarImg = document.getElementById('prevAvatar');
        if (prevAvatarImg && el.avatar && el.avatar.value) {
            prevAvatarImg.src = el.avatar.value;
        }

        const prevDecoImg = document.getElementById('prevAvatarDeco');
        if (prevDecoImg && el.avatarDeco) {
            if (el.avatarDeco.value && el.avatarDeco.value !== 'none') {
                prevDecoImg.src = el.avatarDeco.value;
                prevDecoImg.style.display = 'block';
            } else {
                prevDecoImg.style.display = 'none';
            }
        }
    }

    // Attach real-time input listeners
    Object.values(el).forEach(input => {
        if (!input) return;
        input.addEventListener('input', updateLivePreview);
        input.addEventListener('change', updateLivePreview);
    });

    // -------------------------------------------------------------------
    // -------------------------------------------------------------------
    // 5. UNIVERSAL DISCORD API RESOLVER & OAUTH2 1-CLICK AUTH
    // -------------------------------------------------------------------
    const testDiscordBtn = document.getElementById('testDiscordBtn');
    const discordTestResult = document.getElementById('discordTestResult');
    const oauthDiscordBtn = document.getElementById('oauthDiscordBtn');
    const inputOAuthClientId = document.getElementById('inputOAuthClientId');
    const testServerBtn = document.getElementById('testServerBtn');
    const serverTestResult = document.getElementById('serverTestResult');

    // Check if redirected with OAuth2 access token in hash (#access_token=...)
    if (window.location.hash && window.location.hash.includes('access_token=')) {
        try {
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const token = hashParams.get('access_token');
            if (token) {
                showToast('🔑 Authorizing with Discord Official API...');
                fetch('https://discord.com/api/v10/users/@me', {
                    headers: { Authorization: `Bearer ${token}` }
                })
                .then(r => r.json())
                .then(u => {
                    if (u && u.id) {
                        if (el.userId) el.userId.value = u.id;
                        if (el.displayName) el.displayName.value = u.global_name || u.username;
                        if (el.username) el.username.value = u.username;
                        if (u.avatar && el.avatar) {
                            const isGif = u.avatar.startsWith('a_');
                            el.avatar.value = `https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.${isGif ? 'gif' : 'png'}?size=512`;
                        }
                        if (u.avatar_decoration_data && u.avatar_decoration_data.asset && el.avatarDeco) {
                            el.avatarDeco.value = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`;
                        }
                        updateLivePreview();
                        showToast(`✨ Authorized as @${u.username} (${u.global_name || u.username})!`);
                        history.replaceState(null, '', window.location.pathname + window.location.search);
                    }
                })
                .catch(e => showToast('OAuth2 error: ' + e.message));
            }
        } catch (e) {}
    }

    // 1-Click Authorize Button Action
    if (oauthDiscordBtn) {
        oauthDiscordBtn.addEventListener('click', () => {
            const clientId = (inputOAuthClientId && inputOAuthClientId.value.trim()) || '1205167664654393354';
            const redirectUri = encodeURIComponent(window.location.origin + window.location.pathname);
            const authUrl = `https://discord.com/oauth2/authorize?client_id=${clientId}&response_type=token&scope=identify&redirect_uri=${redirectUri}`;
            window.location.href = authUrl;
        });
    }

    async function resolveAnyDiscordUser(uid) {
        if (!uid) return;
        if (testDiscordBtn) {
            testDiscordBtn.disabled = true;
            testDiscordBtn.textContent = '⏳ Resolving API...';
        }
        if (discordTestResult) {
            discordTestResult.className = 'api-status-box show';
            discordTestResult.innerHTML = 'Connecting to Discord Universal Gateway & CDN...';
        }

        let resolved = {
            id: uid,
            name: '',
            username: '',
            avatar: '',
            deco: '',
            status: 'dnd',
            source: 'Discord Gateway REST'
        };

        // Tier 1: Query japi.rest (Universal lookup for all Discord users)
        try {
            const jRes = await fetch(`https://japi.rest/discord/v1/user/${uid}`);
            if (jRes.ok) {
                const jData = await jRes.json();
                if (jData && jData.data && jData.data.username) {
                    const u = jData.data;
                    resolved.username = u.username;
                    resolved.name = u.global_name || u.username;
                    resolved.avatar = u.avatarURL || (u.avatar ? `https://cdn.discordapp.com/avatars/${uid}/${u.avatar}.png?size=512` : '');
                    if (u.avatar_decoration_data && u.avatar_decoration_data.asset) {
                        resolved.deco = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`;
                    }
                }
            }
        } catch (e) {
            console.warn('japi error:', e);
        }

        // Tier 2: Check Lanyard API for live presence if available
        try {
            const lRes = await fetch(`https://api.lanyard.rest/v1/users/${uid}`);
            if (lRes.ok) {
                const lData = await lRes.json();
                if (lData.success && lData.data) {
                    const d = lData.data;
                    const u = d.discord_user;
                    if (!resolved.username) resolved.username = u.username;
                    if (!resolved.name) resolved.name = u.global_name || u.username;
                    if (!resolved.avatar && u.avatar) {
                        const isGif = u.avatar.startsWith('a_');
                        resolved.avatar = `https://cdn.discordapp.com/avatars/${uid}/${u.avatar}.${isGif ? 'gif' : 'png'}?size=512`;
                    }
                    if (!resolved.deco && u.avatar_decoration_data && u.avatar_decoration_data.asset) {
                        resolved.deco = `https://cdn.discordapp.com/avatar-decoration-presets/${u.avatar_decoration_data.asset}.png`;
                    }
                    if (d.discord_status) resolved.status = d.discord_status;
                    resolved.source = 'Lanyard Live Presence';
                }
            }
        } catch (e) {
            console.warn('lanyard error:', e);
        }

        // Fallback default avatar if none found
        if (!resolved.avatar) {
            try {
                const def = Number((BigInt(uid) >> 22n) % 6n);
                resolved.avatar = `https://cdn.discordapp.com/embed/avatars/${def}.png`;
            } catch {
                resolved.avatar = `https://cdn.discordapp.com/embed/avatars/0.png`;
            }
        }

        if (testDiscordBtn) {
            testDiscordBtn.disabled = false;
            testDiscordBtn.textContent = '⚡ Test & Sync API';
        }

        if (resolved.username || resolved.name) {
            if (discordTestResult) {
                discordTestResult.className = 'api-status-box show success';
                discordTestResult.innerHTML = `
                    <div style="display:flex; align-items:center; gap:12px; margin-bottom:10px;">
                        <img src="${resolved.avatar}" style="width:44px; height:44px; border-radius:50%; object-fit:cover; border:2px solid #8b5cf6;">
                        <div>
                            <strong style="color:#fff; font-size:14px;">${resolved.name}</strong>
                            <span style="color:#94a3b8; font-size:12px;">(@${resolved.username})</span>
                            <div style="color:#10b981; font-size:11px;">Status: ${resolved.status.toUpperCase()} • ${resolved.source}</div>
                        </div>
                    </div>
                    <button type="button" id="importLanyardBtn" class="btn-admin btn-admin-primary" style="padding:7px 14px; font-size:12px; width:100%;">
                        ✨ Apply to Form & Live Preview Card
                    </button>
                `;

                const applyData = () => {
                    if (el.displayName && resolved.name) el.displayName.value = resolved.name;
                    if (el.username && resolved.username) el.username.value = resolved.username;
                    if (el.avatar && resolved.avatar) el.avatar.value = resolved.avatar;
                    if (el.avatarDeco) el.avatarDeco.value = resolved.deco || 'none';
                    if (el.status && resolved.status) el.status.value = resolved.status;
                    updateLivePreview();
                    showToast(`✨ Resolved @${resolved.username} successfully!`);
                };

                // Auto-apply directly into the form & preview!
                applyData();

                const importBtn = document.getElementById('importLanyardBtn');
                if (importBtn) importBtn.addEventListener('click', applyData);
            }
        } else {
            if (discordTestResult) {
                discordTestResult.className = 'api-status-box show warning';
                discordTestResult.innerHTML = `
                    <strong>⚠️ User Not Found</strong><br>
                    Could not resolve user with ID <code>${uid}</code>. Please double-check the 18-digit Discord Snowflake ID.
                `;
            }
        }
    }

    if (testDiscordBtn) {
        testDiscordBtn.addEventListener('click', () => {
            const uid = el.userId ? el.userId.value.trim() : '';
            if (!uid) {
                alert('Please enter a Discord User ID to test.');
                return;
            }
            resolveAnyDiscordUser(uid);
        });
    }

    // Auto-resolve on paste or typing 17-20 digit ID with debounce
    let idDebounceTimer = null;
    if (el.userId) {
        el.userId.addEventListener('input', () => {
            const uid = el.userId.value.trim();
            if (/^\d{17,20}$/.test(uid)) {
                clearTimeout(idDebounceTimer);
                idDebounceTimer = setTimeout(() => {
                    resolveAnyDiscordUser(uid);
                }, 600);
            }
        });
    }

    // Server Invite Tester
    if (testServerBtn) {
        testServerBtn.addEventListener('click', () => {
            const rawInvite = el.serverInvite ? el.serverInvite.value.trim() : '';
            if (!rawInvite) {
                alert('Please enter a server invite code or URL to test.');
                return;
            }
            const clean = rawInvite.replace(/^(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/|discord\.com\/invite\/)/i, '').split('?')[0].split('/')[0];
            testServerBtn.disabled = true;
            testServerBtn.textContent = '⏳ Fetching Server...';
            if (serverTestResult) {
                serverTestResult.className = 'api-status-box show';
                serverTestResult.innerHTML = 'Connecting to Discord Server Invite API...';
            }

            fetch(`https://discord.com/api/v10/invites/${clean}?with_counts=true`)
                .then(r => r.json())
                .then(data => {
                    testServerBtn.disabled = false;
                    testServerBtn.textContent = '🏰 Test Server';
                    if (data && data.guild) {
                        const g = data.guild;
                        const iconUrl = g.icon ? `https://cdn.discordapp.com/icons/${g.id}/${g.icon}.png?size=128` : './assets/media/shahon_avatar.png';
                        const online = data.approximate_presence_count || 0;
                        const total = data.approximate_member_count || 0;
                        if (serverTestResult) {
                            serverTestResult.className = 'api-status-box show success';
                            serverTestResult.innerHTML = `
                                <div style="display:flex; align-items:center; gap:12px;">
                                    <img src="${iconUrl}" style="width:40px; height:40px; border-radius:12px; object-fit:cover;">
                                    <div>
                                        <strong style="color:#fff; font-size:14px;">${g.name}</strong>
                                        <div style="color:#10b981; font-size:11px;">🟢 ${online.toLocaleString()} Online • 👥 ${total.toLocaleString()} Members</div>
                                    </div>
                                </div>
                            `;
                        }
                        showToast(`🏰 Discord Server "${g.name}" verified!`);
                    } else {
                        if (serverTestResult) {
                            serverTestResult.className = 'api-status-box show warning';
                            serverTestResult.textContent = 'Invalid server invite code or link expired.';
                        }
                    }
                })
                .catch(e => {
                    testServerBtn.disabled = false;
                    testServerBtn.textContent = '🏰 Test Server';
                    if (serverTestResult) {
                        serverTestResult.className = 'api-status-box show warning';
                        serverTestResult.textContent = 'Network or Invite error: ' + e.message;
                    }
                });
        });
    }

    // -------------------------------------------------------------------
    // 6. CLIENT SHAREABLE LINK GENERATOR (FOR SELLING / CLIENT SHARING)
    // -------------------------------------------------------------------
    function getBaseOrigin() {
        const customDomain = localStorage.getItem('custom_public_domain');
        if (customDomain && customDomain.trim()) {
            return customDomain.trim().replace(/\/+$/, '');
        }
        if (window.location.hostname.includes('github.io')) {
            return window.location.origin + window.location.pathname.replace('admin.html', '').replace(/\/$/, '');
        }
        return 'https://syedshahon564-ops.github.io/danger-shawon';
    }

    function generateClientShareLink() {
        const baseUrl = getBaseOrigin() + '/index.html';
        const params = new URLSearchParams();

        if (el.userId && el.userId.value) params.set('id', el.userId.value.trim());
        if (el.displayName && el.displayName.value) params.set('name', el.displayName.value.trim());
        if (el.username && el.username.value) params.set('username', el.username.value.trim());
        if (el.status && el.status.value) params.set('status', el.status.value);
        if (el.quote && el.quote.value) params.set('quote', el.quote.value.trim());
        if (el.emojis && el.emojis.value) params.set('emojis', el.emojis.value.trim());
        if (el.effect && el.effect.value) params.set('effect', el.effect.value);
        if (el.serverInvite && el.serverInvite.value) params.set('server', el.serverInvite.value.trim());

        const fullLink = `${baseUrl}?${params.toString()}`;
        const linkInput = document.getElementById('clientShareLinkInput');
        if (linkInput) linkInput.value = fullLink;
        return fullLink;
    }

    const copyShareLinkBtn = document.getElementById('copyShareLinkBtn');
    if (copyShareLinkBtn) {
        copyShareLinkBtn.addEventListener('click', () => {
            const link = generateClientShareLink();
            navigator.clipboard.writeText(link).then(() => {
                showToast('🔗 Client customized link copied to clipboard!');
            });
        });
    }

    const testShareLinkBtn = document.getElementById('testShareLinkBtn');
    if (testShareLinkBtn) {
        testShareLinkBtn.addEventListener('click', () => {
            const link = generateClientShareLink();
            window.open(link, '_blank');
        });
    }

    // -------------------------------------------------------------------
    // 7. CONFIG.JS DOWNLOADER & EXPORTER
    // -------------------------------------------------------------------
    function buildExportConfig() {
        const cfg = JSON.parse(JSON.stringify(CONFIG));
        cfg.profile.displayName = el.displayName ? el.displayName.value.trim() : state.displayName;
        cfg.profile.username = el.username ? el.username.value.trim() : state.username;
        cfg.profile.tagline = el.quote ? el.quote.value.trim() : state.quote;
        cfg.profile.statusEmojis = el.emojis ? el.emojis.value.trim() : state.emojis;
        cfg.profile.status = el.status ? el.status.value : state.status;
        cfg.profile.profileEffect = el.effect ? el.effect.value : state.effect;
        cfg.profile.avatar = el.avatar ? el.avatar.value.trim() : state.avatar;
        cfg.profile.avatarDecoration = el.avatarDeco ? el.avatarDeco.value.trim() : state.avatarDeco;
        cfg.profile.bioDescription = el.bio ? el.bio.value.trim() : state.bio;
        cfg.profile.location = el.location ? el.location.value.trim() : state.location;
        cfg.profile.timezone = el.timezone ? el.timezone.value.trim() : state.timezone;
        cfg.profile.viewsOffset = el.views ? parseInt(el.views.value, 10) || 14280 : state.views;

        cfg.discord.userId = el.userId ? el.userId.value.trim() : state.userId;
        cfg.discord.serverInviteCode = el.serverInvite ? el.serverInvite.value.trim() : state.serverInvite;
        cfg.discord.secondServerInviteCode = el.secondServerInvite ? el.secondServerInvite.value.trim() : state.secondServerInvite;

        return cfg;
    }

    function renderExportCode() {
        const exportBox = document.getElementById('exportCodeBox');
        if (exportBox) {
            const cfg = buildExportConfig();
            exportBox.textContent = `const CONFIG = ${JSON.stringify(cfg, null, 4)};`;
        }
    }

    const downloadConfigBtn = document.getElementById('downloadConfigBtn');
    if (downloadConfigBtn) {
        downloadConfigBtn.addEventListener('click', () => {
            const cfg = buildExportConfig();
            const content = `/**\n * Bio-Link & Portfolio Configuration File\n */\nconst CONFIG = ${JSON.stringify(cfg, null, 4)};\n`;
            const blob = new Blob([content], { type: 'application/javascript;charset=utf-8' });
            const a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = 'config.js';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('💾 config.js downloaded successfully!');
        });
    }

    const copyConfigBtn = document.getElementById('copyConfigBtn');
    if (copyConfigBtn) {
        copyConfigBtn.addEventListener('click', () => {
            const cfg = buildExportConfig();
            const content = `const CONFIG = ${JSON.stringify(cfg, null, 4)};`;
            navigator.clipboard.writeText(content).then(() => {
                showToast('📋 Configuration code copied to clipboard!');
            });
        });
    }

    // -------------------------------------------------------------------
    // 8. SAVE CHANGES & APPLY TO LIVE BIO PAGE
    // -------------------------------------------------------------------
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    if (saveChangesBtn) {
        saveChangesBtn.addEventListener('click', () => {
            if (el.userId) localStorage.setItem('custom_discord_id', el.userId.value.trim());
            if (el.displayName) localStorage.setItem('custom_discord_display_name', el.displayName.value.trim());
            if (el.username) localStorage.setItem('custom_discord_username', el.username.value.trim());
            if (el.status) localStorage.setItem('custom_discord_status', el.status.value);
            if (el.quote) localStorage.setItem('custom_discord_quote', el.quote.value.trim());
            if (el.emojis) localStorage.setItem('custom_discord_emojis', el.emojis.value.trim());
            if (el.effect) localStorage.setItem('custom_discord_effect', el.effect.value);
            if (el.serverInvite) localStorage.setItem('custom_discord_server', el.serverInvite.value.trim());

            showToast('✅ All settings saved to live site! Click "View Live Bio Page" to see.');
        });
    }

    // Reset Defaults
    const resetDefaultBtn = document.getElementById('resetDefaultBtn');
    if (resetDefaultBtn) {
        resetDefaultBtn.addEventListener('click', () => {
            if (confirm('Restore Shahon default verified preset (DANGER SHAWON)?')) {
                localStorage.removeItem('custom_discord_id');
                localStorage.removeItem('custom_discord_display_name');
                localStorage.removeItem('custom_discord_username');
                localStorage.removeItem('custom_discord_status');
                localStorage.removeItem('custom_discord_quote');
                localStorage.removeItem('custom_discord_emojis');
                localStorage.removeItem('custom_discord_effect');
                localStorage.removeItem('custom_discord_server');

                window.location.reload();
            }
        });
    }

    // Toast Notification Utility
    const toast = document.getElementById('adminToast');
    function showToast(msg) {
        if (!toast) return;
        toast.querySelector('.toast-msg').textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

    // -------------------------------------------------------------------
    // 8.1 MASTER OWNER SUPERADMIN AUTH & SECURITY
    // -------------------------------------------------------------------
    const masterAuthOverlay = document.getElementById('masterAuthOverlay');
    const masterPinInput = document.getElementById('masterPinInput');
    const masterUnlockBtn = document.getElementById('masterUnlockBtn');
    const masterAuthError = document.getElementById('masterAuthError');
    const lockAdminBtn = document.getElementById('lockAdminBtn');

    const validPins = [
        'shahon2026',
        (CONFIG.adminSecurity && CONFIG.adminSecurity.masterPin),
        (CONFIG.discord && CONFIG.discord.userId),
        '1525762942081962096'
    ].filter(Boolean);

    function checkMasterAuth() {
        if (sessionStorage.getItem('shahon_master_unlocked') === 'true') {
            if (masterAuthOverlay) masterAuthOverlay.classList.add('unlocked');
        } else {
            if (masterAuthOverlay) masterAuthOverlay.classList.remove('unlocked');
        }
    }

    function unlockMaster() {
        const pin = masterPinInput ? masterPinInput.value.trim() : '';
        if (validPins.includes(pin)) {
            sessionStorage.setItem('shahon_master_unlocked', 'true');
            if (masterAuthOverlay) masterAuthOverlay.classList.add('unlocked');
            if (masterAuthError) masterAuthError.style.display = 'none';
            showToast('👑 Welcome Master Shahon! Superadmin Active.');
        } else {
            if (masterAuthError) masterAuthError.style.display = 'block';
            if (masterPinInput) {
                masterPinInput.style.borderColor = '#ef4444';
                setTimeout(() => { masterPinInput.style.borderColor = ''; }, 1200);
            }
        }
    }

    if (masterUnlockBtn) masterUnlockBtn.addEventListener('click', unlockMaster);
    if (masterPinInput) {
        masterPinInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') unlockMaster();
        });
    }
    if (lockAdminBtn) {
        lockAdminBtn.addEventListener('click', () => {
            sessionStorage.removeItem('shahon_master_unlocked');
            if (masterPinInput) masterPinInput.value = '';
            if (masterAuthOverlay) masterAuthOverlay.classList.remove('unlocked');
            showToast('🔒 Master OS Locked.');
        });
    }

    // -------------------------------------------------------------------
    // 8.2 CLIENT TEMPLATES & BUYERS DATABASE MANAGER
    // -------------------------------------------------------------------
    function getClientDb() {
        try {
            return JSON.parse(localStorage.getItem('CLIENTS_DB')) || {};
        } catch {
            return {};
        }
    }
    function saveClientDb(db) {
        localStorage.setItem('CLIENTS_DB', JSON.stringify(db));
    }

    function renderClientsManager() {
        const db = getClientDb();
        const clientKeys = Object.keys(db);
        const tbody = document.getElementById('clientsTableBody');
        const statTotal = document.getElementById('statTotalClients');
        const buyerInput = document.getElementById('buyerPortalLinkInput');

        if (statTotal) statTotal.textContent = clientKeys.length;

        // Set Buyer Onboarding Link (setup.html)
        const setupUrl = getBaseOrigin() + '/setup.html';
        if (buyerInput) buyerInput.value = setupUrl;

        if (!tbody) return;
        tbody.innerHTML = '';

        if (clientKeys.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" style="text-align:center; padding:32px; color:#64748b;">
                        <div style="font-size:24px; margin-bottom:8px;">📦</div>
                        <strong style="color:#e2e8f0; font-size:14px;">No Client Templates Sold Yet</strong>
                        <div style="font-size:12px; margin-top:4px;">Send your buyer the onboarding link above. The moment they link their Discord, their custom bio profile will appear here!</div>
                    </td>
                </tr>
            `;
            return;
        }

        clientKeys.forEach(slug => {
            const c = db[slug];
            const dateStr = c.createdAt ? new Date(c.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Recent';
            const bioUrl = `${getBaseOrigin()}/index.html?u=${c.slug}`;

            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="client-profile-cell">
                        <img src="${c.avatar || './assets/media/shahon_avatar.png'}" class="client-avatar-thumb">
                        <div>
                            <div class="client-name-bold">${c.displayName || c.username}</div>
                            <div class="client-handle-sub">@${c.username}</div>
                        </div>
                    </div>
                </td>
                <td><code style="font-family:var(--font-mono); color:#94a3b8; font-size:11.5px;">${c.id}</code></td>
                <td><span class="client-slug-badge">?u=${c.slug}</span></td>
                <td style="color:#94a3b8; font-size:12px;">${dateStr}</td>
                <td>
                    <div class="table-actions">
                        <a href="${bioUrl}" target="_blank" class="btn-table-action" title="View live client bio page">
                            👁️ View
                        </a>
                        <button type="button" class="btn-table-action" data-copy-link="${bioUrl}" title="Copy direct bio link">
                            📋 Copy
                        </button>
                        <button type="button" class="btn-table-action danger" data-del-slug="${c.slug}" title="Delete/revoke client">
                            🗑️
                        </button>
                    </div>
                </td>
            `;
            tbody.appendChild(tr);
        });

        // Attach action handlers
        tbody.querySelectorAll('[data-copy-link]').forEach(btn => {
            btn.addEventListener('click', () => {
                const url = btn.getAttribute('data-copy-link');
                navigator.clipboard.writeText(url).then(() => {
                    showToast('🔗 Client bio link copied!');
                });
            });
        });
        tbody.querySelectorAll('[data-del-slug]').forEach(btn => {
            btn.addEventListener('click', () => {
                const s = btn.getAttribute('data-del-slug');
                if (confirm(`Delete client profile "${s}"?`)) {
                    const currentDb = getClientDb();
                    delete currentDb[s];
                    saveClientDb(currentDb);
                    renderClientsManager();
                    showToast(`🗑️ Client "${s}" removed.`);
                }
            });
        });
    }

    const copyBuyerPortalBtn = document.getElementById('copyBuyerPortalBtn');
    if (copyBuyerPortalBtn) {
        copyBuyerPortalBtn.addEventListener('click', () => {
            const input = document.getElementById('buyerPortalLinkInput');
            if (input && input.value) {
                navigator.clipboard.writeText(input.value).then(() => {
                    showToast('🔗 Buyer setup link copied to clipboard!');
                });
            }
        });
    }

    const refreshClientsBtn = document.getElementById('refreshClientsBtn');
    if (refreshClientsBtn) {
        refreshClientsBtn.addEventListener('click', () => {
            renderClientsManager();
            showToast('🔄 Clients registry refreshed!');
        });
    }

    // -------------------------------------------------------------------
    // 8.3 DYNAMIC VIDEO ENGINE API & BACKGROUND SWITCHER
    // -------------------------------------------------------------------
    const inputBgVideoUrl = document.getElementById('inputBgVideoUrl');
    const btnDownloadBgVideo = document.getElementById('btnDownloadBgVideo');
    const btnDirectStreamBgVideo = document.getElementById('btnDirectStreamBgVideo');
    const btnResetBgVideo = document.getElementById('btnResetBgVideo');
    const videoProgressWrapper = document.getElementById('videoProgressWrapper');
    const videoProgressBar = document.getElementById('videoProgressBar');
    const videoProgressPercent = document.getElementById('videoProgressPercent');
    const videoProgressLabel = document.getElementById('videoProgressLabel');
    const videoStatusNote = document.getElementById('videoStatusNote');
    const videoStatusDot = document.getElementById('videoStatusDot');
    const activeVideoTitle = document.getElementById('activeVideoTitle');
    const activeVideoSub = document.getElementById('activeVideoSub');
    const adminVideoPlayer = document.getElementById('adminVideoPlayer');
    const adminYtPreviewPlayer = document.getElementById('adminYtPreviewPlayer');
    const videoPreviewTypeBadge = document.getElementById('videoPreviewTypeBadge');

    function extractYouTubeId(url) {
        if (!url) return null;
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    function renderVideoStudio() {
        const customBg = localStorage.getItem('custom_bg_video');
        if (customBg) {
            if (inputBgVideoUrl && !inputBgVideoUrl.value) inputBgVideoUrl.value = customBg;
            if (videoStatusDot) videoStatusDot.className = 'video-status-dot custom';
            if (activeVideoTitle) activeVideoTitle.textContent = 'Custom Video Active';
            if (activeVideoSub) activeVideoSub.textContent = customBg;

            const ytId = extractYouTubeId(customBg);
            if (ytId) {
                if (adminVideoPlayer) adminVideoPlayer.style.display = 'none';
                if (adminYtPreviewPlayer) {
                    adminYtPreviewPlayer.style.display = 'block';
                    adminYtPreviewPlayer.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&mute=1&loop=1&playlist=${ytId}&controls=0`;
                }
                if (videoPreviewTypeBadge) videoPreviewTypeBadge.textContent = 'YOUTUBE STREAM';
            } else {
                if (adminYtPreviewPlayer) {
                    adminYtPreviewPlayer.style.display = 'none';
                    adminYtPreviewPlayer.src = '';
                }
                if (adminVideoPlayer) {
                    adminVideoPlayer.style.display = 'block';
                    adminVideoPlayer.src = customBg;
                    adminVideoPlayer.play().catch(() => {});
                }
                if (videoPreviewTypeBadge) videoPreviewTypeBadge.textContent = 'LOCAL / DIRECT MP4';
            }
        } else {
            if (videoStatusDot) videoStatusDot.className = 'video-status-dot';
            if (activeVideoTitle) activeVideoTitle.textContent = 'Default Track Sync';
            if (activeVideoSub) activeVideoSub.textContent = 'Background video changes with active music playlist track';
            if (adminYtPreviewPlayer) {
                adminYtPreviewPlayer.style.display = 'none';
                adminYtPreviewPlayer.src = '';
            }
            if (adminVideoPlayer) {
                adminVideoPlayer.style.display = 'block';
                adminVideoPlayer.src = './assets/media/track_yad.mp4';
                adminVideoPlayer.play().catch(() => {});
            }
            if (videoPreviewTypeBadge) videoPreviewTypeBadge.textContent = 'PLAYLIST SYNC';
        }
    }

    // Auto-Download via Python Server yt-dlp API
    let videoPollTimer = null;
    function downloadViaApi(url) {
        if (!url) {
            alert('Please enter a video URL (YouTube, TikTok, Instagram, or direct video).');
            return;
        }

        if (videoProgressWrapper) videoProgressWrapper.style.display = 'block';
        if (videoProgressBar) videoProgressBar.style.width = '10%';
        if (videoProgressPercent) videoProgressPercent.textContent = '10%';
        if (videoProgressLabel) videoProgressLabel.textContent = 'Connecting to yt-dlp API...';
        if (videoStatusNote) videoStatusNote.textContent = `Downloading from: ${url}`;
        if (videoStatusDot) videoStatusDot.className = 'video-status-dot downloading';
        if (btnDownloadBgVideo) btnDownloadBgVideo.disabled = true;

        const apiBase = (window.location.origin && window.location.origin.startsWith('http')) ? window.location.origin : 'http://localhost:8080';

        fetch(`${apiBase}/api/video/download`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: url })
        })
        .then(res => res.json())
        .then(data => {
            if (!data.success) {
                throw new Error(data.error || 'Failed to initiate download');
            }
            // Poll for status
            if (videoPollTimer) clearInterval(videoPollTimer);
            videoPollTimer = setInterval(() => {
                fetch(`${apiBase}/api/video/status`)
                .then(r => r.json())
                .then(status => {
                    if (status.progress) {
                        const p = Math.round(status.progress);
                        if (videoProgressBar) videoProgressBar.style.width = `${p}%`;
                        if (videoProgressPercent) videoProgressPercent.textContent = `${p}%`;
                    }
                    if (status.title && videoProgressLabel) {
                        videoProgressLabel.textContent = `Downloading: ${status.title.slice(0, 35)}...`;
                    }

                    if (status.error) {
                        clearInterval(videoPollTimer);
                        if (btnDownloadBgVideo) btnDownloadBgVideo.disabled = false;
                        if (videoStatusDot) videoStatusDot.className = 'video-status-dot';
                        
                        // Check if it's a YouTube URL or direct streamable URL
                        const isYt = url.includes('youtube.com') || url.includes('youtu.be');
                        if (isYt || url.endsWith('.mp4') || url.endsWith('.webm')) {
                            localStorage.setItem('custom_bg_video', url);
                            renderVideoStudio();
                            if (videoProgressBar) videoProgressBar.style.width = '100%';
                            if (videoProgressPercent) videoProgressPercent.textContent = '100%';
                            if (videoProgressLabel) videoProgressLabel.textContent = '⚡ Auto-Switched to Instant HD Stream!';
                            if (videoStatusNote) videoStatusNote.textContent = 'YouTube bot check bypassed via Instant HD Stream mode.';
                            showToast('⚡ YouTube restriction bypassed! Auto-activated Instant Background Stream.');
                            setTimeout(() => {
                                if (videoProgressWrapper) videoProgressWrapper.style.display = 'none';
                            }, 3500);
                        } else {
                            if (videoStatusNote) videoStatusNote.textContent = `Error: ${status.error}`;
                            showToast(`❌ Video download failed: ${status.error.slice(0, 45)}`);
                        }
                    } else if (!status.is_downloading && status.progress >= 100) {
                        clearInterval(videoPollTimer);
                        if (btnDownloadBgVideo) btnDownloadBgVideo.disabled = false;
                        if (videoProgressBar) videoProgressBar.style.width = '100%';
                        if (videoProgressPercent) videoProgressPercent.textContent = '100%';
                        if (videoProgressLabel) videoProgressLabel.textContent = '✅ Download complete!';
                        if (videoStatusNote) videoStatusNote.textContent = 'Saved to ./assets/media/custom_bg.mp4';
                        
                        localStorage.setItem('custom_bg_video', './assets/media/custom_bg.mp4');
                        renderVideoStudio();
                        showToast('🎬 Background video downloaded & applied successfully!');

                        setTimeout(() => {
                            if (videoProgressWrapper) videoProgressWrapper.style.display = 'none';
                        }, 3000);
                    }
                })
                .catch(err => {
                    console.warn('Status poll error:', err);
                });
            }, 800);
        })
        .catch(err => {
            if (btnDownloadBgVideo) btnDownloadBgVideo.disabled = false;
            if (videoProgressWrapper) videoProgressWrapper.style.display = 'none';
            if (videoStatusDot) videoStatusDot.className = 'video-status-dot';
            alert(`Could not connect to Python Video API Server on port 8080.\nMake sure server.py is running! Error: ${err.message}`);
        });
    }

    if (btnDownloadBgVideo) {
        btnDownloadBgVideo.addEventListener('click', () => {
            const url = inputBgVideoUrl ? inputBgVideoUrl.value.trim() : '';
            downloadViaApi(url);
        });
    }

    if (btnDirectStreamBgVideo) {
        btnDirectStreamBgVideo.addEventListener('click', () => {
            const url = inputBgVideoUrl ? inputBgVideoUrl.value.trim() : '';
            if (!url) {
                alert('Please enter a video URL to stream.');
                return;
            }
            localStorage.setItem('custom_bg_video', url);
            renderVideoStudio();
            showToast('⚡ Live background video switched!');
        });
    }

    if (btnResetBgVideo) {
        btnResetBgVideo.addEventListener('click', () => {
            localStorage.removeItem('custom_bg_video');
            if (inputBgVideoUrl) inputBgVideoUrl.value = '';
            renderVideoStudio();
            showToast('🔄 Restored default playlist video sync!');
        });
    }

    // Aesthetic Presets Click
    document.querySelectorAll('.video-preset-card').forEach(card => {
        card.addEventListener('click', () => {
            const preset = card.dataset.preset;
            let path = './assets/media/track_yad.mp4';
            if (preset === 'track1') path = './assets/media/track_1.mp4';
            else if (preset === 'track2') path = './assets/media/track_2.mp4';
            else if (preset === 'track4') path = './assets/media/track_4.mp4';

            localStorage.setItem('custom_bg_video', path);
            if (inputBgVideoUrl) inputBgVideoUrl.value = path;
            renderVideoStudio();
            showToast(`✨ Preset applied: ${card.querySelector('.preset-title').textContent}`);
        });
    });

    // -------------------------------------------------------------------
    // 8.35 PUBLIC DOMAIN CONFIGURATION
    // -------------------------------------------------------------------
    const inputPublicDomain = document.getElementById('inputPublicDomain');
    const btnSavePublicDomain = document.getElementById('btnSavePublicDomain');
    const domainStatusBadge = document.getElementById('domainStatusBadge');

    function updateDomainUI() {
        const saved = localStorage.getItem('custom_public_domain') || 'https://syedshahon564-ops.github.io/danger-shawon';
        if (inputPublicDomain) inputPublicDomain.value = saved;
        if (domainStatusBadge) {
            domainStatusBadge.textContent = '🌐 GITHUB PAGES ACTIVE';
            domainStatusBadge.style.color = '#10b981';
            domainStatusBadge.style.background = 'rgba(16, 185, 129, 0.2)';
        }
    }

    if (btnSavePublicDomain) {
        btnSavePublicDomain.addEventListener('click', () => {
            const val = inputPublicDomain ? inputPublicDomain.value.trim().replace(/\/+$/, '') : '';
            if (val) {
                localStorage.setItem('custom_public_domain', val);
                showToast(`🌐 Public domain saved: ${val}`);
            } else {
                localStorage.removeItem('custom_public_domain');
                showToast('🖥️ Reverted to localhost auto-detect mode.');
            }
            updateDomainUI();
            renderTemplatesGrid();
            renderClientsManager();
            generateClientShareLink();
        });
    }

    // -------------------------------------------------------------------
    // 8.4 12 TEMPLATES SHOWCASE & 1-CLICK LINK GENERATOR
    // -------------------------------------------------------------------
    function renderTemplatesGrid() {
        const grid = document.getElementById('templatesCardsGrid');
        if (!grid || typeof TEMPLATES_REGISTRY === 'undefined') return;

        grid.innerHTML = '';
        const origin = getBaseOrigin();

        TEMPLATES_REGISTRY.forEach(t => {
            const blankLink = `${origin}/index.html?theme=${t.id}`;
            const card = document.createElement('div');
            card.className = 'tpl-card';
            card.innerHTML = `
                <div class="tpl-card-header">
                    <span class="tpl-badge" style="background:${t.glow}; color:#fff; border:1px solid ${t.cardBorder};">${t.badge}</span>
                    <div class="tpl-color-swatches">
                        <span class="tpl-swatch" style="background:${t.accent};" title="Primary Accent: ${t.accent}"></span>
                        <span class="tpl-swatch" style="background:${t.secondary};" title="Secondary Accent: ${t.secondary}"></span>
                    </div>
                </div>
                <div>
                    <div class="tpl-title">#${t.num} ${t.name}</div>
                    <div class="tpl-title-bn">${t.nameBn}</div>
                    <div class="tpl-desc">${t.description}</div>
                </div>
                <div class="tpl-actions">
                    <a href="${blankLink}" target="_blank" class="btn-admin btn-admin-outline" title="Open blank template preview">👁️ Preview</a>
                    <button type="button" class="btn-admin btn-admin-outline" data-copy-tpl="${blankLink}" title="Copy showcase link for buyers">📋 Copy</button>
                    <button type="button" class="btn-admin btn-admin-primary" data-select-tpl="${t.id}" title="Select for client creator">⚡ Select</button>
                </div>
            `;
            grid.appendChild(card);
        });

        // Copy showcase link handler
        grid.querySelectorAll('[data-copy-tpl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const link = btn.getAttribute('data-copy-tpl');
                navigator.clipboard.writeText(link).then(() => {
                    showToast('🔗 Showcase template link copied to clipboard!');
                });
            });
        });

        // Select for client generator handler
        grid.querySelectorAll('[data-select-tpl]').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-select-tpl');
                const sel = document.getElementById('tplGenTheme');
                if (sel) sel.value = id;
                const uidInp = document.getElementById('tplGenUserId');
                if (uidInp) {
                    uidInp.focus();
                    uidInp.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
                showToast(`🎨 Template #${id} selected in generator!`);
            });
        });
    }

    // 1-Click Client Link Creator Handler
    const btnTplGenerateLink = document.getElementById('btnTplGenerateLink');
    if (btnTplGenerateLink) {
        btnTplGenerateLink.addEventListener('click', () => {
            const themeSel = document.getElementById('tplGenTheme');
            const uidInp = document.getElementById('tplGenUserId');
            const nameInp = document.getElementById('tplGenDisplayName');
            const srvInp = document.getElementById('tplGenServer');

            const theme = themeSel ? themeSel.value : 'cyber_rose';
            const uid = uidInp ? uidInp.value.trim() : '';
            const dName = nameInp ? nameInp.value.trim() : '';
            let rawServer = srvInp ? srvInp.value.trim() : '';
            let cleanServer = '';
            if (rawServer) {
                cleanServer = rawServer.replace(/^(?:https?:\/\/)?(?:www\.)?(?:discord\.gg\/|discord\.com\/invite\/)/i, '').replace(/\/+$/, '').trim();
            }

            if (!uid && !dName) {
                alert('Please enter at least the buyer\'s Discord User ID or Display Name.');
                return;
            }

            const targetId = uid || '1525762942081962096';
            const displayName = dName || (uid ? `User_${uid.slice(-4)}` : 'DANGER SHAWON');
            const username = dName ? dName.toLowerCase().replace(/[^a-z0-9_-]/g, '') : `user_${targetId.slice(-4)}`;
            const slug = username;

            // Save into CLIENTS_DB
            const currentDb = getClientDb();
            currentDb[slug] = {
                id: targetId,
                displayName: displayName,
                username: username,
                avatar: './assets/media/shahon_avatar.png',
                deco: './assets/media/avatar_decoration.png',
                serverInvite: cleanServer,
                status: 'dnd',
                theme: theme,
                createdAt: new Date().toISOString(),
                slug: slug
            };
            saveClientDb(currentDb);
            renderClientsManager();

            // Build full URL
            const origin = getBaseOrigin();
            const params = new URLSearchParams({
                u: slug,
                theme: theme,
                id: targetId,
                name: displayName,
                username: username
            });
            if (cleanServer) params.set('server', cleanServer);

            const directUrl = `${origin}/index.html?${params.toString()}`;

            const resBox = document.getElementById('tplGenResultBox');
            const resInput = document.getElementById('tplGenResultInput');
            const openBtn = document.getElementById('btnOpenTplResultLink');
            const copyBtn = document.getElementById('btnCopyTplResultLink');

            if (resInput) resInput.value = directUrl;
            if (openBtn) openBtn.href = directUrl;
            if (resBox) resBox.style.display = 'block';

            // Auto-copy to clipboard
            navigator.clipboard.writeText(directUrl).then(() => {
                showToast(`🚀 Client bio link generated & copied for @${username}!`);
            });

            if (copyBtn) {
                copyBtn.onclick = () => {
                    navigator.clipboard.writeText(directUrl).then(() => {
                        showToast('📋 Link copied to clipboard!');
                    });
                };
            }
        });
    }

    // -------------------------------------------------------------------
    // 9. INITIALIZE
    // -------------------------------------------------------------------
    checkMasterAuth();
    populateForm();
    updateLivePreview();
    updateDomainUI();
    generateClientShareLink();
    renderExportCode();
    renderClientsManager();
    renderVideoStudio();
    renderTemplatesGrid();
});
