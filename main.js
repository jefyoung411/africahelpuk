const navIconEl = document.querySelector('.nav__icon');
const navCloseEl = document.querySelector('.nav__close');
const navList = document.querySelector('.nav__list');
const navBgOverlayEl = document.querySelector('.nav__bgOverlay');
const donate  = document.querySelector('.donate');


const navOpen = () => {
    navList.classList.add('show');
    navBgOverlayEl.classList.add('active');
    document.body.style= 'visibility: visible; height: 100vh; width: 100vw; overflow: hidden;';
}

const navClose = () => {
    navList.classList.remove('show');
    navBgOverlayEl.classList.remove('active');
    document.body.style='visibility: visible; height: initial; width: 100%; overflow-x: hidden;';
}

navIconEl.addEventListener('click', navOpen);
navCloseEl.addEventListener('click', navClose);
navBgOverlayEl.addEventListener('click', navClose);

function openPopup(){
    donate.classList.add('open-popup');
    navList.classList.remove('show');
    navBgOverlayEl.classList.remove('active');
    document.body.style='visibility: visible; height: initial; width: 100%; overflow-x: hidden;';
}
 
function closePopup(){
    donate.classList.remove('open-popup')
}

// Silder 
const slides = Array.from(document.querySelectorAll('.slide'));
const slider = document.querySelector('.slider');
const buttons = document.querySelectorAll('.buttons div');
const dotEl = document.querySelector('.dots');
let timeoutId;

function getNextPrev(){
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    let next, prev;
    if (activeIndex === slides.length - 1){
        next = slides[0];
    }
    else{
        next = slides[activeIndex + 1];
    }

    if (activeIndex === 0){
        prev = slides[slides.length - 1];
    }
    else{
        prev = slides[activeIndex - 1];
    }
    return [next, prev]
}

function getPosition(){
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);
    const [next, prev] = getNextPrev();

    slides.forEach((slide, index) => {
        if(index === activeIndex){
            slide.style.transform = 'translateX(0)';
        }
        else if(slide === prev){
            slide.style.transform = 'translateX(-100%)';
        }
        else if(slide === next){
            slide.style.transform = 'translateX(100%)';
        }
        else{
            slide.style.transform = 'translate(100%)';
        }
        slide.addEventListener('transitionend', () => {
            slide.classList.remove('top');
        })
    })
}
getPosition();

buttons.forEach(button => {
    button.addEventListener('click', () => {
        if(button.classList.contains('next')) getNextSlide()
        else if (button.classList.contains('prev')) getPrevSlide();
    })
})
function getNextSlide(){
    clearTimeout(timeoutId);
    const current = document.querySelector('.slide.active');
    const [next, prev] = getNextPrev();

    if(current.classList.contains('top')){
        return;
    }

    current.classList.add('top');
    next.classList.add('top');
    current.classList.remove('active');
    current.style.transform = 'translate(-100%)';
    next.classList.add('active');
    next.style.transform = 'translate(0)';
    getPosition();
    getActiveDot();
    autoLoop();
}
function getPrevSlide(){
    clearTimeout(timeoutId);
    const current = document.querySelector('.slide.active');
    const [next, prev] = getNextPrev();

    if(current.classList.contains('top')){
        return;
    }
    current.classList.add('top');
    prev.classList.add('top');
    current.classList.remove('active');
    current.style.transform = 'translateX(100%)';
    prev.classList.add('active');
    prev.style.transform = 'translateX(0)';
    getPosition();
    getActiveDot();
    autoLoop();
}

//dots

slides.forEach (slide => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dotEl.appendChild(dot);
})

function getActiveDot(){
    const allDots = document.querySelectorAll('.dots .dot');
    const activeSlide = document.querySelector('.slide.active');
    const activeIndex = slides.indexOf(activeSlide);

    allDots.forEach( dot => {
        dot.classList.remove('active');
    })

    allDots[activeIndex].classList.add('active');
}

function functionalDots(){
    const  allDots = document.querySelectorAll('.dots .dot');
    allDots.forEach((dot, index) => {
        dot.addEventListener('click', () =>{
            getDotSlide(index);
        })
    })
}
function getDotSlide(index){
    clearTimeout(timeoutId);
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[index].classList.add('active');
    getPosition();
    getActiveDot();
    autoLoop();
}

getActiveDot();
functionalDots();

function autoLoop(){
    timeoutId = setTimeout(() =>{
        getNextSlide();
    }, 5000)
}

getActiveDot();
functionalDots();
autoLoop();