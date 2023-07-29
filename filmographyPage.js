

// Horizontal page movement

let images = [...document.querySelectorAll('.img')];
let slider = document.querySelector('.slider');
let sliderWidth;
let imageWidth;
let current = 0;
let target = 0;
let ease = .05;

images.forEach((img, index) => {
    img.style.backgroundImage = `url(./images/${index + 1}.jpg)`;
});

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
animateStageLineMarker();

// Single elements
let mainLine1               = document.getElementById('main-line1');
let mainLine2               = document.getElementById('main-line2');
let mainLine3               = document.getElementById('main-line3');
let mainLine4               = document.getElementById('main-line4');
let stageLineMarker         = document.getElementById('stage-line-marker');
let stageLineMarkerLine     = document.getElementById('stage-line-marker-line');
let stageLineMarkerTitle    = document.querySelector('#stage-line-marker-line .title-font');
let stageLineMarkerShape    = document.getElementById('stage-line-marker-shape');
let mainTitle1              = document.getElementById('main-title1');
let mainTitle2              = document.getElementById('main-title2');
let mainTitle3              = document.getElementById('main-title3');
let portrait                = document.querySelector('.portrait');
let stage0                  = document.getElementById('stage0');
let stage1                  = document.getElementById('stage1');
let stage2                  = document.getElementById('stage2');
let mainSlider              = document.querySelector('.main-stage');

// Multiple elements
let filmsDescriptions = [...document.querySelectorAll('.description-box')];
let portraitHorizontalLines = [...document.querySelectorAll('.portrait-horizontal-line')]
let portraitVerticalLines = [...document.querySelectorAll('.portrait-vertical-line')]

// Scroll listeners
let currentScroll = 0;
let authorBoxPosition = 0;

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

function animatePortraitLines(filmIndex, isHovered){
    if( !isHovered ){
        portraitHorizontalLines[filmIndex].style.width   = '0px';
        portraitVerticalLines[filmIndex].style.height  = '0px';
    }else {
        portraitHorizontalLines[filmIndex].style.width   = '400px';
        portraitVerticalLines[filmIndex].style.height  = '620px';
    }
}

function openFilmDescription(filmIndex){
    let filmDescription         = filmsDescriptions[filmIndex];
    let filmDescriptionWidth    = getComputedStyle(filmsDescriptions[filmIndex]).getPropertyValue('width');
    let mainSliderWidth         = mainSlider.getBoundingClientRect().width;

    if( filmDescriptionWidth == '1px' ){
        let borderColor;

        filmsDescriptions.forEach( ( description )=> { 
            description.style.width = '1px';
            borderColor = description.style.color;
        });
        
        filmDescription.style.width = '400px';
        filmDescription.style.borderRight = '1px solid ' + borderColor;
    }else{
        filmDescription.style.width = '1px';
        filmDescription.style.borderRight = '1px solid transparent';
    }
    console.log(mainSliderWidth + 'px')
    console.log((mainSliderWidth + 500) + 'px')
    let newWidth = ( mainSliderWidth + 500 ) + 'px';
    slider.style.width = newWidth;
    slider.style.paddingRight = '500px';   
}



function animateStageLineMarker(){
    let width = 10;
    let isAuthorBoxIntersecting = false;

    window.addEventListener("scroll", async ()=> {
        // Adapt stage-line-marker witdh
        currentScroll = window.scrollY;
        width = currentScroll + window.innerWidth/4;
        stageLineMarker.style.width = width + 'px';

        // Check if author-box is intersecting
        isAuthorBoxIntersecting = await isElementIntersecting('author-box');

        // Check author box position
        const targetElement = document.getElementById('author-box');
        authorBoxPosition = targetElement.getBoundingClientRect();

        //Compare currentScroll with authorBox position, for check if it already passed away
        stageLineMarker.style.width = (authorBoxPosition.x < currentScroll && !isAuthorBoxIntersecting) ? (currentScroll + window.innerWidth/4)+'px' : '0px';

        //Colorize
        if(checkIntersectionBetweenElements(stageLineMarker, stage0)){
            console.log('stage0')
            colorizeStageLineMarker('white', 'black', 'Stage 0');
        } 
        if(checkIntersectionBetweenElements(stageLineMarker, stage1)) {
            console.log('stage1')
            colorizeStageLineMarker('black', 'white', 'Stage 1');
        } 
        if(checkIntersectionBetweenElements(stageLineMarker, stage2)) {
            console.log('stage2')
            colorizeStageLineMarker('white', 'rgb(34, 85, 179)', 'Stage 2');
        }

        /* let stageLineMarkerPosition = stageLineMarker.getBoundingClientRect();
        let stage0Position = stage0.getBoundingClientRect();
        let stage1Position = stage1.getBoundingClientRect();
        let stage2Position = stage2.getBoundingClientRect();
        
        console.log(stage1Position.right, 'stage1Right')
        console.log(stageLineMarkerPosition.right, 'lineRight')

        //let intersects = !(stageLineMarkerPosition.right < stage0Position.right || div1Rect.top > div2Rect.bottom);
        let intersects = (stageLineMarkerPosition.right > stage1Position.left && stage1Position.right > stageLineMarkerPosition.right)
        if(intersects) console.log('INTERSECTION') */
    });
}

//Element 1 is crossing the element's 2 width horizontally
function checkIntersectionBetweenElements(element1, element2){
    element1Position = element1.getBoundingClientRect();
    element2Position = element2.getBoundingClientRect();
    let intersects = (element1Position.right > element2Position.left && element2Position.right > element1Position.right)
    return intersects;
}

function colorizeStageLineMarker(backgroundColor, color, text){
    stageLineMarkerLine.style.backgroundColor   = backgroundColor;
    stageLineMarkerShape.style.borderBottomColor  = backgroundColor;
    stageLineMarkerTitle.style.color            = color;
    stageLineMarkerTitle.textContent            = text;
}

function isElementIntersecting(id){
    return new Promise((resolve) => {
    // Get the target element you want to observe
    const targetElement = document.getElementById(id);

    // Create a new Intersection Observer instance
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });

    // Start observing the target element
    observer.observe(targetElement);
  });
}

