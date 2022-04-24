import { Bullet } from "../class/bullte";
import { Player } from "../class/player";
import { CONST } from "../CONSTANTS";

/**
 * 如果game偵測到碰撞了 就呼叫這支函式處理碰撞
 * @param players 一個包含所有玩家的陣列
 * @param bullets 包含所有子彈的陣列
 * @returns 回傳該被清除的子彈陣列
 */
export function applyCollisions(players: Array<Player>, bullets: Array<Bullet>): Array<Bullet> {
    const destroyedBullets = [];
    for (let i = 0; i < bullets.length; i++) {
        // Look for a player (who didn't create the bullet) to collide each bullet with.
        // As soon as we find one, break out of the loop to prevent double counting a bullet.
        for (let j = 0; j < players.length; j++) {
            const bullet = bullets[i];
            const player = players[j];
            if (
                bullet.parentID !== player.id &&
                player.distanceTo(bullet) <= CONST.PLAYER_RADIUS + CONST.BULLET_RADIUS
            ) {
                destroyedBullets.push(bullet);
                player.takeBulletDamage();
                break;
            }
        }
    }
    return destroyedBullets;
}
