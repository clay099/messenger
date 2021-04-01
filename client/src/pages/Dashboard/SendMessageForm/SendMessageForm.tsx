import { ChangeEvent, SyntheticEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import submitMessage from "../../../helpers/APICalls/submitMessage";
import useStyles from "./useStyles";
import { useChat } from "../../../context/useChatContext";

const SendMessageForm = () => {
	const [message, setMessage] = useState("");
	const { activeChat } = useChat();
	const classes = useStyles();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		if (activeChat) {
			await submitMessage(activeChat.chatId, message);
			setMessage("");
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.currentTarget.value);
	};

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
