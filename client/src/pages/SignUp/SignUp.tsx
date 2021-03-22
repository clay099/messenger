import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Snackbar, { SnackbarCloseReason } from "@material-ui/core/Snackbar";
import { Link, useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { Formik } from "formik";
import * as Yup from "yup";
import Typography from "@material-ui/core/Typography";
import useStyles from "../../styles/useStyles";
import useRegister from "../../hooks/useRegister";
import SideBanner from "../../components/SideBanner/SideBanner";

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
						<Formik
							initialValues={{
								email: "",
								password: "",
								username: "",
							}}
							validationSchema={Yup.object().shape({
								username: Yup.string()
									.required("Username is required")
									.max(40, "Username is too long"),
								email: Yup.string()
									.required("Email is required")
									.email("Email is not valid"),
								password: Yup.string()
									.required("Password is required")
									.max(100, "Password is too long")
									.min(6, "Password too short"),
							})}
							onSubmit={(
								{ username, email, password },
								{ setStatus, setSubmitting }
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
							}}
						>
							{({
								handleSubmit,
								handleChange,
								values,
								touched,
								errors,
							}) => (
								<form
									onSubmit={handleSubmit}
									className={classes.form}
									noValidate
								>
									<TextField
										id="username"
										label={
											<Typography
												className={classes.label}
											>
												Username
											</Typography>
										}
										fullWidth
										margin="normal"
										InputLabelProps={{
											shrink: true,
										}}
										InputProps={{
											classes: { input: classes.inputs },
										}}
										name="username"
										autoComplete="username"
										autoFocus
										helperText={
											touched.username
												? errors.username
												: ""
										}
										error={
											touched.username &&
											Boolean(errors.username)
										}
										value={values.username}
										onChange={handleChange}
									/>
									<TextField
										id="email"
										label={
											<Typography
												className={classes.label}
											>
												E-mail address
											</Typography>
										}
										fullWidth
										margin="normal"
										InputLabelProps={{
											shrink: true,
										}}
										InputProps={{
											classes: { input: classes.inputs },
										}}
										name="email"
										autoComplete="email"
										helperText={
											touched.email ? errors.email : ""
										}
										error={
											touched.email &&
											Boolean(errors.email)
										}
										value={values.email}
										onChange={handleChange}
									/>
									<TextField
										id="password"
										label={
											<Typography
												className={classes.label}
											>
												Password
											</Typography>
										}
										fullWidth
										margin="normal"
										InputLabelProps={{
											shrink: true,
										}}
										InputProps={{
											classes: { input: classes.inputs },
										}}
										type="password"
										autoComplete="current-password"
										helperText={
											touched.password
												? errors.password
												: ""
										}
										error={
											touched.password &&
											Boolean(errors.password)
										}
										value={values.password}
										onChange={handleChange}
									/>

									<Box textAlign="center">
										<Button
											type="submit"
											size="large"
											variant="contained"
											color="primary"
											className={classes.submit}
										>
											Create
										</Button>
									</Box>
								</form>
							)}
						</Formik>
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
