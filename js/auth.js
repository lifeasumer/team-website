// User authentication state management
let currentUser = null;

// Simulated user database (in real app, this would be on the server)
const users = JSON.parse(localStorage.getItem('users') || '[]');

function isUserLoggedIn() {
    return currentUser !== null;
}

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePassword(password) {
    // At least 6 characters
    return password.length >= 6;
}

function findUser(email) {
    return users.find(user => user.email === email);
}

function saveUsers() {
    localStorage.setItem('users', JSON.stringify(users));
}

function loginUser(email, password) {
    if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
    }
    
    if (!password) {
        throw new Error('Please enter your password');
    }

    const user = findUser(email);
    if (!user) {
        throw new Error('No account found with this email address');
    }

    if (user.password !== password) {
        throw new Error('Incorrect password');
    }

    currentUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    return true;
}

function registerUser(firstName, lastName, email, phone, password, confirmPassword) {
    if (!firstName || !lastName) {
        throw new Error('Please enter your first and last name');
    }
    
    if (!validateEmail(email)) {
        throw new Error('Please enter a valid email address');
    }
    
    if (!phone) {
        throw new Error('Please enter your phone number');
    }
    
    if (!validatePassword(password)) {
        throw new Error('Password must be at least 6 characters long');
    }
    
    if (password !== confirmPassword) {
        throw new Error('Passwords do not match');
    }

    if (findUser(email)) {
        throw new Error('An account with this email already exists');
    }

    const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        password,
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers();

    currentUser = {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone
    };
    
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    updateAuthUI();
    return true;
}

function logoutUser() {
    currentUser = null;
    localStorage.removeItem('currentUser');
    updateAuthUI();

    // Always redirect to login page on logout
    window.location.href = 'login.html';
}

function updateAuthUI() {
    // Update desktop dropdown
    const desktopDropdown = document.querySelector('.dropdown-menu');
    if (desktopDropdown) {
        const loginItem = desktopDropdown.querySelector('a[href="login.html"]');
        if (loginItem) {
            if (isUserLoggedIn()) {
                loginItem.innerHTML = `Welcome, ${currentUser.firstName}`;
                loginItem.href = '#';
                loginItem.onclick = (e) => {
                    e.preventDefault();
                    return false;
                };

                // Correct order: from Dashboard to Account details
                const options = [
                    { text: 'Dashboard', href: 'dashboard.html' },
                    { text: 'Orders', href: 'orders.html' },
                    { text: 'Addresses', href: 'addresses.html' },
                    { text: 'Account details', href: 'account-details.html' }
                ];

                // Insert in correct order after loginItem
                let previousItem = loginItem;
                options.forEach(opt => {
                    if (!desktopDropdown.querySelector(`a[href="${opt.href}"]`)) {
                        const item = document.createElement('a');
                        item.className = 'dropdown-item';
                        item.href = opt.href;
                        item.textContent = opt.text;
                        desktopDropdown.insertBefore(item, previousItem.nextSibling);
                        previousItem = item;
                    }
                });

                // Add logout option (ensure functional)
                let logoutItem = desktopDropdown.querySelector('.logout-item');
                if (!logoutItem) {
                    logoutItem = document.createElement('a');
                    logoutItem.className = 'dropdown-item logout-item';
                    logoutItem.href = '#';
                    logoutItem.innerHTML = 'Logout';
                    desktopDropdown.appendChild(logoutItem);
                }
                logoutItem.onclick = (e) => {
                    e.preventDefault();
                    logoutUser();
                    return false;
                };
            } else {
                loginItem.innerHTML = 'Login / Signup';
                loginItem.href = 'login.html';
                loginItem.onclick = null;

                // Remove user menu items and logout
                const extraItems = desktopDropdown.querySelectorAll('.dropdown-item:not([href="login.html"])');
                extraItems.forEach(el => el.remove());
            }
        }
    }

    // Update mobile menu
    const mobileAccountMenu = document.querySelector('.menu-mobile-account');
    if (mobileAccountMenu) {
        const mobileLoginItem = mobileAccountMenu.querySelector('a[href="login.html"]');
        if (mobileLoginItem) {
            if (isUserLoggedIn()) {
                mobileLoginItem.innerHTML = `Welcome, ${currentUser.firstName}`;
                mobileLoginItem.href = '#';
                mobileLoginItem.onclick = (e) => {
                    e.preventDefault();
                    return false;
                };

                const options = [
                    { text: 'Dashboard', href: 'dashboard.html' },
                    { text: 'Orders', href: 'orders.html' },
                    { text: 'Addresses', href: 'addresses.html' },
                    { text: 'Account details', href: 'account-details.html' }
                ];

                let previousItem = mobileLoginItem.parentElement;
                options.forEach(opt => {
                    if (!mobileAccountMenu.querySelector(`a[href="${opt.href}"]`)) {
                        const li = document.createElement('li');
                        li.innerHTML = `<a href="${opt.href}">${opt.text}</a>`;
                        mobileLoginItem.parentElement.parentNode.insertBefore(li, previousItem.nextSibling);
                        previousItem = li;
                    }
                });

                // Add logout option (ensure functional)
                let mobileLogoutItem = mobileAccountMenu.querySelector('.mobile-logout-item');
                if (!mobileLogoutItem) {
                    const li = document.createElement('li');
                    li.innerHTML = '<a href="#" class="mobile-logout-item">Logout</a>';
                    mobileLogoutItem = li.querySelector('a');
                    mobileLoginItem.parentElement.parentNode.appendChild(li);
                } else {
                    mobileLogoutItem = mobileLogoutItem;
                }

                mobileLogoutItem.onclick = (e) => {
                    e.preventDefault();
                    logoutUser();
                    return false;
                };
            } else {
                mobileLoginItem.innerHTML = 'Login / Signup';
                mobileLoginItem.href = 'login.html';
                mobileLoginItem.onclick = null;

                // Remove all user items and logout
                const items = mobileAccountMenu.querySelectorAll('li');
                items.forEach(li => {
                    const a = li.querySelector('a');
                    if (a && a.href !== location.origin + '/login.html') {
                        li.remove();
                    }
                });
            }
        }
    }
}

// Form handling functions
function handleLoginForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const email = form.querySelector('input[type="email"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    try {
        loginUser(email, password);
        showMessage('Login successful! Welcome back.', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function handleSignupForm(event) {
    event.preventDefault();
    
    const form = event.target;
    const firstName = form.querySelector('input[type="text"]').value;
    const lastName = form.querySelectorAll('input[type="text"]')[1].value;
    const email = form.querySelector('input[type="email"]').value;
    const phone = form.querySelector('input[type="tel"]').value;
    const password = form.querySelector('input[type="password"]').value;
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1].value;
    const agreeTerms = form.querySelector('input[type="checkbox"][required]').checked;
    
    if (!agreeTerms) {
        showMessage('Please agree to the Terms & Conditions and Privacy Policy', 'error');
        return;
    }
    
    try {
        registerUser(firstName, lastName, email, phone, password, confirmPassword);
        showMessage('Account created successfully! Welcome to Cinderella.', 'success');
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    } catch (error) {
        showMessage(error.message, 'error');
    }
}

function showMessage(message, type) {
    // Remove existing messages
    const existingMessage = document.querySelector('.auth-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `auth-message ${type}`;
    messageDiv.innerHTML = message;
    
    const container = document.querySelector('.login-container');
    if (container) {
        container.insertBefore(messageDiv, container.firstChild);
        
        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }
}

// Tab switching function
function showTab(tabName) {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const tabButtons = document.querySelectorAll('.tab-btn');
    
    // Remove active class from all tabs and forms
    tabButtons.forEach(btn => btn.classList.remove('active'));
    loginForm.classList.remove('active');
    signupForm.classList.remove('active');
    
    // Add active class to selected tab and form
    if (tabName === 'login') {
        loginForm.classList.add('active');
        document.querySelector('.tab-btn[onclick*="login"]').classList.add('active');
    } else {
        signupForm.classList.add('active');
        document.querySelector('.tab-btn[onclick*="signup"]').classList.add('active');
    }
}

// Check for existing login on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateAuthUI();
    }
    
    // Attach form handlers if on login page
    const loginForm = document.querySelector('#login-form form');
    const signupForm = document.querySelector('#signup-form form');
    
    if (loginForm) {
        loginForm.addEventListener('submit', handleLoginForm);
    }
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignupForm);
    }
});
