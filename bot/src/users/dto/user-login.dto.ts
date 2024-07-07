import { IsEmail, IsString } from 'class-validator';

export class UserLoginDto {
	@IsEmail({}, { message: 'Неверно указан мэйл' })
	email!: string;

	@IsString({ message: 'Не указан пароль' })
	password!: string;
}
