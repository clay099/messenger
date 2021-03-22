import React from "react";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
// import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/useContext";

import "./App.css";

function App() {
	return (
		<AuthProvider>
			<MuiThemeProvider theme={theme}>
				<BrowserRouter>
					<Route path="/login" component={Login} />
					<Route path="/signup" component={Signup} />
					<Route path="/dashboard" component={Dashboard} />
					<Route exact path="/">
						<Redirect to="/signup" />
					</Route>
				</BrowserRouter>
			</MuiThemeProvider>
		</AuthProvider>
	);
}

export default App;
