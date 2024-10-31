const firebaseConfig = {
  apiKey: "AIzaSyD6b325OWWeXmDWi3qFGXHa1AmS-uDE3Zw",
  authDomain: "marion-server.firebaseapp.com",
  projectId: "marion-server",
  storageBucket: "marion-server.firebasestorage.app",
  messagingSenderId: "968743643450",
  appId: "1:968743643450:web:eb5591fb3bcaf7f1e2c803",
  measurementId: "G-L8YDT39S51"
};

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
