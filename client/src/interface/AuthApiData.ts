import { User } from "./User";

export interface AuthApiData {
	error?: { message: string };
	success?: { message: string; user: User };
}
