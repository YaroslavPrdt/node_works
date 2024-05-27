// eslint-disable-next-line @typescript-eslint/no-var-requires
const Asana = require('asana');

export class asanaTasks {
	constructor() {}
	async getAsanaTasks(asanaToken: string): Promise<any> {
		const client = Asana.ApiClient.instance;
		const token = client.authentications['token'];
		token.accessToken = asanaToken;

		const tasksApiInstance = new Asana.TasksApi();
		const opts = {
			limit: 10,
			workspace: '1140471344364532',
			assignee: 'me',
			// project: '1204306707626567',
			completed_since: 'now',
			// opt_fields: 'created_by',
			// offset:
			// 	'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJib3JkZXJfcmFuayI6IltcIlYwMDM1NVFNM0Q0RlwiLDEyMDQ3MzIxMTk0OTg1MjIsXCI5WlVIV0pDWElSV1wiLDEyMDYzMzU4NzQ2Njk1MDBdIiwiaWF0IjoxNzE2NzI3NTk4LCJleHAiOjE3MTY3Mjg0OTh9.nVTVQvRJaH866-7fcib347o4soC8YTyvAKt6r6r0oYU',
		};

		const result = await tasksApiInstance.getTasks(opts);
		// console.log('API called successfully. Returned data: ' + JSON.stringify(result, null, 2));
		return result;

		// tasksApiInstance.getTasks(opts).then(
		// 	(result: any) => {
		// 		console.log('API called successfully. Returned data: ' + JSON.stringify(result, null, 2));
		// 		return result;
		// 	},
		// 	(error: { response: { body: any } }) => {
		// 		console.error(error.response.body);
		// 	},
		// );
	}
}
