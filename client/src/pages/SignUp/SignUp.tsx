import { SyntheticEvent, useState } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { FormikHelpers } from "formik";
import Typography from "@material-ui/core/Typography";
import useStyles from "./useStyles";
import register from "../../helpers/APICalls/register";
import AuthSideBanner from "../../components/AuthSideBanner/AuthSideBanner";
import SignUpForm from "./SignUpForm/SignUpForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useAuth } from "../../context/useAuthContext";

export interface handleSubmit {}

export default function Register() {
	const classes = useStyles();
	const [open, setOpen] = useState(false);
	const [signUpError, setSignUpError] = useState<string | null>(null);
	const { updateLoginContext } = useAuth();

	const handleClose = () => {
		setOpen(false);
	};

	const snackbarHandleClose = (
		event: SyntheticEvent,
		reason: SnackbarCloseReason
	) => {
		if (reason === "clickaway") return;
		setOpen(false);
	};

	const handleSubmit = (
		{
			username,
			email,
			password,
		}: { email: string; password: string; username: string },
		{
			setSubmitting,
		}: FormikHelpers<{ email: string; password: string; username: string }>
	) => {
		register(username, email, password).then((data) => {
			if (data.error) {
				console.error({ error: data.error.message });
				setSubmitting(false);
				setSignUpError(data.error.message);
				setOpen(true);
			} else if (data.success) {
				updateLoginContext(data.success.user);
			} else {
				// should not get here from backend but this catch is for an unknown issue
				console.error({ data });

				setSubmitting(false);
				setSignUpError(
					"An unexpected error occurred. Please try again"
				);
				setOpen(true);
			}
		});
	};

	return (
		<Grid container component="main" className={classes.root}>
			<CssBaseline />
			<AuthSideBanner />
			<Grid
				item
				xs={12}
				sm={8}
				md={7}
				elevation={6}
				component={Paper}
				square
			>
				<Box className={classes.authWrapper}>
					<AuthHeader
						linkTo="/login"
						asideText="Already have an account?"
						btnText="Login"
					/>
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
					message={signUpError}
					action={
						<>
							<IconButton
								size="small"
								aria-label="close"
								color="inherit"
								onClick={handleClose}
							>
								<CloseIcon fontSize="small" />
							</IconButton>
						</>
					}
				/>
			</Grid>
		</Grid>
	);
}
