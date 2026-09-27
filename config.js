/**
 * =======================================================================
 *                    PREMIUM BIO-LINK & PORTFOLIO CONFIG
 * =======================================================================
 * এই ফাইলটি পরিবর্তন করে আপনি ওয়েবসাইটের সমস্ত তথ্য পরিবর্তন করতে পারবেন।
 * যারা এই টেমপ্লেটটি কিনবে, তারা শুধু এই ফাইলটি এডিট করলেই তাদের নিজস্ব
 * নাম, ডিসকর্ড আইডি, সার্ভার, গান ও সোশ্যাল লিংক সেট হয়ে যাবে।
 * =======================================================================
 */

const CONFIG = {
    // -------------------------------------------------------------------
    // 1. প্রোফাইল ও পরিচিতি (Profile & Identity)
    // -------------------------------------------------------------------
    profile: {
        pageTitle: "DANGER SHAWON | mjshahon",     // ব্রাউজার ট্যাবের টাইটেল
        displayName: "DANGER SHAWON",               // মূল ডিসপ্লে নাম (স্ক্রিনশট অনুযায়ী)
        username: "mjshahon",                      // ডিসপ্লে ইউজারনেম / হ্যান্ডেল
        tagline: "\"Legends don't announce themselves. They\"", // স্ট্যাটাস কোট
        statusEmojis: "🎮 🖥️ ⚔️ ⚙️",                // স্ট্যাটাস ইমোজি বার
        status: "dnd",                             // Do Not Disturb (লাল ডট উইথ ড্যাশ)
        avatar: "./assets/media/shahon_avatar.png", // ডিসকর্ড প্রোফাইল পিকচার
        avatarDecoration: "./assets/media/avatar_decoration.png", // ডিসকর্ড নাইট্রো অবতার ডেকোরেশন (পার্পল উইংস)
        profileEffect: "white_roses",              // ডিসকর্ড হোয়াইট রোজেস ফ্লোরাল ফ্রেম
        verified: true,                             // ভেরিফায়েড ব্যাজ টিক
        location: "Bangladesh",                     // কান্ট্রি / লোকেশন
        timezone: "Asia/Dhaka",                     // ক্লক টাইমজোন
        viewsOffset: 14280,                         // প্রাথমিক ভিউ কাউন্টার
        bioDescription: `Hi, I'm <span class="highlight">DANGER SHAWON</span> (@mjshahon) — crafting clean, interactive web experiences.<br>Specializing in turning creative concepts into minimal, aesthetic code.<br><br>Currently building things from <em>Bangladesh</em>.`
    },

    // -------------------------------------------------------------------
    // 1.1 এন্ট্রি স্ক্রিন সেটিংস (Entry Screen & Auto-Enter Settings)
    // -------------------------------------------------------------------
    entryScreen: {
        enabled: true,          // false দিলে সরাসরি সাইট দেখাবে
        autoEnter: false,       // true দিলে কোনো বাটন ছাড়া স্বয়ংক্রিয় প্রবেশ করবে
        promptText: "[ CLICK ANYWHERE TO ENTER ]"
    },

    // -------------------------------------------------------------------
    // 2. ডিসকর্ড ইন্টিগ্রেশন (Discord Live Presence & Server Widget)
    // -------------------------------------------------------------------
    discord: {
        // আপনার ডিসকর্ড ইউজার আইডি (1525762942081962096)
        userId: "1525762942081962096",
        // আপনার ডিসকর্ড সার্ভারের ইনভাইট লিংক বা কোড (যেমন https://discord.gg/yourcode বা yourcode)
        serverInviteCode: "",
        serverName: "Shahon's Server",
        // দ্বিতীয় সার্ভার ইনভাইট কোড (About সেকশনের জন্য)
        secondServerInviteCode: "",
        secondServerName: "Community Hub"
    },

    // -------------------------------------------------------------------
    // 3. সোশ্যাল মিডিয়া লিংক (Social Media Links)
    // (যে লিংকগুলো আপনি রাখতে চান না, সেগুলো খালি "" রাখুন)
    // -------------------------------------------------------------------
    socials: {
        facebook: "https://facebook.com/mjshahon",
        instagram: "https://instagram.com/mjshahon",
        tiktok: "https://tiktok.com/@mjshahon",
        threads: "https://threads.net/@mjshahon",
        x: "https://x.com/mjshahon",
        github: "https://github.com/mjshahon",
        telegram: "https://t.me/mjshahon",
        discord: "https://discord.com/users/1525762942081962096",
        linkedin: "https://linkedin.com/in/mjshahon",
        whatsapp: "",
        pinterest: ""
    },

    // -------------------------------------------------------------------
    // 4. মিউজিক প্লেলিস্ট ও ব্যাকগ্রাউন্ড ভিডিও (Unlimited Playlist & Videos)
    // (প্রতিটি গানের জন্য MP4 ভিডিও, MP3 অডিও, কভার ছবি ও স্ক্রোলিং লিরিক্স)
    // -------------------------------------------------------------------
    playlist: [
        {
            id: 1,
            title: "YAD (Яд) English Version",
            artist: "Vanna Rainelle",
            videoUrl: "./assets/media/track_yad.mp4",
            audioUrl: "./assets/media/track_yad.mp3",
            coverUrl: "./assets/media/cover_yad.jpg",
            lyrics: [
                { time: 0.0, text: "Sweet like venom, flowin' through my veins" },
                { time: 4.2, text: "Taste your poison, taking away the pain" },
                { time: 8.8, text: "Caught in the trap of your dangerous eyes" },
                { time: 13.5, text: "Burning inside like fire in the skies" },
                { time: 18.2, text: "Say my name, do you feel the fire?" },
                { time: 23.8, text: "Lost in the shadows of pure desire" },
                { time: 29.5, text: "Яд, сладкий яд..." },
                { time: 35.2, text: "Every touch is like electricity" },
                { time: 42.0, text: "You and me in this sweet infinity" }
            ]
        },
        {
            id: 2,
            title: "No Lie (Speed Up)",
            artist: "Sean Paul ft. Dua Lipa",
            videoUrl: "./assets/media/track_1.mp4",
            audioUrl: "./assets/media/track_1.mp3",
            coverUrl: "./assets/media/cover_1.jpg",
            lyrics: [
                { time: 0.0, text: "Feel your eyes, they all over me" },
                { time: 2.2, text: "Don't be shy, take control of me" },
                { time: 4.8, text: "Get the vibe, it's gonna be a lit night" },
                { time: 7.2, text: "Baby boy, you know there's no lie, no lie" },
                { time: 9.8, text: "Look into my eyes, I'm down for whatever" }
            ]
        },
        {
            id: 3,
            title: "Espresso (Aesthetic)",
            artist: "Sabrina Carpenter",
            videoUrl: "./assets/media/track_2.mp4",
            audioUrl: "./assets/media/track_2.mp3",
            coverUrl: "./assets/media/cover_2.jpg",
            lyrics: [
                { time: 0.0, text: "Now he's thinkin' 'bout me every night, oh" },
                { time: 2.5, text: "Is it that sweet? I guess so" },
                { time: 4.8, text: "Say you can't sleep, baby, I know" },
                { time: 7.2, text: "That's that me, espresso" },
                { time: 9.5, text: "Move it up, down, left, right, oh" }
            ]
        },
        {
            id: 4,
            title: "yad ( яд ) - Speed Up",
            artist: "Erika Lundmoen",
            videoUrl: "./assets/media/track_3.mp4",
            audioUrl: "./assets/media/track_3.mp3",
            coverUrl: "./assets/media/cover_3.jpg",
            lyrics: [
                { time: 0.0, text: "Твой сладкий яд меня дурманит" },
                { time: 2.8, text: "И сердце медленно сгорает" },
                { time: 5.5, text: "В плену твоих опасных глаз" },
                { time: 8.2, text: "Я растворяюсь каждый раз" },
                { time: 11.0, text: "No lie, you keep me up all night" }
            ]
        },
        {
            id: 5,
            title: "Collide (Slowed)",
            artist: "Justine Skye",
            videoUrl: "./assets/media/track_4.mp4",
            audioUrl: "./assets/media/track_4.mp3",
            coverUrl: "./assets/media/cover_4.jpg",
            lyrics: [
                { time: 0.0, text: "I've been thinkin' 'bout you all day" },
                { time: 2.7, text: "Baby, you know what I want to say" },
                { time: 5.5, text: "When our shadows touch the floor" },
                { time: 8.3, text: "I can't help but ask for more" },
                { time: 11.2, text: "Let's collide tonight..." }
            ]
        },
        {
            id: 6,
            title: "Beretta (Slowed)",
            artist: "Losy",
            videoUrl: "./assets/media/track_5.mp4",
            audioUrl: "./assets/media/track_5.mp3",
            coverUrl: "./assets/media/cover_5.jpg",
            lyrics: [
                { time: 0.0, text: "Riding through the midnight glow" },
                { time: 2.8, text: "Everything is moving slow" },
                { time: 5.6, text: "Neon lights upon the street" },
                { time: 8.5, text: "Feel the rhythm and the beat" },
                { time: 11.5, text: "Dangerous love, dangerous game" }
            ]
        }
    ],

    // -------------------------------------------------------------------
    // 5. স্কিলস ও টেকনোলজি স্ট্যাক (Skills & Badges)
    // -------------------------------------------------------------------
    skills: [
        { name: "Python", icon: "https://img.icons8.com/color/48/python--v1.png" },
        { name: "JavaScript", icon: "https://img.icons8.com/color/48/javascript--v1.png" },
        { name: "TypeScript", icon: "https://img.icons8.com/color/48/typescript--v1.png" },
        { name: "Next.js", icon: "https://img.icons8.com/fluent/48/node-js.png" },
        { name: "HTML5/CSS3", icon: "https://img.icons8.com/color/48/html-5--v1.png" },
        { name: "Cloudflare", icon: "https://img.icons8.com/color/48/cloudflare.png" },
        { name: "Discord API", icon: "https://img.icons8.com/color/48/discord-new-logo.png" }
    ],

    // -------------------------------------------------------------------
    // 6. ফিচার্ড প্রজেক্টস (Featured Projects)
    // -------------------------------------------------------------------
    projects: [
        {
            title: "mjshahon - Cyber Portfolio",
            description: "A luxury bio website featuring 3D tilt interaction, glowing badges, synced video background, and aesthetic particles.",
            tags: ["HTML5", "CSS3", "JavaScript"],
            preview: "./assets/media/cover_yad.jpg",
            linkText: "View Project",
            linkUrl: "https://guns.lol/mjshahon"
        },
        {
            title: "Discord Bot Hub",
            description: "A high-performance Discord server managing bot systems using Node.js and Lanyard API integrations.",
            tags: ["Node.js", "Discord.js", "REST API"],
            preview: "./assets/media/cover_4.jpg",
            linkText: "Contact Me",
            linkUrl: "https://discord.com/users/1525762942081962096"
        }
    ],

    // -------------------------------------------------------------------
    // 7. কাস্টম অ্যাকশন বাটনস (Slide 4 Buttons)
    // -------------------------------------------------------------------
    customButtons: [
        { title: "GitHub Profile", url: "https://github.com/mjshahon", icon: "github" },
        { title: "Telegram Channel", url: "https://t.me/mjshahon", icon: "send" },
        { title: "Discord Direct", url: "https://discord.com/users/1525762942081962096", icon: "message-circle" }
    ],

    // -------------------------------------------------------------------
    // 8. সিকিউরিটি ও ডিসকর্ড ওয়েবহুক (Security & Webhooks)
    // -------------------------------------------------------------------
    security: {
        adminPassword: "admin",                   // ওনার কন্ট্রোল প্যানেলের পাসওয়ার্ড
        enable2FA: false,                         // ২-ফ্যাক্টর অথেনটিকেশন (Google Authenticator)
        twoFactorSecret: "JBSWY3DPEHPK3PXP",       // 2FA সিক্রেট কী
        blockDevTools: true,                      // F12 / Inspect Element ব্লক রাখবে কিনা
        blockRightClick: true,                    // মাউস রাইট ক্লিক কপি-পেস্ট প্রটেকশন
        // ডিসকর্ড ওয়েবহুক লিংক (ভিজিটররা মেসেজ পাঠালে আপনার ডিসকর্ডে নোটিফিকেশন যাবে)
        webhooks: {
            contact: "",                          // https://discord.com/api/webhooks/...
            views: "",                            // ভিউ ট্র্যাকিং ওয়েবহুক
            adminAlerts: ""                       // অ্যাডমিন লগইন অ্যালার্ট
        }
    }
};

// -------------------------------------------------------------------
// 9. 12 টি প্রিমিয়াম টেমপ্লেট রেজিস্ট্রি (12 Luxury Bio Templates Registry)
// -------------------------------------------------------------------
const TEMPLATES_REGISTRY = [
    {
        id: "cyber_rose",
        num: 1,
        name: "Dark Cyber Rose",
        nameBn: "ডার্ক সাইবার রোজ (ডিফল্ট)",
        badge: "🌹 Cyber Rose",
        accent: "#8b5cf6",
        secondary: "#d4af37",
        glow: "rgba(139, 92, 246, 0.4)",
        cardBorder: "rgba(139, 92, 246, 0.35)",
        sampleName: "DANGER SHAWON",
        sampleHandle: "mjshahon",
        sampleQuote: "\"Legends don't announce themselves. They\"",
        sampleEmojis: "🎮 🖥️ ⚔️ ⚙️",
        defaultVideo: "./assets/media/track_yad.mp4",
        description: "Dark luxury cyber theme with luminous white roses garland and angel wings."
    },
    {
        id: "crimson_samurai",
        num: 2,
        name: "Crimson Blood Samurai",
        nameBn: "ক্রিমসন ব্লাড সামুরাই",
        badge: "⚔️ Blood Samurai",
        accent: "#ef4444",
        secondary: "#f87171",
        glow: "rgba(239, 68, 68, 0.45)",
        cardBorder: "rgba(239, 68, 68, 0.38)",
        sampleName: "CRIMSON SHAWON",
        sampleHandle: "crimson_blade",
        sampleQuote: "\"Sharp as a katana blade, silent in the shadows.\"",
        sampleEmojis: "⚔️ 🩸 👹 🥷",
        defaultVideo: "./assets/media/track_1.mp4",
        description: "Blood crimson demonic theme with glowing red katana aura and dark borders."
    },
    {
        id: "neon_cyberpunk",
        num: 3,
        name: "Neon Cyberpunk 2077",
        nameBn: "নিওন সাইবারপাঙ্ক ২০৭৭",
        badge: "⚡ Cyberpunk 2077",
        accent: "#06b6d4",
        secondary: "#f43f5e",
        glow: "rgba(6, 182, 212, 0.45)",
        cardBorder: "rgba(6, 182, 212, 0.38)",
        sampleName: "CYBER SHAWON",
        sampleHandle: "netrunner_x",
        sampleQuote: "\"Wake up, netrunner. We have a city to burn.\"",
        sampleEmojis: "⚡ 🤖 👾 🚀",
        defaultVideo: "./assets/media/track_2.mp4",
        description: "Electric cyan & hot magenta neon aesthetic with futuristic grid vibes."
    },
    {
        id: "lofi_rain",
        num: 4,
        name: "Aesthetic Lo-Fi Rain",
        nameBn: "এস্থেটিক লো-ফাই রেইন",
        badge: "🌧️ Lo-Fi Rain",
        accent: "#a78bfa",
        secondary: "#38bdf8",
        glow: "rgba(167, 139, 250, 0.35)",
        cardBorder: "rgba(167, 139, 250, 0.3)",
        sampleName: "LO-FI SHAWON",
        sampleHandle: "midnight_lofi",
        sampleQuote: "\"Lost in nostalgic midnight thoughts & raindrops.\"",
        sampleEmojis: "🌧️ ☕ 🎧 🌙",
        defaultVideo: "./assets/media/track_3.mp4",
        description: "Cozy pastel lavender & rain droplets with mellow midnight cafe ambience."
    },
    {
        id: "emerald_matrix",
        num: 5,
        name: "Emerald Matrix Hacker",
        nameBn: "ইমারেল্ড ম্যাট্রিক্স হ্যাকার",
        badge: "💻 Matrix Hacker",
        accent: "#10b981",
        secondary: "#34d399",
        glow: "rgba(16, 185, 129, 0.45)",
        cardBorder: "rgba(16, 185, 129, 0.38)",
        sampleName: "CIPHER SHAWON",
        sampleHandle: "root_access",
        sampleQuote: "\"There is no spoon. System access granted.\"",
        sampleEmojis: "💻 🟢 🔓 ⚡",
        defaultVideo: "./assets/media/track_4.mp4",
        description: "Terminal phosphor green glyphs, binary code rain, and cyberpunk monospace look."
    },
    {
        id: "royal_gold",
        num: 6,
        name: "Royal 24K Gold Sovereign",
        nameBn: "রয়্যাল ২৪K লিকুইড গোল্ড",
        badge: "👑 Royal 24K Gold",
        accent: "#fbbf24",
        secondary: "#d97706",
        glow: "rgba(251, 191, 36, 0.45)",
        cardBorder: "rgba(251, 191, 36, 0.38)",
        sampleName: "KING SHAWON",
        sampleHandle: "royal_sovereign",
        sampleQuote: "\"True royalty announces itself by presence alone.\"",
        sampleEmojis: "👑 🪙 ⚜️ 🏆",
        defaultVideo: "./assets/media/track_yad.mp4",
        description: "Liquid metallic gold sheen with imperial king crest and luxury baroque accents."
    },
    {
        id: "ice_frost",
        num: 7,
        name: "Glacial Ice Frost",
        nameBn: "গ্লেসিয়াল আইস ফ্রস্ট",
        badge: "❄️ Ice Frost",
        accent: "#38bdf8",
        secondary: "#e0f2fe",
        glow: "rgba(56, 189, 248, 0.4)",
        cardBorder: "rgba(56, 189, 248, 0.35)",
        sampleName: "BLIZZARD SHAWON",
        sampleHandle: "frostbite_zero",
        sampleQuote: "\"Cold as deep arctic ice, sharper than broken glass.\"",
        sampleEmojis: "❄️ 🧊 💎 🌬️",
        defaultVideo: "./assets/media/track_1.mp4",
        description: "Frozen diamond frost borders, crystalline cyan glow, and drifting snowflakes."
    },
    {
        id: "dark_sakura",
        num: 8,
        name: "Dark Cherry Blossom",
        nameBn: "ডার্ক সাকুরা ব্লসম",
        badge: "🌸 Dark Sakura",
        accent: "#f472b6",
        secondary: "#fb7185",
        glow: "rgba(244, 114, 182, 0.4)",
        cardBorder: "rgba(244, 114, 182, 0.35)",
        sampleName: "SAKURA SHAWON",
        sampleHandle: "sakura_storm",
        sampleQuote: "\"Even through the darkest night, cherry blossoms bloom.\"",
        sampleEmojis: "🌸 🌺 🍵 ⛩️",
        defaultVideo: "./assets/media/track_2.mp4",
        description: "Midnight dark Japanese aesthetic with falling soft pink sakura blossoms."
    },
    {
        id: "synthwave_80s",
        num: 9,
        name: "Retro Synthwave 80s",
        nameBn: "রেট্রো সিন্থওয়েভ ১৯৮৪",
        badge: "🌆 Synthwave 80s",
        accent: "#ec4899",
        secondary: "#f97316",
        glow: "rgba(236, 72, 153, 0.45)",
        cardBorder: "rgba(236, 72, 153, 0.38)",
        sampleName: "RETRO SHAWON",
        sampleHandle: "synth_rider",
        sampleQuote: "\"Driving into the 1984 neon sunset forever.\"",
        sampleEmojis: "🌆 🚗 📼 🌴",
        defaultVideo: "./assets/media/track_3.mp4",
        description: "Sunset orange & neon magenta gradient, retro wireframe horizon grid lines."
    },
    {
        id: "obsidian_minimal",
        num: 10,
        name: "Obsidian Stealth Minimal",
        nameBn: "অবসিডিয়ান স্টেলথ মিনিমাল",
        badge: "⬛ Obsidian Stealth",
        accent: "#e2e8f0",
        secondary: "#94a3b8",
        glow: "rgba(255, 255, 255, 0.2)",
        cardBorder: "rgba(255, 255, 255, 0.15)",
        sampleName: "STEALTH SHAWON",
        sampleHandle: "obsidian_null",
        sampleQuote: "\"Simplicity is the ultimate sophistication.\"",
        sampleEmojis: "⬛ 🕶️ 🗡️ 🌑",
        defaultVideo: "./assets/media/track_4.mp4",
        description: "Pure stealth matte monochrome glass, platinum typography, luxury dark mode."
    },
    {
        id: "toxic_grunge",
        num: 11,
        name: "Toxic Acid Streetwear",
        nameBn: "টক্সিক এসিড গ্রাঞ্জ",
        badge: "☣️ Toxic Acid",
        accent: "#a3e635",
        secondary: "#84cc16",
        glow: "rgba(163, 230, 53, 0.45)",
        cardBorder: "rgba(163, 230, 53, 0.38)",
        sampleName: "TOXIC SHAWON",
        sampleHandle: "hazard_zone",
        sampleQuote: "\"DANGER: Radioactive vibes & high voltage only.\"",
        sampleEmojis: "☣️ ⚠️ ☢️ 🧪",
        defaultVideo: "./assets/media/track_1.mp4",
        description: "Radioactive lime green, hazard warning badges, edgy streetwear typography."
    },
    {
        id: "celestial_galaxy",
        num: 12,
        name: "Celestial Cosmic Galaxy",
        nameBn: "কসমিক গ্যালাক্সি নেবুলা",
        badge: "🌌 Cosmic Galaxy",
        accent: "#c084fc",
        secondary: "#60a5fa",
        glow: "rgba(192, 132, 252, 0.45)",
        cardBorder: "rgba(192, 132, 252, 0.38)",
        sampleName: "COSMIC SHAWON",
        sampleHandle: "astral_wanderer",
        sampleQuote: "\"Born from stardust, destined for the infinite cosmos.\"",
        sampleEmojis: "🌌 🪐 🔭 💫",
        defaultVideo: "./assets/media/track_yad.mp4",
        description: "Astral violet & galactic blue starlight shimmer with celestial constellations."
    }
];

// Global export for browser & modules
if (typeof window !== 'undefined') {
    window.CONFIG = CONFIG;
    window.TEMPLATES_REGISTRY = TEMPLATES_REGISTRY;
}
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, TEMPLATES_REGISTRY };
}
