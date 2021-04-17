export interface FetchOptions {
	method: string;
	headers?: {
		"Content-Type": string;
	};
	body?: string;
	withCredentials: boolean;
	credentials: RequestCredentials;
}
