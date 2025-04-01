// Import the functions you need from the SDKs you need

//initialise firebase
import { initializeApp } from "firebase/app";
import { collection, addDoc } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDclVLgdVSVu-Z8j8lBQJ-DFOAzHZ7KXZ0",
  authDomain: "mindlog-764ff.firebaseapp.com",
  projectId: "mindlog-764ff",
  storageBucket: "mindlog-764ff.firebasestorage.app",
  messagingSenderId: "578718007269",
  appId: "1:578718007269:web:6038387845402ab975b90c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("password");
const formEL = document.querySelector("form");
const isLoggedIn = false;
const loggedOutView = document.querySelector(".loggedOut--View");
const loggedInView = document.querySelector(".loggedIn--View");
const signInBtn = document.querySelector(".sign--in");
const createAccountBtn = document.querySelector(".create--account");
const signOutBtn = document.querySelector(".sign--out--btn");
const googleBtn = document.querySelector(".google--btn");
const emojis = document.querySelector(".emojis");
const postText = document.querySelector(".post--text");
const postBtn = document.querySelector(".post--Btn");
console.log(loggedInView);
const auth = getAuth();

const emojisValue = {
  1: "&#128522;",
  2: "&#128546",
  3: "&#128544",
  4: "&#128562",
  5: "&#128640",
};

function registerUser() {
  const email = emailEl.value;
  const password = passwordEl.value;
  console.log("yo");

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      console.log("user registration successful");
      isLoggedIn = true;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error.message);
      // ..
    });
}
createAccountBtn.addEventListener("click", (e) => {
  e.preventDefault();
  registerUser();
});

function authenticateUserAndPassword() {
  const email = emailEl.value;
  const password = passwordEl.value;
  // console.log("yo");

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log("signed in");

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);
    });
}
signInBtn.addEventListener("click", (e) => {
  e.preventDefault();
  authenticateUserAndPassword();
});

googleBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(credential, token, user);
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  console.log("google btn clicked");
});
//observer for showing the view
onAuthStateChanged(auth, (user) => {
  // console.log(user);
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
    showLoggedInView();
    console.log("signed in");
  } else {
    // User is signed out
    // ...
    showLoggedOutView();
  }
});
function showLoggedInView() {
  loggedOutView.classList.add("hidden");
  loggedInView.classList.remove("hidden");
}

function showLoggedOutView() {
  loggedInView.classList.add("hidden");
  loggedOutView.classList.remove("hidden");
}
signOutBtn.addEventListener("click", () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
      console.log("signed out");
    })
    .catch((error) => {
      // An error happened.
      console.log(error.message);
    });
  showLoggedOutView();
});

emojis.addEventListener("click", (e) => {
  if (e.target.classList.contains("emoji")) {
    console.log(e.target.dataset);
    const id = e.target.dataset.id;
    console.log(emojisValue[id]);
  }
});

postBtn.addEventListener("click", async function (e) {
  console.log(postText.value);
  const docRef = await addDoc(collection(db, "posts"), {
    body: postText.value,
    createdAt: new Date(),
    mood: 4,
  });
  console.log("Document written with ID: ", docRef.id);
});
