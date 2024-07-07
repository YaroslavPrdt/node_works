import { UserModel } from '.prisma/client';
import { inject, injectable } from 'inversify';
import { PrismaService } from '../database/prisma.service';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';

@injectable()
export class UsersRepository implements IUsersRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ name, token, chat_id, gid_id }: User): Promise<UserModel> {
		return this.prismaService.client.userModel.create({
			data: {
				name,
				token,
				chat_id,
				gid_id,
			},
		});
	}

	async find(chat_id: number): Promise<UserModel | null> {
		return this.prismaService.client.userModel.findFirst({
			where: {
				chat_id,
			},
		});
	}
}
