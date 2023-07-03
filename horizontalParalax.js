

// Horizontal page movement

let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .05;

//window.addEventListener('resize', init);

images.forEach((img, index) => {
    img.style.backgroundImage = `url(./images/${index + 1}.jpg)`;
});
console.log(images)

function lerp(start, end, t){
    return start * (1 - t) + end * t;
}

function setTransform(el, transform){
    el.style.transform = transform;
}

function init(){
    sliderWidth = slider.getBoundingClientRect().width;
    imageWidth = sliderWidth / images.length;
    document.body.style.height = `${sliderWidth - (window.innerWidth - window.innerHeight)}px`
}

// Horizontall scroll
function animate(){
    current = parseFloat(lerp(current, target, ease)).toFixed(2);
    target = window.scrollY;
    setTransform(slider, `translateX(-${current}px)`);
    animateImages();
    requestAnimationFrame(animate);
}

// Parallax effect
function animateImages(){ 
    let ratio = current / imageWidth;
    let intersectionRatioValue;

    images.forEach((image, index)=>{
        intersectionRatioValue = ratio - (index * 0.7);
        setTransform(image, `translateX(${intersectionRatioValue * 70}px)`);
    });
}

init();
animate();

// Main page lines

let mainLine1  = document.getElementById('main-line1');
let mainLine2  = document.getElementById('main-line2');
let mainLine3  = document.getElementById('main-line3');
let mainLine4  = document.getElementById('main-line4');
let mainTitle1 = document.getElementById('main-title1');
let mainTitle2 = document.getElementById('main-title2');
let mainTitle3 = document.getElementById('main-title3');

showTitleAnimation();

function showTitleAnimation(){
    mainLine1.style.height = '80vh';
    setTimeout(() => {
        mainLine2.style.height = '80vh';
        mainLine3.style.height = '47vh';
        mainLine4.style.width  = '97vh';
    }, 2500);
    setTimeout(() => {
        mainTitle1.style.marginLeft = '23vh';
        mainTitle2.style.marginLeft = '23vh';
        mainTitle3.style.marginLeft = '23vh';
    }, 1300);
}

// Films boxes
let filmsDescriptions = [...document.querySelectorAll('.description-box')];

let mainSlider = document.querySelector('.main-stage');

function openFilmDescription(filmIndex){
    let filmDescription         = filmsDescriptions[filmIndex];
    let filmDescriptionWidth    = getComputedStyle(filmsDescriptions[filmIndex]).getPropertyValue('width');
    let mainSliderWidth               = mainSlider.getBoundingClientRect().width;

    if( filmDescriptionWidth == '0px' ){

        filmsDescriptions.forEach( ( description )=> { description.style.width = '0px' });
        filmDescription.style.width = '400px';
    }else{
        filmDescription.style.width = '0px';
    }
    console.log(mainSliderWidth + 'px')
    console.log((mainSliderWidth + 500) + 'px')
    let newWidth = ( mainSliderWidth + 500 ) + 'px';
    slider.style.width = newWidth;
    slider.style.paddingRight = '500px';
    
}

