var logMessage = function (value) {
    console.log(value);
};
logMessage('ehllo');
logMessage(2);
var logMessage2 = function (value) {
    if (typeof value === 'number') {
        // console.log(value.slice);
        return;
    }
    if (typeof value === 'string') {
        console.log(value.slice);
        return;
    }
};
logMessage2('hello');
logMessage2(100);
var myvalue = 'hello';
var askSomeone = function (someone) {
    console.log(someone.name);
    // console.log(someone.skill);
    // console.log(someone.age);
};
askSomeone({
    name: 'developer msh',
    skill: 'js'
});
askSomeone({
    name: 'person msh',
    age: 100
});
var askSomeone2 = function (someone) {
    console.log(someone.name);
    console.log(someone.skill);
    console.log(someone.age);
};
askSomeone2({
    name: 'person msh',
    age: 100,
    skill: 'js'
});
