import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { HashRouter } from 'react-router-dom'

// Firebase API keys and some configurations.
const firebase = require('firebase');
require('firebase/firestore');

firebase.initializeApp({

    apiKey: "AIzaSyBdJfmo5GrCIYQcNA2JTmOA9DgODktrg_4",
	authDomain: "meetapp-f1da5.firebaseapp.com",
	databaseURL: "https://meetapp-f1da5.firebaseio.com",
	projectId: "meetapp-f1da5",
	storageBucket: "",
	messagingSenderId: "327368406646",
	appId: "1:327368406646:web:f4afcc2af018f3a11dd157"
});

ReactDOM.render(<HashRouter>< App /></HashRouter>, document.getElementById('root'))
