const fs = require('fs');

const index = 'd:\\mini project E-learning\\index.html';
const login = 'd:\\mini project E-learning\\login.html';
const signup = 'd:\\mini project E-learning\\signup.html';
const profile = 'd:\\mini project E-learning\\profile.html';

// 1. Update index.html
let html1 = fs.readFileSync(index, 'utf-8');
const oldIndexLogo = `            <div class="logo">
                <div class="logo-icon"></div>
                <span>EduHub</span>
            </div>`;
const newIndexLogo = `            <a href="index.html" class="logo" style="display:flex; align-items:center; text-decoration:none; margin-right:20px;">
                <img src="EduHUB.png" alt="EduHub" style="height: 55px; border-radius: 8px; object-fit: contain;">
            </a>`;
html1 = html1.replace(oldIndexLogo, newIndexLogo);
fs.writeFileSync(index, html1);


// 2. Update login.html and signup.html
[login, signup].forEach(file => {
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf-8');

        // Remove text logo string
        content = content.replace(
            /<h1 class="logo" style=".*?">.*?EduHub<\/h1>/,
            '<img src="EduHUB.png" class="logo" alt="EduHub" style="height: 60px; margin-bottom: 25px; border-radius: 10px; object-fit: contain;">'
        );

        content = content.replace(
            /<h1 class="logo-white" style=".*?">.*?EduHub<\/h1>/,
            '<img src="EduHUB.png" class="logo-white" alt="EduHub" style="height: 60px; margin-bottom: 25px; border-radius: 10px; object-fit: contain;">'
        );

        fs.writeFileSync(file, content);
    }
});


// 3. Update profile.html
if (fs.existsSync(profile)) {
    let html3 = fs.readFileSync(profile, 'utf-8');
    html3 = html3.replace(
        '<a href="index.html" class="logo"><i class="fas fa-graduation-cap"></i> EduHub</a>',
        '<a href="index.html" class="logo" style="display:flex; align-items:center; text-decoration:none;"><img src="EduHUB.png" alt="EduHub" style="height: 50px; border-radius: 8px;"></a>'
    );
    fs.writeFileSync(profile, html3);
}

console.log("Logo updated across all pages!");
