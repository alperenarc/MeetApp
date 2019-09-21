import React from 'react'
import { Typography, Paper, Button } from '@material-ui/core'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import meetlogo from '../meet-logo.png'
const styles = theme => ({
	main: {
		width: 'auto',
		display: 'block', // Fix IE 11 issue.
		marginLeft: theme.spacing.unit * 3,
		marginRight: theme.spacing.unit * 3,
		[theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
			width: 400,
			marginLeft: 'auto',
			marginRight: 'auto',
		},
	},
	paper: {
		marginTop: theme.spacing.unit * 8,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
	},
	avatar: {
		margin: theme.spacing.unit,
		backgroundColor: theme.palette.secondary.main,
	},
	submit: {
		marginTop: theme.spacing.unit * 3,
	},
	meetlogo: {
		width: '50px',
	},
})

function HomePage(props) {
	const { classes } = props

	return (
		<main className={classes.main}>
			<Paper className={classes.paper}>
				<div>
					<img src={meetlogo} alt="Logo" className={classes.meetlogo} />
				</div>
				<Typography component="h1" variant="h5">
					Welcome to Meet App
				</Typography>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/register"
					className={classes.submit}>
					Register
          		</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/login"
					className={classes.submit}>
					Login
          		</Button>
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="secondary"
					component={Link}
					to="/dashboard"
					className={classes.submit}>
					Dashboard
          		</Button>
			</Paper>
		</main>
	)
}

export default withStyles(styles)(HomePage)