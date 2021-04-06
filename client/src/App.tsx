import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./themes/theme";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import Signup from "./pages/SignUp/SignUp";
import Dashboard from "./pages/Dashboard/Dashboard";
import { AuthProvider } from "./context/useAuthContext";
import { SnackBarProvider } from "./context/useSnackbarContext";
import { ChatProvider } from "./context/useChatContext";

import "./App.css";

function App() {
	return (
		<MuiThemeProvider theme={theme}>
			<BrowserRouter>
				<SnackBarProvider>
					<AuthProvider>
						<Switch>
							<Route exact path="/login" component={Login} />
							<Route exact path="/signup" component={Signup} />
							<Route exact path="/dashboard">
								<ChatProvider>
									<Dashboard />
								</ChatProvider>
							</Route>
							<Route path="*">
								<Redirect to="/login" />
							</Route>
						</Switch>
					</AuthProvider>
				</SnackBarProvider>
			</BrowserRouter>
		</MuiThemeProvider>
	);
}

export default App;
