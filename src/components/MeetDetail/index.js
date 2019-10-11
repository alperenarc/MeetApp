import React, { useState, Component } from 'react'
import { Typography, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import meetlogo from '../meet-logo.png'
//import firebase from '../firebase'
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
                    <div>

                        Title : {this.state.titles}
                        <br />
                        Description : {this.state.descr}

                    </div>
                    <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                        <FormControl margin="normal" required fullWidth>
                            <CopyToClipboard text={this.state.shareLink}
                                onCopy={() => this.setState({ copied: true })}>
                                <Button
                                    fullWidth
                                    variant="dark"
                                    className={classes.submit}>
                                    Copy Link !
          		                </Button>
                            </CopyToClipboard>
                            {this.state.copied ? <span style={{ color: 'green' }}>Copied.</span> : null}


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
    }

    componentDidMount() {

        const search = window.location.search
        const params = new URLSearchParams(search)
        const myQueryLink = params.get('query')

        if (myQueryLink != null || myQueryLink != '') {
            this.state.shareLink = myQueryLink
        }
        else {
            const link = firebase.getCurrentLink()
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
                    
                    

                    this.state.descr = response[0].description
                    this.setState({ titles: response[0].title })


                    return response[0]

                }
            );

        //console.log(array.get('meet'))
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
}

export default withStyles(styles)(MeetDetail)