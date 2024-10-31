// index.js

// Console Warning Message
console.warn('%cSTOP!', 'color: red; font-size: 40px; font-weight: bold;');
console.log('%cDO NOT PASTE ANY CODE HERE. IT MAY STEAL YOUR ACCOUNT DETAILS!', 'color: orange; font-size: 16px;');

// The rest of the JavaScript code remains unchanged.
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        window.location.href = 'home.html';
    }

    // Handle signup form submission
    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        // Save user credentials in local storage
        localStorage.setItem('user', JSON.stringify({ email, password }));
        
        // Auto-login after signup
        window.location.href = 'home.html';
    });

    // Handle login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser && storedUser.email === email && storedUser.password === password) {
            window.location.href = 'home.html';
        } else {
            alert('Invalid email or password.');
        }
    });

    // Switch to signup form
    switchToSignup.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    // Switch to login form
    switchToLogin.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});
