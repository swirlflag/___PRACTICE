interface PhoneNumberDictionary {
    [phone: string]: {
        num: number;
    };
}

interface Contact {
    name: string;
    address: string;
    phones: PhoneNumberDictionary;
}

enum PhoneType {
    Home = 'home',
    Studio = 'studio',
    Office = 'office',
}

export { Contact, PhoneType };
