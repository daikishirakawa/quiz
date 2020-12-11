'use strict'

{
    const question = document.getElementById('question')
    const choices = document.getElementById('choices')
    const btn = document.getElementById('btn')
    const result = document.getElementById('result')
    const scoreLabel = document.querySelector('#result p')


    const quizSet = shuffle([
        {q:'しろの職業は？', c:['体育教師','マグロ漁師','パキスタン観光大使']},
        {q:'しろのフォロワー数は?', c:['203人','2万人','7万人']},
        {q:'しろの小学校時代のあだ名は?', c:['大根','モンキーパンチ','レモンスカッシュ']},
    ]);

    let currentNum = 0;
    let isAnswerd;
    let score = 0;
    
    function shuffle(arr){
        for(let i = arr.length - 1; i >0;i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[j], arr[i]] = [arr[i],arr[j]];
        }
        return arr;
    }

    function checkAnswer(li){
        if(isAnswerd === true) {
            return;

        }
        
        isAnswerd = true;

        if(li.textContent === quizSet[currentNum].c[0]) {
            li.classList.add('correct');
            score++;
        }else{
            li.classList.add('wrong');
        }


        btn.classList.remove('disabled');
    }
    
    function setQuiz() {
        isAnswerd = false;

        question.textContent = quizSet[currentNum].q;

while(choices.firstChild) {
    choices.removeChild(choices.firstChild);
}

    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    shuffledChoices.forEach(choice => {
        const li = document.createElement('li');
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



