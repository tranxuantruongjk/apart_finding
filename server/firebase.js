// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbFziqXQxLP0NFxeB6N62rqcmRYZ7x0rw",
  authDomain: "apart-finding.firebaseapp.com",
  projectId: "apart-finding",
  storageBucket: "apart-finding.appspot.com",
  messagingSenderId: "128191892728",
  appId: "1:128191892728:web:641e927013d9fa3c317f0d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
module.exports = {storage};