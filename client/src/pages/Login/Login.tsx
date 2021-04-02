import { useState, SyntheticEvent } from "react";
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
import login from "../../helpers/APICalls/login";
import AuthSideBanner from "../../components/AuthSideBanner/AuthSideBanner";
import LoginForm from "./LoginForm/LoginForm";
import AuthHeader from "../../components/AuthHeader/AuthHeader";
import { useAuth } from "../../context/useAuthContext";

export default function Login() {
	const classes = useStyles();
	const [open, setOpen] = useState<boolean>(false);
	const [loginError, setLoginError] = useState<string | null>(null);
	const { updateLoginContext } = useAuth();

	const handleSubmit = (
		{ email, password }: { email: string; password: string },
		{ setSubmitting }: FormikHelpers<{ email: string; password: string }>
	) => {
		login(email, password).then((data) => {
			if (data.error) {
				setSubmitting(false);
				setLoginError(data.error.message);
				setOpen(true);
			} else if (data.success) {
				updateLoginContext(data.success.user);
			} else {
				// should not get here from backend but this catch is for an unknown issue
				console.error({ data });

				setSubmitting(false);
				setLoginError("An unexpected error occurred. Please try again");
				setOpen(true);
			}
		});
	};

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
						linkTo="/signup"
						asideText="Don't have an account?"
						btnText="Create account"
					/>
					<Box width="100%" maxWidth={450} p={3} alignSelf="center">
						<Grid container>
							<Grid item xs>
								<Typography
									className={classes.welcome}
									component="h1"
									variant="h5"
								>
									Welcome back!
								</Typography>
							</Grid>
						</Grid>
						<LoginForm handleSubmit={handleSubmit} />
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
					message={loginError}
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
