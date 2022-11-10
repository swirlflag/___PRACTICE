var data1 = [
  {title:'image 1',url:'../img/img_1.jpg'},
  {title:'image 2',url:'../img/img_2.jpg'},
  {title:'image 3',url:'../img/img_3.jpg'},
  {title:'image 4',url:'../img/img_4.jpg'},
  {title:'image 5',url:'../img/img_5.jpg'}
];
var data2 = [
  {title:'image 6',url:'../img/img_6.jpg'},
  {title:'image 7',url:'../img/img_7.jpg'},
  {title:'image 8',url:'../img/img_8.jpg'},
  {title:'image 9',url:'../img/img_9.jpg'}
];
var data3 = [
  {title:'image 10',url:'../img/img_10.jpg'},
  {title:'image 11',url:'../img/img_11.jpg'},
  {title:'image 12',url:'../img/img_12.jpg'},
  {title:'image 13',url:'../img/img_13.jpg'}
];

var util = (function(){
  var style = function(el) {return window.getComputedStyle(el, null)};
  return {
    style : style
  }
})();

var image = (function(){
  var sliderUl;
  var imageDOM = function(arg){
    var str =
    "<ul class='slider_ul "+ arg.style +"'>" +
        (function(){
          var roopstr = '';
          for(let i = 0; i < arg.data.length; ++i){
            roopstr +=
            "<li class='slider_item txtdel' style='background : url("+arg.data[i].url+") no-repeat center; background-size: cover'>"+
              arg.data[i].title+
            "</li>";
          };
          return roopstr;
        })(arg);
    +"</ul>";
    arg.target.innerHTML = arg.target.innerHTML + str;
  };

  var imageSet = function(arg){
    for(let i = 0; i < arg.target.children.length; ++i){
      if(arg.target.children[i].classList.contains('slider_ul')){
        var sliderUl = arg.target.children[i];
        break;
      }
    };
    sliderUl.style.width = (window.innerWidth * arg.data.length) + 'px';
    for(let i = 0, children = sliderUl.children; i < children.length; ++i){
      children[i].style.width = window.innerWidth + 'px';
    };
  };

  var move = function(_this){
    if(!_this){
      var _this = this;
    }
    if(_this.phase < 0){
      _this.phase = _this.leng-1;
    }else if(_this.phase > _this.leng-1){
      _this.phase = 0
    };

    if(_this.style == 'horizontal'){
      _this.sld[0].style.left = '-' + window.innerWidth * _this.phase + 'px';
    }else if(_this.style == 'vertical'){
      _this.sld[0].style.top = '-' + window.innerHeight * _this.phase + 'px';
    }else if(_this.style == 'opacity'){
      for(let i = 0; i < _this.leng; ++i){
        _this.sld[0].children[i].classList.remove('selected');
      };
      _this.sld[0].children[_this.phase].classList.add('selected');
    };
  };

  var prev = function(){
    if(this.phase > 0){
      --this.phase;
    }else{
      this.phase = this.leng -1;
    }
    this.move();
  };
  var next = function(){
    if(this.phase < this.leng - 1){
      ++this.phase;
    }else{
      this.phase = 0;
    }
    this.move();
  };

  return {
    imageDOM : imageDOM,
    imageSet : imageSet,
    move : move,
    // moveTo : moveTo,
    prev : prev,
    next : next
  }
})(); // image

var arrow = (function(){
  var btns;
  var arrowDOM = function(arg){
    var str =
    "<div class='buttons'>"+
      "<span class='btn prev txtdel'>perv</span>"+
      "<span class='btn next txtdel'>next</span>"+
    "</div>";
    arg.target.innerHTML = arg.target.innerHTML + str;
  };

  var arrowSet = function(arg){
    for(let i = 0; i < arg.target.children.length; ++i){
      if(arg.target.children[i].classList.contains('buttons')){
        btns = arg.target.children[i];
      }
    };
    for(let i = 0; i < btns.children.length; ++i){
      btns.children[i].style.height = util.style(btns.children[i])['width'];
      if(arg.style == 'horizontal' || arg.style == 'opacity'){
        btns.children[i].style.top = (window.innerHeight/2 - util.style(btns.children[i])['width'].split('px')[0]/2 + 'px') ;
      }else if(arg.style == 'vertical'){
        btns.children[i].classList.add('vertical');
        btns.children[i].style.left = (window.innerWidth/2 - util.style(btns.children[i])['height'].split('px')[0]/2 + 'px') ;
      };
    };
  };

  var click = function(el,fn){
    el.addEventListener('click',function(){
      fn();
    })
  };

  return {
    arrowDOM : arrowDOM,
    arrowSet : arrowSet,
    click : click
  }
})();// arrow

var dot = (function(){
  var dots, dotItems, sliderUl;
  var dotDOM = function(arg){
    var str =
    "<div class='dot_wrap'>" +
      "<div class='dot_div'>"+
        (function(){
          var roopstr = '';
          for(let i = 0; i < arg.data.length; ++i){
            roopstr +=
            "<span class='dot_item'></span>";
          };
          return roopstr;
        })()
      +"</div>"
    +"</div>";
    arg.target.innerHTML = arg.target.innerHTML + str;
  };

  var dotSet = function(arg){
    for(let i = 0; i < arg.target.children.length; ++i){
      if(arg.target.children[i].classList.contains('dot_wrap')){
        dots = arg.target.children[i];
        break;
      }
    };
    dotItem = dots.children[0].children;
    if(arg.style == 'vertical'){
      dots.classList.add('vertical');
    }
  };

  var dotSelect = function(obj){
    var dotItem = dots.children[0].children;
    dotItem[phase].classList.add('selected');
    for(let i = 0; i < dotItem.length; ++i){
      dotItem[i].addEventListener('click', function(){
        for(let i = 0; i < dotItem.length; ++i){
          dotItem[i].classList.remove('selected');
        };
        dotItem[i].classList.add('selected');
        obj.phase = i;
      });
    };
  };

  var dotPhase = function(obj){
    var dotItem = obj.dot.children[0].children;
    for(let i = 0; i < dotItem.length; ++i){
      dotItem[i].classList.remove('selected');
    };
    dotItem[obj.phase].classList.add('selected');
  };

  var moveTo = function(index){
    var sliderUl;
    if(index != undefined){
      this.phase = index;
    };
    if(index < 0){
      this.phase = 0
    }else if(index > this.leng-1){
      this.phase = this.leng-1
    };
    for(let i = 0; i < this.leng; ++i){
      if(this.sld[i].classList.contains('slider_ul')){
        sliderUl = this.sld[i];
        break;
      }
    };
    if(this.style == 'horizontal'){
      sliderUl.style.left = '-' + window.innerWidth * this.phase + 'px';
    }else if(this.style == 'vertical'){
      sliderUl.style.top = '-' + window.innerHeight * this.phase + 'px';
    }else if(this.style == 'opacity'){
      for(let i = 0; i < this.leng; ++i){
        sliderUl.children[i].classList.remove('selected');
      };
      sliderUl.children[this.phase].classList.add('selected');
    };
  };

  var click = function(el,fn){
    el.addEventListener('click',function(){
      fn();
    })
  };

  return {
    dotDOM : dotDOM,
    dotSet : dotSet,
    moveTo : moveTo,
    dotSelect : dotSelect,
    dotPhase : dotPhase,
    click : click
  }
})();

var slider = function(arg){
  var returnObj = {};

  var target,
      targetIndex;
      phase = 0;

  var valueSetting = (function(){
    if(arg.target.indexOf('[') != -1){
      targetIndex = parseInt(arg.target.split('[')[1]);
      arg.target = arg.target.split('[')[0];
    }else{
      targetIndex = 0;
    };
    arg.target = document.querySelectorAll(arg.target)[targetIndex];
    returnObj.phase = phase;
    returnObj.style = arg.style;
    returnObj.target = arg.target;
    returnObj.sld = arg.target.children;
    returnObj.leng = arg.data.length;
    returnObj.prevBtn = null;
    returnObj.nextBtn = null;
    returnObj.dot = null;
  })();

  var imageSetting = (function(){
    image.imageDOM(arg);
    image.imageSet(arg);
    returnObj.move = image.move;
    returnObj.next = image.next;
    returnObj.prev = image.prev;
    window.addEventListener('resize', function(){
      image.imageSet(arg);
      image.move(returnObj);
    });
    returnObj.move();
  })();


  var arrowSetting = (function(){
    arrow.arrowDOM(arg);
    arrow.arrowSet(arg);
    window.addEventListener('resize', function(){
      arrow.arrowSet(arg);
    });
  })();

  var dotSetting = (function(){
    dot.dotDOM(arg);
    dot.dotSet(arg);
    dot.dotSelect(returnObj);
    returnObj.moveTo = dot.moveTo;
    returnObj.dotSelect = dot.dotSelect;
    returnObj.dotPhase = dot.dotPhase;
  })();

  for(let i = 0; i < returnObj.sld.length; ++i){
    if(returnObj.sld[i].classList.contains('buttons')){
      returnObj.prevBtn = returnObj.sld[i].children[0];
      returnObj.nextBtn = returnObj.sld[i].children[1];
    }else if(returnObj.sld[i].classList.contains('dot_wrap')){
      returnObj.dot = returnObj.sld[i];
    };
  };

  var controlSetting = (function(){
    returnObj.dot.addEventListener('click', function(){
      returnObj.moveTo(returnObj.phase);
    });
    returnObj.nextBtn.addEventListener('click', function(){
      returnObj.next();
      returnObj.dotPhase(returnObj);
    })
    returnObj.prevBtn.addEventListener('click', function(){
      returnObj.prev();
      returnObj.dotPhase(returnObj);
    })
  })();

  return returnObj;
};// slider()


var slider1 = new slider({
  style : 'horizontal',
  target : '.containor[0]',
  data : data1
});

var slider2 = new slider({
  style : 'vertical',
  target : '.containor[1]',
  data : data2
});

var slider3 = new slider({
  style : 'opacity',
  target : '.containor[2]',
  data : data3
});


// var data1 = [
//   {title:'image 1',url:'../img/img_1.jpg'},
//   {title:'image 2',url:'../img/img_2.jpg'},
//   {title:'image 3',url:'../img/img_3.jpg'},
//   {title:'image 4',url:'../img/img_4.jpg'},
//   {title:'image 5',url:'../img/img_5.jpg'}
// ];
// var data2 = [
//   {title:'image 6',url:'../img/img_6.jpg'},
//   {title:'image 7',url:'../img/img_7.jpg'},
//   {title:'image 8',url:'../img/img_8.jpg'},
//   {title:'image 9',url:'../img/img_9.jpg'}
// ];
// var data3 = [
//   {title:'image 10',url:'../img/img_10.jpg'},
//   {title:'image 11',url:'../img/img_11.jpg'},
//   {title:'image 12',url:'../img/img_12.jpg'},
//   {title:'image 13',url:'../img/img_13.jpg'}
// ];
//
// var image = (function(){
//   1. dom생성기능
//   2. dom셋팅기능 - 길이와 스타일에 따른 모양
//   3. 좌우 이동 기능
//   4. 원하는 인덱스 이동 기능
// })();
//
// var arrow = (function(){
//   1. dom생성기능
//   2. dom셋팅기능 - 크기, 배치에 관한 내용
//   3. 셋팅된 dom 클릭시 ~ 에 대한 이벤트를 실행하는 기능 (좌우 이동 기능)
// })();
//
// var dot = (function(){
//   1. dom생성기능
//   2. dom셋팅기능 - 길이와 스타일에 따른 모양
//   3. 셋팅된 dom 클릭시 ~에 대한 이벤트를 실행하는 기능
// })();
//
//
// var slider = function(arg){
//   console.log(arg);
//
//   imagedom 생성, 셋팅
//   arrowdom 생성, 셋팅
//   dotdom 생성, 셋팅
//
// }
// var slider1 = new slider({
//   style : 'horizontal',
//   target : '.containor[0]',
//   data : data1
// });
//
// var slider2 = new slider({
//   style : 'vertical',
//   target : '.containor[1]',
//   data : data2
// });
//
// var slider3 = new slider({
//   style : 'opacity',
//   target : '.containor[2]',
//   data : data3
// });
