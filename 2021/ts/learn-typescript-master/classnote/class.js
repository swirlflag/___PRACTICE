class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const classPerson = new Person('msh', 30);
console.log(classPerson);


function Person2(name,age){
    this.name = name;
    this.age = age;
}

const protoPerson = new Person2('msh', 30);
console.log(protoPerson);


