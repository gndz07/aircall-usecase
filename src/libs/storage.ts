export enum Key {
	Token = "token",
	RefreshToken = "refresh_token",
	Username = "username"
}

export const get = (k: Key): Promise<any> => {
	return new Promise((resolve, reject) => {
		try {
			const value = localStorage.getItem(k);

			if (value) {
				resolve(value);
			} else {
				resolve(null);
			}
		} catch (error) {
			reject(error);
		}
	});
};

export const set = (k: Key, value: any): Promise<void> => {
	return new Promise((resolve, reject) => {
		try {
			localStorage.setItem(k, JSON.stringify(value));
			resolve();
		} catch (error) {
			console.error(error);
			reject(error);
		}
	});
};
