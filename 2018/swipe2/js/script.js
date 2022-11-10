var mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal'
});

var checkedMaxPage = 0;

var test = document.getElementById('test'),
    btn = test.getElementsByTagName('a'),
    notice = document.querySelector('#notice strong')
;

mySwiper.allowSlideNext = false;
notice.innerText = '불가능';

mySwiper.on('slideChange', function () {
  if(checkedMaxPage <= mySwiper.activeIndex){
    notice.innerText = '불가능';
    mySwiper.allowSlideNext = false;
  }else{
    mySwiper.allowSlideNext = true;
    notice.innerText = '가능';
  };
});

for(let i = 0; i < btn.length; ++i){
  btn[i].addEventListener('click', function(){
    if(checkedMaxPage <= i){
      checkedMaxPage = i+1;
      mySwiper.allowSlideNext = true;
      notice.innerText = '가능';
      mySwiper.slideNext();
    };
  });
};
