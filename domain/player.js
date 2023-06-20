/**
 * ゲームプレイヤー
 */
export class Player {
    constructor() {
        // Playerが選択した正解の値
        this.__answer = null;
    }

    /**
     * 初回の回答を選択する。（回答可能の要素からランダムに一つ選択する。）
     * @param pandora Pandra
     */
    selectFirstAnswer(pandora) {
        // Pandoraの長さ（回答の選択肢）を取得
        const length = pandora.getLength();

        // 乱数から初回の選択肢を生成
        this.__answer = Math.floor(Math.random() * length);

        // Pandoraに回答を設定
        pandora.setPlayerAnswer(this.__answer);
    }

    /**
     * Montyが開いたドアの番号を受けて、自身の回答を残りのドアに変更する。
     * @param pandora Pandra
     */
    selectChangeAnswer(pandora) {
        const door = pandora.getSelectableDoor();
        // Pandoraに変更した回答を設定
        this.__answer = door[Math.floor(Math.random() * door.length)];
        pandora.setPlayerAnswer(this.__answer);
    }
}
