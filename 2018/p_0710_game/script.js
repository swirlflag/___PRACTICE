var MainData = {
  classtype : {
    beginner : {
      initState : {
        'hp' : 10,
        'mp' : 10,
        'ad' : 2,
        'ap' : 2,
        'sp' : 1
      }//MainData.classtype.beginner.state // end object
    },//MainData.classtype.beginner
    soldier : {
      uniqueState : {
        'hp' : 10,
        'mp' : 0,
        'ad' : 3,
        'ap' : 1,
        'sp' : 0.8
      },//MainData.classtype.soldier.uniqueState // end object
      levelState : {
        'hp' : 3,
        'mp' : 1,
        'ad' : 1,
        'ap' : 1,
        'sp' : 0.05
      }//MainData.classtype.soldier.levelState // end object
    },//MainData.classtype.soldier
    mage : {
      uniqueState : {
        'hp' : 2,
        'mp' : 15,
        'ad' : 2,
        'ap' : 13,
        'sp' : -0.5
      },//MainData.classtype.mage.uniqueState // end object
      levelState :{
        'hp' : 1,
        'mp' : 4,
        'ad' : 0.3,
        'ap' : 3,
        'sp' : 0.02
      }//MainData.classtype.mage.levelState // end object
    }//MainData.classtype.mage // end object
  }// MainData.classtype // end object
};// MainData

var MakeCharacter = (function(){
  var Character = function(){
    console.log('캐릭터 생성!');
    this.classtype = 'beginner';
    this.tribetype = 'unknown'
    this.level = 1;
    this.state = MainData.classtype.beginner.initState;
  };
  Character.prototype.setClass = (function(){
    var setClass = function(classtype){
      if(!classtype){
        return '직업을 선택해주세요';
      };
      console.log('선택직업 : ' + classtype);
      setClass.prototype.classtypeStateAdd(this,classtype);
    };
    setClass.prototype.classtypeStateAdd = (function(){
      var classtypeStateAdd = function(character,classtype){
        var oldClasstypeData = character.classtype;
        console.log('기존 직업은! '+ oldClasstypeData);
        console.log('신규 직업인 ' + classtype + ' 의 스탯 설정중..');
        var statedata = function(classtype){
          var steatdata;
          if(classtype == 'soldier'){
            statedata = MainData.classtype.soldier;
          }else if(classtype == 'mage'){
            statedata = MainData.classtype.mage;
          }else{
            statedata = MainData.classtype.beginner;
          };
          return statedata;
        };
        oldStatedata = function(oldClasstype){
          if(oldClasstype == 'soldier'){
            oldClasstype = MainData.classtype.soldier;
          }else if(oldClasstype == 'mage'){
            oldClasstype = MainData.classtype.mage;
          }else{
            oldClasstype = 'beginner';
          };
          return oldClasstype;
        };
        var loop = function(character,classtype,oldClasstype){
          var classtypeData = statedata(classtype);
          oldClasstypeData = oldStatedata(oldClasstype);
          console.log(oldClasstypeData);
          for(let p in character.state){
            if(!(oldClasstypeData == 'beginner')){
              character.state[p] -= oldClasstypeData.uniqueState[p];
            };
            character.state[p] += classtypeData.uniqueState[p];
          };
        };
        character.classtype = classtype;
        loop(character,classtype,oldClasstypeData);
        console.log(classtype + ' 스탯 설정완료');
      };
      return classtypeStateAdd;
    })();
    return setClass;
  })();

  Character.prototype.setTribe = function(tribeType){
    var setTribe = function(tribeType){
      console.log('종족 : ' + tribeType);
    };
    return setTribe;
  };

  return Character;
})();

var CharacterSet = (function(){
  var characterSet = function(){

  };
  characterSet.prototype.setClass = function(classType){

  };
  characterSet.prototype.setTribe = function(tribeType){
    console.log('종족 : ' + tribeType);
  };
  return characterSet;
})();



var a = new MakeCharacter();
