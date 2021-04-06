export interface User {
	email: string;
	username: string;
}

export interface SearchUsersApiData {
	otherUsers?: User[];
	error?: { message: string };
}
