'use strict';

class Observer {
  constructor() {
  this.events = {};
}
  /*
  написано [eventName] потому-что это свойство объекта events, добавляем или удаляем свойства из объекта
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

lastRound.onclick = () => {
  lastRound.style.zIndex = -1;
}
  /*
  =================== ОЗВУЧКА РАУНД 3 =======================
  */
 // Создаем экземпляр фабрики AudioFactory
const audioFactory = new AudioFactory();
const clickRound = audioFactory.create("/audio/round3.mp3");
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

const hands1Gun = document.querySelector("#hands1");
const hands3Gun = document.querySelector("#hands3");
const hands2Gun = document.querySelector("#hands2");
const hands4Gun = document.querySelector("#hands4");

// Save localStorage
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

// получаем сохраненное оружие из локального хранилища
const savedWeapon = localStorage.getItem('weaponChoice');

// устанавливаем соответствующее изображение оружия для игрока, если есть сохраненное оружие
if (savedWeapon) {
  if (savedWeapon === 'hands41') {
    hands2Gun.src = "/img/players/hands41-removbg-preview.png";
  } else if (savedWeapon === 'hands3') {
    hands2Gun.src = "/img/players/hands3-removebg-preview.png";
  } else if (savedWeapon === 'hands2') {
    hands2Gun.src = "/img/players/hands2-removebg-preview.png";
  }
}

/*
  =================== ДВИЖЕНИЕ ОРУЖИЯ ЗА КУРСОРОМ =========================
*/
  
const mousePositionForLevel3 = document.getElementById("hands2");
document.body.addEventListener("mousemove", (event) => {
  mousePositionForLevel3.style.left = `${event.x -130}px`;
});
/*
=================== / ДВИЖЕНИЕ ОРУЖИЯ ЗА КУРСОРОМ =========================
*/


/*
=================== ЗВУК УДАРА ПРИ КЛИКЕ НА ВРАГА =======================
*/

// sum of bonus
let bonusNumberCounter = 0;

// constanta for bonus
const BONUS_NUMBER = 100;

const roundOneEvil = document.querySelector('.clickFight')

let countShot = 1;
roundOneEvil.addEventListener("click", () => {
  const roundSoundFight = audioFactory.create("/audio/fight2.mp3");
  roundSoundFight.play();

  if (countShot === 4) {
    const roundSoundFatallity = audioFactory.create("/audio/fatality.mp3");
    roundSoundFatallity.play();
  }
  countShot++;

  // ===================== bonus ====================================

  //создаем контейнер для показа зачисления бонуса +100
  const tagForBonus = document.createElement("div");
  tagForBonus.classList.add("bonus");
  document.body.append(tagForBonus);

  //записываем в textContent конейнера +100
  tagForBonus.textContent = "+" + BONUS_NUMBER;

//анимируем показ зачислиных бонусов
  tagForBonus.style.animation ="bonusAnime 2s linear forwards"

//суммируем все бонусы
  bonusNumberCounter += BONUS_NUMBER;

//выводим сумму на страницу
  containerForBonus.textContent = "Total bonus : " + bonusNumberCounter;

  containerForBonus.style.backgroundColor = "rgb(122, 111, 111)";
  containerForBonus.style.border = "2px solid rgb(245, 242, 242)";
  containerForBonus.style.borderRadius = "20px";

//если бонусов меньше 400 - жизни не пополняются, при наборе 400 можно пополнить только один раз жизнь без бонусов нельзя
let canIncreaseLives = false;
  if (bonusNumberCounter >= 400) {
    canIncreaseLives = true;
  // Пополнение жизней по клику на бутылочку
    const lifeImage = document.getElementById('lifeImage');
    window.addEventListener('keydown', (e) => {
      if (canIncreaseLives && e.code === 'Digit4') {
        increaseMainPlayerLives();
        canIncreaseLives = false;
        bonusNumberCounter = 0;
        containerForBonus.textContent = "Total bonus : " + bonusNumberCounter;
      }
    });
  } 
});


const mainPlayerLives = document.querySelectorAll('.mainPlayerlifeRoad');
const playerLives = document.querySelectorAll('.lifeRoad');
const player = document.querySelector('.player');
const clickFight = document.querySelector('.clickFight');
let mainPlayerLife = 5;
let playerLife = 5;

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
  }
  if (mainPlayerLife === 0) {
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


let maxMainPlayerLife = 5;
function increaseMainPlayerLives() {
  if (mainPlayerLife < maxMainPlayerLife) {
    mainPlayerLife++;
    mainPlayerLives[mainPlayerLife - 1].style.backgroundColor = "rgb(40, 76, 153)";
    lifeChangeSubject.notify(1);
  // // обнуление бонусов при пополнении жизней
  //   if (bonusNumberCounter >= 400) {
  //     bonusNumberCounter = 0; // обнуляем счетчик бонусов
  //     containerForBonus.textContent = "Total bonus : " + bonusNumberCounter;
  //   }
  }
}

clickFight.addEventListener('click', function() {
  if (playerLife > 0) {
    playerLife--;
    playerLives[playerLife].style.backgroundColor = "transparent";
    lifeChangeSubject.notify(-1);
  }
  if (playerLife === 0) {
    clearInterval(idInterval);
    let gameOver = document.getElementById('gameOver');
    gameOver.style.backgroundImage = `url(./img/win.png)`;
    gameOver.style.backgroundSize = "cover";
    gameOver.style.zIndex = 2;
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

