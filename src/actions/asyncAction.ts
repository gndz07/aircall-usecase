export default function asyncAction(action: string) {
	return {
		REQUEST: `${action}/request`,
		SUCCESS: `${action}/success`,
		FAILED: `${action}/failed`,
	};
}
