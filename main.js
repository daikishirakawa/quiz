// 厳密なエラーチェックを行う設定
'use strict'

{
    // idタグのquestionをHTMLから取得→questionに格納
    const question = document.getElementById('question')
    // idタグのchoicesをHTMLから取得→choicesに格納
    const choices = document.getElementById('choices')
    // idタグのbtnをHTMLから取得→btnに格納
    const btn = document.getElementById('btn')
    // idタグのresultをHTMLから取得→resultに格納
    const result = document.getElementById('result')
    // idタグのresultの中のp要素を取得→scoreLabelに格納
    const scoreLabel = document.querySelector('#result p')

    // quizSetにshuffleが適用された配列を格納
    // shuffleが適用されているので、ランダムで問題が出題されるように。
    const quizSet = shuffle([
        // qに問題文、cに解答を設定
        {q:'Math.random()', c:['ランダムな数値を出力','小数点で出力','処理をループする']},
        {q:'Math.floor()', c:['整数値を生成する','平均値を取得する','少数値を取得する']},
        {q:'Cookie', c:['ユーザー情報','フォルダ','セキュリティ方式']},
        {q:'HTTP', c:['通信方式','インターネット','プログラミング言語']},
        {q:'OS', c:['基本ソフトウェア','コンピュータ本体','通信ケーブル']},
        {q:'localhost', c:['自分のコンピュータ','Webサーバー','セキュリティ方式']},
        {q:'git init', c:['gitで管理を開始する宣言','githubにリポジトリを作成','gitのフォルダを削除する']},
    ]);
    // 変数currentNumに0を格納
    let currentNum = 0;
    // 変数isAnswerdを定義
    let isAnswerd;
    // 変数scoreに0を格納
    let score = 0;
    
    // shuffleに中の処理を格納する（配列の情報をシャッフルする）
    function shuffle(arr){
        // 変数iにarrのlengthから-1したものを格納,変数iは0より大きいものとする,iから-1していく,
        // ループさせる
        for(let i = arr.length - 1; i >0;i--) {
        // ランダムに出力された数値に＋1したものをかける（整数値を出力）jに格納
        const j = Math.floor(Math.random() * (i + 1));
            // 分割代入jとiを入れ替える
        [arr[j], arr[i]] = [arr[i],arr[j]];
        }
        // 31行目のarrに処理を格納する
        return arr;
    }
    //checkAnswerに処理を格納する 　　
    function checkAnswer(li){
        // もしisAnswerdがtrueなら、
        if(isAnswerd === true) {
            // 値を返す
            return;
        }
        // isAnswerdはtrue
        isAnswerd = true;
        // もし、liのtextContentとquizSetのcの0番目が同じなら
        if(li.textContent === quizSet[currentNum].c[0]) {
            // liのclassListに’correct’を与え、
            li.classList.add('correct');
            // scoreを1プラスする
            score++;
    　 //そうでないなら 
        }else{
            // liのclassListに’wrong’を与える。（正解じゃないのでscoreは与えない）
            li.classList.add('wrong');
        }
        btn.classList.remove('disabled');
    }
    
    function setQuiz() {
        isAnswerd = false;
        // idタグ’クエスチョン’のテキストはquizSetのcurrentNum（定義されている0が入る）のqの要素が問題文として出力される
        question.textContent = quizSet[currentNum].q;

while(choices.firstChild) {
    choices.removeChild(choices.firstChild);
}

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // shuffledCoicesに１つ１つ処理を行う。以下の処理をchoiceに格納する
    shuffledChoices.forEach(choice => {
        // li要素を作成
        const li = document.createElement('li');
        // liのテキスト情報はchoiceの中に格納する
        li.textContent = choice;
        li.addEventListener('click',() => {
            checkAnswer(li);
        })
        choices.appendChild(li);
    });
    if(currentNum === quizSet.length - 1){
        btn.textContent = 'Show Score';
    }

    }
    setQuiz();

    btn.addEventListener('click',() => {
        if(btn.classList.contains('disabled')){
            return;
        }
        btn.classList.add('disabled');

        if(currentNum === quizSet.length - 1){
            // console.log(`Score: ${score} / ${quizSet.length}`);
            scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
            result.classList.remove('hidden');
        }else{
            currentNum++;
            setQuiz();
        }
    });
}



