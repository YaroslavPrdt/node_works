import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	// async create({ email, password, name, token }: User): Promise<UserModel> {
	// 	return this.prismaService.client.userModel.create({
	// 		data: {
	// 			email,
	// 			password,
	// 			name,
	// 			token,
	// 		},
	// 	});
	// }

	async create({ name, token }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				token,
			},
		});
	}

	async find(token: string): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				token,
			},
		});
	}

	// async find(email: string): Promise<UserModel | null> {
	// 	return this.prismaService.client.userModel.findFirst({
	// 		where: {
	// 			email,
	// 		},
	// 	});
	// }
}
