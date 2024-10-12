// index.js

// Your web app's Firebase configuration
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

// Sign up function
function signup(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User signed up:", user);
            alert("Sign up successful! Welcome!");
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error signing up:", errorMessage);
            document.getElementById("signupError").innerText = errorMessage; // Show error on the page
        });
}

// Log in function
function login(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            console.log("User logged in:", user);
            alert("Login successful! Welcome back!");
            // Redirect or show user dashboard
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error("Error logging in:", errorMessage);
            document.getElementById("loginError").innerText = errorMessage; // Show error on the page
        });
}

// Add event listeners for signup and login buttons
document.getElementById("signupButton").addEventListener("click", () => {
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPassword").value;
    signup(email, password);
});

document.getElementById("loginButton").addEventListener("click", () => {
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;
    login(email, password);
});
