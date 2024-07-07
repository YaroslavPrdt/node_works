import { compare, hash } from 'bcryptjs';

export class User {
	// private _password!: string;

	constructor(
		// private readonly _email: string,
		private readonly _name: string,
		private readonly _token: string,
		private readonly _chat_id: number,
		private readonly _gid_id: string,
		// passwordHash?: string,
	) {
		// if (passwordHash) {
		// 	this._password = passwordHash;
		// }
	}

	// get email(): string {
	// 	return this._email;
	// }

	get name(): string {
		return this._name;
	}

	get token(): string {
		return this._token;
	}

	get chat_id(): number {
		return this._chat_id;
	}

	get gid_id(): string {
		return this._gid_id;
	}

	// get password(): string {
	// 	return this._password;
	// }

	// public async setPassword(pass: string, salt: number): Promise<void> {
	// 	this._password = await hash(pass, salt);
	// }

	// public async comparePassword(pass: string): Promise<boolean> {
	// 	return compare(pass, this._password);
	// }
}
