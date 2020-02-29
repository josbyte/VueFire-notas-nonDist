import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyAYhXZIqbwKp4PHYEjoJOrBolDyFLdFQQY",
      authDomain: "firevue-82d45.firebaseapp.com",
      databaseURL: "https://firevue-82d45.firebaseio.com",
      projectId: "firevue-82d45",
      storageBucket: "firevue-82d45.appspot.com",
      messagingSenderId: "784873393812",
      appId: "1:784873393812:web:736d92c4462045e887ee81"
    };
export const db = firebase.initializeApp(firebaseConfig);