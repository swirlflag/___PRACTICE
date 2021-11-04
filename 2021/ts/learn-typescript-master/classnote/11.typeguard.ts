interface Developer {
    name: string;
    skill: string;
}
interface Person {
    name: string;
    age: number;
}

const introduce = ():Developer | Person => {
    return {
        name: 'tony',
        age: 10,
        skill : 'js'
    }
}

const tony = introduce();
if ((tony as Developer).skill) {
    console.log((tony as Developer).skill);
}