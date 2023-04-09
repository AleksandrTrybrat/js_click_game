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


// Открыть модальное окно
document.getElementById("mouseenter3").addEventListener("click", function() {
  document.getElementById("my-modal").classList.add("open")
})

// Закрыть модальное окно
document.getElementById("close-my-modal-btn").addEventListener("click", function() {
  document.getElementById("my-modal").classList.remove("open")
})

// Закрыть модальное окно при нажатии на Esc
window.addEventListener('keydown', (e) => {
  if (e.key === "Escape") {
      document.getElementById("my-modal").classList.remove("open")
  }
});

// Закрыть модальное окно при клике вне его
document.querySelector("#my-modal .modal__box").addEventListener('click', event => {
  event._isClickWithInModal = true;
});
document.getElementById("my-modal").addEventListener('click', event => {
  if (event._isClickWithInModal) return;
  event.currentTarget.classList.remove('open');
});