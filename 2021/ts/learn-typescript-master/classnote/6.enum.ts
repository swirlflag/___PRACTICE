enum Shoes {
    Nike = '나이키',
    Adidas = '아디다스',
}

const myShoes = Shoes.Nike;

enum Answer {
    Yes = 'Y',
    No = 'N',
}

const askQuestion = (answer: Answer) => {
    if (answer === Answer.Yes) {
        console.log('정답');
    }
    if (answer === Answer.No) {
        console.log('오답');
    }
};

const myAnswer = Math.random() > 0.5 ? Answer.Yes : Answer.No;
askQuestion(myAnswer);