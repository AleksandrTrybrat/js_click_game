'use strict';


window.addEventListener(
  'mousemove',
  () => {
    const backSound = new Audio();
    backSound.src = './audio/заднийФон.mp3';
    backSound.play();
    backSound.volume(0.5);
  },
  { once: true }
);

// Эффект дождя
function rain() {
  const rainContainer = document.querySelector('.rain');
  let drops = '';

  for (let index = 0; index < 100; index++) {
    const randomAnimate = Math.floor(Math.random() * 98 + 2);
    const randomBottom = Math.floor(Math.random() * 4 + 2);

    drops += `
			<div class="drop" style="left:${index}%;bottom:${
      randomBottom + 100
    }%;animation-delay: 0.${randomAnimate}s;animation-duration: 0.5${randomAnimate}s;">
					<div class="stem" style="animation-delay: 0.${randomAnimate}s;animation-duration: 0.5${randomAnimate}s;"></div>
					<div class="splat" style="animation-delay: 0.${randomAnimate}s;animation-duration: 0.5${randomAnimate}s;"></div>
			</div>`;
  }
  rainContainer.innerHTML = drops;
}

window.addEventListener('load', windowLoad);

function windowLoad() {
  rain();
}
// ======= Эффект дождя

class Observer {
  constructor() {
    this.events = {};
  }
  /*
  [eventName] указывает на индекс массива, по которому нужно 
  добавлять или извлекать соответствующий список подписчиков
  из объекта.Это свойство объекта events.
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
    this.events[eventName] = this.events[eventName].filter(
      (eventCallback) => eventCallback !== callback
    );
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

roundTwo.onclick = () => {
  roundTwo.style.zIndex = -1;
};
/*
  =================== ОЗВУЧКА РАУНД 2 =======================
  */
// Создаем экземпляр фабрики AudioFactory
const audioFactory = new AudioFactory();
const clickRound = audioFactory.create('/audio/round2.mp3');
function playClickRound() {
  clickRound.play();
}

// Подписываемся на событие mouseover
observer.subscribe('mouseover', playClickRound);

// Добавляем слушатель события на всю страницу
document.body.addEventListener(
  'mouseover',
  () => {
    // Оповещаем об изменении события
    observer.notify('mouseover');
  },
  { once: true }
);

/*
  =================== КЛИКИ ПО КНОПКАМ =======================
  */
const clickBtn = new AudioFactory();
const clickBtnGun = audioFactory.create('/audio/click.mp3');
function clickSound() {
  clickBtnGun.play();
}

// Добавляем слушатель события на кнопки
hands1.addEventListener('mouseover', clickSound);
hands3.addEventListener('mouseover', clickSound);
hands4.addEventListener('mouseover', clickSound);
back.addEventListener('mouseover', clickSound);

/*
  =================== СМЕНА ОРУЖИЯ =======================
  */

// Добавляем слушатель событий на кнопки выбора оружия
const hands1Gun = document.querySelector('#hands1');
const hands3Gun = document.querySelector('#hands3');
const hands4Gun = document.querySelector('#hands4');

// Save localStorage
function saveWeaponChoice(weapon) {
  localStorage.setItem('weaponChoice', weapon);
}

// Функция для получения выбора оружия из localStorage
function getWeaponChoice() {
  return localStorage.getItem('weaponChoice');
}
// Функция, которая будет уведомлять наблюдателей (функции), что оружие было изменено
function notifyWeaponChange(weapon) {
  observer.notify('weaponChange', weapon);
}
// Подписываем функцию changeWeaponChoice на событие "weaponChange"
observer.subscribe('weaponChange', changeWeaponChoice);

function changeWeaponChoice(weapon) {
  const hands2Gun = document.querySelector('#hands2');
  if (weapon === 'hands41') {
    hands2Gun.src = '/img/players/hands41-removbg-preview.png';
    getWeaponChoice();
  } else if (weapon === 'hands3') {
    hands2Gun.src = '/img/players/hands3-removebg-preview.png';
    getWeaponChoice();
  } else if (weapon === 'hands2') {
    hands2Gun.src = '/img/players/hands2-removebg-preview.png';
    getWeaponChoice();
  }
}

hands1Gun.addEventListener('click', () => {
  saveWeaponChoice('hands41');
  notifyWeaponChange('hands41');
});

hands3Gun.addEventListener('click', function () {
  saveWeaponChoice('hands3');
  notifyWeaponChange('hands3');
});

hands4Gun.addEventListener('click', function () {
  saveWeaponChoice('hands2');
  notifyWeaponChange('hands2');
});

window.addEventListener('keydown', (e) => {
  if (e.code === 'Digit1') {
    saveWeaponChoice('hands41');
    notifyWeaponChange('hands41');
  } else if (e.code === 'Digit2') {
    saveWeaponChoice('hands3');
    notifyWeaponChange('hands3');
  } else if (e.code === 'Digit3') {
    saveWeaponChoice('hands2');
    notifyWeaponChange('hands2');
  }
});

// Вызываем функцию changeWeaponChoice() при загрузке страницы, чтобы установить изображение выбранного оружия
changeWeaponChoice(getWeaponChoice());
/*
  =================== ДВИЖЕНИЕ ОРУЖИЯ ЗА КУРСОРОМ =========================
*/

const mousePositionForLevel2 = document.getElementById('hands2');

document.body.addEventListener('mousemove', (event) => {
  mousePositionForLevel2.style.left = `${event.x - 130}px`;
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

const roundOneEvil = document.querySelector('.clickFight');

let countShot = 1;
roundOneEvil.addEventListener('click', () => {
  const roundSoundFight = audioFactory.create('/audio/fight.mp3');
  roundSoundFight.play();

  if (countShot === 4) {
    const roundSoundFatallity = audioFactory.create('/audio/fatality.mp3');
    roundSoundFatallity.play();
  }
  countShot++;

  // ===================== bonus ====================================

  //создаем контейнер для показа зачисления бонуса +100
  const tagForBonus = document.createElement('div');
  tagForBonus.classList.add('bonus');
  document.body.append(tagForBonus);

  //записываем в textContent конейнера +100
  tagForBonus.textContent = '+' + BONUS_NUMBER;

  //анимируем показ зачислиных бонусов
  tagForBonus.style.animation = 'bonusAnime 2s linear forwards';

  //суммируем все бонусы
  bonusNumberCounter += BONUS_NUMBER;

  //выводим сумму на страницу
  containerForBonus.textContent = 'Total bonus : ' + bonusNumberCounter;

  containerForBonus.style.backgroundColor = 'rgb(122, 111, 111)';
  containerForBonus.style.border = '2px solid rgb(245, 242, 242)';
  containerForBonus.style.borderRadius = '20px';

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
        containerForBonus.textContent = 'Total bonus : ' + bonusNumberCounter;
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
    this.observers = this.observers.filter((obs) => obs !== observer);
  }
  notify(lifeChange) {
    this.observers.forEach((observer) => observer.update(lifeChange));
  }
}

const lifeChangeSubject = new LifeChangeSubject();

function updateMainPlayerLives() {
  if (mainPlayerLife > 0) {
    mainPlayerLife--;
    mainPlayerLives[mainPlayerLife].style.backgroundColor = 'transparent';
    lifeChangeSubject.notify(-1);
  }
  if (mainPlayerLife === 0) {
    clearInterval(idInterval);
    let gameOver = document.getElementById('gameOver');
    gameOver.style.zIndex = 0;
    gameOver.addEventListener(
      'mouseenter',
      () => {
        const audioLaughs = new Audio();
        audioLaughs.src = '/audio/ha_ha_ha.mp3';
        audioLaughs.play();
      },
      { once: true }
    );
  }
}

let maxMainPlayerLife = 5;
function increaseMainPlayerLives() {
  if (mainPlayerLife < maxMainPlayerLife) {
    mainPlayerLife++;
    mainPlayerLives[mainPlayerLife - 1].style.backgroundColor =
      'rgb(32, 128, 200)';
    lifeChangeSubject.notify(1);
  }
}

clickFight.addEventListener('click', function () {
  if (playerLife > 0) {
    playerLife--;
    playerLives[playerLife].style.backgroundColor = 'transparent';
    lifeChangeSubject.notify(-1);
  }
  if (playerLife === 0) {
    clearInterval(idInterval);
    window.location.href = '/level3.html';
  }
});

let idInterval = 0;
idInterval = setInterval(function () {
  updateMainPlayerLives();
}, 3000);

window.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    clearInterval(idInterval);
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'Space') {
    idInterval = setInterval(() => {
      updateMainPlayerLives();
    }, 3000);
  }
});
