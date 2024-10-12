// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD13_iY4LZVgAhGhQIGJfcSm0GDh6F6Sy0",
    authDomain: "web-marion.firebaseapp.com",
    projectId: "web-marion",
    storageBucket: "web-marion.appspot.com",
    messagingSenderId: "544839061334",
    appId: "1:544839061334:web:c775031d2f45e4ac24d0f7"
};


// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// DOM elements
const navButtons = document.getElementById('navButtons');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnWelcome = document.getElementById('logoutBtnWelcome');
const loginContainer = document.getElementById('login');
const registerContainer = document.getElementById('register');
const welcomeContainer = document.getElementById('welcome');
const usernameDisplay = document.getElementById('welcomeUsername');

// Show Register Form
document.getElementById('showRegister').addEventListener('click', () => {
    loginContainer.style.opacity = '0';
    loginContainer.style.transform = 'translateX(100%)';
    registerContainer.style.opacity = '1';
    registerContainer.style.transform = 'translateX(0)';
});

// Show Login Form
document.getElementById('showLogin').addEventListener('click', () => {
    registerContainer.style.opacity = '0';
    registerContainer.style.transform = 'translateX(100%)';
    loginContainer.style.opacity = '1';
    loginContainer.style.transform = 'translateX(0)';
});

// Sign Up
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    try {
        const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const user = userCredential.user;

        // Save username to Firestore
        await firebase.firestore().collection('users').doc(user.uid).set({
            username: username,
            email: email
        });

        showWelcome(user);
    } catch (error) {
        console.error("Error signing up:", error);
    }
});

// Sign In
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = userCredential.user;
        showWelcome(user);
    } catch (error) {
        console.error("Error logging in:", error);
    }
});

// Logout
logoutBtn.addEventListener('click', async () => {
    await firebase.auth().signOut();
    showLogin();
});

// Logout from welcome screen
logoutBtnWelcome.addEventListener('click', async () => {
    await firebase.auth().signOut();
    showLogin();
});

// Show welcome screen
async function showWelcome(user) {
    const userDoc = await firebase.firestore().collection('users').doc(user.uid).get();
    const username = userDoc.data().username;

    usernameDisplay.textContent = username;
    loginContainer.style.display = 'none';
    registerContainer.style.display = 'none';
    welcomeContainer.style.display = 'flex';
}

// Show login screen
function showLogin() {
    loginContainer.style.display = 'flex';
    registerContainer.style.display = 'none';
    welcomeContainer.style.display = 'none';
}

// Auth state observer
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        showWelcome(user);
    } else {
        showLogin();
    }
});
