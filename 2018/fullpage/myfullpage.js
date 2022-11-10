
var wrap = $('.flp-wrap')
  , page = $('.flp-page')
;

var winW
  , winH
  , delta = true
  , isFullpage = false
  , isDelay = false
  , nowpage  = 0
  , pageLeng
;

function setWindowSize(){
  winW = $(window).innerWidth();
  winH = $(window).innerHeight();
};

function checkIsFullpage(){
  if($(window).scrollTop() > wrap.offset().top && $(window).scrollTop() < wrap.offset().top + wrap.innerHeight() - winH){
    isFullpage = true;
  }else{
    isFullpage = false;
  };
};

function detectedFullpage(){
  if(isFullpage){
    detectedFullpage = startFullpage;
  }else{
    detectedFullpage = endFullpage;
  };
};

function startFullpage(){

  if(!isFullpage){return};
  console.log('start');
  // $('html , body').stop().animate({
  //   'scrollTop' : wrap.offset().top
  // },400)
  preventDocumentScroll();
  fullpageActionOn();
  detectedFullpage = endFullpage;
};

function endFullpage(){
  if(isFullpage){return};
  console.log('end');
  restoreDocumentScroll();
  fullpageActionOff();
  detectedFullpage = startFullpage;
};

function fullpageWheel(e){
  if(delta){
    console.log('scroll up');
    isDelay = true;
    ++nowpage;
  }else{
    console.log('scroll down');
    --nowpage;
    isDelay = true;
  };
  // if(isDelay){
  //   $('html, body').stop().animate({
  //     'scrollTop' : page.eq(nowpage).offset().top
  //   },500, function(){
  //     isDelay = false;
  //   });
  // };
};

function fullpageActionOn(){
  $(document).on('mousewheel', fullpageWheel);
};

function fullpageActionOff(){
  $(document).off('mousewheel', fullpageWheel);
};


function justPreventDefault(e){
  e.preventDefault()
};

function preventDocumentScroll(){
  $(document).on('scroll', justPreventDefault);
  $(document).on('mousewheel', justPreventDefault);
};

function restoreDocumentScroll(){
  $(document).off('scroll', justPreventDefault);
  $(document).off('mousewheel', justPreventDefault);
};

function setFullPageElements(){
  page.css('height', winH);
  wrap.css({
    'width' : winW
    ,'height' : page.length * winH
  });
};

function setDelta(e){
  e.originalEvent.deltaY < 0 ? delta = true : delta = false;
};










function globalAddEventListenrDOM(e){
  setWindowSize();
  setFullPageElements();
  checkIsFullpage();
};

function globalAddEventListenrResize(e){
  setWindowSize();
  setFullPageElements();
  checkIsFullpage();
};

function globalAddEventListenrScroll(e){
  checkIsFullpage();
  detectedFullpage();
};

function globalAddEventListenrMouseWheel(e){
  setDelta(e);
  detectedFullpage();
};

function globalAddEventListenrTouchStart(e){

};

function globalAddEventListenrTouchEnd(e){

};

function globalAddEventListenrTouchMove(e){

};



$(document).ready(function(){
// ready  !
globalAddEventListenrDOM();
pageLeng = page.length;
$(window).on('resize', function(e){globalAddEventListenrResize(e)});
$(window).on('mousewheel', function(e){globalAddEventListenrMouseWheel(e)});
$(window).on('scroll', function(e){globalAddEventListenrScroll(e)});
// ready  !
});
