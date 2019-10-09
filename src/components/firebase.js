import React, { Component, useState } from 'react'
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

class Firebase extends Component {

	state = ({
		meetLink: "ghfghgh"
	})
	constructor() {
		super()
		app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()

		
		//const [a, setA] = useState(0);

		//this.setStateMethod = this.setStateMethod.bind(this)
	}

	componentDidMount = () => {
		
		
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
	// Get User Id or uid
	getCurrentUserId() {
		return this.auth.currentUser.uid
	}
	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${this.auth.currentUser.uid}`).get()
		return quote.get('quote')
	}


	// This Method is creates a Meet and returning meetId
	createMeet = async (title, description, meetDate) => {
		const uuidv1 = require('uuid/v1')
		const meet = {
			title: title,
			description: description,
			creatorUserId: this.auth.currentUser.uid,
			meetDate: meetDate,
			link: uuidv1()
		};

		const newmeet = await this.db
			.collection('meet')
			.add({
				title: meet.title,
				description: meet.description,
				creatorUserId: meet.creatorUserId,
				link: meet.link,
				meetDate: meet.meetDate
			});
		this.setState({
			meetLink: meet.link
		});

		console.log(this.state.meetLink)
		return newmeet.link
	}

	getMeetForLink = async (link) => {

		if (link == null) {
			link = this.state.meetLink
		}
		console.log(link);
		this.db.collection("meet")
			.where('link', '==', link)
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => doc.data());
				console.log(data);
			});
	}





	// Katılan user ın Id sini ve şu an ki bulunduğu sayfadaki Meet in
	// Linkini bir tabloya kaydetmelidir.
	createJoinUser = () => {
		const IsJoin = {

			userId: this.auth.currentUser.uid,
			link: "3c1f12f0-e54e-11e9-af8e-8d5e4ca41bb9"

		};

		const join = this.db
			.collection('join')
			.add({
				userId: IsJoin.userId,
				link: IsJoin.link
			});
		//return newmeet.id
		return join.id
	}


}

export default new Firebase()