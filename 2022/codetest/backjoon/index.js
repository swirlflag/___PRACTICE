//get inputs
const fs = require("fs");
const inputs = fs
	.readFileSync("./dev/stdin", "utf8")
	.toString()
	.trim()
	.split(" ");
const inputNumber = Math.abs(inputs[0]);

//code
const solution = (number) => {

    const isCenterCheck = (ratio) => {
        return ratio >= 1/3 && ratio < 2/3;
    }


    const loop = (count = 1) => {

        const map = [];

        for(let x = 0; x < number; ++x) {
            const line = [];
            for(let y = 0; y < number; ++y) {
                const isCenterRow = isCenterCheck(x/(number-1)) ;
                const isCenterCol = isCenterCheck(y/(number-1)) ;
                const isCenter = isCenterRow && isCenterCol;
                const unit = count === number/3 ? [loop(count + 1) , []] : ['*', '-'];
                line.push(isCenter ? unit[1]: unit[0]);
            }
            map.push(line);
        }

        return map;
    }

    const map = loop();

    // console.log();
    console.log(map);

    // map.forEach((line) => {
    //     console.log(line.join(''));
    // })


};

//result
const result = solution(inputNumber);

console.log(result);
