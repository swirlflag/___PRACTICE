interface User {
    name: string;
    age: number
}

let msh: User = {
    name: 'msh',
    age: 30,
};

const getUser = (user: User): void => {
    console.log(user);
}

const msh2 = {
    name: 'msh',
}

getUser(msh);


interface SumFunction {
    (a: number, b: number): number;
}

const sum: SumFunction = (a:number , b:number):number => {
    return a + b;
}

interface StringArray {
    [index: number]: string;
}

const arr: StringArray = ['a', 'b', 'c'];

interface StringRegexDictionary {
    [key: string]: RegExp;
};

let obj: StringRegexDictionary = {
    cssFile: /\.css$/,
    jsFile: /\.js$/,
};

Object.keys(obj).map(c => c);
Object.values(obj).map(c => c);
Object.entries(obj).map(c => c);

interface Person {
    name: string;
    age: number;
};

interface Developer extends Person{
    skill: string[];
};

let devmsh: Developer = {
    name: 'msh',
    age: 30,
    skill : ['vue','react'],
}




