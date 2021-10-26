var Shoes;
(function (Shoes) {
    Shoes["Nike"] = "\uB098\uC774\uD0A4";
    Shoes["Adidas"] = "\uC544\uB514\uB2E4\uC2A4";
})(Shoes || (Shoes = {}));
var myShoes = Shoes.Nike;
var Answer;
(function (Answer) {
    Answer["Yes"] = "Y";
    Answer["No"] = "N";
})(Answer || (Answer = {}));
var askQuestion = function (answer) {
    if (answer === Answer.Yes) {
        console.log('정답');
    }
    if (answer === Answer.No) {
        console.log('오답');
    }
};
var myAnswer = Math.random() > 0.5 ? Answer.Yes : Answer.No;
askQuestion(myAnswer);
