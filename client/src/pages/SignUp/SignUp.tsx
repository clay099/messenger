import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { FormikHelpers } from "formik";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles/useStyles";
import useRegister from "../../hooks/useRegister";
import SideBanner from "../../components/SideBanner/SideBanner";
import SignUpForm from "./SignUpForm/SignUpForm";

export interface handleSubmit {}

export default function Register() {
	const classes = useStyles();
	const [open, setOpen] = React.useState(true);

	const register = useRegister();

	const handleClose = () => {
		setOpen(false);
	};

	const snackbarHandleClose = (
		event: React.SyntheticEvent,
		reason: SnackbarCloseReason
	) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	const history = useHistory();

	const handleSubmit = (
		{
			username,
			email,
			password,
		}: { email: string; password: string; username: string },
		{
			setStatus,
			setSubmitting,
		}: FormikHelpers<{ email: string; password: string; username: string }>
	) => {
		setStatus();
		register(username, email, password).then(
			() => {
				// useHistory push to chat
				console.log(email, password);
				return;
			},
			(error) => {
				setSubmitting(false);
				setStatus(error);
			}
		);
	};

	React.useEffect(() => {
		const user = localStorage.getItem("user");
		if (user) history.push("/dashboard");
	}, [history]);

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<SideBanner />
			<Grid
				item
				xs={12}
				sm={8}
				md={7}
				elevation={6}
				component={Paper}
				square
			>
				<Box className={classes.buttonHeader}>
					<Box p={1} alignSelf="flex-end" alignItems="center">
						<Link to="/login" className={classes.link}>
							<Button className={classes.noAccBtn}>
								Already have an account?
							</Button>
							<Button
								color="inherit"
								className={classes.accBtn}
								variant="contained"
							>
								Login
							</Button>
						</Link>
					</Box>
					<Box width="100%" maxWidth={450} p={3} alignSelf="center">
						<Grid container>
							<Grid item xs>
								<Typography
									className={classes.welcome}
									component="h1"
									variant="h5"
								>
									Create an account
								</Typography>
							</Grid>
						</Grid>
						<SignUpForm handleSubmit={handleSubmit} />
					</Box>
					<Box p={1} alignSelf="center" />
				</Box>
				<Snackbar
					anchorOrigin={{
						vertical: "bottom",
						horizontal: "center",
					}}
					open={open}
					autoHideDuration={6000}
					onClose={snackbarHandleClose}
					message="Email already exists"
					action={
						<React.Fragment>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</React.Fragment>
					}
				/>
			</Grid>
		</Grid>
	);
}
