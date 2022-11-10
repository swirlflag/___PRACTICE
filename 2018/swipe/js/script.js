// (function(){
//

var computedStyleX = function () {
  if (!window.getComputedStyle) {
    window.getComputedStyle = function(element) {
      return element.currentStyle;
    };
  }
};

var style = function(el,pr){
  return window.getComputedStyle(el, null);
}

var nav = document.getElementsByClassName('swipe-nav')[0],
    nav1 = nav.getElementsByClassName('nav-top')[0],
    nav2 = nav.getElementsByClassName('nav-middle')[0],
    navItem = nav2.getElementsByClassName('nav-item'),
    nav3 = document.getElementsByClassName('nav-filter'),
    swiperWrapper = document.getElementsByClassName('swiper-wrapper')[0],
    swiperSlide = document.getElementsByClassName('swiper-slide');

var nav1t = window.innerHeight / 100 * 23.75;

var savest;

var mySwiper = new Swiper ('.swiper-container', {
  direction: 'horizontal',
  loop: false
});



var swipeScrollParallax = function(){
  for(let i = 0; i < swiperSlide.length; ++i){
    let h2 = swiperSlide[i].getElementsByTagName('h2')[0],
        bg = swiperSlide[i].getElementsByClassName('bgcolor')[0];

    swiperSlide[i].addEventListener('scroll', function(){
      console.log(h2);
      st = this.scrollTop;
      h2.style.opacity = 1 - (st/100);
      nav1.style.opacity = 1 - (st/250);
      nav2.style.top = nav1t - st/1.8 + 'px';
      bg.style.top = - st/2.6 + 'px';

      if(nav2.offsetTop < 0 && Math.abs(nav2.offsetTop) > style(nav2)['height'].split('px')[0]){
        if(!nav2.classList.contains('active')){
          nav2.classList.add('active');
          nav3[i].classList.add('active');
          savest = st;
        };
      }else if(st < savest && nav2.classList.contains('active')){
        nav2.classList.remove('active');
        nav3[i].classList.remove('active');
      };
    });
  };
};

var navClickMoveTo = function(){
  for(let i = 0; i < navItem.length; ++i){
    navItem[i].addEventListener('click', function(){
      mySwiper.slideTo(i,600);
    });
  };
};

var resetParallax = function(){
  nav1.style.opacity = 1;
  nav2.style.top = nav1t + 'px';
  nav2.classList.remove('active');

  for(let i = 0; swiperSlide.length > i; ++i){
    let h2 = swiperSlide[i].getElementsByTagName('h2')[0],
        bg = swiperSlide[i].getElementsByClassName('bgcolor')[0];

    h2.style.opacity = 1;
    nav3[i].classList.remove('active');
    bg.style.top = 0;
    swiperSlide[i].scrollTop = 0;
  };
};

var changeNavIndex = function(){
  var s = mySwiper.activeIndex, p = mySwiper.previousIndex;
  navItem[s].classList.add('active');
  navItem[p].classList.remove('active');
};

mySwiper.on('slideChange', function (){
  resetParallax();
  changeNavIndex();
  // swipeScrollParallax();
});
mySwiper.on('slideChangeTransitionEnd', function(){
  // swiperWrappesr.style.transform = 'none';
});

window.addEventListener('DOMContentLoaded', function(){
  swipeScrollParallax();
  navClickMoveTo();
});

//
// })();
