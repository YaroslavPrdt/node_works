import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	// @IsEmail({}, { message: 'Неверно указан мэйл' })
	// email!: string;

	// @IsString({ message: 'Не указан пароль' })
	// password!: string;

	@IsString({ message: 'Не указано имя' })
	name!: string;

	@IsString({ message: 'Не указан токен' })
	token!: string;
}
