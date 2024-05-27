import { IsEmail, IsString, IsInt } from 'class-validator';

export class UserRegisterDto {
	@IsString({ message: 'Не указано имя' })
	name!: string;

	@IsString({ message: 'Не указан токен' })
	token!: string;

	@IsString({ message: 'Не указан gid_id' })
	gid_id!: string;

	@IsInt({ message: 'Не указан chat_id' })
	chat_id!: number;
}
