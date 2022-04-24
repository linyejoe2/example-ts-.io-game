import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { CONST } from "./CONSTANTS";
import { Game } from "./service/game";

export class App {
	private app!: express.Application;
	private PORT = Number(process.env.PORT) || 3001;
	private server!: http.Server;
	private io!: socketio.Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

	constructor() {
		this.start();
	}

	private async start(): Promise<boolean> {
		this.app = express.default();

		await this.routes();
		await this.connent();
		await this.config();

		return true;
	}

	private async routes(): Promise<boolean> {
		this.app.use(express.static("./dist"));
		this.app.use(express.static("./public"));

		return true;
	}

	private async connent(): Promise<boolean> {
		this.server = http.createServer(this.app);


		this.server.listen(this.PORT, () => {
			console.log("Running at localhost:" + this.PORT);
		});

		return true;
	}

	private async config(): Promise<boolean> {

		this.io = new socketio.Server(this.server);

		// Setup the Game
		const game = new Game();

		this.io.on("connection", (socket: socketio.Socket) => {
				console.log("Player connected!", socket.id);
	
				socket.on(CONST.MSG_TYPES.JOIN_GAME, function joinGame(this: socketio.Socket, username: string) {
					game.addPlayer(this, username);
				});
				socket.on(CONST.MSG_TYPES.INPUT, function handleInput(this: socketio.Socket, dir: number) {
					game.handleInput(this, dir);
				});
				socket.on('disconnect', function onDisconnect(this: socketio.Socket) {
					game.removePlayer(this);
				});
		});

		return true;
	}
}
