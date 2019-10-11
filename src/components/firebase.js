import React, { Component, useState } from 'react'
import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

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
		await firebase.auth().createUserWithEmailAndPassword(email, password)
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

		const newmeet = await this.db
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

	getMeetForLink = async (link) => {

		if (link == null) {
			link = this.state.meetLink
		}

		/*const array = this.db.collection("meet")
			.where('link', '==', link)
			.get()
			.then(querySnapshot => {
				const data = querySnapshot.docs.map(doc => doc.data());
				console.log(data)
				return data
			}).then(
				response => {
					return response[0]
				}
			);

		console.log(array.get('meet'))
		return array*/



		/*const quote = await this.db.collection("meet").where('link', '==', link).get()
		return quote*/



		/*.then(
			response => {

				this.state.creatorUser = response[0].creatorUserId
				this.state.descr = response[0].description
				this.state.titles = response[0].title
				this.state.meetDates = response[0].meetDate

				console.log(this.state.descr)

			}

		)*/

	}

	getCurrentLink = () => {
		return this.state.meetLink
	}

	getCurrentDescription = () => {
		return this.state.descr
	}
	getCurrentTitle = () => {
		return this.state.titles
	}
	getCurrentCreatorUser = () => {
		return this.state.creatorUser
	}
	getCurrentMeetDate = () => {
		return this.state.meetDates
	}

	// Katılan user ın Id sini ve şu an ki bulunduğu sayfadaki Meet in
	// Linkini bir tabloya kaydetmelidir.
	createJoinUser = () => {
		const IsJoin = {

			userId: firebase.auth().currentUser.uid,
			link: this.state.meetLink

		};

		const join = this.db
			.collection('join')
			.add({
				userId: IsJoin.userId,
				link: IsJoin.link
			});
		return join.id
	}


}

export default new Firebase()