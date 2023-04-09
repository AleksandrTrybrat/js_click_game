'use strict';

class Observer {
  constructor() {
  this.events = {};
}
  /*
  написано так [eventName] потому-что это свойство объекта events, добавляем или удаляем свойства из объекта
  */
  // Функция подписки на событие
  subscribe(eventName, callback) {
    if (!this.events[eventName]) {
      this.events[eventName] = [];
    }
    this.events[eventName].push(callback);
  }
  
  // Функция отписки от события
  unsubscribe(eventName, callback) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName] = this.events[eventName].filter((eventCallback) => eventCallback !== callback);
  }
  
  // Функция уведомления об изменении события
  notify(eventName, payload) {
    if (!this.events[eventName]) {
      return;
    }
    this.events[eventName].forEach((callback) => {
      callback(payload);
    });
  }
}
  
  // Создаем экземпляр Observer
const observer = new Observer();
  
// Фабрика для создания экземпляров Audio
class AudioFactory {
  create(src) {
    const audio = new Audio();
    audio.src = src;
    return audio;
  }
}

roundFirst.onclick = () => {
  roundFirst.style.zIndex = -1;
}
  /*
  =================== ОЗВУЧКА РАУНД 1 =======================
  */
 // Создаем экземпляр фабрики AudioFactory
const audioFactory = new AudioFactory();
const clickRound = audioFactory.create("/audio/round1.mp3");
function playClickRound() {
  clickRound.play();
}
  
  // Подписываемся на событие mouseover
observer.subscribe("mouseover", playClickRound);

  
  // Добавляем слушатель события на всю страницу
document.body.addEventListener("mouseover", () => {
  // Оповещаем об изменении события
  observer.notify("mouseover");
}, { once: true });
  
  /*
  =================== КЛИКИ ПО КНОПКАМ =======================
  */
const clickBtn = new AudioFactory();
const clickBtnGun = audioFactory.create("/audio/click.mp3");
function clickSound() {
  clickBtnGun.play();
}

  
  // Добавляем слушатель события на кнопки
hands1.addEventListener("mouseover", clickSound);
hands3.addEventListener("mouseover", clickSound);
hands4.addEventListener("mouseover", clickSound);
back.addEventListener("mouseover", clickSound);

  
  /*
  =================== СМЕНА ОРУЖИЯ =======================
  */
// const handsGun = document.querySelector("#hands");
const hands1Gun = document.querySelector("#hands1");
const hands3Gun = document.querySelector("#hands3");
const hands2Gun = document.querySelector("#hands2");
const hands4Gun = document.querySelector("#hands4");
  
function saveWeaponChoice(weapon) {
  localStorage.setItem('weaponChoice', weapon);
}

hands1Gun.addEventListener("click", () => {
  hands2Gun.src = "/img/players/hands41-removbg-preview.png";
  saveWeaponChoice('hands41');
});
  
hands3Gun.addEventListener("click", function() {
  hands2Gun.src = "/img/players/hands3-removebg-preview.png";
  saveWeaponChoice('hands3');
});

hands4Gun.addEventListener("click", function() {
  hands2Gun.src = "/img/players/hands2-removebg-preview.png";
  saveWeaponChoice('hands2');
});


window.addEventListener("keydown", (e) => {
  if (e.code === 'Digit1') {
    hands2Gun.src = "/img/players/hands41-removbg-preview.png";
    saveWeaponChoice('hands41');
  } else if (e.code === 'Digit2') {
    hands2Gun.src = "/img/players/hands3-removebg-preview.png";
    saveWeaponChoice('hands3');
  } else if (e.code === 'Digit3') {
    hands2Gun.src = "/img/players/hands2-removebg-preview.png";
    saveWeaponChoice('hands2');
  }
});
  
  /*
  =================== ЗВУК УДАРА ПРИ КЛИКЕ НА ВРАГА =======================
  */
  
// const roundOneEvil = document.querySelector('.clickFight')

// const soundFight = new AudioFactory();
// const roundSoundFight = audioFactory.create("/audio/fight.mp3");
// function fightRound() {
//   roundSoundFight.play();
// }
// roundOneEvil.addEventListener("click", fightRound);
const roundOneEvil = document.querySelector('.clickFight')

let countShot = 1;
roundOneEvil.addEventListener("click", () => {
  // const soundFight = new AudioFactory();
  const roundSoundFight = audioFactory.create("/audio/fight.mp3");
  // function fightRound() {
    roundSoundFight.play();
  // }

  if (countShot === 4) {
    // const fatallity = new AudioFactory();
    const roundSoundFatallity = audioFactory.create("/audio/fatality.mp3");
    roundSoundFatallity.play();
  }
  countShot++;
});

  /*
  =================== ДВИЖЕНИЕ ОРУЖИЯ ЗА КУРСОРОМ =========================
  */
  
const mousePositionForLevel3 = document.getElementById("hands2");
document.body.addEventListener("mousemove", (event) => {
  mousePositionForLevel3.style.left = `${event.x -130}px`;
});

const mainPlayerLives = document.querySelectorAll('.mainPlayerlifeRoad');
const playerLives = document.querySelectorAll('.lifeRoad');
const player = document.querySelector('.player');
const clickFight = document.querySelector('.clickFight');
let mainPlayerLife = 5;
let playerLife = 5;

// Шаблон наблюдателя: субъект
class LifeChangeSubject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  notify(lifeChange) {
		this.observers.forEach(observer => observer.update(lifeChange));
  }
}


const lifeChangeSubject = new LifeChangeSubject();

function updateMainPlayerLives() {
  if (mainPlayerLife > 0) {
    mainPlayerLife--;
    mainPlayerLives[mainPlayerLife].style.backgroundColor = "transparent";
    lifeChangeSubject.notify(-1);
  } else {
    clearInterval(idInterval);
    let gameOver = document.getElementById('gameOver');
    gameOver.style.zIndex = 0;
    gameOver.addEventListener("mouseenter", () => {
      const audioLaughs = new Audio();
      audioLaughs.src = "/audio/ha_ha_ha.mp3";
      audioLaughs.play();
    }, {once: true});
  }
}

// Пополнение жизней по клику на бутылочку
const lifeImage = document.getElementById('lifeImage');
// lifeImage.addEventListener('click', () => {
//   increaseMainPlayerLives();
// });
window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit4') {
    increaseMainPlayerLives();
  }
});
let maxMainPlayerLife = 5;
function increaseMainPlayerLives() {
  if (mainPlayerLife < maxMainPlayerLife) {
    mainPlayerLife++;
    mainPlayerLives[mainPlayerLife - 1].style.backgroundColor = "rgb(153, 0, 255)";
    lifeChangeSubject.notify(1);
  }
}


// function updatePlayerLives() {
//   if (playerLife > 0) {
//     playerLife--;
//     playerLives[playerLife].style.backgroundColor = "transparent";
//     lifeChangeSubject.notify(-1);
//   }
// }

clickFight.addEventListener('click', function() {
  if (playerLife > 0) {
    playerLife--;
    playerLives[playerLife].style.backgroundColor = "transparent";
    lifeChangeSubject.notify(-1);
  }
  if (playerLife === 0) {
    clearInterval(idInterval);
    window.location.href = "/level2.html";
  }
});

let idInterval = 0;
idInterval = setInterval(function() {
  updateMainPlayerLives();
}, 3000);

window.addEventListener("keydown", (e) => {
  if (e.code === 'Space') {
    clearInterval(idInterval);
  }
});

window.addEventListener("keyup", (e) => {
  if (e.code === 'Space') {
    idInterval = setInterval(() => {
      updateMainPlayerLives();
    }, 3000);
  }
});



