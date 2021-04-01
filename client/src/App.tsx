import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/useAuthContext";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<AuthProvider>
					<Switch>
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route path="*">
							<Redirect to="/signup" />
						</Route>
					</Switch>
				</AuthProvider>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
