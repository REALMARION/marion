const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

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

        auth.createUserWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem('user', JSON.stringify({ email }));
                window.location.href = 'home.html';
            })
            .catch((error) => {
                alert(error.message);
            });
    });

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                localStorage.setItem('user', JSON.stringify({ email }));
                window.location.href = 'home.html';
            })
            .catch((error) => {
                alert('Invalid email or password.');
            });
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
