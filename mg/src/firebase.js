const firebaseConfig = {
  apiKey: "AIzaSyD6b325OWWeXmDWi3qFGXHa1AmS-uDE3Zw",
  authDomain: "marion-server.firebaseapp.com",
  projectId: "marion-server",
  storageBucket: "marion-server.firebasestorage.app",
  messagingSenderId: "968743643450",
  appId: "1:968743643450:web:eb5591fb3bcaf7f1e2c803",
  measurementId: "G-L8YDT39S51"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const storage = firebase.storage();
