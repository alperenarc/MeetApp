import React, { useState, Component } from 'react'
import { Typography, Paper, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import meetlogo from '../meet-logo.png'
import firebase from '../firebase'
import styles from '../Meet/style'
import { Redirect } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Container, Col, Row, Button } from 'react-bootstrap';

class MeetDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shareLink: '',
            value: '',
            copied: false

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
        this.setState({ shareLink: myQueryLink })

        if (!firebase.auth.currentUser) {
            alert("Lütfen Giriş Yapınız")
            return <Redirect to='/login' />
            // Eğer kullanıcı giriş yapmamış ve giriş yap kısmına yonlendiriliyorsa 
            // Link alınıp hafızada tutulmalıdır ve giriş yaptıktan sonra yenıden
            // bu sayfaya yonlendirilmelidir.
        }
        else {
            firebase.getMeetForLink(myQueryLink)
        }

    }
}

export default withStyles(styles)(MeetDetail)