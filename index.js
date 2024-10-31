// Initialize Firebase
firebase.initializeApp({
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
});

// Function to open settings menu
function openMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('menu-visible');
}

// Function to handle login/signup
document.getElementById('authForm').onsubmit = function (event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Signed in
            localStorage.setItem('user', JSON.stringify(userCredential.user));
            window.location.href = 'index.html';
        })
        .catch(error => {
            const errorMessage = document.getElementById('authMessage');
            errorMessage.textContent = error.message;
        });
};

// Function to enable 2-step verification
function enable2StepVerification() {
    const user = firebase.auth().currentUser;
    user.sendEmailVerification().then(() => {
        alert("Verification email sent!");
    }).catch(error => {
        alert(error.message);
    });
}

// Function to logout
function logout() {
    firebase.auth().signOut().then(() => {
        localStorage.removeItem('user');
        window.location.href = 'login.html';
    }).catch(error => {
        alert(error.message);
    });
}

// Function for forgot password
function forgotPassword() {
    const email = prompt("Enter your email address:");
    if (email) {
        firebase.auth().sendPasswordResetEmail(email)
            .then(() => {
                alert("Password reset email sent!");
            })
            .catch(error => {
                alert(error.message);
            });
    }
}

// On page load, check if user is logged in
window.onload = function () {
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = 'index.html';
    }
};
