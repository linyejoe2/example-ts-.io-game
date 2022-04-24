import { CONST } from "../CONSTANTS";
import { GameObject } from "./gameObject";
import shortid from "shortid"; // 生成子彈id

export class Bullet extends GameObject {
	constructor(public parentID: string, x: number, y: number, dir: number) {
		super(shortid(), x, y, dir, CONST.BULLET_SPEED);
		this.parentID = parentID;
	}

	/**
	 * 1. 更新子彈位置
	 * 2. 檢查並回傳子彈有沒有撞到牆
	 * @param {number} dt 
	 * @return {boolean} 
	 */
	update(dt: number): boolean {
		super.update(dt);
		return this.x < 0 || // 撞到左邊的牆
		this.x > CONST.MAP_SIZE || // 撞到右邊的牆
		this.y < 0 || // 撞到上面
		this.y > CONST.MAP_SIZE; // 撞到下面
	}
}
