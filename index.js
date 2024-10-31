console.warn('%cSTOP!', 'color: red; font-size: 40px; font-weight: bold;');
console.log('%cDO NOT PASTE ANY CODE HERE. IT MAY STEAL YOUR ACCOUNT DETAILS!', 'color: orange; font-size: 16px;');

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');
    const switchToSignup = document.getElementById('switch-to-signup');
    const switchToLogin = document.getElementById('switch-to-login');

    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
        window.location.href = 'home.html';
    }

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('signup-email').value;
        const password = document.getElementById('signup-password').value;

        localStorage.setItem('user', JSON.stringify({ email, password }));
        
        window.location.href = 'home.html';
    });

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

    switchToSignup.addEventListener('click', () => {
        loginForm.style.display = 'none';
        signupForm.style.display = 'block';
    });

    switchToLogin.addEventListener('click', () => {
        signupForm.style.display = 'none';
        loginForm.style.display = 'block';
    });
});

const connectionOverlay = document.createElement('div');
connectionOverlay.id = 'connection-overlay';
connectionOverlay.innerHTML = `
    <div class="connection-message">
        <h2>You're Offline</h2>
        <p>Please check your internet connection.</p>
    </div>
`;
document.body.appendChild(connectionOverlay);

function updateConnectionStatus() {
    if (navigator.onLine) {
        connectionOverlay.style.display = 'none';
    } else {
        connectionOverlay.style.display = 'flex';
    }
}

window.addEventListener('load', updateConnectionStatus);
window.addEventListener('online', updateConnectionStatus);
window.addEventListener('offline', updateConnectionStatus);
