var scope = function (action, isConsole) {
    if (isConsole === void 0) { isConsole = false; }
    var result = action();
    if (isConsole) {
        console.log(result);
    }
};
// enum
scope(function () {
    var Countries;
    (function (Countries) {
        Countries[Countries["Korea"] = 0] = "Korea";
        Countries[Countries["USA"] = 1] = "USA";
        Countries[Countries["Japan"] = 2] = "Japan";
        Countries[Countries["China"] = 3] = "China";
    })(Countries || (Countries = {}));
    var myFoodList = [
        {
            name: "banana",
            price: 10000,
            productionDate: "2020-05-10",
            expirationDate: "2022-05-10",
            originCountry: Countries.China
        },
        {
            name: "apple",
            price: 20000,
            productionDate: "2020-05-10",
            expirationDate: "2022-05-10",
            originCountry: Countries.USA
        },
        {
            name: "honey",
            price: 80000,
            productionDate: "2020-05-10",
            originCountry: Countries.Korea
        },
    ];
    return myFoodList;
}, false);
// 함수 타입
scope(function () {
    var search = function (source, subString) {
        var result = source.search(subString);
        return result > -1;
    };
    return search("hey", "d");
}, false);
// 인덱서블 타입 (Indexable Types)
scope(function () {
    var personList = ["홍길동", "Mike", "Lisa", "김시민"];
    return personList;
}, false);
// 클래스 타입 (Class Types)
scope(function () {
    var Clock = /** @class */ (function () {
        function Clock(h, m) {
            this.currentTime = new Date();
        }
        Clock.prototype.setTime = function (date) {
            this.currentTime = date;
        };
        return Clock;
    }());
    return new Clock(10, 10);
}, true);
