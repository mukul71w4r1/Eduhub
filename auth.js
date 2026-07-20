// auth.js
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('edu_user') || 'null');
}

function loginUser(email, password) {
    // Rate limit check
    const now = Date.now();
    let loginData = JSON.parse(localStorage.getItem('edu_login_attempts')) || { count: 0, time: now };
    
    // Reset after 1 minute
    if (now - loginData.time > 60000) {
        loginData = { count: 0, time: now };
    }
    
    if (loginData.count >= 5) {
        alert('Too many login attempts. Please try again after 1 minute.');
        return false;
    }
    
    loginData.count++;
    loginData.time = now;
    localStorage.setItem('edu_login_attempts', JSON.stringify(loginData));

    // Mock Authentication
    if (email === 'admin@eduhub.com' && password === 'admin123') {
        localStorage.setItem('edu_user', JSON.stringify({ name: 'Admin', email: 'admin@eduhub.com', role: 'admin' }));
        return { success: true, redirect: 'admin.html' };
    } else if (email && password) {
        localStorage.setItem('edu_user', JSON.stringify({ name: email.split('@')[0], email: email, role: 'user' }));
        return { success: true, redirect: 'profile.html' };
    }
    
    return { success: false };
}

function logoutUser() {
    localStorage.removeItem('edu_user');
    window.location.href = 'index.html';
}

function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
    }
}

function requireAdmin() {
    const user = getCurrentUser();
    if (!user || user.role !== 'admin') {
        window.location.href = 'index.html'; // Or show an unauthorized page
    }
}

// Ensure UI reflects auth status
document.addEventListener('DOMContentLoaded', () => {
    const user = getCurrentUser();
    
    // Update nav links based on auth
    const profileLink = document.querySelector('a[href="profile.html"]');
    const getStartedBtn = document.querySelector('a[href="login.html"]');
    
    if (user) {
        if (getStartedBtn) {
            getStartedBtn.innerHTML = 'Logout';
            getStartedBtn.href = "#";
            getStartedBtn.onclick = (e) => { e.preventDefault(); logoutUser(); };
            getStartedBtn.style.background = 'transparent';
            getStartedBtn.style.color = 'var(--text-dark)';
            if(getStartedBtn.style.border) {
                getStartedBtn.style.border = '2px solid #ccc';
            }
        }
        if (profileLink) {
            if (user.role === 'admin') {
                profileLink.href = 'admin.html';
                profileLink.innerHTML = '<i class="fas fa-user-shield"></i> Admin';
            } else {
                profileLink.innerHTML = '<i class="fas fa-user"></i> Dashboard';
            }
        }
    } else {
        if (profileLink) {
            profileLink.style.display = 'none';
        }
    }
});
