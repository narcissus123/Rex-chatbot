/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
import { initializaApp } from "firebase/app";

import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

const firebaseConfig = {
  apiKey: "AIzaSyBD3iYQW_Wyqvgs2NMpqmu-KC8lgcB2Ed0",
  authDomain: "rex-chatbot-bdc30.firebaseapp.com",
  projectId: "rex-chatbot-bdc30",
  storageBucket: "rex-chatbot-bdc30.appspot.com",
  messagingSenderId: "312899123836",
  appId: "1:312899123836:web:328a2d1661dd25155ce7f9",
};

initializaApp(firebaseConfig);
const db = getFirestore();
const colRef = collection(db, "chats");
// to retrive all the documents inside the chats collection:
//colRef returns a promise. it gives us the snapshot of that collection.
//we are interested in data and the id of the doc
getDocs(colRef)
  .then((snapshot) => {
    const chats = [];
    snapshot.docs.array.forEach((chat) => {
      chats.push({ ...chat.data(), id: chat.id });
    });
    console.log(chats);
  })
  .catch((err) => {
    console.log(err);
  });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const addChatForm = document.querySelector(".add");
addChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(colRef, {
    title: addChatForm.title.value,
    author: addChatForm.author.value,
  }).then(() => {
    addChatForm.reset();
  });
});

const deleteChatForm = document.querySelector(".delete");
deleteChatForm.addEventListener("submit", (e) => {
  e.preventDefault();
});
