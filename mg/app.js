// firebase.js
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Check user authentication
firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        // If user is signed in, redirect to home page
        window.location.href = "home.html";
    }
});

// Sign In User
document.getElementById("sign-in-btn").addEventListener("click", function () {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            const userId = userCredential.user.uid;
            console.log("User signed in:", userId);
            window.location.href = "home.html"; // Redirect to home on successful sign-in
        })
        .catch(error => {
            console.error("Error signing in:", error.message);
        });
});

// Sign Up User
document.getElementById("signup-btn").addEventListener("click", function () {
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            const userId = userCredential.user.uid;
            console.log("User signed up:", userId);
            createUserData(userId, email);
        })
        .catch(error => {
            console.error("Error signing up:", error.message);
        });
});

// Function to create user data in Firestore
function createUserData(userId, email) {
    const userRef = db.collection("Users").doc(userId);

    userRef.set({
        username: email.split('@')[0],
        email: email,
        marionMoney: 150,
        role: "player",
        badges: [],
        premium: false
    })
    .then(() => {
        console.log("User data created:", userId);
        window.location.href = "home.html"; // Redirect to home after user data creation
    })
    .catch(error => {
        console.error("Error creating user data:", error.message);
    });
}
