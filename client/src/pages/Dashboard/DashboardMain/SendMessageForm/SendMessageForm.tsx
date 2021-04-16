import { ChangeEvent, SyntheticEvent, useState, useEffect } from "react";
import TextField from "@material-ui/core/TextField";
import useStyles from "./useStyles";
import { useChat } from "../../../../context/useChatContext";

const SendMessageForm = () => {
	const [message, setMessage] = useState("");
	const {
		handleNewMessageSubmission,
		handleUserTyping,
		activeChat,
	} = useChat();
	const classes = useStyles();

	const resetForm = () => {
		setMessage("");
	};

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		handleNewMessageSubmission(message, resetForm);
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.currentTarget.value);
		if (event.currentTarget.value.length > 0) handleUserTyping();
	};

	// clear message form when active chat changes
	useEffect(() => {
		if (activeChat) {
			setMessage("");
		}
	}, [activeChat]);

	return (
		<form onSubmit={handleSubmit} className={classes.newMessage}>
			<TextField
				label="New Message"
				value={message}
				fullWidth
				variant="outlined"
				onChange={handleChange}
				hiddenLabel={true}
				autoFocus={true}
				placeholder="Type something..."
			/>
		</form>
	);
};

export default SendMessageForm;
