const logText = <T>(text: T): T => {
    console.log(text);
    return text
};

logText<string>('10');
logText<number>(1);

// interface Dropdown {
//     value: string;
//     selected: boolean;
// }

interface Dropdown<T>{
    value: T;
    selected: boolean;
}

const obj: Dropdown<string> = {
    value: 'hello',
    selected: true,
}
const obj2: Dropdown<number> = {
    value: 10,
    selected: true,
}

const logTextLength = <T>(text: T[]): T[] => {
    text.forEach(item => {
        console.log(item)
    });
    return text;
}

logTextLength<string>([
    'hi',
    'hello'
]);

interface lengthType {
    length: number;
}

const logTextLength2 = <T extends lengthType>(text: T): T => {
    return text
}

logTextLength2({ length : 10});

// keyof

interface ShoppingItem {
    name: string;
    price: number;
    stock: number;
}

const getShoppingItemOption = <T extends ShoppingItem>(itemOption: T): T => {
    return
};

getShoppingItemOption({
    name: 'string',
    price: 10,
    stock : 10,
});

// getShoppingItemOption<string>('a');






