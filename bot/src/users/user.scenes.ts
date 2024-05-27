import { Context, Scenes } from 'telegraf';
import { IUserContext } from './users.session.scene.interface';
import { IUserService } from './users.service.interface';
import { UserService } from './users.service';
import { UserRegisterDto } from './dto/user-register.dto';
import { LoggerService } from '../logger/logger.service';
import { BaseController } from '../common/base.controller';
import { inject, injectable } from 'inversify';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { asanaTasks } from './users.tasks';
import { asanaUserGid } from './users.gid';

const { leave } = Scenes.Stage;

@injectable()
export class CreateUserController extends BaseController {
	private asanaUserGidInstance: asanaUserGid;
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.UserService) private userService: UserService,
	) {
		super(loggerService);
		this.asanaUserGidInstance = new asanaUserGid();
	}
	public async register(): Promise<Scenes.BaseScene<IUserContext>> {
		const registerScene = new Scenes.BaseScene<IUserContext>('register');

		registerScene.enter(async (ctx) => {
			await ctx.reply('Введите ваш токен:');
		});

		registerScene.on('text', async (ctx) => {
			const asanaUserData = await this.asanaUserGidInstance.getUserGid(ctx.message.text);

			const userData = {
				token: ctx.message.text,
				chat_id: ctx.chat.id,
				gid_id: asanaUserData.gid,
				name: asanaUserData.name || ctx.from.username || ctx.from.first_name || 'Неизвестный',
			};

			const userExist = await this.userService.findUserByChatId(userData.chat_id);

			if (userExist) {
				ctx.reply('Вы уже сохраняли токен ранее');
				ctx.scene.leave();
			} else {
				try {
					await this.userService.createUser(userData);
					ctx.reply('Даные сохранены');
				} catch (error) {
					console.error('Ошибка при сохранении данных:', error);
					ctx.reply('Произошла ошибка. Попробуйте еще раз позже.');
				}
				ctx.scene.leave();
			}
		});
		return registerScene;
	}
}

@injectable()
export class ReturnAsanaTasks {
	private asanaTasksInstace: asanaTasks;
	constructor(@inject(TYPES.UserService) private userService: UserService) {
		this.asanaTasksInstace = new asanaTasks();
	}

	public async getTasks(): Promise<Scenes.BaseScene<IUserContext>> {
		const getTasksScene = new Scenes.BaseScene<IUserContext>('getTasks');

		getTasksScene.enter(async (ctx) => {
			const chat_id = ctx.chat?.id;
			if (chat_id) {
				const user = await this.userService.findUserByChatId(chat_id);
				const token = user?.token;

				// console.log(token);

				if (token) {
					try {
						const result = await this.asanaTasksInstace.getAsanaTasks(token);
						result.data.forEach((task: object) => {
							ctx.reply(JSON.stringify(task, null, 2));
						});
					} catch (error) {
						console.log(error);
					}
				}
			}
		});
		return getTasksScene;
	}
}

// export const testScene = new Scenes.BaseScene<IUserContext>('test');
// testScene.enter((ctx) => ctx.reply('Привет'));
// testScene.command('back', leave<IUserContext>());
// testScene.on('text', (ctx) => {
// 	ctx.reply(ctx.message.text);
// 	ctx.scene.leave();
// });
// testScene.leave((ctx) => ctx.reply('Пока'));

// export const startScene = new Scenes.BaseScene<IUserContext>('start');
// startScene.enter((ctx) => ctx.reply(`Привет, для начала работы укажите свой Asana Token`));
// startScene.command('back', leave<IUserContext>());
// startScene.on('text', async (ctx) => {
// 	const token = ctx.message.text;
// 	const chat_id = ctx.chat.id;
// 	const name = ctx.from.username || ctx.from.first_name || 'Неизвестный';

// 	ctx.scene.leave();
// });
// startScene.leave((ctx) => ctx.reply('Токен сохранён'));
