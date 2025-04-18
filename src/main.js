// import './style.css'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'
// import { setupCounter } from './counter.js'


// document.createElement обернуть в утилити функцию*
// проговорить с гпт подход к неймингу переменных и функций

const mainScreen = document.createElement('div');
mainScreen.className = 'mainScreen';
document.body.appendChild(mainScreen);

const startScreen = document.createElement('div');
startScreen.className = 'startScreen';
document.body.appendChild(startScreen);

// выбор уровня

const logo = document.createElement('h1');
logo.className = 'logo';
startScreen.append(logo);
logo.textContent = 'Simon Says';

const menuBox = document.createElement('div');
menuBox.className = 'menu';
logo.after(menuBox);

// DRY - dont repeat yourself
// типизировать параметры утилити функции на самые распространенные
// добавить параметры названий классов в утилити фунцию и тд

// const levels = createLevels() => {
// easy: HTMLElement
// }
const easy = document.createElement('button');
easy.classList.add('level_button');
easy.classList.add('active');
easy.textContent = 'easy'
menuBox.append(easy);

const medium = document.createElement('button');
medium.classList.add('level_button');
medium.textContent = 'medium';
menuBox.append(medium);

const hard = document.createElement('button');
hard.classList.add('level_button');
hard.textContent = 'hard';
menuBox.append(hard);

const start = document.createElement('button');
start.classList.add('level_button');
start.classList.add('start_menu')
menuBox.append(start);
start.textContent = 'START';

const numberArray = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'];
const keyBoardArray = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM']

// разбей код на функциональные компоненты JS/TS и изолировать в разных файлах и насроить импорты и до главной функции App

let charsArray = numberArray;
let levelName = '';
const levels = document.querySelectorAll('.level_button');

// easy => levels.easy
// addClickListeners(elements: HTMLElement[]) => elements.forEact.,...
easy.addEventListener('click', () => {
  levels.forEach(level =>{
    if(level.classList.contains('active')){
      level.classList.remove('active');
    }
  })
  easy.classList.add('active');
  charsArray = numberArray;
  update('easy');
  playSound(click);
  
})

medium.addEventListener('click', () => {
  levels.forEach(level =>{
    if(level.classList.contains('active')){
      level.classList.remove('active');
    }
  })
  charsArray = keyBoardArray;
  medium.classList.add('active');
  update('medium');
  playSound(click);
  
})

hard.addEventListener('click', () => {
  levels.forEach(level =>{
    if(level.classList.contains('active')){
      level.classList.remove('active');
    }
  })
  hard.classList.add('active');
  charsArray = numberArray.concat(keyBoardArray);
  update('hard');
  playSound(click);
})

/// вынести в отдельную функцию ^


// компонент кнопки
start.addEventListener('click', () => {
  console.log(charsArray);
  start.classList.toggle('active1');
  startScreen.classList.add('disable')
  mainScreen.classList.add('active')
  playSound(click);

})
// компонент звуков
const tipe = new Audio('sounds/tipe.mp3');
const error = new Audio('sounds/error.mp3');
const click = new Audio('sounds/click.mp3');
const win = new Audio('sounds/win.mp3');

function playSound(sound){
 sound.currentTime = 0;
 sound.play()
}


// создание клавиатуры => компонент клавиатуры использование компонента А снизу
const keyboard = document.createElement('div');
keyboard.classList.add('keyboard');
mainScreen.appendChild(keyboard);

const numbersRow = document.createElement('div');
numbersRow.classList.add('numbers');
keyboard.appendChild(numbersRow);

const lettersRow = document.createElement('div');
lettersRow.classList.add('letters');
keyboard.appendChild(lettersRow);

// let BoardArray = []
// document.onkeypress = function(event){
// BoardArray.push(event.code)
//   console.log(BoardArray);
// }

// const numberArray = ['Digit1', 'Digit2', 'Digit3', 'Digit4', 'Digit5', 'Digit6', 'Digit7', 'Digit8', 'Digit9', 'Digit0'];
// const keyBoardArray = ['KeyQ', 'KeyW', 'KeyE', 'KeyR', 'KeyT', 'KeyY', 'KeyU', 'KeyI', 'KeyO', 'KeyP', 'KeyA', 'KeyS', 'KeyD', 'KeyF', 'KeyG', 'KeyH', 'KeyJ', 'KeyK', 'KeyL', 'KeyZ', 'KeyX', 'KeyC', 'KeyV', 'KeyB', 'KeyN', 'KeyM']

function createKeys(conteiner, codes, className){
  let out = '';
  for(let i=0; i<codes.length; i++) {
    const displayChar = codes[i].replace('Key', '').replace('Digit', '');
    out += `<div class="key ${className}" data-key="${codes[i]}">${displayChar}</div>`;
  }
  conteiner.innerHTML = out;
};

createKeys(numbersRow, numberArray, 'key-number');
createKeys(lettersRow, keyBoardArray, 'key-letter');

// анимация нажатия на клавиатуру в компоненте клавиатуры v

document.addEventListener('keydown', (event) => {
  const activeKey = document.querySelector('.key.active');
  playSound(tipe);

  if(activeKey) {
    activeKey.classList.remove('active');
  }
  const keyElement = document.querySelector(`.key[data-key="${event.code}"]`);

  if(keyElement) {
    keyElement.classList.add('active');
   setTimeout(() => {
    keyElement.classList.remove('active')
  }, 1000);
}
})


const keys = document.querySelectorAll('.key');
keys.forEach(key =>{
  key.addEventListener('mousedown', (e) => {
    const activeKey = document.querySelector('.key.active');
     e.preventDefault();
     input.focus();
     playSound(tipe)

    if(activeKey) {
      activeKey.classList.remove('active');
    }
  
  key.classList.add('active')
  
  setTimeout(() => {
    key.classList.remove('active')
  }, 1000);
  
  if(input.disabled) {
    return
  } else {
  const char = key.textContent;
  const start = input.selectionStart;
  const end = input.selectionEnd;

  input.value = input.value.substring(0, start) + char + input.value.substring(end);

  input.selectionStart = input.selectionEnd = start + char.length;
  input.dispatchEvent(new Event('input'));
  }

  // input.dispatchEvent(new Event('input'));
  // setTimeout(() => {
  //   key.classList.remove('active')
  // }, 1000);
})
})

// поле ввода компонент А

const input = document.createElement('input');
input.classList.add('input');
mainScreen.prepend(input);
input.disabled = true;
let isInputLocked = false;

// активное поле
function enableInput() {
  input.disabled = false;
  input.classList.add('active');
  input.focus();
  isInputLocked = true;
  console.log('поле ввода активировано!')
  input.addEventListener('blur', () => {
    if (isInputLocked) {
      input.focus()
    }
  })
}

// заблокированное поле
function disableInput() {
  input.disabled = true;
  input.classList.remove('active');
  input.blur();
  isInputLocked = true;
  console.log('поле ввода заблокировано!')
}


  // клавиши start и repeate !отдельные компоненты или компонент!

  const buttons = document.createElement('div');
  buttons.classList.add('buttons');
  mainScreen.append(buttons);

  const startBtn = document.createElement('button');
  startBtn.classList.add('start');
  startBtn.textContent = 'START';
  buttons.prepend(startBtn);

  const repeatBtn = document.createElement('button');
  repeatBtn.classList.add('repeat');
  repeatBtn.textContent = 'repeat';
  buttons.prepend(repeatBtn);

  function disabledStart(){
    startBtn.disabled = true;
    startBtn.classList.add('disable');
  }

  function enabledStart(){
    startBtn.disabled = false;
    startBtn.classList.remove('disable');
  }

  //////////// основная функция

  // рандом

  let numberOfChars = 2;
  let outPut = [];

  function getItRandomise (charsArray, numberOfChars) {
    outPut = [];
     for(let i=0; i<numberOfChars; i++){
      let randomIndex = Math.floor(Math.random() * charsArray.length);
      // charsArray[i] = charsArray[randomIndex]
      outPut.push(charsArray[randomIndex]);

     }
     console.log('здесь это выглядит так:',outPut);
     pushItOnSkreen(outPut);
     return outPut;
  }


  // вывод на экран

function pushItOnSkreen(keys){
  let i = 0;
  const interval = setInterval(() =>{
    if(i >= keys.length){
      clearInterval(interval);
      return;
    }
  
  const key = keys[i]
  const keyElement = document.querySelector(`[data-key="${key}"]`);
  if(keyElement) {
    playSound(tipe)
    keyElement.classList.add('active')
    input.value += keyElement.textContent;
  
  setTimeout(() => {
    keyElement.classList.remove('active');
  }, 500);
 }
 i++;
}, 800)
}
/////////////////////  кнопка старта  ///////////////////////
 

startBtn.addEventListener('click', () =>{
  playSound(click);
  tryCount = 0;
  console.log(maxCount)
  input.value = '';
  disableInput();
  disableRepeat();
  disabledStart();
  
  outPut = getItRandomise (charsArray, numberOfChars); 
  const unlockDelay = outPut.length * 1000 + 500;
  input.removeEventListener('input', handleCheck);

  setTimeout (() => {
    enabledStart();
    startBtn.textContent = 'try again'
    enableInput()
    enableRepeat();
    input.focus();
    // activeKlick();
    input.value = '';
    input.addEventListener('input', handleCheck);
  }, unlockDelay);
  
  
});

function handleCheck(e) {
const isCorrect = check(e.target, outPut);
if(isCorrect && e.target.value.length === outPut.length) {
  winBox.classList.add('active');
  playSound(win);
  disabledStart();
  disableMenu();
  disableRepeat();
  disableInput();
  if(numberOfChars === 10){
    nextBtn.classList.add('disable');
    nextBtn.disabled = true;
  }
}
}

// проверка на совпадение
let tryCount = 0;
let isChecking = false;
let maxCount = 2;


function check(input, outPut) {

const userInput = input.value.toUpperCase();
// i=0;

  for(let i=0; i<userInput.length; i++){

    const enterdChar = userInput[i];
    const expectedChar = outPut[i].replace('Key', '').replace('Digit', '');
    console.log(enterdChar, expectedChar)

    if( expectedChar !== enterdChar ){
      playSound(error)
       input.classList.add('wrong');
       disableInput();
       tryCount += 1;
       console.log(tryCount);
        setTimeout(() => {
          input.value = '';
          input.classList.remove('wrong');
        },1000);
        if(tryCount === maxCount){
          loseBox.classList.add('active')
          disabledStart();
          disableMenu();
          disableRepeat()
          console.log('попытки закончились')
         }
       return false;
    }
  }
  return true;
  
}

// кнопка повтора
repeatBtn.disabled = true;

function enableRepeat() {
repeatBtn.disabled = false;
repeatBtn.classList.add('active');
}

function disableRepeat() {
  repeatBtn.disabled = true;
  repeatBtn.classList.remove('active');
  }

repeatBtn.addEventListener('click', () => {
  playSound(click);
  input.value = '';
  disableInput();
  pushItOnSkreen(outPut);
  disableRepeat();
  const timeout = outPut.length * 1000 + 500;
  setTimeout(() => {
    input.value = '';
    enableInput();
  },timeout)
})

// карточка ты победил!

const winBox = document.createElement('div');
winBox.classList.add('win')
winBox.textContent = 'YOU WON!';
mainScreen.prepend(winBox);

const nextBtn = document.createElement('button');
nextBtn.classList.add('next_btn');
nextBtn.textContent = 'next level';
winBox.append(nextBtn);

const menuBtn = document.createElement('button');
menuBtn.classList.add('menu_btn');
menuBtn.textContent = 'back to menu';
winBox.append(menuBtn);

// следующий уровень!
// просто комментарий
let scoreNumber = 0;

nextBtn.addEventListener('click', () => {
  playSound(click);
  winBox.classList.remove('active');
  scoreNumber += 1;
  score.textContent = `score: ${scoreNumber}`;
  console.log(scoreNumber)
  numberOfChars += 2;
  input.value = '';
  disableInput();
  enabledStart();
  enableMenu();
  startBtn.textContent = 'START';
  updateLevel();
  // outPut = getItRandomise(charsArray. numberOfChars)
  console.log('количество знаков',numberOfChars)
})

// обратно в меню

menuBtn.addEventListener('click', () => {
  playSound(click);
  input.value = '';
  enabledStart();
  enableMenu();
  startBtn.textContent = 'START';
  disableRepeat();
  winBox.classList.remove('active')
  mainScreen.classList.remove('active')
  startScreen.classList.remove('disable')
  numberOfChars = 2;
  updateLevel();
})


// проигрыш

const loseBox = document.createElement('div');
loseBox.classList.add('lose')
loseBox.textContent = 'YOU LOSE!';
mainScreen.prepend(loseBox);

const tryAgain = document.createElement('button');
tryAgain.classList.add('try_again');
tryAgain.textContent = 'try again';
loseBox.append(tryAgain);

const menuBtn2 = document.createElement('button');
menuBtn2.classList.add('menu_btn');
menuBtn2.textContent = 'back to menu';
loseBox.append(menuBtn2);

// try again

tryAgain.addEventListener('click', () => {
  playSound(click);
  loseBox.classList.remove('active');
  enabledStart();
  enableMenu();
  startBtn.textContent = 'START';
  input.value = '';
})

// обратно в меню

menuBtn2.addEventListener('click', () => {
  playSound(click);
  input.value = '';
  enabledStart();
  enableMenu();
  startBtn.textContent = 'START';
  disableRepeat();
  loseBox.classList.remove('active')
  mainScreen.classList.remove('active')
  startScreen.classList.remove('disable')
  numberOfChars = 2;
  updateLevel();
})

  
// все сверху: сложность, счет, кнопка назад в меню

const upBox = document.createElement('div');
upBox.className = 'up';
input.before(upBox);

const backToMenu = document.createElement('button');
backToMenu.className = 'back';
backToMenu.textContent = 'back to menu'
upBox.append(backToMenu);

const level = document.createElement('h2');
level.classList.add('level');
upBox.append(level);

let number = numberOfChars / 2;
level.textContent = `Level ${number}`;

function updateLevel() {
  number = numberOfChars / 2;
  level.textContent = `Level ${number}`;
}

const score = document.createElement('h2');
score.className = 'score';
upBox.append(score);

score.textContent = `score: ${scoreNumber}`;

  
const nowLevel = document.createElement('div')
nowLevel.className = 'now_level';
nowLevel.textContent = 'easy';
upBox.before(nowLevel);

function update(levelName) {
  nowLevel.textContent = levelName;
}
  
backToMenu.addEventListener('click', () =>{
  playSound(click);
  input.value = '';
  enabledStart();
  enableMenu();
  startBtn.textContent = 'START';
  disableRepeat();
  mainScreen.classList.remove('active')
  startScreen.classList.remove('disable')
  numberOfChars = 2;
  updateLevel();
})

function disableMenu() {
  backToMenu.disabled = true;
  backToMenu.classList.add('disabled');
}

function enableMenu() {
  backToMenu.disabled = false;
  backToMenu.classList.remove('disabled');
}
