const fs = require('fs');

const inputs = fs.readFileSync('text.txt', 'utf8').toString().trim().split('\n');
const inputArray = inputs.map((c) => +c);

let solution = (numbers) => {
    let result = 0;
    const divNumber = 42;

    let countArray = [];
    for(let i = 0; i < numbers.length; ++i) {
        const number = numbers[i]%divNumber;
        if(!countArray.includes(number)) {
            countArray.push(number);
        }
    }

    result = countArray.length;

    return result;
}

const result = solution(inputArray);

console.log(result);