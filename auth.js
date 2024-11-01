function register() {
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
            window.location.href = 'home.html';
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
            window.location.href = 'home.html';
        })
        .catch((error) => {
            console.error("Error logging in:", error.message);
        });
}
