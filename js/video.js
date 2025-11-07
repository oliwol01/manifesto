const waitingScreen = document.getElementById("waiting-screen");
const blackScreen = document.getElementById("black-screen");
const video = document.getElementById("result-video");
const escapeBtn = document.querySelector(".escape-btn");


setTimeout(() => {

  waitingScreen.style.transition = "opacity 0.5s ease";
  waitingScreen.style.opacity = 0;
  waitingScreen.style.pointerEvents = "none"; 

  
  setTimeout(() => {
    waitingScreen.style.display = "none";

 
    blackScreen.style.display = "flex";
    blackScreen.style.opacity = 0;
    blackScreen.style.transition = "opacity 0.8s ease";

    
    video.src = "videos/manifesto.mp4";
    video.style.opacity = 0;
    escapeBtn.style.opacity = 0;
    video.style.pointerEvents = "auto";
    escapeBtn.style.pointerEvents = "auto";

  
    requestAnimationFrame(() => {
      blackScreen.style.opacity = 1;
      video.style.opacity = 1;
      escapeBtn.style.opacity = 1;
    });

  }, 500);
}, 3000); 
