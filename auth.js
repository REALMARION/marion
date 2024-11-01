function signup() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Error signing up:", error.message);
        });
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'index.html';
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
        });
}

function logout() {
    auth.signOut().then(() => {
        window.location.href = 'login.html';
    });
}

function setupTwoStepVerification() {
    const email = auth.currentUser.email;
}
