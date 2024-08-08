/*Sent e-mail*/
  document.getElementById('sendEmail').addEventListener('click', function() {
    const form = document.getElementById('myForm');
    const formData = new FormData(form);
    let message = '';
    formData.forEach(function(value) {
      message +=  value + '\n';
    });
    var mailtoLink = 'mailto:example@example.com' +
      '?subject=' + encodeURIComponent('Новое сообщение') +
      '&body=' + encodeURIComponent(message);
    window.open(mailtoLink);
  });

  /*Header slider*/
  let images = document.querySelectorAll('.slider-images');
  let currentSlide = 0;
  setInterval(
    nextSlider,7000)
  function nextSlider(){
    images[currentSlide].classList.remove('showed');
    currentSlide++
    if(currentSlide>=images.length){
        currentSlide=0;
    }
    images[currentSlide].classList.add('showed')
}

/*Modal*/

class PopUp{
    constructor(modal,modalImg){
        this.modal = modal;
        this.modalImg = modalImg;
        var popUp = this;
       this.open = function(content){
        modalImg.src = content.src;
        modal.style.display ="block";
       } 
       this.close = ()=>{
        modal.style.display ="none";
       } 
    }

}
  const galleryCard = document.querySelectorAll('.gallery-card')
  const galleryImages = document.querySelectorAll('.gallery-photo')
  const modal = document.querySelector(".modal")
  var modalImg = document.querySelector('.modalImage');
  const popup1 = new PopUp(modal,modalImg)

  for(let i=0;i<=galleryImages.length-1;i++){
    galleryImages[i].onclick = function() {
        popup1.open(this);
    }
  }
  galleryImages[0].onclick = function() {
    modal.style.display = 'block';
    console.log(this.src);
    modalImg.src = this.src;
  };
  popup1.modal.addEventListener('click', popup1.close)
  window.onclick = function(event) {
    if (event.target == modal) {
      popup1.close();
    }
  }

/*Smooth Scrol*/
document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll('.nav-links a');

    links.forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (this.getAttribute('href').substring(0,1) == '#'){
            e.preventDefault();
            let targetId = this.getAttribute('href').substring(1);
            let targetElement = document.getElementById(targetId);

            let offset = targetElement.offsetTop;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });}
        });
    });
});
/*For Button*/
function scrollToBlock() {
    var targetBlock = document.getElementById('Contact');
    targetBlock.scrollIntoView({
      behavior: 'smooth'
    });
  }
/*toggle Menu*/
const toggleMenuBtn = document.querySelector('.menu-toggle')
const mainNav = document.querySelector('.nav-bar');
const mainNavMobile = document.querySelector('.nav-bar-mobile');
const toggleMenuBtnClose = document.querySelector('.menu-toggle-close')
toggleMenuBtn.onclick = function() {
  mainNav.style.left = "0";
}
toggleMenuBtnClose.onclick = ()=>{
  mainNav.style.left = "-11rem";
  console.log(5)
}
window.addEventListener('resize',()=>{

if(window.innerWidth>478){
  mainNav.style.left = "0"
  mainNav.onclick = ()=>{
}
if(window.innerWidth<478){
  mainNav.style.left='-11rem';
mainNav.onclick = ()=>{
  mainNav.style.left = "-11rem";
}}}})
/*Mobile Slaider*/
let slider = document.querySelector('.slider-services'),
  sliderList = slider.querySelector('.slider-list'),
  sliderTrack = slider.querySelector('.slider-track'),
  slides = slider.querySelectorAll('.slide'),
  arrows = slider.querySelector('.slider-arrows'),
  prev = arrows.children[0],
  next = arrows.children[1],
  slideWidth = slides[0].offsetWidth,
  slideIndex = 0,
  posInit = 0,
  posX1 = 0,
  posX2 = 0,
  posY1 = 0,
  posY2 = 0,
  posFinal = 0,
  isSwipe = false,
  isScroll = false,
  allowSwipe = true,
  transition = true,
  nextTrf = 0,
  prevTrf = 0,
  lastTrf = --slides.length * slideWidth,
  posThreshold = slides[0].offsetWidth * 0.35,
  trfRegExp = /[-0-9.]+(?=px)/,
  getEvent = function() {
    return (event.type.search('touch') !== -1) ? event.touches[0] : event;
  },
  slide = function() {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === --slides.length);
  },
  swipeStart = function() {
    let evt = getEvent();

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;

      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;

      sliderTrack.style.transition = '';

      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
  },
  swipeAction = function() {

    let evt = getEvent(),
      style = sliderTrack.style.transform,
      transform = +style.match(trfRegExp)[0];

    posX2 = posX1 - evt.clientX;
    posX1 = evt.clientX;

    posY2 = posY1 - evt.clientY;
    posY1 = evt.clientY;

    if (!isSwipe && !isScroll) {
      let posY = Math.abs(posY2);
      if (posY > 7 || posX2 === 0) {
        isScroll = true;
        allowSwipe = false;
      } else if (posY < 7) {
        isSwipe = true;
      }
    }

    if (isSwipe) {
      if (slideIndex === 0) {
        if (posInit < posX1) {
          setTransform(transform, 0);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (slideIndex === --slides.length) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
        reachEdge();
        return;
      }
      sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
    }

  },
  swipeEnd = function() {
    posFinal = posInit - posX1;

    isScroll = false;
    isSwipe = false;

    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
        }
      }

      if (posInit !== posX1) {
        allowSwipe = false;
        slide();
      } else {
        allowSwipe = true;
      }

    } else {
      allowSwipe = true;
    }

  },
  setTransform = function(transform, comapreTransform) {
    if (transform >= comapreTransform) {
      if (transform > comapreTransform) {
        sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
      }
    }
    allowSwipe = false;
  },
  reachEdge = function() {
    transition = false;
    swipeEnd();
    allowSwipe = true;
  };

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderList.classList.add('grab');

sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = event.target;

  if (target.classList.contains('next')) {
    slideIndex++;
  } else if (target.classList.contains('prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});