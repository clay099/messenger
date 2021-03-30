import { ChangeEvent, useState, useEffect, SyntheticEvent } from "react";
import useStyles from "./useStyles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { User } from "../../interface/User";
import { useDebounce } from "use-debounce";
import { searchUsers } from "../../helpers/APICalls/searchUsers";

interface Props {
	search: string;
	handleChange: (event: ChangeEvent<{}>, newInputValue: string) => void;
}
const Search = ({ search, handleChange }: Props) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<User[]>([]);
	// limit our call to the api with a debounced value at max of 1 per 0.5 seconds
	const [debouncedSearch] = useDebounce(search, 500);
	const loading = open && options.length === 0;

	const classes = useStyles();

	const saveOptions = (users: User[]) => {
		setOptions(users);
	};

	useEffect(() => {
		let active = true;

		// send request to backend API to get users limited to 20.
		// clean this function up when connected to the backend
		searchUsers({ active, search: debouncedSearch, saveOptions });

		return () => {
			active = false;
		};
	}, [loading, debouncedSearch]);

	// creates a combobox search which is dynamically updated with call's to the API
	return (
		<form
			onSubmit={(e: SyntheticEvent) => {
				e.preventDefault();
			}}
		>
			<Autocomplete
				id="asynchronous-search"
				open={open}
				onOpen={() => {
					setOpen(true);
				}}
				onClose={() => {
					setOpen(false);
				}}
				getOptionSelected={(option, value) =>
					option.username === value.username
				}
				getOptionLabel={(option) => option.username}
				options={options}
				loading={loading}
				onInputChange={handleChange}
				inputValue={search}
				renderInput={(params) => (
					<div className={classes.search}>
						<InputBase
							{...params.inputProps}
							placeholder="Search"
							classes={{
								root: classes.searchRoot,
								input: classes.searchInput,
							}}
							inputProps={{
								"aria-label": "search",
								ref: params.InputProps.ref,
							}}
							startAdornment={
								<div className={classes.searchIcon}>
									<SearchIcon />
								</div>
							}
						/>
					</div>
				)}
			/>
		</form>
	);
};

export default Search;
