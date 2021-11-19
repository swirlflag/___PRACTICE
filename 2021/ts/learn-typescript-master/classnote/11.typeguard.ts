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

if (tony as Developer) {
    const developerTony = (tony as Developer);
    console.log(developerTony.skill);
} else if (tony as Person) {
    const personTony = (tony as Person);
    console.log(personTony.age);
}

const isDeveloper = (target: Developer | Person):target is Developer => {
    return (target as Developer).skill !== undefined;
};

if (isDeveloper(tony)) {
    console.log(tony.skill);
} else {
    console.log(tony.age)
}
