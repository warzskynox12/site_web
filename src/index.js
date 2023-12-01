import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
  onSnapshot,
  doc,
  deleteDoc,
} from "firebase/firestore"; // Ajoutez l'importation de la fonction collection

const firebaseConfig = {
  apiKey: "AIzaSyAU7BUxh5_pSdbQeohPAaqQfSUQzPJSDF4",
  authDomain: "gdesign-fc137.firebaseapp.com",
  projectId: "gdesign-fc137",
  storageBucket: "gdesign-fc137.appspot.com",
  messagingSenderId: "1028727627153",
  appId: "1:1028727627153:web:ca9aa9cc73b007e44b4e30",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const utilisateur = collection(db, "utilisateur");
const villes = collection(db, "villes");

getDocs(utilisateur).then((Snapshot) => {
  let utilisateur = [];
  Snapshot.docs.forEach((doc) => {
    utilisateur.push({ ...doc.data(), id: doc.id });
  });
  console.log(utilisateur);
});

onSnapshot(villes, (Snapshot) => {
  let villes = [];
  Snapshot.docs.forEach((doc) => {
    villes.push({ ...doc.data(), id: doc.id });
  });
  console.log(villes);
});

const addCityForm = document.querySelector(".ajouter");
addCityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  addDoc(villes, {
    pays: addCityForm.pays.value,
    ville: addCityForm.ville.value,
    capital: addCityForm.capital.value === "true" ? true : false,
    DataDajout: serverTimestamp(),
  }).then(() => {
    addCityForm.reset();
  });
});

const deleteCityForm = document.querySelector(".suppression");
deleteCityForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const docRef = doc(villes, deleteCityForm.id.value);
  deleteDoc(docRef).then(() => {
    deleteCityForm.reset();
  });
});
