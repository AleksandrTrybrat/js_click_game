"use strict";

// приветствие

welcome.onclick = () => {
    welcome.style.zIndex = -1;
    // soundIntro ();
    audio.play();
}


// звуки щелчка при наведении мышки на кнопки

function clickTitleSound() {
    const clickSound = new Audio();
    clickSound.src = "/audio/click.mp3";
    clickSound.play();
}

mouseenter.addEventListener("mouseover", clickTitleSound);
mouseenter2.addEventListener("mouseover", clickTitleSound);
mouseenter3.addEventListener("mouseover", clickTitleSound);



// главный саундтрек 

// Создаем объект Audio
const audio = new Audio('/audio/sound-title2.mp3');
audio.play();
audio.loop = true; 

const mutedTrue = document.getElementById("mutedTrue");
const mutedFalse = document.getElementById("mutedFalse");
const muted = document.getElementById("muted");

// Проверяем, что элементы найдены
if (audio && mutedTrue && mutedFalse && muted) {
  // Включаем музыку при загрузке страницы
  audio.play();

  // Добавляем обработчик клика на элемент с иконкой звука
  muted.addEventListener("click", () => {
    if (audio.paused) {
      audio.play();
      mutedTrue.style.display = "block";
      mutedFalse.style.display = "none";
    } else {
      audio.pause();
      mutedTrue.style.display = "none";
      mutedFalse.style.display = "block";
    }
  });
}
