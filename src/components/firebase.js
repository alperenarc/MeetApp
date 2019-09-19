import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const config = {
	apiKey: "AIzaSyBdJfmo5GrCIYQcNA2JTmOA9DgODktrg_4",
    authDomain: "meetapp-f1da5.firebaseapp.com",
    databaseURL: "https://meetapp-f1da5.firebaseio.com",
    projectId: "meetapp-f1da5",
    storageBucket: "",
    messagingSenderId: "327368406646",
    appId: "1:327368406646:web:f4afcc2af018f3a11dd157"
}

class Firebase {
	constructor() {
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
	}

	login(email, password) {
		return this.auth.signInWithEmailAndPassword(email, password)
	}

	logout() {
		return this.auth.signOut()
	}

	async register(name, email, password) {
		await this.auth.createUserWithEmailAndPassword(email, password)
		return this.auth.currentUser.updateProfile({
			displayName: name
		})
	}

	addQuote(quote) {
		if (!this.auth.currentUser) {
			return alert('Not authorized')
		}
		const name = this.auth.currentUser.displayName;

		return this.db.doc(`Users2/${this.auth.currentUser.uid}`).set({
			quote,
			name
		})
	}

	isInitialized() {
		return new Promise(resolve => {
			this.auth.onAuthStateChanged(resolve)
		})
	}

	getCurrentUsername() {
		return this.auth.currentUser && this.auth.currentUser.displayName
	}

	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}
}

export default new Firebase()