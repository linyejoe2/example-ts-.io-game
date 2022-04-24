import { CONST } from "../CONSTANTS";
import { Bullet } from "./bullte";
import { GameObject } from "./gameObject";

export class Player extends GameObject {
    public username: string;
    public hp: number;
    public fireCooldown: number;
    public score: number;


    constructor(id: string, username: string, x: number, y: number) {
        super(id, x, y, Math.random() * 2 * Math.PI, CONST.PLAYER_SPEED);
        this.username = username;
        this.hp = CONST.PLAYER_MAX_HP;
        this.fireCooldown = 0;
        this.score = 0;
    }

    /**
     * 更新玩家位置 同時判斷是否要射出子彈
     * @param dt 走的距離
     * @returns 如果有要射出子彈 就回傳Bullet
     */
    update(dt: number): Bullet | null {
        super.update(dt);

        // Update score
        this.score += dt * CONST.SCORE_PER_SECOND;

        // Make sure the player stays in bounds
        this.x = Math.max(0, Math.min(CONST.MAP_SIZE, this.x));
        this.y = Math.max(0, Math.min(CONST.MAP_SIZE, this.y));

        // Fire a bullet, if needed
        this.fireCooldown -= dt;
        if (this.fireCooldown <= 0) {
            this.fireCooldown += CONST.PLAYER_FIRE_COOLDOWN;
            return new Bullet(this.id, this.x, this.y, this.direction);
        }

        return null;
    }

    takeBulletDamage() {
        this.hp -= CONST.BULLET_DAMAGE;
    }

    onDealtDamage() {
        this.score += CONST.SCORE_BULLET_HIT;
    }

    /**
     * 回傳要更新給前端的資訊
     * @returns 位置,hp
     */
    serializeForUpdate() {
        return {
            ...(super.serializeForUpdate()),
            direction: this.direction,
            hp: this.hp,
        };
    }
}