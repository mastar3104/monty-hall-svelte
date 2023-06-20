<script>
    import Dialog, {Title, Content, Actions} from '@smui/dialog';
    import Button, {Label} from '@smui/button';
    import LayoutGrid, {Cell} from '@smui/layout-grid';
    import {Player} from "../../domain/player";
    import {Pandora} from "../../domain/pandora";
    import {Monty} from "../../domain/monty";

    let pandora = new Pandora()
    let monty = new Monty()
    let gameStart = false;
    let firstAnswered = false;
    let checkTheAnswer = false;
    let isOpenDoor = false;
    let isCorrect = false;
    let openDoor = 0
    let firstAnswer = 0

    function selectFirstAnswer(index) {
        pandora.setPlayerAnswer(index)
        monty.visualizeLosing(pandora)
        openDoor = pandora.openDoor
        firstAnswered = true;
        firstAnswer = index
    }

    function finalAnswer(index) {
        pandora.setPlayerAnswer(index)
        checkTheAnswer = true;
        isCorrect = pandora.isCorrect()
    }

    function gameClear() {
        pandora = new Pandora()
        monty = new Monty()
        gameStart = false;
        firstAnswered = false;
        checkTheAnswer = false;
        isOpenDoor = false;
        isCorrect = false;
        openDoor = 0
        firstAnswer = 0
    }

    let notChangeCorrect = 0;
    let changeCorrect = 0;
    let resultDialog = false;
    function stagingMode() {
        notChangeCorrect = 0;
        changeCorrect = 0;
        for (let i = 0; i <= 100000; i++ ) {
            const player = new Player()
            const pandora = new Pandora()
            const monty = new Monty()
            // あなたは初めに三つの扉の中から一つの扉を選択する。
            player.selectFirstAnswer(pandora)
            // 司会者は答えを知っており，残り二つの扉の中から不正解の扉を一つ選んで開ける。
            monty.visualizeLosing(pandora)
            // その後、あなたは自分の選択を残りの扉に変更することが可能となる。
            if (pandora.isCorrect()) {
                notChangeCorrect++
            }
            player.selectChangeAnswer(pandora)
            if (pandora.isCorrect()) {
                changeCorrect++
            }
        }
        resultDialog = true;
    }
</script>

<div>
    <br>
    <Button on:click={() => {gameStart = true;}} variant="raised">
        <Label>ゲーム開始</Label>
    </Button>

    <Dialog bind:open={gameStart} on:close={() => {gameStart=false}}>
        <Title>最初に回答する扉を選んでください。</Title>
        <Content>
            <LayoutGrid>
                {#each Array(3) as _unused, i}
                    <Cell style="border: 1px solid;">
                        <div class="cell">
                            <Button on:click={() => {selectFirstAnswer(i)}}>
                                <Label>扉{i + 1}</Label>
                            </Button>
                        </div>
                    </Cell>
                {/each}
            </LayoutGrid>
        </Content>
    </Dialog>

    <Dialog bind:open={firstAnswered} on:close={() => {firstAnswered=false}}>
        <Title>司会者は {(openDoor + 1)} の扉を開けた </Title>
        <Content>
            <div>回答を変更しますか？</div>

            <LayoutGrid>
                {#each Array(3) as _unused, i}
                    <Cell style="border: 1px solid;">
                        <div class="cell">
                            <div>
                                <Button on:click={() => {finalAnswer(i)}} disabled={i===openDoor}>
                                    <Label>扉{i + 1}</Label>
                                </Button>
                            {#if i === firstAnswer}
                                <div>初回解答</div>
                            {/if}
                            {#if i === openDoor}
                                <div>ハズレ</div>
                            {/if}
                            </div>
                        </div>
                    </Cell>
                {/each}
            </LayoutGrid>
        </Content>
    </Dialog>

    <Dialog bind:open={checkTheAnswer} >
        <Content>
            {#if isCorrect}
                <h1>正解!!</h1>
            {:else}
                <h1>不正解!!</h1>
            {/if}
        </Content>
        <Actions>
            <Button on:click={gameClear}>
                <Label>終了</Label>
            </Button>
        </Actions>
    </Dialog>

    <br><br><br>
    <Button on:click={stagingMode} variant="raised">
        <Label>10万回モード</Label>
    </Button>

    <Dialog bind:open={resultDialog}>
        <Title>10万回実行した結果</Title>
        <Content>
            <p>変更せず正解した回数： {notChangeCorrect}</p>
            <p>変更して正解した回数： {changeCorrect}</p>
        </Content>
    </Dialog>
</div>

<style>
    .cell {
        width: 100px;
        height: 120px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>
