import { ChangeEvent, SyntheticEvent, useState } from "react";
import TextField from "@material-ui/core/TextField";
import submitMessage from "../../../helpers/APICalls/submitMessage";
import { useChat } from "../../../context/useChatContext";

const SendMessageForm = () => {
	const [message, setMessage] = useState("");
	const { chatId } = useChat();

	const handleSubmit = async (event: SyntheticEvent) => {
		event.preventDefault();
		if (chatId) {
			await submitMessage(chatId, message);
			setMessage("");
		}
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setMessage(event.currentTarget.value);
	};

	return (
		<form onSubmit={handleSubmit}>
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
