export default interface UserAuth {
	access_token: string;
	refresh_token: string;
    user: {
        id: string;
        username: string;
    }
}