const fs = require('fs');

const indexHtml = 'd:\\mini project E-learning\\index.html';
const stylesCss = 'd:\\mini project E-learning\\styles.css';

let html = fs.readFileSync(indexHtml, 'utf-8');
let css = fs.readFileSync(stylesCss, 'utf-8');

// 1. Remove the old google_translate_element injection (and the accidental '\n')
html = html.replace(
    /<!-- Google Translate Widget -->\s*<div id="google_translate_element" style="margin-right: -5px; margin-top: 5px;"><\/div>\s*\\n\s*<div class="theme-toggle" id="theme-toggle"/,
    '<div class="theme-toggle" id="theme-toggle"'
);

// Fallback removal if regex missed
if (html.includes('<div id="google_translate_element"')) {
    html = html.replace('<div id="google_translate_element" style="margin-right: -5px; margin-top: 5px;"></div>', '');
    html = html.replace('\\n                <div class="theme-toggle"', '<div class="theme-toggle"');
}

// 2. Inject the New Attractive Dropdown Widget
const prettyLangWidget = `
                <!-- Hidden Google API DOM -->
                <div id="google_translate_element" style="display:none;"></div>
                
                <!-- Premium Custom Language Selector -->
                <div class="premium-lang-selector" id="langSelector">
                    <div class="lang-current">
                        <i class="fas fa-globe"></i> <span id="currentLangText">English</span> <i class="fas fa-chevron-down" style="font-size:10px; margin-left:5px;"></i>
                    </div>
                    <div class="lang-dropdown">
                        <div class="lang-op" onclick="translatePage('en', 'English')">🇬🇧 English</div>
                        <div class="lang-op" onclick="translatePage('hi', 'Hindi')">🇮🇳 Hindi</div>
                        <div class="lang-op" onclick="translatePage('fr', 'French')">🇫🇷 French</div>
                        <div class="lang-op" onclick="translatePage('es', 'Spanish')">🇪🇸 Spanish</div>
                        <div class="lang-op" onclick="translatePage('zh-CN', 'Chinese')">🇨🇳 Chinese</div>
                        <div class="lang-op" onclick="translatePage('ar', 'Arabic')">🇦🇪 Arabic</div>
                    </div>
                </div>
`;
if (!html.includes('premium-lang-selector')) {
    html = html.replace(
        '<div class="theme-toggle" id="theme-toggle"',
        prettyLangWidget + '\n                <div class="theme-toggle" id="theme-toggle"'
    );
}

// 3. Appending custom CSS to hide Google tools and style the dropdown
const langCSS = `
/* Custom Premium Language Dropdown */
.premium-lang-selector {
    position: relative;
    cursor: pointer;
    font-family: 'Inter', sans-serif;
    z-index: 1000;
}
.lang-current {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--light-gray);
    border: 1px solid var(--border-gray);
    padding: 8px 16px;
    border-radius: 20px;
    color: var(--deep-purple);
    font-weight: 600;
    transition: all 0.3s ease;
}
.lang-current:hover {
    background: rgba(129,50,135,0.1);
    box-shadow: 0 4px 10px rgba(0,0,0,0.05);
}
.lang-dropdown {
    position: absolute;
    top: 120%;
    left: 0;
    width: 160px;
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    overflow: hidden;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 0.3s ease;
    border: 1px solid var(--border-gray);
}
.premium-lang-selector:hover .lang-dropdown {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
}
.lang-op {
    padding: 12px 15px;
    color: var(--text-dark);
    font-size: 14px;
    font-weight: 500;
    transition: background 0.2s;
    border-bottom: 1px solid var(--light-gray);
}
.lang-op:last-child {
    border-bottom: none;
}
.lang-op:hover {
    background: var(--light-gray);
    color: var(--primary-purple);
}

/* Force Hide ALL Google Translate Iframe Junk */
.goog-te-banner-frame.skiptranslate { display: none !important; }
body { top: 0px !important; position: static !important; }
.goog-tooltip { display: none !important; }
.goog-tooltip:hover { display: none !important; }
.goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
`;
if (!css.includes('.premium-lang-selector')) {
    css += '\n' + langCSS;
}

// 4. Update the translate script to accept the custom function
const translateLogic = `
        function translatePage(langCode, langName) {
            // Update UI text
            document.getElementById('currentLangText').innerText = langName;
            
            // Find hidden Google combo box and trigger change
            const selectField = document.querySelector('.goog-te-combo');
            if(selectField) {
                selectField.value = langCode;
                selectField.dispatchEvent(new Event('change'));
            } else {
                console.warn('Google Translate API not fully loaded yet.');
            }
        }
`;
if (!html.includes('function translatePage')) {
    html = html.replace('</script>\n    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js', translateLogic + '\n</script>\n    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js');
}

fs.writeFileSync(indexHtml, html);
fs.writeFileSync(stylesCss, css);
console.log("Successfully beautifully upgraded the Custom Translation module!");
