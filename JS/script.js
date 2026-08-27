let toggleBox = document.querySelector(".toggle-box");
let settingBox  = document.querySelector(".setting-box");
let gear =  document.querySelector(".gear");

toggleBox.addEventListener('click', function(){
    settingBox.classList.toggle("open");
    gear.classList.toggle("fa-spin");
})


//local storage 
let mainColor = localStorage.getItem("color_option");
if(mainColor != null){
    document.documentElement.style.setProperty("--main-color", mainColor);

   document.querySelectorAll(".colors-list li").forEach(element =>{
        element.classList.remove("active");
        if(element.dataset.color === mainColor){
             element.classList.add("active");
        }
    })
    
}




// switch colors
const colorsListLi = Array.from( document.querySelectorAll(".colors-list li")); 
colorsListLi.forEach( colorLi =>{
 colorLi.addEventListener('click', (e)=>{
    // console.log(e.target.dataset.color);
    document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
    localStorage.setItem("color_option" ,  e.target.dataset.color);
    // remove class el  active
    handleActive(e);
 })

})


// initilization 
let backgroundOption = true;
let backgroundInterval; 
//  set backgroundimages on local storage
 let backgroundLocalImage = localStorage.getItem("background_option")
if(backgroundLocalImage != null){
   // console.log(backgroundLocalImage);
    document.querySelectorAll(".random-bg .btn").forEach(element=>{
        element.classList.remove("active");
    })

    

    if(backgroundLocalImage === "true"){
    
        backgroundOption = true;
         document.querySelector('.random-bg .yes').classList.add("active")
    
    }else{
    
        backgroundOption = false;
            document.querySelector('.random-bg .no').classList.add("active")
}

}



// switch bg 

let randomBgBtn = document.querySelectorAll(".random-bg .btn");
randomBgBtn.forEach(btnEl =>{
    btnEl.addEventListener('click', function(e){
        handleActive(e);
    });
})



//  hena ana gbt el images 
    let imagesPage = document.querySelector('.contaner');
let imagesArray = [
    'img1.jpg',
    'img2.jpg',
    'img3.jpg',
    'img4.jpg',
    'img5.jpg',
    'img6.jpg'
];

// set random bg 
randomBgBtn.forEach(clickableBtn =>{
    clickableBtn.addEventListener('click', function(e){
        backgroundOption = this.dataset.backgroundoption=== "true"
        if(backgroundOption=== true){
            randomizeImages();
            localStorage.setItem("background_option" , true );
        }else{
            clearInterval(backgroundInterval);
            backgroundInterval = undefined ;
            localStorage.setItem("background_option" , false );
        }
    })
})


function randomizeImages(){
if(backgroundOption === true && backgroundInterval === undefined){
backgroundInterval = setInterval(() => {
    let randomNum = Math.floor(Math.random() * imagesArray.length);
    imagesPage.style.backgroundImage = `url('image/${imagesArray[randomNum]}')`;
}, 1000);
}

}randomizeImages();

// skills 

let skillBoxSpans = document.querySelectorAll('.skill-box span');
    // skillBoxSpans.forEach(element =>{
    //    let skillPercentage =  element.dataset.progress ;
    //     element.style.width = skillPercentage;
    // })

    let  OurSkills = document.querySelector('.OurSkills');
    window.addEventListener('scroll' , function(){
            let OurSkillsCoordinates  =  OurSkills.getBoundingClientRect().top;
        if(OurSkillsCoordinates <= 450){
            skillBoxSpans.forEach(element =>{
                let skillPercentage =  element.dataset.progress ;
                element.style.width = skillPercentage;
            })
        }else{
            skillBoxSpans.forEach(element =>{
                element.style.width = 0;
            })
        }
    })

    // start popup 
    let OurImages = document.querySelectorAll('.images-Box img');
    OurImages.forEach(images =>{
        images.addEventListener('click', function(){
            let Overlay = document.createElement('div');
            Overlay.className = 'PopUp-Overlay';
            document.body.appendChild(Overlay);
            let PopupBox = document.createElement('div')
            if( images.alt != null){
                let imgHeading = document.createElement('h3');
                let imgText = document.createTextNode(images.alt);
                imgHeading.appendChild(imgText);
                PopupBox.appendChild(imgHeading);
            }
            PopupBox.className = 'popup-Box';
            document.body.appendChild(PopupBox);
            let popupImage = document.createElement('img')
            popupImage.src = images.src;
            popupImage.className = 'popup-Image';
             PopupBox.appendChild(popupImage);
             let closeButton = document.createElement('span');
             closeButton.className = 'closeButton'
             let closeButtonText = document.createTextNode('X');
             closeButtonText.className = 'closeButtonText' ;
             closeButton.appendChild(closeButtonText);
             PopupBox.appendChild(closeButton);



     
        })

    })
        document.addEventListener('click' , function(e){
        if(e.target.classList.contains("closeButton") ){
            document.querySelector('.popup-Box').remove();
            document.querySelector('.PopUp-Overlay').remove() ;
        }
    })

    // close popup



// initilazation for bullets
let bulletsBtn = document.querySelectorAll('.bullets-ption .btn');

let bulletsNav = document.querySelector('.n-bullets');

    // localStorage for bullets
let bulletLocalItem = localStorage.getItem('bullets_option');
if(bulletLocalItem != null){
    bulletsBtn.forEach(el =>{

        el.classList.remove('active');
    })
    
    if(bulletLocalItem == 'block'){

    bulletsNav.style.display = "block";
    document.querySelector('.bullets-ption .yes').classList.add('active')

    } else{
     
        bulletsNav.style.display = "hide";
        document.querySelector('.bullets-ption .no').classList.add('active')
    
    }

}

    // start nav bullets
    
    

let allBullets =document.querySelectorAll('.n-bullets .bullets ');
let allLinks = document.querySelectorAll('.nav-links li a')
function scrollToSomeWhere(element) {
    element.forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        });
    });
}
scrollToSomeWhere(allBullets);
scrollToSomeWhere(allLinks);

function handleActive(events){
    events.target.parentElement.querySelectorAll(".btn").forEach(element => {
            element.classList.remove("active")
        })
        events.target.classList.add("active")
}



bulletsBtn.forEach(el =>{
    el.addEventListener('click', function(e){
        handleActive(e);
        if(el.dataset.displaybullets== "show"){
            bulletsNav.style.display = "block";
            localStorage.setItem('bullets_option' , 'block');
        }else{
             bulletsNav.style.display = "none";
               localStorage.setItem('bullets_option' , 'hide');
        }

    })
})


// reset option 

let resetBtn = document.querySelector('.Reset-ption .btn')
resetBtn.addEventListener("click", function(){
    localStorage.removeItem('bullets_option');
    localStorage.removeItem('color_option');
    localStorage.removeItem('background_option');
    window.location.reload();
})