import firebase from 'firebase/app'

const firebaseConfig = {
    apiKey: "AIzaSyBIdrueq6lFj_jgiJndD1H9ML-Lf503FaQ",
    authDomain: "pet-depot-88fbc.firebaseapp.com",
    databaseURL: "https://pet-depot-88fbc.firebaseio.com",
    projectId: "pet-depot-88fbc",
    storageBucket: "pet-depot-88fbc.appspot.com",
    messagingSenderId: "429280210676",
    appId: "1:429280210676:web:f550827d90b030ce8178a1",
    measurementId: "G-7GH518ZFDF"
};

const app = firebase.initializeApp(firebaseConfig);

export const db = app.database();

export const productsRef = db.ref('products');
