// Console Warnings to Deter Pasting Code
console.log('%cSTOP! DO NOT PASTE ANYTHING HERE!', 'color: red; font-size: 30px; font-weight: bold;');
console.log('%cIf someone told you to paste something here, it may be a scam or a hacking attempt.', 'color: red; font-size: 20px;');

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyD13_iY4LZVgAhGhQIGJfcSm0GDh6F6Sy0",
    authDomain: "web-marion.firebaseapp.com",
    projectId: "web-marion",
    storageBucket: "web-marion.appspot.com",
    messagingSenderId: "544839061334",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Elements
const menuIcon = document.getElementById('menuIcon');
const navMenu = document.getElementById('navMenu');
const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');
const logoutBtnWelcome = document.getElementById('logoutBtnWelcome');
const showLogin = document.getElementById('showLogin');
const showRegister = document.getElementById('showRegister');

const loginContainer = document.getElementById('login');
const registerContainer = document.getElementById('register');
const welcomeContainer = document.getElementById('welcome');
const welcomeUsername = document.getElementById('welcomeUsername');

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const navButtons = document.getElementById('navButtons');

// Toggle Navigation Menu
menuIcon.addEventListener('click', () => {
    navMenu.classList.toggle('responsive');
});

// Show Login Form
loginBtn.addEventListener('click', () => {
    showLoginForm();
});

// Show Register Form
registerBtn.addEventListener('click', () => {
    showRegisterForm();
});

// Show Register Form from Login Form
showRegister.addEventListener('click', (e) => {
    e.preventDefault();
    showRegisterForm();
});

// Show Login Form from Register Form
showLogin.addEventListener('click', (e) => {
    e.preventDefault();
    showLoginForm();
});

// Show Welcome Message
function showWelcome(username) {
    loginContainer.style.display = "none";
    registerContainer.style.display = "none";
    welcomeContainer.style.display = "flex";
    welcomeUsername.textContent = username;
    navButtons.style.display = "none";
}

// Show Login Form
function showLoginForm() {
    loginContainer.style.display = "flex";
    registerContainer.style.display = "none";
    welcomeContainer.style.display = "none";
    navButtons.style.display = "block";
}

// Show Register Form
function showRegisterForm() {
    loginContainer.style.display = "none";
    registerContainer.style.display = "flex";
    welcomeContainer.style.display = "none";
    navButtons.style.display = "block";
}

// Handle Logout
function handleLogout() {
    auth.signOut().then(() => {
        alert("Logged out successfully!");
        showLoginForm();
    }).catch((error) => {
        console.error("Error logging out:", error);
    });
}

logoutBtn.addEventListener('click', handleLogout);
logoutBtnWelcome.addEventListener('click', handleLogout);

// Authentication State Observer
auth.onAuthStateChanged((user) => {
    if (user) {
        showWelcome(user.displayName || user.email);
    } else {
        showLoginForm();
    }
});

// Handle Registration
registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value.trim();

    if (!validateUsername(username)) {
        alert("Username must be at least 3 characters long and contain only letters, numbers, and underscores.");
        return;
    }

    if (!validateEmail(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (password.length < 6) {
        alert("Password must be at least 6 characters long.");
        return;
    }

    // Create User with Firebase Authentication
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Set display name
            return userCredential.user.updateProfile({
                displayName: username
            });
        })
        .then(() => {
            alert("Registration successful! You are now logged in.");
            registerForm.reset();
            showWelcome(username);
        })
        .catch((error) => {
            console.error("Error during registration:", error);
            alert(error.message);
        });
});

// Handle Login
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const identifier = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value.trim();
    // const rememberMe = document.getElementById('login-check').checked; // Removed "Remember Me"

    if (identifier === "" || password === "") {
        alert("Please fill in all fields.");
        return;
    }

    // Determine if identifier is email or username
    const isEmail = validateEmail(identifier);

    if (isEmail) {
        // Login with email
        auth.signInWithEmailAndPassword(identifier, password)
            .then((userCredential) => {
                alert("Login successful!");
                loginForm.reset();
                showWelcome(userCredential.user.displayName || userCredential.user.email);
            })
            .catch((error) => {
                console.error("Error during login:", error);
                alert(error.message);
            });
    } else {
        // Lookup user by username
        db.collection('users').where('username', '==', identifier).get()
            .then((querySnapshot) => {
                if (querySnapshot.empty) {
                    alert("No user found with that username.");
                    return;
                }
                querySnapshot.forEach((doc) => {
                    const user = doc.data();
                    // Verify password
                    if (user.password === password) {
                        // Sign in with email
                        auth.signInWithEmailAndPassword(user.email, password)
                            .then((userCredential) => {
                                alert("Login successful!");
                                loginForm.reset();
                                showWelcome(userCredential.user.displayName || userCredential.user.email);
                            })
                            .catch((error) => {
                                console.error("Error during login:", error);
                                alert(error.message);
                            });
                    } else {
                        alert("Incorrect password.");
                    }
                });
            })
            .catch((error) => {
                console.error("Error fetching user by username:", error);
                alert("An error occurred. Please try again.");
            });
    }
});

// Username Validation Function
function validateUsername(username) {
    const re = /^\w{3,}$/;
    return re.test(username);
}

// Email Validation Function
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i;
    return re.test(String(email).toLowerCase());
}

// Initialize Firestore for Username Lookup
auth.onAuthStateChanged((user) => {
    if (user) {
        // Ensure user document exists
        const userDoc = db.collection('users').doc(user.uid);
        userDoc.get().then((docSnapshot) => {
            if (!docSnapshot.exists) {
                // Create user document
                userDoc.set({
                    username: user.displayName,
                    email: user.email,
                    // password: password, // Not storing password in Firestore for security
                });
            }
        });
    }
});
