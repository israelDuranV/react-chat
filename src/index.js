import React from 'react';
import ReactDOM from 'react-dom';
import firebase from 'firebase';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

firebase.initializeApp({
    apiKey: "AIzaSyA0vLGhBotcPoKRkEV10NJFklPLldh7Awo",
    authDomain: "photo-clone.firebaseapp.com",
    databaseURL: "https://photo-clone.firebaseio.com",
    projectId: "photo-clone",
    storageBucket: "photo-clone.appspot.com",
    messagingSenderId: "173054417"

});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();