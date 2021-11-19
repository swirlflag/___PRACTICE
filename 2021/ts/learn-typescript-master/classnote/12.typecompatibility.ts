// 인터페이스
interface Developer {
    name: string,
    skill: string,
}

interface Person {
    name: string,
}

let developer: Developer;
let person: Person;

let add = (a: number):number => {
    return a + 1;
};

let sum = (a: number, b: number): number => {
    return a + b;
};

// add = sum;
sum = add;

interface Empty<T> {
    // ..
}

let empty1: Empty<string>;
let empty2: Empty<number>;

empty1 = empty2;
empty2 = empty1;

interface Fill<T> {
    data: T,
}

let fill1: Fill<string>;
let fill2: Fill<number>;

// fill1 = fill2;
// fill2 = fill1;

