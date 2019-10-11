import React, { useState, Component } from 'react'
import { Typography, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import meetlogo from '../meet-logo.png'
import fire from '../firebase'
import styles from '../Meet/style'
import { Redirect } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Container, Col, Row, Button } from 'react-bootstrap';
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebase = require('firebase');

class MeetDetail extends Component {
    constructor() {
        super();
        this.state = {
            shareLink: '',
            value: '',
            copied: false,
            data: [],
            creatorUser: "",
            descr: "",
            meetDates: "",
            titles: ""

        }
    }

    render() {
        const { classes } = this.props;
        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <div>
                        <img src={meetlogo} alt="Logo" className={classes.meetlogo} />
                    </div>
                    <Typography component="h1" variant="h5">
                        Share Invite Link
       			</Typography>
                    <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                        <FormControl margin="normal" required fullWidth>
                            <CopyToClipboard text={'http://localhost:3000/meetdetail?query='+this.state.shareLink+''}
                                onCopy={() => this.setState({ copied: true })}>
                                <Button
                                    fullWidth
                                    variant="dark"
                                    className={classes.submit}>
                                    Copy Link !
          		                </Button>
                            </CopyToClipboard>
                            {this.state.copied ? <span style={{ color: 'green' }}>Copied.</span> : null}

                            <div>
                                <br/>
                                <h5>Owner of Meeting : <b>{this.state.creatorUser}</b> </h5>
                                Title : {this.state.titles}
                                <br/>
                                Description : {this.state.descr}
                                <br/>
                                Meet Date : {this.state.meetDates}

                            </div>

                            <Container>
                                <Row>
                                    <Col>
                                        <Button
                                            variant="outline-danger"
                                            fullWidth
                                            className={classes.submit}>
                                            Katılmıyorum
          		                    </Button>
                                    </Col>
                                    <Col>
                                        <Button
                                            type="submit"
                                            variant="success"
                                            fullWidth
                                            onClick={onIsjoin}
                                            className={classes.submit}>
                                            Katılıyorum
          		                    </Button>
                                    </Col>
                                </Row>
                            </Container>

                        </FormControl>
                    </form>
                </Paper>
            </main >
        )
        async function onIsjoin() {
            try {
                
                await fire.createJoinUser()
                
                //props.history.replace('/meetdetail?query=' + firebase.getCurrentLink())
                alert("Success")
    
            } catch (error) {
                alert(error.message)
            }
        }
    }

    componentDidMount() {

        const search = window.location.search
        const params = new URLSearchParams(search)
        const myQueryLink = params.get('query')

        if (myQueryLink !== null) {
            this.state.shareLink = myQueryLink
        }
        else {
            const link = fire.getCurrentLink()
            this.setState({ shareLink: link })
        }

        firebase.firestore().collection("meet")
            .where('link', '==', this.state.shareLink)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                console.log(data)
                return data
            }).then(
                response => {

                    this.getUserNamebyId(response[0].creatorUserId)

                    //this.state.descr = response[0].description
                    this.setState({
                        titles: response[0].title,
                        descr: response[0].description,
                        meetDates: response[0].meetDate,
                        creatorUser: "fire.getUserNamebyId(response[0].creatorUserId)"
                    })

                    return response[0]

                }
            );


        //return array
        /* if (!firebase.auth().currentUser) {
             alert("Lütfen Giriş Yapınız")
             return <Redirect to='/login' />
             // Eğer kullanıcı giriş yapmamış ve giriş yap kısmına yonlendiriliyorsa 
             // Link alınıp hafızada tutulmalıdır ve giriş yaptıktan sonra yenıden
             // bu sayfaya yonlendirilmelidir.
         }
         else {*/
        // Eğer my query link yoksa donen datanın linki alınır.


        //console.log(firebase.getMeetForLink(this.state.shareLink)) 
        /*const arr = firebase.getMeetForLink(this.state.shareLink)
        console.log(arr.value)
        alert(arr)*/

        /* this.state.creatorUser = firebase.getCurrentCreatorUser()
         alert(firebase.getCurrentCreatorUser())
         this.state.descr = firebase.getCurrentDescription()
         this.setState({titles : firebase.getCurrentTitle()}) 
         this.state.meetDates = firebase.getCurrentMeetDate()*/



        // }

    }
    getUserNamebyId = (uid) => {
        const name = firebase.firestore().collection("user")
            .where('userUid', '==', uid)
            .get()
            .then(querySnapshot => {
                const data = querySnapshot.docs.map(doc => doc.data());
                return data
            }).then(
                res => {
                    this.setState({
                        creatorUser: res[0].name
                    })
                }
            );
        return name
    }
    
}

export default withStyles(styles)(MeetDetail)