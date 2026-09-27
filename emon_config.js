// Emon's Portfolio Dynamic Configuration File
window.portfolioConfig = {
    // Security & Auth details
    security: {
        adminPasswordHash: "fd9545ccd948144d25faa8d4545b4f9c42b669397255ca2f849568b6582004e9",
        bypassDevToolsLockOnAdmin: true,
        allowCopyPaste: false,
        twoFactorEnabled: true,
        twoFactorSecret: "JBSWY3DPEHPK3PXP",
        directCodeLoginEnabled: true
    },
    
    // SEO & Page Title
    seo: {
        pageTitle: "@𝐸𝓂𝑜𝓃.7𝓍𝒳",
        faviconUrl: "https://cdn.discordapp.com/avatars/1213100866916196423/83c71e5bf03e8e3df218054818ece685.png?size=128"
    },
    
    // Webhook settings & offsets (Webhooks are handled securely via /api/notify server proxy)
    webhooks: {
        viewsWebhookUrl: "",
        contactWebhookUrl: "",
        intrusionWebhookUrl: "",
        durationWebhookUrl: "",
        musicSearchWebhookUrl: "",
        adminLoginWebhookUrl: "",
        adminChangesWebhookUrl: ""
    },
    
    // Main Settings
    settings: {
        fallbackEmail: "012emonhossen@gmail.com",
        baseViewsOffset: 14280,
        discordLanyardUserId: "1213100866916196423"
    },
    
    // Main Profile Card (Slide 1)
    profile: {
        username: "𝐸𝓂𝑜𝓃.7𝓍𝒳",
        avatarUrl: "https://cdn.discordapp.com/avatars/1213100866916196423/83c71e5bf03e8e3df218054818ece685.png?size=512",
        avatarDecorationUrl: "https://cdn.discordapp.com/avatar-decoration-presets/a_f3af281c65cf0cf590e9e1f59e9c6cf6.png",
        isVerified: true,
        badges: [
            { tooltip: "Premium", iconType: "premium" },
            { tooltip: "Flame", iconType: "flame" },
            { tooltip: "Server Booster", iconType: "booster" },
            { tooltip: "Gifter", iconType: "gifter" },
            { tooltip: "Star Access", iconType: "star" },
            { tooltip: "Domain Legend", iconType: "domain" }
        ]
    },
    
    // Discord Status server widgets invites (Invite code only, e.g. 'x9xWhcQVAj')
    discordWidgets: {
        server1Invite: "x9xWhcQVAj",
        server2Invite: "Yw9MePfU8h"
    },
    
    // Social Media Links (Empty links will hide the icon)
    socials: {
        facebook: "https://facebook.com/emon.7xx",
        instagram: "https://instagram.com/emon.7xx",
        tiktok: "https://tiktok.com/@emon.7xx",
        threads: "https://threads.net/@emon.7xx",
        x: "https://x.com/emon7xx",
        github: "https://github.com/emon7xx",
        pinterest: "https://pinterest.com/emon7xx",
        telegram: "https://t.me/emon7xX",
        discord: "https://discord.com/users/1213100866916196423",
        linkedin: "https://linkedin.com/in/emon7xx"
    },
    
    // About Me Tab (Slide 2)
    about: {
        description: "Hi, I'm <em>Emon</em> — a passionate self-taught developer and designer crafting clean, interactive web experiences.<br>\nI specialize in turning creative concepts into minimal, aesthetic code.<br><br>\nCurrently building things from <em>Bangladesh</em>.",
        timezone: "Asia/Dhaka", // Timezone for clock widget
        location: "Bangladesh",
        locationFlag: "BD" // ISO country code for country flag emoji
    },
    
    // Skills List (Slide 2 bottom)
    skills: [
        { name: "Python", iconUrl: "https://img.icons8.com/color/48/python--v1.png" },
        { name: "JavaScript", iconUrl: "https://img.icons8.com/color/48/javascript--v1.png" },
        { name: "TypeScript", iconUrl: "https://img.icons8.com/color/48/typescript--v1.png" },
        { name: "Next.js", iconUrl: "https://img.icons8.com/fluent/48/node-js.png" },
        { name: "HTML5/CSS3", iconUrl: "https://img.icons8.com/color/48/html-5--v1.png" },
        { name: "Cloudflare", iconUrl: "https://img.icons8.com/color/48/cloudflare.png" },
        { name: "Discord API", iconUrl: "https://img.icons8.com/color/48/discord-new-logo.png" }
    ],
    
    // Featured Projects list (Slide 3)
    projects: [
        {
            name: "𝐸𝓂𝑜𝓃.7𝓍𝒳 - <span class=\"highlight-italic\">portfolio</span>",
            description: "A premium portfolio website featuring 3D tilt interaction, glowing badges, custom audio stream control, and canvas-based animations.",
            tags: ["HTML5", "CSS3", "JavaScript"],
            previewUrl: "emon-portfolio-preview.png",
            projectLink: "https://guns.lol/emon.7xx",
            linkLabel: "View Project"
        },
        {
            name: "Discord Bot Hub",
            description: "A Discord server managing bot systems using Node.js and Lanyard API integrations. For custom bot development, reach out on Discord.",
            tags: ["Node.js", "Discord.js", "API"],
            previewUrl: "https://r2.guns.lol/515db85a-c7c5-43d5-a423-874bdcb23605.webp",
            projectLink: "https://discord.com/users/1213100866916196423",
            linkLabel: "Contact Me"
        }
    ],
    
    // Other Bios List (Slide 4 Left)
    otherBios: [
        { roleLabel: "〔 </dev> 〕", name: "Emon Hossen", linkUrl: "https://facebook.com/emon.7xx" },
        { roleLabel: "〔 another profile 〕", name: "Emon.7xX", linkUrl: "https://guns.lol/emon.7xx" },
        { roleLabel: "〔 alias 〕", name: "Emon.7xX <span class=\"current-tag\">(you are here)</span>", linkUrl: "https://emon7xx.xyz/" }
    ],
    
    // Custom Premium Buttons list (Slide 4 Right)
    customButtons: [
        { label: "GitHub Profile", iconType: "github", linkUrl: "https://github.com/emon7xx" },
        { label: "Telegram", iconType: "telegram", linkUrl: "https://t.me/emon7xX" },
        { label: "WhatsApp", iconType: "whatsapp", linkUrl: "https://wa.link/05hjjv" }
    ],
    
    // Music Playlist Tracks (Slide 1 Music Player module)
    playlist: [
        {
            title: "Rich Nigga Vibe",
            artist: "Chris Brown",
            cover: "https://img.youtube.com/vi/deS2hPsEN1o/hqdefault.jpg",
            isBackgroundVideo: true,
            lyrics: [
                { time: 0.0, text: "Mustard on the beat, ho" },
                { time: 3.0, text: "You know I'm hittin' you up this late at night" },
                { time: 6.5, text: "'Cause I'm tryna fuck" },
                { time: 8.5, text: "I'm tryna start with the conversation" },
                { time: 11.5, text: "You actin' scared of a real nigga screamin', \"Thug life\"" },
                { time: 14.5, text: "Got that pussy wet, drippin' with the condensation" },
                { time: 18.0, text: "I know that Henny got you stuck, but it's bottom's up" },
                { time: 21.5, text: "I tried to cheat her with the love, but she by the book" },
                { time: 25.0, text: "And when I show that girl my mattress, she kinda shook" },
                { time: 28.0, text: "I'm tryna feel up on that ass, not designer clothes" },
                { time: 31.5, text: "Girl, the way you play, think that shit don't get to me" },
                { time: 35.0, text: "Fuck the finish line, already got the victory" },
                { time: 38.5, text: "Ain't worried 'bout the time, 'bout to make history" },
                { time: 42.0, text: "And you know that she called" },
                { time: 45.0, text: "She called me on the late night, baby wanna make love" },
                { time: 49.5, text: "Want me to get into somethin'" },
                { time: 52.5, text: "And she don't even wanna realize why I'm hittin' her up" },
                { time: 57.0, text: "This late at night, girl, it's 'bout fuckin'" },
                { time: 60.0, text: "I'm horny, babe, horny, baby" },
                { time: 63.5, text: "So baby, freak me tonight" },
                { time: 66.5, text: "Jump on my pony, babe, pony, baby" },
                { time: 70.5, text: "Fuckin' up a rich nigga vibe, oh" },
                { time: 74.0, text: "You spend all day missin' me" },
                { time: 77.5, text: "Late at night, you be kissin' me" },
                { time: 81.0, text: "Act like that pussy don't get to me" },
                { time: 84.5, text: "Act like your love ain't shit to me" },
                { time: 88.0, text: "Baby, you ain't listenin'" },
                { time: 91.5, text: "Spendin' too much time face down and that ass up" },
                { time: 95.0, text: "Fuckin' me, beg your pardon" },
                { time: 98.5, text: "Don't give a damn if you mix it with molly, just put your glass up" },
                { time: 102.5, text: "I get that pussy, I'ma man up" },
                { time: 106.0, text: "I love it when you give my dick the double standard" },
                { time: 109.5, text: "I'm in Miami with your bitch in a cabana" },
                { time: 113.0, text: "By the time you land, I get ghost up in the Phantom" },
                { time: 116.5, text: "And you know I'm never talkin' to the popo" },
                { time: 120.0, text: "My niggas follow that street code" },
                { time: 123.5, text: "You know it's Eastside on the West Coast" },
                { time: 127.0, text: "I been lookin' at your body, baby" },
                { time: 130.5, text: "And I can't keep my hands to myself" },
                { time: 134.0, text: "Get it any way you want it, baby" },
                { time: 137.5, text: "You a bad motherfucker, yeah" }
            ]
        },
        {
            title: "Kanye",
            artist: "jspr",
            cover: "https://r2.guns.lol/e5e92567-17df-42a8-8e01-375237036552.webp",
            url: "https://r2.guns.lol/edca4034-0c30-472e-bda3-fae43c92559d.m4a",
            lyrics: [
                { time: 3.74, text: "Ich geh' nicht für's Zocken nach Wiesbaden, mein Abi sieht aus wie Joe Pesci" },
                { time: 7.18, text: "Heh, wenn er will, der kann Krieg hab'n" },
                { time: 9.0, text: "Und ich bin mit Dani grade, weil wir Geld zähl'n und Beats machen" },
                { time: 12.18, text: "(Da-da-dani goin' crazy)" },
                { time: 12.22, text: "Und ich will kein Zwanni, Abi, kannst du einmal 100g's machen" },
                { time: 15.62, text: "Ich glaub', ich flieg nach Paris, ja, weil, ich denk' nur an Baguettes in letzter Zeit" },
                { time: 19.2, text: "Komm, wir geh'n shoppen, Chanel, zu zweit, kauf' ihr das teuerste Kleid, I like" },
                { time: 22.36, text: "Hör auf zu reden, komm, -he, -he" },
                { time: 24.02, text: "Hör auf zu reden, komm, Schein für Schein" },
                { time: 25.58, text: "Crackmann draußen: geht Stein für Stein, Western, ich bin in Cowboy-Jeans" },
                { time: 28.78, text: "Gestern war ich in voll Supreme, morgen bin ich auf–" },
                { time: 32.04, text: "Morgen bin i–, morgen bin ich immer noch Jasper" },
                { time: 34.12, text: "Kanaks unehrlich, die sind Bastard" },
                { time: 35.74, text: "Die sind arm und die shoppen nach Schnapper" },
                { time: 37.34, text: "Die kriegen Pussy nur auf Agia Napa, ey, vallah, eh" },
                { time: 40.02, text: "Redest du kein Geld, Piç, halt die Fresse" },
                { time: 41.54, text: "Such' weiter Kleingeld in deiner Weste" },
                { time: 43.26, text: "Fühl' mich wie Kanye, Bitch, bin der Beste" },
                { time: 46.46, text: "(Fühl mich wie Kanye, Bitch, quasi)" },
                { time: 56.96, text: "Ey, Hoes sind stinksauer, weil ich nicht rangeh" },
                { time: 59.14, text: "Ich bin ein echter Ape, kenn' den Dschungel wie Harambe (Harambe, ya-hee, hahaha)" },
                { time: 62.42, text: "Beep, eh, eh, bin der beste, fühl' mich wie Kanye" },
                { time: 64.56, text: "Grr, eh, du kannst dir sicher sein, ich hör' keine Sprachnachricht" },
                { time: 67.22, text: "„Kannst du über andres außer Geld red'n?“, nein, ich kann nicht, ehm" },
                { time: 69.88, text: "Gibts ein Problem lös' ich das mit Geld, dann ist das auch vom Tisch" },
                { time: 72.54, text: "Milliardärslächeln, meine Zähne sind jetzt weiß wie'n Brick" },
                { time: 75.1, text: "Und sie schreibt's in den Groupchat: „Staffellauf ist da, heut' macht euch schick“, haha" }
            ]
        },
        {
            title: "All I Need",
            artist: "chasingwhiterabbits",
            cover: "https://r2.guns.lol/968af939-b167-4b38-95fa-98425638a15d.webp",
            url: "https://r2.guns.lol/a059daa3-5ea5-4aad-b8f1-4816afadd63e.m4a",
            lyrics: [
                { time: 22.85, text: "You're my fantasy" },
                { time: 26.39, text: "Got me craving losing sanity" },
                { time: 32.05, text: "I can't help it when you're next me" },
                { time: 35.24, text: "I'm steadily" },
                { time: 36.99, text: "Thinking about the words you said to me" },
                { time: 40.61, text: "Don't you ever leave" },
                { time: 42.83, text: "Got you waiting patiently" },
                { time: 45.18, text: "So desperately" },
                { time: 48.09, text: "It turns you on" },
                { time: 49.8, text: "When I speak to you aggressively" },
                { time: 53.41, text: "You're so wet for me" },
                { time: 56.97, text: "Girl I want it all to me" },
                { time: 59.52, text: "You're all for me" },
                { time: 62.74, text: "Talk to me" },
                { time: 64.15, text: "Baby this is all I need" },
                { time: 68.45, text: "You're carved inside my mind" },
                { time: 72.65, text: "You know just what I like" },
                { time: 76.96, text: "I just wanna feel it all" },
                { time: 79.87, text: "What was meant for me" },
                { time: 81.98, text: "Babe you feel so heavenly" },
                { time: 84.85, text: "Got me breathing heavily" },
                { time: 87.71, text: "You're the fix for me" },
                { time: 89.84, text: "You're my remedy" },
                { time: 99.93, text: "You're my fantasy" },
                { time: 103.48, text: "Got me craving losing sanity" },
                { time: 109.1, text: "I can't help it when you're next me" },
                { time: 112.3, text: "I'm steadily" },
                { time: 114.17, text: "Thinking about the words you said to me" },
                { time: 117.7, text: "Don't you ever leave" },
                { time: 119.9, text: "Got you waiting patiently" },
                { time: 122.4, text: "So desperately" },
                { time: 125.17, text: "It turns you on" },
                { time: 126.93, text: "When I speak to you aggressively" },
                { time: 130.52, text: "You're so wet for me" },
                { time: 134.07, text: "Girl I want it all to me" },
                { time: 136.63, text: "You're all for me" },
                { time: 139.87, text: "Talk to me" },
                { time: 141.31, text: "Baby this is all I need" }
            ]
        },
        {
            title: "XTAYALIVE",
            artist: "chasingwhiterabbits",
            cover: "https://r2.guns.lol/5859680d-340e-4af3-a127-70bbc7069ea6.webp",
            url: "https://r2.guns.lol/9e3e0da0-ec0a-49be-a934-e52d010c33b1.mp3",
            lyrics: [
                { time: 1.24, text: "Uh, uh" },
                { time: 4.78, text: "Uh, uh" },
                { time: 8.19, text: "Uh, uh" },
                { time: 11.77, text: "Uh, uh" },
                { time: 14.78, text: "Stay alive, you better stay alive" },
                { time: 18.53, text: "Stay alive, you better stay alive" },
                { time: 21.79, text: "My soul, you really took my soul" },
                { time: 25.15, text: "My soul, you really took my soul (soul)" },
                { time: 28.82, text: "I said, \"Stay alive, you better stay" },
                { time: 30.99, text: "Alive\" (yeah)" },
                { time: 32.47, text: "Stay alive, you better stay alive (yeah)" },
                { time: 35.85, text: "My soul, you really took my soul" },
                { time: 39.22, text: "My soul, you really took my soul" },
                { time: 42.97, text: "My soul, you really took my soul" },
                { time: 46.33, text: "My soul, you really took my soul" },
                { time: 49.99, text: "My soul, you really took my soul" },
                { time: 53.53, text: "My soul, you really took my soul" },
                { time: 57.08, text: "You better be lucky, you alive right now" },
                { time: 60.4, text: "You see when I hit them packs, I hit loud" },
                { time: 63.91, text: "Smoking them totes, you better keep that on the low" },
                { time: 67.49, text: "(On the low, keep that on the low)" },
                { time: 71.12, text: "Soul, you really took my soul (yeah, yeah)" },
                { time: 74.65, text: "My soul, you really took my soul (yeah, yeah)" },
                { time: 80.03, text: "My soul, yeah, yeah (yeah, yeah, yeah, yeah)" }
            ]
        },
        {
            title: "6er - aua",
            artist: "jspr",
            cover: "https://r2.guns.lol/ee83bddd-f68d-4cc2-b341-09db05f4f83d.webp",
            url: "https://r2.guns.lol/bf482421-e1f1-4e00-adec-1f3a3f9f6019.m4a",
            lyrics: [
                { time: 0.04, text: "Fick deine Mutter, du Hurensohn" },
                { time: 1.78, text: "Ich fick deine Mutter, ey" },
                { time: 4.24, text: "Woah, yeah, ja" },
                { time: 5.8, text: "Ridin around in a, yeah" },
                { time: 7.7, text: "Ridin around in ein 6er" },
                { time: 9.26, text: "Damn, was passiert? Du hattest Vorsprung und bist letzter" },
                { time: 12.36, text: "Nein, du bist nicht Kian, dann wären deine Songs viel besser" },
                { time: 15.44, text: "Bae, tut mir leid, wenn meine Story dich verletzt hat" },
                { time: 18.54, text: "Sagt, er ist mein Bruder, aber tut wie eine Schwester" },
                { time: 21.4, text: "Wär der Pic mein Bruder, ja, dann müsst er gar nicht lästern" },
                { time: 24.66, text: "Maison, mein Schuhe, glaub, sie denkt, ich hab gekleckert" },
                { time: 27.36, text: "Und mein Bro ist Plug for real, aber, Bitch, ich red nicht Stecker" },
                { time: 30.44, text: "Aua, hol mir ganze Meal, yeah, Bands, Scheine, lecker" },
                { time: 33.64, text: "FDM, wir essen gut, Deutscher Rap wischt meine Teller" },
                { time: 36.58, text: "Trag mein Givenchy im Stu und mein Bruder raucht ein L'er" },
                { time: 40.06, text: "Bitch, ich bin nicht kk, aber sag mir, wer lebt schneller" },
                { time: 42.68, text: "Ah, shit" },
                { time: 42.9, text: "Ridin around in a, yeah" },
                { time: 44.62, text: "Ridin around in ein 6er" },
                { time: 46.2, text: "Damn, was passiert? Du hattest Vorsprung und bist letzter" },
                { time: 48.9, text: "Hattest Vorsprung, hast verkackt, jetzt ist Aua auf eim Run" },
                { time: 52.0, text: "Ich bin Wiener, das ein Fakt, ja, wie Helmut Lang" },
                { time: 55.04, text: "Die Bitch liebt das, was ich kann, ja, die Bitch, sie liebt mein Charme" },
                { time: 58.1, text: "Und ich weiß, du kennst meinen Namen, komm, sag, ich hab den Scheiß an" },
                { time: 61.18, text: "Weil ich hab den Scheiß auch an, Teddyjacke, Saint Laurent" },
                { time: 64.64, text: "Nein, ich kann nicht chillen, Bitch, ich hab meine Chance" },
                { time: 67.74, text: "Aua in ein Film, Tony, ja, ich bin der Boss" },
                { time: 71.0, text: "Fick deine Mutter, du Hurensohn" },
                { time: 72.56, text: "Ich fick deine Mutter, ey" },
                { time: 73.7, text: "Ridin around in a, yeah" },
                { time: 75.36, text: "Ridin around in ein 6er" },
                { time: 76.96, text: "Damn, was passiert? Du hattest Vorsprung und bist letzter" },
                { time: 80.06, text: "Nein, du bist nicht Kian, dann wären deine Songs viel besser" },
                { time: 83.14, text: "Bae, tut mir leid, wenn meine Story dich verletzt hat" },
                { time: 85.8, text: "Ridin around in a, yeah" },
                { time: 87.7, text: "Ridin around in ein 6er" },
                { time: 89.26, text: "Damn, was passiert? Du hattest Vorsprung und bist letzter" },
                { time: 92.36, text: "Nein, du bist nicht Kian, dann wären deine Songs viel besser" },
                { time: 95.44, text: "Baby, tut mir leid, wenn meine Story dich verletzt hat" }
            ]
        }
    ]
};
