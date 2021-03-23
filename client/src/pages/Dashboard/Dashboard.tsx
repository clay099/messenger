import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import { useAuth } from "../../context/useContext";
import { useHistory } from "react-router-dom";

export default function Dashboard() {
	const { loggedIn } = useAuth();
	const history = useHistory();

	if (loggedIn === null) return <p>Loading...</p>;
	if (!loggedIn) {
		history.push("/login");
	}
	return (
		<p>
			{/* For testing purposes right now, ignore styling */}
			<p>Dashboard</p>
			<p>User: {JSON.stringify(localStorage.getItem("user"))}</p>
			<button onClick={() => {}}>Logout</button>
		</p>
	);
}
