const db = firebase.firestore();
const auth = firebase.auth();


const registerUser = async (username, email, password) => {
  try {
    const userCredential = await auth.createUserWithEmailAndPassword(email, password);
    await db.collection('users').doc(userCredential.user.uid).set({
      username: username,
      email: email,
      createdDate: new Date(),
    });
    alert('Registration successful!');
    window.location.href = 'login.html';
  } catch (error) {
    console.error('Error registering user:', error);
    alert(error.message);
  }
};


const loginUser = async (email, password) => {
  try {
    const userCredential = await auth.signInWithEmailAndPassword(email, password);
    window.location.href = 'studio.html';
  } catch (error) {
    console.error('Error logging in:', error);
    alert(error.message);
  }
};


const saveGame = async () => {
  const gameTitle = document.getElementById('game-title').value;
  const gameDescription = document.getElementById('game-description').value;
  const user = firebase.auth().currentUser;

  if (!user) {
    alert('Please log in to save games.');
    return;
  }

  const gameData = {
    title: gameTitle,
    description: gameDescription,
    developerId: user.uid,
    createdDate: new Date(),
    updatedDate: new Date(),
    assets: [],
  };

  try {
    await db.collection('games').add(gameData);
    alert('Game saved successfully!');
  } catch (error) {
    console.error('Error saving game:', error);
  }
};


const fetchDeveloperGames = async () => {
  const user = firebase.auth().currentUser;
  const gamesList = document.getElementById('games-list');
  gamesList.innerHTML = '';

  if (!user) return;

  try {
    const gamesSnapshot = await db.collection('games').where('developerId', '==', user.uid).get();
    gamesSnapshot.forEach((doc) => {
      const gameData = doc.data();
      const gameElement = document.createElement('div');
      gameElement.innerHTML = `
        <h3>${gameData.title}</h3>
        <button onclick="editGame('${doc.id}')">Edit</button>
        <button onclick="deleteGame('${doc.id}')">Delete</button>
      `;
      gamesList.appendChild(gameElement);
    });
  } catch (error) {
    console.error('Error fetching developer games:', error);
  }
};


document.getElementById('signup-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const username = document.getElementById('reg-username').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  registerUser(username, email, password);
});

document.getElementById('login-form')?.addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  loginUser(email, password);
});


fetchDeveloperGames();


document.getElementById('save-game')?.addEventListener('click', saveGame);
