var selecting = false;
var audioPlay=false;
var speed = 10;
var spin = false;
var armOn = false;
setInterval(checkAudio, 100);
window.addEventListener('load', function () {
    for(var i=0;i<5;i++){
        const title=document.getElementById("title");
        const object=document.getElementById("cover"+i);
        object.style.translate=(i*21-10) +"vw 20vw";
        object.addEventListener("mouseover", (event)=>{
            var song=false;
            if(object.id=="cover0"){
                song="Ground Theme  - Super Mario Bros"
            } else if(object.id=="cover1"){
                song="Theme A - Tetris"
            } else if(object.id=="cover2"){
                song="Main Theme - The Legend of Zelda"
            } else if(object.id=="cover3"){
                song="Main Theme - Pokemon "
            } else if(object.id=="cover4"){
                song="Green Hill Zone - Sonic"
            } 
            if(song)
                title.textContent=song;
        })
        object.addEventListener("mousedown", (event)=>{
            const audio = document.getElementById("audio");
            this.document.getElementById("vinyl").src="Sprites/"+object.id+".png";
            audio.src="Audio/"+object.id+".mp3";
            audio.pause();
            audioPlay=false;
            selectDown();
        })
    }
})
window.addEventListener("mousemove", (event)=>{
    const sel = document.getElementById("choose");
    const title=document.getElementById("title");
    if(selecting==false&&100*event.clientY/window.innerWidth>54){
        title.textContent="Choose Album";
        for(var i=0;i<5;i++){
            const object=document.getElementById("cover"+i);
            object.style.animation="diskOn .5s forwards linear";
            object.style.animationTimingFunction= "ease-out";
        }
        title.style.animation="coverOn .5s forwards linear";
        title.style.animationTimingFunction= "ease-out";
        sel.style.animation="selectOn .5s forwards linear";
        sel.style.animationTimingFunction= "ease-out";
        selecting=true;
    } else if(selecting&&100*event.clientY/window.innerWidth<19) {
        selectDown();
    }
})
function selectDown(){
    const sel = document.getElementById("choose");
    const title=document.getElementById("title");
    title.textContent="^";
    title.style.animation="coverOff .5s forwards linear";
    title.style.animationTimingFunction= "ease-out";
    sel.style.animation="selectOff .5s forwards linear";
    sel.style.animationTimingFunction= "ease-out";
     selecting=false;
    for(var i=0;i<5;i++){
        const object=document.getElementById("cover"+i);
        object.style.animation="diskOff .5s forwards linear";
        object.style.animationTimingFunction= "ease-out";
    }
}
function increaseSpeed(){
    const vinyl = document.getElementById("vinyl");
    if(speed>.74){
        speed/=2;
        vinyl.style.animationDuration=speed+"s";
        vinyl.style.transform = "rotate("+(vinyl.style.rotate*2)+"deg)";
    }
}
function decreaseSpeed(){
    const vinyl = document.getElementById("vinyl");
    if(speed<41){
        speed*=2;
        vinyl.style.animationDuration=speed+"s";
}
}
function toggleSpin(){
    const vinyl = document.getElementById("vinyl");
    const arm = document.getElementById("arm");
    if(!spin){
        arm.style.animation="shake .3s infinite";
        vinyl.style.animationPlayState="running";
    }
    else {
        vinyl.style.animationPlayState="paused";
        arm.style.animation = "armOn forwards .0s linear";
    }
    spin=!spin;
}
function toggleArm(){
    const arm = document.getElementById("arm");
    const arm1 =document.getElementById("arm1");
    const arm2 =document.getElementById("arm2");
    if(armOn){

        arm.style.animation = "armOff forwards .5s linear";
        armOn=false;
        arm1.style.transform="rotate(-58deg)";
        arm1.style.translate="55vw 44vw"
        arm2.style.translate="66vw 18vw"
        arm2.style.transform="rotate(-18deg)"
    }else{
    arm.style.animation = "armOn forwards .5s linear";
    arm1.style.transform="rotate(-24deg)";
    arm1.style.translate="40vw 38vw"
    arm2.style.translate="58vw 18vw"
    arm2.style.transform="rotate(10deg)"
    armOn=true;
    }
}
function checkAudio(){
    const audio = document.getElementById("audio");
    audio.playbackRate=1/(speed/10);
    if(spin&&armOn&&audioPlay==false){
        audioPlay=true;
        audio.play(); 
    } else if(!spin||!armOn){
        audio.pause();
        audioPlay=false;
    }
}
