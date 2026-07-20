const fs = require('fs');

const indexHtml = 'd:\\mini project E-learning\\index.html';
let html = fs.readFileSync(indexHtml, 'utf-8');

// 1. Inject Google Translate into Navbar directly before Profile button
const translateAndCurrencyHTML = `
                <!-- Google Translate Widget -->
                <div id="google_translate_element" style="margin-right: -5px; margin-top: 5px;"></div>
`;

if (!html.includes('google_translate_element')) {
    // Inject near theme-toggle
    html = html.replace(
        '<div class="theme-toggle" id="theme-toggle"',
        translateAndCurrencyHTML + '\\n                <div class="theme-toggle" id="theme-toggle"'
    );
}

// 2. Inject Exchange Rate Bar under Navbar
const exchangeRateBarHTML = `
    <!-- Real-time Live Exchange API Bar -->
    <div id="exchange-rate-bar" style="background: var(--warning-orange); color: white; text-align: center; padding: 8px; font-size: 14px; font-weight: 500; display: flex; justify-content: center; gap: 20px; align-items: center;">
        <span><i class="fas fa-satellite-dish"></i> Live Study Abroad Exchange Rates:</span>
        <span id="rate-usd"><i class="fas fa-spinner fa-spin"></i> Loading API...</span>
        <span id="rate-eur"></span>
        <span id="rate-gbp"></span>
        <span id="rate-aud"></span>
    </div>
`;
if (!html.includes('exchange-rate-bar')) {
    html = html.replace('<!-- Hero Section -->', exchangeRateBarHTML + '\\n    <!-- Hero Section -->');
}


// 3. Inject Scripts at the bottom
const scriptsInjection = `
    <!-- Google Translate API Scripts -->
    <script type="text/javascript">
        function googleTranslateElementInit() {
            new google.translate.TranslateElement({
                pageLanguage: 'en', 
                includedLanguages: 'hi,mr,bn,te,ta,gu,ur,kn,ml,pa,fr,es,de,zh-CN,ar,ja',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        }
    </script>
    <script type="text/javascript" src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"></script>

    <!-- Real-Time Exchange Rate API (Study Abroad Feature) -->
    <script>
        document.addEventListener('DOMContentLoaded', async () => {
            try {
                // Fetching real-time exchange rates for INR base via free API
                const response = await fetch('https://open.er-api.com/v6/latest/INR');
                const data = await response.json();
                
                if(data && data.rates) {
                    const usd = (1 / data.rates.USD).toFixed(2);
                    const eur = (1 / data.rates.EUR).toFixed(2);
                    const gbp = (1 / data.rates.GBP).toFixed(2);
                    const aud = (1 / data.rates.AUD).toFixed(2);
                    
                    document.getElementById('rate-usd').innerHTML = \`🇺🇸 $1 = ₹\${usd}\`;
                    document.getElementById('rate-eur').innerHTML = \`🇪🇺 €1 = ₹\${eur}\`;
                    document.getElementById('rate-gbp').innerHTML = \`🇬🇧 £1 = ₹\${gbp}\`;
                    document.getElementById('rate-aud').innerHTML = \`🇦🇺 A$1 = ₹\${aud}\`;
                    
                    // Highlight the bar briefly to show real-time update
                    const bar = document.getElementById('exchange-rate-bar');
                    bar.style.background = '#00b894';
                    setTimeout(() => bar.style.background = 'var(--warning-orange)', 1000);
                }
            } catch (err) {
                console.error("Exchange API Error: ", err);
                document.getElementById('rate-usd').innerHTML = "Exchange rates currently unavailable.";
            }
        });
    </script>
`;
if (!html.includes('googleTranslateElementInit')) {
    html = html.replace('<!-- Scripts -->', scriptsInjection + '\\n    <!-- Scripts -->');
}

fs.writeFileSync(indexHtml, html);
console.log("Successfully injected Translation and Exchange APIs!");
