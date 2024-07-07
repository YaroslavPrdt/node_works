// eslint-disable-next-line @typescript-eslint/no-var-requires
const Asana = require('asana');

export class asanaUserGid {
	constructor() {}
	async getUserGid(asanaToken: string): Promise<any> {
		const client = Asana.ApiClient.instance;
		const token = client.authentications['token'];
		token.accessToken = asanaToken;

		const usersApiInstance = new Asana.UsersApi();
		const user_gid = 'me';
		const opts = {
			opt_fields: 'name',
		};

		try {
			const result = await usersApiInstance.getUser(user_gid, opts);
			console.log(
				'API called successfully. Returned data: ' + JSON.stringify(result.data, null, 2),
			);
			return result.data;
		} catch (error) {
			console.log(error);
			throw error;
		}
	}
}
