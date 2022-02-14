const welcomeDiv = document.querySelector("#welcome-screen");
const canvas = document.querySelector("#game-canvas");

function gameScreen(){
toggleScreen(welcomeDiv,false);
toggleScreen(canvas,true);
}

function toggleScreen(element,toggle){
    // let display = (toggle)?'block':'none';
    // element.style.display = display;
}
window.onload = function(){

}

