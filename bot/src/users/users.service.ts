import { inject, injectable } from 'inversify';
import { UserLoginDto } from './dto/user-login.dto';
import { UserRegisterDto } from './dto/user-register.dto';
import { User } from './user.entity';
import { IUserService } from './users.service.interface';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { IUsersRepository } from './users.repository.interface';
import { UserModel } from '@prisma/client';

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ name, token, chat_id, gid_id }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(name, token, chat_id, gid_id);
		console.log(newUser);
		const salt = this.configService.get('SALT');
		// await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(chat_id);

		return this.usersRepository.create(newUser);
	}
	async findUserByChatId(chat_id: number): Promise<UserModel | null> {
		return await this.usersRepository.find(chat_id);
	}
}
