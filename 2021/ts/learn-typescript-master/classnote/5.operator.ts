const logMessage = (value: any): void => {
    console.log(value);
}

logMessage('ehllo');
logMessage(2);

const logMessage2 = (value: string | number): void => {
    if (typeof value === 'number') {
        // console.log(value.slice);
        return;
    }
    if (typeof value === 'string') {
        console.log(value.slice);
        return;
    }
}

logMessage2('hello');
logMessage2(100);

const myvalue: string | number | boolean = 'hello';


interface Person {
    name: string;
    age: string | number;
}
interface Developer {
    name: string;
    skill: string;
}

const askSomeone = (someone: Developer | Person) => {
    console.log(someone.name);
    // console.log(someone.skill);
    // console.log(someone.age);
}

askSomeone({
    name: 'developer msh',
    skill: 'js',
});

askSomeone({
    name: 'person msh',
    age: 100,
});

const askSomeone2 = (someone: Developer & Person) => {
    console.log(someone.name);
    console.log(someone.skill);
    console.log(someone.age);
}

askSomeone2({
    name: 'person msh',
    age: 100,
    skill : 'js',
});