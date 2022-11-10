class BankManager{
  constructor(name){
    this.currentState = new GoodState(this);
    if(!this.balance){this.balance = 0};
    this.name = name;
    this.name ? console.log(`${this.name}님의 통장 개설 완료.`) : console.log(`익명의 통장 개설 완료.`);
    this.credit = 2;
  };
  deposit(amounts){
    this.currentState.deposit(amounts);
  };
  withdraw(amounts){
    this.currentState.withdraw(amounts);
  };
  addBalance(amounts){
    if(!amounts){
      console.log(`금액을 숫자로 입력해주세요`)
      return false;
    };
    this.balance += amounts;
  };
  showBalance(){
    console.log(`현재 잔액 : ${this.getBalance()}원 입니다.`);
    return null;
  }
  getBalance(){
    return this.balance;
  };
  plusCredit(){
    ++this.credit;
  };
  minusCredit(){
    --this.credit;
  };
  getCredit(){
    return this.credit;
  };
  changeState(newState){
    this.currentState = newState;
  };
};

class GoodState{
  constructor(manager){
    this.manager = manager;
    console.log('기본 상태로 전환');
  };
  deposit(amounts){
    var amountsHave = this.manager.addBalance(amounts);
    if(amountsHave == false){return;};
    console.log(`${amounts}원이 입금되었습니다.`);
    this.manager.showBalance();
  };
  withdraw(amounts){
    if(this.manager.getBalance() < 0){
      console.log(`잔액이 부족합니다.`);
      console.log(
        `출금 가능 금액은 ${(function(_this){
        if(_this.manager.getBalance() < 0){
          return `0`
        };
        return _this.manager.getBalance();
      })(this)}원 입니다.`
    );
      this.manager.minusCredit();
      this.manager.changeState(new OverState(this.manager));d
    }else{
      this.manager.addBalance(-1 * amounts);
      console.log(`${amounts}원이 출금되었습니다.`);
      this.manager.showBalance();
    };
  };
};

class OverState{
  constructor(manager){
    this.manager = manager;
    console.log('출금 불가로 전환');
  };
  deposit(amounts){
    if(this.manager.getBalance() > 0){
      this.manager.changeState(new GoodState(this.manager));
    };
    this.manager.addBalance(amounts);
    console.log(`${amounts}원이 입금되었습니다.`);
    this.manager.showBalance();
  };
  withdraw(amounts){
    this.manager.minusCredit();
    if(this.manager.getCredit() < 0){
      this.manager.changeState(new HoldState(this.manager));
    };
    console.log('출금 가능한 상태가 아닙니다.');
  };
};

class HoldState{
  constructor(manager){
    this.manager = manager;
    console.log('압류 상태로 전환');
  };
  deposit(amounts){
    this.manager.addBalance(amounts);
    console.log(`${amounts}원이 입금되었습니다.`);
    this.manager.showBalance();
    if(this.manager.getBalance() > 0){
      this.manager.changeState(new GoodState(this.manager));
    }else{
      throw `이 계좌는 대출 상환 전까지 잠금입니다.`
    }
  };
  withdraw(amounts){
    throw `이 계좌는 대출 상환 전까지 잠금입니다. 남은 대출금 : ${Math.abs(this.manager.getBalance())}원`
  };
};

// class LoanState{
//   constructor(manager){
//     this.manager = manager;
//     console.log('대출 상태로 전환');
//   }
// };
// 이건내일해야징

var a = new BankManager();
