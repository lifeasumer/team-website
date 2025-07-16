// User authentication state management
let currentUser = null;

function isUserLoggedIn() {
    return currentUser !== null;
}

function loginUser(email, password) {
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll just do a simple check
    if (email && password) {
        currentUser = {
            email: email,
            name: email.split('@')[0] // Using email username as display name
        };
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateAuthUI();
        return true;
    }
    return false;
}

function registerUser(name, email, password) {
    // Here you would typically make an API call to your backend
    // For demo purposes, we'll just do a simple registration
    if (name && email && password) {
        currentUser = {
            name: name,
            email: email
        };
        localStorage.setItem('user', JSON.stringify(currentUser));
        updateAuthUI();
        return true;
    }
    return false;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('user');
    updateAuthUI();
}

function updateAuthUI() {
    const accountLink = document.querySelector('.right-top-bar a[href*="account"]');
    if (accountLink) {
        if (isUserLoggedIn()) {
            accountLink.innerHTML = `My Account (${currentUser.name})`;
            accountLink.href = "#"; // You can add a profile page link here
            accountLink.onclick = logoutUser;
        } else {
            accountLink.innerHTML = "Login / Sign Up";
            accountLink.href = "/login.html";
            accountLink.onclick = null;
        }
    }
}

// Check for existing login on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
});
