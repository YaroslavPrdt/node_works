import { Context, Scenes } from 'telegraf';

interface IUserSessionScene extends Scenes.SceneSessionData {
	myProps: string;
}

interface IUserSession extends Scenes.SceneSession<IUserSessionScene> {
	name: string;
	chat_id: number;
	gid_id: string;
	token: string;
	myProp: string;
}

export interface IUserContext extends Context {
	props: string;
	session: IUserSession;
	scene: Scenes.SceneContextScene<IUserContext, IUserSessionScene>;
}
