import React, { Component, useState } from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import MeetDetail from './MeetDetail/index'

const firebase = require('firebase');
/*
const config = {
	apiKey: "AIzaSyBdJfmo5GrCIYQcNA2JTmOA9DgODktrg_4",
	authDomain: "meetapp-f1da5.firebaseapp.com",
	databaseURL: "https://meetapp-f1da5.firebaseio.com",
	projectId: "meetapp-f1da5",
	storageBucket: "",
	messagingSenderId: "327368406646",
	appId: "1:327368406646:web:f4afcc2af018f3a11dd157"
}
*/
class Firebase {


	constructor() {

		/*app.initializeApp(config)
		this.auth = app.auth()
		this.db = app.firestore()
*/
		this.state = ({
			meetLink: "Link is Null",
			data: [],
			creatorUser: "a",
			descr: "a",
			meetDates: "a",
			titles: "a"
		})
	}


	login(email, password) {
		return firebase.auth().signInWithEmailAndPassword(email, password)
	}
	logout() {
		return firebase.auth().signOut()
	}
	async register(name, email, password) {

		const user = await firebase.auth().createUserWithEmailAndPassword(email, password)
		const userDesc = {
			name: name,
			userUid: firebase.auth().currentUser.uid
		};
		await firebase.firestore()
			.collection('user')
			.add({
				name: userDesc.name,
				userUid: userDesc.userUid
			});


		return firebase.auth().currentUser.updateProfile({
			displayName: name
		})
	}
	addQuote(quote) {
		if (!firebase.auth().currentUser) {
			return alert('Not authorized')
		}
		const name = firebase.auth().currentUser.displayName;

		return this.db.doc(`Users2/${firebase.auth().currentUser.uid}`).set({
			quote,
			name
		})
	}
	isInitialized() {
		return new Promise(resolve => {
			firebase.auth().onAuthStateChanged(resolve)
		})
	}
	getCurrentUsername() {
		return firebase.auth().currentUser && firebase.auth().currentUser.displayName
	}

	// Get User Id or uid
	getCurrentUserId() {
		return firebase.auth().currentUser.uid
	}
	async getCurrentUserQuote() {
		const quote = await this.db.doc(`users_codedamn_video/${firebase.auth().currentUser.uid}`).get()
		return quote.get('quote')
	}


	// This Method is creates a Meet and returning meetId
	createMeet = async (title, description, meetDate) => {
		const uuidv1 = require('uuid/v1')
		const meet = {
			title: title,
			description: description,
			creatorUserId: firebase.auth().currentUser.uid,
			meetDate: meetDate,
			link: uuidv1()
		};

		const newmeet = await firebase.firestore()
			.collection('meet')
			.add({
				title: meet.title,
				description: meet.description,
				creatorUserId: meet.creatorUserId,
				link: meet.link,
				meetDate: meet.meetDate
			});
		this.state.meetLink = meet.link

		return newmeet.link
	}
	getCurrentLink = () => {
		console.log(this.state.meetLink)
		return this.state.meetLink
	}

	// Katılan user ın Id sini ve şu an ki bulunduğu sayfadaki Meet in
	// Linkini bir tabloya kaydetmelidir.
	createJoinUser = () => {
		const search = window.location.search
		const params = new URLSearchParams(search)
		const myQueryLink = params.get('query')
		
		if (this.state.meetLink === "Link is Null") {
			this.state.meetLink = myQueryLink
		}
		const IsJoin = {

			userName: firebase.auth().currentUser.displayName,
			link: this.state.meetLink

		};

		const join = firebase.firestore()
			.collection('join')
			.add({
				userName: IsJoin.userName,
				link: IsJoin.link
			});
		return join.id
	}

	createNottoJoinUser = () => {

		const search = window.location.search
		const params = new URLSearchParams(search)
		const myQueryLink = params.get('query')
		
		if (this.state.meetLink === "Link is Null") {
			this.state.meetLink = myQueryLink
		}
		const IsJoin = {

			userName: firebase.auth().currentUser.displayName,
			link: this.state.meetLink

		};

		const join = firebase.firestore()
			.collection('nottojoin')
			.add({
				userName: IsJoin.userName,
				link: IsJoin.link
			});
		return join.id
	}
	


}

export default new Firebase()