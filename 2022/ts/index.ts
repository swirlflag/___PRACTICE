const scope = function (
	action: Function,
	isConsole: Boolean | number = false
): void {
	const result = action();
	if (isConsole) {
		console.log(result);
	}
};

// enum
scope(() => {
	enum Countries {
		Korea = 0,
		USA = 1,
		Japan = 2,
		China = 3,
	}

	interface Product {
		price: number;
		name: string;
		originCountry?: Countries;
	}

	interface Food extends Product {
		productionDate?: string;
		expirationDate?: string;
	}

	const myFoodList: Array<Food> = [
		{
			name: "banana",
			price: 10000,
			productionDate: "2020-05-10",
			expirationDate: "2022-05-10",
			originCountry: Countries.China,
		},
		{
			name: "apple",
			price: 20000,
			productionDate: "2020-05-10",
			expirationDate: "2022-05-10",
			originCountry: Countries.USA,
		},
		{
			name: "honey",
			price: 80000,
			productionDate: "2020-05-10",
			originCountry: Countries.Korea,
		},
	];

	return myFoodList;
}, false);

// 함수 타입
scope(() => {
	interface SearchFunc {
		(source: string, subString: string): boolean;
	}

	const search: SearchFunc = function (source, subString) {
		let result = source.search(subString);
		return result > -1;
	};

	return search("hey", "d");
}, false);

// 인덱서블 타입 (Indexable Types)
scope(() => {
	interface Persons {
		[index: number]: string;
	}

	const personList: Persons = ["홍길동", "Mike", "Lisa", "김시민"];
	return personList;
}, false);

// 클래스 타입 (Class Types)
scope(() => {
    interface ClockConstructor {
        currentTime: Date;
        setTime(date: Date): void;
    }

    class Clock implements ClockConstructor {
        currentTime = new Date();

        constructor() {
        }
        setTime(date: Date){
            this.currentTime = date;
        }
    }

    const myClock = new Clock();

    return myClock;
}, true);
