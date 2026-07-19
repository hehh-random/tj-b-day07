const PASSWORD = "2524";


const birthdayDate = {
    month: 7,   // Change month (1-12)
    day: 24      // Change birthday date
};



/* ===============================
ELEMENTS
===============================*/


const loadingScreen =
document.getElementById("loadingScreen");


const vaultScreen =
document.getElementById("vaultScreen");


const midnightScreen =
document.getElementById("midnightScreen");


const homeScreen =
document.getElementById("homeScreen");


const treasureScreen =
document.getElementById("treasureScreen");


const passwordInput =
document.getElementById("passwordInput");


const passwordMessage =
document.getElementById("passwordMessage");


const continueBtn =
document.getElementById("continueBtn");


const beginAdventure =
document.getElementById("beginAdventure");

const music =
document.getElementById("bgMusic");


/* ===============================
LOADING SCREEN
===============================*/


window.addEventListener(
"load",
()=>{


setTimeout(()=>{


loadingScreen.classList.remove("active");


vaultScreen.classList.add("active");


},3500);


});



/* ===============================
PASSWORD SYSTEM
===============================*/


let enteredPassword = "";



const keys =
document.querySelectorAll(".key");


keys.forEach(key=>{


key.addEventListener(
"click",
()=>{


if(enteredPassword.length < 4){


enteredPassword += key.innerText;


passwordInput.value =
"•".repeat(
enteredPassword.length
);


}


});


});



document
.getElementById("clearBtn")
.addEventListener(
"click",
()=>{


enteredPassword="";

passwordInput.value="";

passwordMessage.innerHTML="";


});



document
.getElementById("enterBtn")
.addEventListener(
"click",
()=>{


if(
enteredPassword === PASSWORD
){


unlockVault();


}

else{


wrongPassword();


}


});



function unlockVault(){

    passwordMessage.innerHTML = "Unlocked ❤️";

    vaultScreen.classList.add("vault-unlock");

    // Play music

    if(music){
    music.volume = 0.5;
    music.play().catch(() => {
        console.log("Autoplay blocked.");
    });

}

    setTimeout(() => {

        vaultScreen.classList.remove("active");
        midnightScreen.classList.add("active");
        startClock();

    },1000);

}




function wrongPassword(){


passwordMessage.innerHTML =
"Oops😔.....";


const box =
document.querySelector(".vault-card");


box.classList.add(
"shake"
);


setTimeout(()=>{


box.classList.remove(
"shake"
);


},500);


}



/* ===============================
MIDNIGHT CLOCK
===============================*/


let clockInterval;

function startClock(){

clearInterval(clockInterval);

updateClock();

clockInterval = setInterval(updateClock,1000);

}


function updateClock(){


const now =
new Date();



const hours =
String(
now.getHours()
)
.padStart(2,"0");


const minutes =
String(
now.getMinutes()
)
.padStart(2,"0");


const seconds =
String(
now.getSeconds()
)
.padStart(2,"0");



document
.getElementById("digitalClock")
.innerText =

`${hours}:${minutes}:${seconds}`;



checkBirthday(
now
);


}



function checkBirthday(now){


const birthday =
new Date(
now.getFullYear(),
birthdayDate.month-1,
birthdayDate.day,
0,0,0
);



const countdownText =
document.getElementById(
"countdownText"
);



const countdownTitle =
document.getElementById(
"countdownTitle"
);



function checkBirthday(now){

    let birthday = new Date(
        now.getFullYear(),
        birthdayDate.month - 1,
        birthdayDate.day,
        0,0,0
    );

    const countdownTitle =
        document.getElementById("countdownTitle");

    const countdownText =
        document.getElementById("countdownText");

    // Birthday today
    if(
        now.getMonth() === birthdayDate.month - 1 &&
        now.getDate() === birthdayDate.day
    ){

        countdownTitle.innerHTML =
            "It's finally your birthday!! 🎉";

        countdownText.innerHTML =
            "Soooo... are you readyyy? 😛❤️";

        return;
    }

    // If birthday already passed this year
    if(now > birthday){
        birthday.setFullYear(now.getFullYear()+1);
    }

    const difference = birthday - now;

    const days =
        Math.floor(difference/(1000*60*60*24));

    const hours =
        Math.floor((difference/(1000*60*60))%24);

    const minutes =
        Math.floor((difference/(1000*60))%60);

    const seconds =
        Math.floor((difference/1000)%60);

    countdownTitle.innerHTML =
        "Almost time... 🌙";

    countdownText.innerHTML =
        `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

}



/* ===============================
PAGE NAVIGATION
===============================*/


if (continueBtn) {

continueBtn.onclick = () => {

midnightScreen.classList.remove("active");

homeScreen.classList.add("active");

};

}



if (beginAdventure) {

beginAdventure.onclick = () => {

homeScreen.classList.remove("active");

treasureScreen.classList.add("active");

};

}




/* ===============================
GIFT SYSTEM
===============================*/


let openedGifts =
JSON.parse(
localStorage.getItem(
"openedGifts"
)
)
||
[];



const giftCards =
document.querySelectorAll(
".gift-card"
);



const progressText =
document.getElementById(
"giftProgress"
);



const progressFill =
document.getElementById(
"progressFill"
);



function updateProgress(){


const count =
openedGifts.length;



progressText.innerHTML =

`${count} / 6 Gifts`;



progressFill.style.width =

`${(count/6)*100}%`;



if(count===6){


const finalButton =
document.getElementById(
"finalButton"
);


finalButton.disabled=false;


finalButton.innerHTML =
"✨ Open Final Surprise";


}


}



giftCards.forEach(card=>{


const id =
card.dataset.gift;



if(
openedGifts.includes(id)
){


card.classList.add(
"completed"
);


}



card
.querySelector(".openGift")
.addEventListener(
"click",
()=>{


openGift(id,card);


});


});



function openGift(id, card){

    card.classList.add("opening");

    setTimeout(() => {

        openGiftModal(id);

    },600);

}

updateProgress();




/* ===============================
END PART 1
NEXT:
Gift Modal
Love Letter
Polaroids
Cake
=========================================================*/


/* =========================================================

   SCRIPT.JS PART 2

   Gift Modal
   Love Letter
   Polaroids
   Birthday Cake
   Confetti

=========================================================*/



/* ===============================
GIFT MODAL SYSTEM
===============================*/


const modal =
document.getElementById(
"giftModal"
);


const modalBody =
document.getElementById(
"modalBody"
);


const closeModal =
document.querySelector(
".closeModal"
);



function openGiftModal(id){


modal.classList.add(
"show"
);



document
.querySelectorAll(
".gift-content"
)
.forEach(section=>{


section.classList.add(
"hidden"
);


});



const gift =
document.getElementById(
`gift${id}Content`
);



if(gift){

gift.classList.remove(
"hidden"
);


}



/* Start specific gift */


if(id==="1"){

startLetter();

}


if(id==="2"){

createPolaroids();

}


if(id==="3"){

startCake();

}



}






window.onclick = (e)=>{

    if(e.target===modal){

        modal.classList.remove("show");

        if(voiceAudio){

            voiceAudio.pause();

            voiceAudio.currentTime=0;

        }

        if(music){

            music.play();

        }

    }

};





/* ===============================
GIFT 1
LOVE LETTER
===============================*/


const letterMessage = [

"yooo bbyyyy💋😚😚",

"Happyyyy Birthdayyyy bachaaaaa😭🎉💋",

"Thank you meri life mai aane ke liye aur itna pyaar, care aur patience rkhne ke liye😭.",

"I wanted to create something special for you.",

"Not just a normal birthday wish...",

"Thank you for all the smiles, laughs, and moments we share.",

"I hope your day is as beautiful as your heart.",

"Happy Birthday ❤️"

];


const envelope =
document.querySelector(".envelope");

const letterText =
document.getElementById("letterText");

function startLetter(){

    letterText.innerHTML="";

    envelope.classList.remove("open");

    envelope.onclick = ()=>{

        envelope.classList.add("open");

        setTimeout(()=>{
            typeLetter();
        },700);

    };

}

function typeLetter(){

    letterText.innerHTML="";

    let text = letterMessage.join("\n\n");

    let index=0;

    function typing(){

        if(index<text.length){

            if(text[index]==="\n"){
                letterText.innerHTML+="<br>";
            }else{
                letterText.innerHTML+=text[index];
            }

            index++;

            setTimeout(typing,40);

        }else{

            finishGift("1");
        }

    }

    typing();

}




function finishGift(id){

    if(openedGifts.includes(id)) return;

    openedGifts.push(id);

    localStorage.setItem(
        "openedGifts",
        JSON.stringify(openedGifts)
    );

    const card =
        document.querySelector(`[data-gift="${id}"]`);

    if(card){
        card.classList.add("completed");
    }

    updateProgress();

}





/* ===============================
GIFT 2
POLAROID GALLERY
===============================*/



const photos = [

{
image:"images/photo1.jpg",
caption:"Our first memory ❤️"
},

{
image:"images/photo2.jpg",
caption:"A beautiful moment ✨"
},

{
image:"images/photo3.jpg",
caption:"Always smiling 💗"
},

{
image:"images/photo4.jpg",
caption:"Little adventures 🌸"
},

{
image:"images/photo5.jpg",
caption:"Forever memories 🌙"
},

{
image:"images/photo6.jpg",
caption:"My favourite person ❤️"
}

];

let developedPhotos = 0;



function createPolaroids(){


const gallery =
document.getElementById(
"polaroidGallery"
);



gallery.innerHTML="";
developedPhotos = 0;



photos.forEach(photo=>{


const card =
document.createElement(
"div"
);


card.className =
"polaroid";



card.innerHTML = `

<div class="polaroid-image">

<img src="${photo.image}" alt="Memory">
</div>


<div class="polaroid-caption">

${photo.caption}

</div>

`;



card.onclick = ()=>{

    if(card.classList.contains("developed")){
        return;
    }

    card.classList.add("shake");

    setTimeout(()=>{

        card.classList.remove("shake");

        card.classList.add("developed");

        developedPhotos++;

        if(developedPhotos === photos.length){

            finishGift("2");

        }

    },700);

};






gallery.appendChild(
card
);



});


}




/* ===============================
GIFT 3
BIRTHDAY CAKE
===============================*/



let cakeStarted=false;



function startCake(){


if(cakeStarted)
return;


cakeStarted=true;



const candles =
document.querySelectorAll(
".candle"
);



candles.forEach(candle=>{


candle.onclick =
()=>{


candle.classList.add("off");

const flame = candle.querySelector(".flame");

if(flame){

flame.classList.add("hidden");

}

checkCandles();


};



});


}



function checkCandles(){






let remaining=0;



document
.querySelectorAll(
".candle"
)
.forEach(c=>{


if(
!c.classList.contains(
"off"
)
){

remaining++;

}


});



if(
remaining===0
){


document
.getElementById(
"wishMessage"
)
.classList.remove(
"hidden"
);



createConfetti();


}


}





/* ===============================
CONFETTI
===============================*/


function createConfetti(){


const container =
document.getElementById(
"confetti-container"
);



const colors = [

"💗",
"✨",
"🎉",
"🌸",
"⭐"

];



for(
let i=0;
i<80;
i++
){


const piece =
document.createElement(
"div"
);



piece.className =
"confetti-piece";



piece.innerHTML =
colors[
Math.floor(
Math.random()
*
colors.length
)
];



piece.style.left =

Math.random()*100
+
"%";



piece.style.animationDelay =

Math.random()*2
+
"s";



piece.style.fontSize =

(
Math.random()*20+10
)
+
"px";



container.appendChild(
piece
);



setTimeout(()=>{


piece.remove();


},5000);



}



}


/* ===============================
END PART 2

NEXT:
Memory Jar
Reasons Flowers
Music Player

===============================*/







/* =========================================================

   SCRIPT.JS PART 3

   Memory Jar
   Reasons Flowers
   Music Player

=========================================================*/



/* ===============================
GIFT 4
MEMORY JAR
===============================*/


const memories = [

"Remember when we laughed for no reason? ❤️",

"That one conversation I will never forget ✨",

"Every small moment with you becomes special 🌸",

"Thank you for always being there 💗",

"You make ordinary days feel magical 🌙",

"I hope we create many more memories together ⭐"

];



const memoryButtons =
document.querySelectorAll(
".memory-note"
);


const memoryText =
document.getElementById(
"memoryText"
);



memoryButtons.forEach(button=>{


button.onclick =
()=>{


button.classList.add(
"open"
);



let randomMemory =

memories[
Math.floor(
Math.random()
*
memories.length
)
];



memoryText.innerHTML =

randomMemory;



};


});






/* ===============================
GIFT 5
REASONS I LOVE YOU
===============================*/


const reasons = [

"You always make me smile ❤️",

"Your kindness is beautiful ✨",

"You make every moment better 🌸",

"You understand me like nobody else 💗",

"Your laugh is my favourite sound 🌙",

"You support me when I need it ⭐",

"You make normal days special 💕",

"You are my favourite person ❤️",

"You bring happiness everywhere you go 🌷",

"Because you are simply you 💖"

];



function createFlowers(){


const garden =
document.getElementById(
"flowerGarden"
);



if(!garden)
return;



garden.innerHTML="";



reasons.forEach(reason=>{


const flower =
document.createElement(
"div"
);



flower.className =
"flower";



flower.innerHTML = `

<div class="flower-inner">


<div class="flower-front">

🌸

</div>


<div class="flower-back">

${reason}

</div>


</div>

`;



flower.onclick =
()=>{


flower.classList.toggle(
"open"
);


};



garden.appendChild(
flower
);



});


}



createFlowers();






const voiceAudio = document.getElementById("voiceAudio");
const playVoice = document.getElementById("playVoice");

if(playVoice && voiceAudio){

playVoice.onclick = () => {

    if(music){

        music.pause();

    }

    voiceAudio.currentTime = 0;

    voiceAudio.play();

};
voiceAudio.onended = () => {

    if(music){

        music.play();

    }

};

}

if(closeModal){

closeModal.onclick = () => {

    modal.classList.remove("show");

    if(voiceAudio){

        voiceAudio.pause();

        voiceAudio.currentTime = 0;

    }

    if(music){

        music.play();

    }

};

}










/* ===============================
END PART 3

NEXT:
Final Surprise
Typewriter Ending
Floating Hearts
Sparkles
Fireflies
Cursor Effects

===============================*/
  
  
  
  
  
/* =========================================================

   SCRIPT.JS PART 4 FINAL

   Final Surprise
   Typewriter Ending
   Hearts
   Sparkles
   Fireflies
   Cursor Effects
   Restart System

=========================================================*/


/* ===============================
FINAL SURPRISE
===============================*/


const finalButton =
document.getElementById(
"finalButton"
);


const finalScreen =
document.getElementById(
"finalScreen"
);


const finalMessage = [

"I hope this little surprise made you smile ❤️",

"I wanted to create something special",

"because you are someone special ✨",

"Thank you for every laugh, every memory,",

"and every little moment we share 🌸",

"Keep smiling and keep shining 🌙",

"Happy Birthday ❤️"

];



if(finalButton){


finalButton.onclick =
()=>{


if(openedGifts.length === 6){


treasureScreen
.classList.remove(
"active"
);



finalScreen
.classList.add(
"active"
);



startFinalAnimation();


}



};



}





/* ===============================
FINAL TYPEWRITER
===============================*/


function startFinalAnimation(){

    const box =
        document.getElementById("finalTypewriter");

    box.innerHTML = "";

    let text = finalMessage.join("\n\n");

    let index = 0;

    function write(){

        if(index < text.length){

            if(text[index] === "\n"){
                box.innerHTML += "<br>";
            }else{
                box.innerHTML += text[index];
            }

            index++;

            setTimeout(write,55);

        }

    }

    write();

    createStars();
    createFireflies();
    createConfetti();

}


{



write();



createStars();

createFireflies();

createConfetti();


}





/* ===============================
FLOATING HEARTS
===============================*/


function createHeart(){


const template =
document.getElementById(
"heartTemplate"
);



if(!template)
return;



const heart =
template.content
.cloneNode(true)
.firstElementChild;



heart.style.left =

Math.random()*100
+
"%";



heart.style.animationDuration =

(
Math.random()*5+5
)
+
"s";



heart.style.fontSize =

(
Math.random()*20+15
)
+
"px";



document.body.appendChild(
heart
);



setTimeout(()=>{


heart.remove();


},9000);



}



setInterval(
createHeart,
1200
);






/* ===============================
SPARKLE EFFECT
===============================*/


function createSparkle(){


const sparkle =
document.createElement(
"div"
);



sparkle.className =
"sparkle";


sparkle.innerHTML =
"✨";



sparkle.style.left =

Math.random()*100
+
"%";



sparkle.style.top =

Math.random()*100
+
"%";



document.body.appendChild(
sparkle
);



setTimeout(()=>{


sparkle.remove();


},2000);



}



setInterval(
createSparkle,
700
);







/* ===============================
STARS
===============================*/


function createStars(){


for(
let i=0;
i<40;
i++
){


const star =
document.createElement(
"div"
);



star.className =
"star";


star.innerHTML =
"⭐";



star.style.left =

Math.random()*100
+
"%";



star.style.top =

Math.random()*100
+
"%";



star.style.animationDelay =

Math.random()*3
+
"s";



document.body.appendChild(
star
);



}



}







/* ===============================
FIREFLIES
===============================*/


function createFireflies(){


const template =
document.getElementById(
"fireflyTemplate"
);



if(!template)
return;



for(
let i=0;
i<25;
i++
){


const fly =
template.content
.cloneNode(true)
.firstElementChild;



fly.style.left =

Math.random()*100
+
"%";



fly.style.top =

Math.random()*100
+
"%";



fly.style.animationDelay =

Math.random()*5
+
"s";



document.body.appendChild(
fly
);



}


}








/* ===============================
CURSOR GLOW
===============================*/


const cursor =
document.querySelector(
".cursor-glow"
);



document.addEventListener(
"mousemove",
(e)=>{


if(cursor){


cursor.style.left =
e.clientX+"px";


cursor.style.top =
e.clientY+"px";


}



});







/* ===============================
CLICK SPARKLE BURST
===============================*/


document.addEventListener(
"click",
(e)=>{


for(
let i=0;
i<5;
i++
){


const sparkle =
document.createElement(
"div"
);



sparkle.className =
"sparkle";


sparkle.innerHTML =
"✨";



sparkle.style.left =
e.clientX+"px";


sparkle.style.top =
e.clientY+"px";



document.body.appendChild(
sparkle
);



setTimeout(()=>{


sparkle.remove();


},1000);



}



});








/* ===============================
RESTART ADVENTURE
===============================*/


const restart =
document.getElementById(
"restartAdventure"
);



if(restart){


restart.onclick =
()=>{


finalScreen
.classList.remove(
"active"
);



homeScreen
.classList.add(
"active"
);



};

}




/* ===============================
RESET EVERYTHING
===============================*/


function resetBirthdayWebsite(){


localStorage.removeItem(
"openedGifts"
);



openedGifts=[];



updateProgress();



document
.querySelectorAll(
".gift-card"
)
.forEach(card=>{


card.classList.remove(
"completed"
);


});



alert(
"Birthday surprise reset 💗"
);


}



/*

Optional:

Add a button with:

onclick="resetBirthdayWebsite()"

if you want a reset option.

*/



/* =========================================================

   SCRIPT.JS COMPLETE ❤️

=========================================================*/
