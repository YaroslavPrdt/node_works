import { Server } from 'http';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { ILogger } from './logger/logger.interface';
import { inject, injectable } from 'inversify';
import { TYPES } from './types';
import 'reflect-metadata';
import { IConfigService } from './config/config.service.interface';
import { IUserController } from './users/users.controller.interface';
import { PrismaService } from './database/prisma.service';
import { Composer, Context, Markup, Scenes, session, Telegraf } from 'telegraf';
import LocalSession from 'telegraf-session-local';
import { IUserContext } from './users/users.session.scene.interface';
// import { startScene, testScene } from './users/user.scenes';

import { CreateUserController, ReturnAsanaTasks } from './users/user.scenes';
import { UserService } from './users/users.service';

@injectable()
export class App {
	server!: Server;
	stage: Scenes.Stage<IUserContext>;
	bot: Telegraf<IUserContext>;

	constructor(
		@inject(TYPES.ILogger) private logger: ILogger,
		@inject(TYPES.UserController) private userController: UserController,
		@inject(TYPES.CreateUserController) private createUserController: CreateUserController,
		@inject(TYPES.ReturnAsanaTasks) private returnAsanaTasks: ReturnAsanaTasks,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.PrismaService) private prismaService: PrismaService,
		@inject(TYPES.UserService) userService: UserService,
	) {
		// this.logger = logger;
		// this.userController = userController;
		// this.createUserController = createUserController;
		this.stage = new Scenes.Stage<IUserContext>();
		this.bot = new Telegraf<IUserContext>(this.configService.get('TGTOKEN'));
		this.bot.telegram.setMyCommands([
			{
				command: 'register',
				description: 'Регистрация',
			},
		]);
	}

	useMiddleware(): void {
		this.bot.use(new LocalSession({ database: 'session.json' }).middleware());
		this.bot.use(this.stage.middleware());
		this.bot.use((ctx, next) => {
			ctx.session.myProp;
			ctx.scene.session.myProps;
			next();
		});
		this.registerUserControllerMiddleware();
		this.getTasksMiddleware();
	}

	useBotCommands(): void {
		this.bot.command('register', async (ctx) => {
			try {
				await ctx.scene.enter('register');
			} catch (error) {
				console.error('Ошибка при входе в сцену "register":', error);
				ctx.reply('Произошла ошибка при запуске сцены "register". Пожалуйста, попробуйте еще раз.');
			}
		});
		this.bot.command('getTasks', async (ctx) => {
			try {
				await ctx.scene.enter('getTasks');
			} catch (error) {
				console.error('Ошибка при входе в сцену "getTasks":', error);
				ctx.reply('Произошла ошибка при запуске сцены "getTasks". Пожалуйста, попробуйте еще раз.');
			}
		});
	}

	private async registerUserControllerMiddleware(): Promise<void> {
		const registerScene = await this.createUserController.register();
		this.stage.register(registerScene);
	}

	private async getTasksMiddleware(): Promise<void> {
		const getTasksScene = await this.returnAsanaTasks.getTasks();
		this.stage.register(getTasksScene);
	}

	public async init(): Promise<void> {
		this.useMiddleware();
		this.useBotCommands();
		await this.prismaService.connect();

		this.bot.launch();
	}
}
