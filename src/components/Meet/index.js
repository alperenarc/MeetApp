import React, { useState } from 'react'
import { Typography, Paper, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import meetlogo from '../meet-logo.png'
import firebase from '../firebase'
import styles from '../Meet/style'

function CreateMeet(props) {
    const { classes } = props

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <div>
                    <img src={meetlogo} alt="Logo" className={classes.meetlogo} />
                </div>
                <Typography component="h1" variant="h5">
                    Create a New Meet
       			</Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="title">Title</InputLabel>
                        <Input id="title" name="title" autoComplete="off" autoFocus value={title} onChange={e => setTitle(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="description">Description</InputLabel>
                        <Input id="description" name="description" autoComplete="off" value={description} onChange={e => setDescription(e.target.value)} />
                    </FormControl>
                    <FormControl margin="normal" required fullWidth>
                        <InputLabel htmlFor="date">Date</InputLabel>
                        <Input name="date" id="date" autoComplete="off" value={date} onChange={e => setDate(e.target.value)} />
                    </FormControl>

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={onCreateMeet}
                        className={classes.submit}>
                        Create Meet
          		</Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        component={Link}
                        to="/dashboard"
                        className={classes.submit}>
                        Go back to Dashboard
          			</Button>
                </form>
            </Paper>
        </main>
    )
    async function onCreateMeet() {
        try {

            await firebase.createMeet(title, description, date)
            

            
            props.history.replace('/meetdetail?query=' + firebase.getCurrentLink())
            alert("Success")

        } catch (error) {
            alert(error.message)
        }
    }
}

export default withStyles(styles)(CreateMeet)