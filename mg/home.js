// Check user authentication
firebase.auth().onAuthStateChanged((user) => {
    if (!user) {
        // If no user is signed in, redirect to login page
        window.location.href = "index.html";
    } else {
        // If user is signed in, load games or other functionality
        loadGames();
    }
});

// Load Games List
function loadGames() {
    db.collection("Games").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const gameData = doc.data();
            const gameDiv = document.createElement("div");
            gameDiv.innerHTML = `<h3>${gameData.title}</h3><p>${gameData.description}</p>`;
            document.getElementById("games-list").appendChild(gameDiv);
        });
    }).catch((error) => {
        console.error("Error getting games:", error);
    });
}

// Log Out User
document.getElementById("logout-btn").addEventListener("click", function () {
    auth.signOut().then(() => {
        console.log("User signed out.");
        window.location.href = "index.html"; 
    });
});
