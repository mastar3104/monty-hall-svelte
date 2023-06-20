/**
 * ゲームの司会者（Monty）クラス
 */
export class Monty {
    visualizeLosing(pandora) {
        /**
         * 残りの扉から、ハズレの扉を開ける。
         */
        const losingList = pandora.getRemaining();
        const openDoor = losingList[Math.floor(Math.random() * losingList.length)];
        pandora.setOpenDoor(openDoor);
    }
}
