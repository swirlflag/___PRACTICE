//  타입 추론 기본
const a = 'abc';

const getB = (b = 10) => {
    var c = "hi"
    return b + c;
};

// 타입 추론 기본2

interface Dropdown<T> {
    value: T;
    title: string;
}
const shoppingItem: Dropdown<string> = {
    value: 'myvalue',
    title : 'hello',
}

// 타입 추론 기본 3
interface DetailDropdown<T> extends Dropdown<T>{
    description: string;
    tag: T;
}

const detailItem: DetailDropdown<string> = {
    value: 'hi',
    title: 'hello',
    description: 'desc',
    tag : 'tag'
}

// best common type
const arr = [1, 2, true, '1', null];
