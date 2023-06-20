/**
 * 複数の扉の情報を管理するクラス
 */
export class Pandora {
    constructor(length = 3) {
        this.door = Array.from({ length }, (_, i) => i);
        this.answer = Math.floor(Math.random() * this.door.length);
        this.playerAnswer = null;
        this.openDoor = null;
    }

    getLength() {
        /**
         * 回答可能なドアの総数を返す。
         */
        return this.door.length;
    }

    setPlayerAnswer(answer) {
        /**
         * Playerが選択した回答を設定
         */
        this.playerAnswer = answer;
    }

    getRemaining() {
        return this.door.filter(
            (door) => door !== this.playerAnswer && door !== this.answer
        );
    }

    setOpenDoor(openDoor) {
        /**
         * ハズレのドアを開く
         */
        if (this.answer === openDoor) {
            throw new Error("正解の扉を開くことはできません");
        }
        if (this.playerAnswer === openDoor) {
            throw new Error("Playerが選択した扉を開くことはできません");
        }
        this.openDoor = openDoor;
    }

    getSelectableDoor() {
        return this.door.filter(
            (door) => door !== this.playerAnswer && door !== this.openDoor
        );
    }

    isCorrect() {
        /**
         * Playerの選択が正解か否かを判定する
         */
        return this.answer === this.playerAnswer;
    }
}
