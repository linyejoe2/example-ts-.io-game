export class GameObject {
	public id: string;
	public x: number;
	public y: number;
	public direction: number;
	public speed: number;

	constructor(id: string, x: number, y: number, dir: number, speed: number) {
		this.id = id;
		this.x = x;
		this.y = y;
		this.direction = dir;
		this.speed = speed;
	}

	/**
	 * 更新物件位置
	 * @param {number} dt 傳入this走的距離
	 */
	update(dt: number) {
		this.x += dt * this.speed * Math.sin(this.direction);
		this.y -= dt * this.speed * Math.cos(this.direction);
	}

	/**
	 * 更新物件方向
	 * @param {number} dir 傳入方向
	 */
	setDirection(dir: number) {
		this.direction = dir;
	}

	/**
	 * 根據傳入的XY 計算要移動多少距離
	 * @param {{x: number, y: number}} object 
	 * @return {number} 要移動的距離
	 */
	distanceTo(object: { x: number, y: number }): number {
		const dx = this.x - object.x;
		const dy = this.y - object.y;
		return Math.sqrt(dx * dx + dy * dy);
	}

	/**
	 * 回傳給前端的更新訊息
	 * @return {{ id: string, x: number, y: number }} id,x座標,y座標
	 */
	serializeForUpdate(): { id: string, x: number, y: number } {
		return {
			id: this.id,
			x: this.x,
			y: this.y,
		};
	}
}
