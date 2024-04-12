function changeButtonBorder(buttonId) {
  buttonId.classList.add('custom-border');
}
function removeButtonBorder(buttonId) {
 buttonId.classList.remove('custom-border');
}


var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var stop = false;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var roundCount = 1;
var clickable = false;
var input = "";
var correct = false;

var menu = false;

var num1;
var num2;
var word = "";
var count = 0;
var right = 0;


var carTotal=0;


document.addEventListener("DOMContentLoaded", function() {
  const buttons = document.querySelectorAll('.game-button');

  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      const audioId = button.dataset.audio;
      const audio = document.getElementById(audioId);
      audio.play();
    });

    button.addEventListener('mouseleave', function() {
      const audioId = button.dataset.audio;
      const audio = document.getElementById(audioId);
      audio.pause();
      audio.currentTime = 0; // Reset audio to the beginning
    });
  });
});
mainMenu();
speak("");

function mainMenu() {
  removeMenuButtons();
  removeImages();
  appear('start');
  appear('mainInformation');
}

function removeImages() {
  disappear('fruitFrenzyScreen');
  disappear('spellSafariScreen');
  disappear('blastOffScreen');
  disappear('animalSortScreen');
  disappear('carCountScreen');
  disappear('shapeParadeScreen');
  disappear('storyBuilderScreen');

}
function removeMenuButtons() {
  disappear('fruitFrenzy');
  disappear('carCounting');
  disappear('shapeParade');
  disappear('spellingSafari');
  disappear('animalSort');
  disappear('storyBuilder');
  disappear('spellTitle'); 
  disappear('mathTitle');
  disappear('start');
  disappear('mainInformation');  
  menu = false;
}

function gameMenu() {
  appear('fruitFrenzy');
  appear('carCounting');
  appear('shapeParade');
  appear('spellingSafari');
  appear('animalSort');
  appear('storyBuilder');
  disappear('start');
  disappear('mainInformation');
  appear('spellTitle'); 
  appear('mathTitle');
  removeImages();
  menu = true;
  newButton = buttonsGrid[0][0]; 
  playNewAudio(document.getElementById('fruitFrenzyAudio'));

}
function inGame(gameId) {
  removeMenuButtons();
  if(gameId=="blastOff") {
    runBlastOff();
  }
  if(gameId=='fruitFrenzy'){
    runFruitFrenzy();
  }
  if(gameId=='spellingSafari'){
    console.log('spell safaru');
    runSpellSafari();
  }
  if(gameId=='shapeParade'){
    runShapeParade();
  }
  if(gameId=='storyBuilder'){
    runStoryBuilder();
  }
  if(gameId=='carCounting'){
    runCarCount();
  }
  if(gameId=='animalSorting'){
    runAnimalSort();
  }
}
function disappear(buttonId) {
  var button = document.getElementById(buttonId);
  button.style.display = "none";
}

function appear(buttonId) {
  var button = document.getElementById(buttonId);
  button.style.display = "block"; // or "inline" or any valid display value
}

async function runFruitFrenzy(){
  console.log("here");
  appear("fruitFrenzyScreen");
  await playAudio("audioFiles/fruitFrenzy/fruitIntro.mp3", 20);
  roundCount = 5;
  clickable = false;
  var right = 0;
  while (count < roundCount) {
    count++;
    clickable = false;
    correct = false;
    await playAudio("audioFiles/generalGame/qNum.mp3", 1.7);
    speak(count);
    await fruitMathQuestion(); 
    if(correct){
      await playAudio("audioFiles/generalGame/ding.mp3", .5);

      await playAudio("audioFiles/generalGame/correct.mp3",1);
      right++;
    }
    else{
      await playAudio("audioFiles/generalGame/drum.mp3", .5);
    
      await  playAudio("audioFiles/generalGame/wrong.mp3",1);
       await  playAudio("audioFiles/generalGame/correctWas.mp3",2);
      
      speak((num1+num2));
      await waitForSeconds(.5);
    } 
  }
  if(right>3){
    await playAudio("audioFiles/generalGame/youGot.mp3",1);
    speak(right);
     await waitForSeconds(.5);
     await playAudio("audioFiles/generalGame/questionsCorrect.mp3",1);
    await playAudio("audioFiles/generalGame/greatJob.mp3",1);
  }
  else{
    await playAudio("audioFiles/generalGame/youGot.mp3",1);
    speak(right);
     await waitForSeconds(.5);
    await playAudio("audioFiles/generalGame/questionsCorrect.mp3",1);
    await playAudio("audioFiles/generalGame/keepPracticing.mp3",2);
  }
   await waitForSeconds(2);
  clickable = false;
  gameMenu();
}

async function runSpellSafari(){
  console.log("here");
  appear("spellSafariScreen");
  await playAudio("audioFiles/spellSafari/safariIntro.mp3", 21);
  roundCount = 5;
  clickable = false;
  var right = 0;
  while (count < roundCount) {
    count++;
    clickable = false;
    correct = false;
    await playAudio("audioFiles/generalGame/qNum.mp3", 1.7);
    speak(count);
    await spellQuestion(); 
    if(correct){
      await playAudio("audioFiles/generalGame/ding.mp3", .5);

      await playAudio("audioFiles/generalGame/correct.mp3",1);
      right++;
    }
    else{
      await playAudio("audioFiles/generalGame/drum.mp3", .5);

      await  playAudio("audioFiles/generalGame/wrong.mp3",1);
       await  playAudio("audioFiles/generalGame/correctWas.mp3",2);

      speak(splitWordWithSpaces(word));
      await waitForSeconds(3);
    } 
  }
  if(right>3){
    await playAudio("audioFiles/generalGame/youGot.mp3",1);
    speak(right);
     await waitForSeconds(.5);
     await playAudio("audioFiles/generalGame/questionsCorrect.mp3",1);
    await playAudio("audioFiles/generalGame/greatJob.mp3",1);
  }
  else{
    await playAudio("audioFiles/generalGame/youGot.mp3",1);
    speak(right);
     await waitForSeconds(.5);
    await playAudio("audioFiles/generalGame/questionsCorrect.mp3",1);
    await playAudio("audioFiles/generalGame/keepPracticing.mp3",2);
  }
   await waitForSeconds(2);
  clickable = false;
  gameMenu();
}


async function runCarCount(){
  console.log("here");
  appear("carCountScreen");
  await playAudio("audioFiles/carCount/carCountIntro.mp3", 12);
  roundCount = 3;
  clickable = false;
  var right = 0;
  while (count < roundCount) {
    count++;
    clickable = false;
    correct = false;
    await playAudio("audioFiles/generalGame/qNum.mp3", 1.7);
    speak(count);
    await carCountQuestion(); 
    if(correct){
      await playAudio("audioFiles/generalGame/ding.mp3", .5);

      await playAudio("audioFiles/generalGame/correct.mp3",1);
      right++;
    }
    else{
      await playAudio("audioFiles/generalGame/drum.mp3", .5);

      await  playAudio("audioFiles/generalGame/wrong.mp3",1);
       await  playAudio("audioFiles/generalGame/correctWas.mp3",2);

      speak(carTotal);
      await waitForSeconds(.5);
    } 
  }
  if(right>=2){
    await playAudio("audioFiles/generalGame/youGot.mp3",1);
    speak(right);
     await waitForSeconds(.5);
     await playAudio("audioFiles/generalGame/questionsCorrect.mp3",1);
    await playAudio("audioFiles/generalGame/greatJob.mp3",1);
  }
  else{
    await playAudio("audioFiles/generalGame/youGot.mp3",1);
    speak(right);
     await waitForSeconds(.5);
    await playAudio("audioFiles/generalGame/questionsCorrect.mp3",1);
    await playAudio("audioFiles/generalGame/keepPracticing.mp3",2);
  }
   await waitForSeconds(2);
  clickable = false;
  gameMenu();
}


async function runBlastOff(){
  console.log("here");
  appear("blastOffScreen");
  await playAudio("audioFiles/gameNames/blastOff/blastOffIntro.mp3", 40);
  roundCount = 8;
  clickable = false;
  var distance = 0;
  while (count < roundCount) {
    count++;
    clickable = false;
    correct = false;
    await playAudio("audioFiles/generalGame/qNum.mp3", 1.7);
    speak(count);
    await mathQuestion(); 
    if(correct){
      await playAudio("audioFiles/generalGame/ding.mp3", .5);
      var amount = Math.floor(Math.random() * 15) + 15;
      distance  = distance+amount;
      await playAudio("audioFiles/gameNames/blastOff/correctQuestion.mp3",3);
      speak(amount);
       await waitForSeconds(.5);
      await playAudio("audioFiles/gameNames/blastOff/kilometers.mp3",2);

    }
    else{
      await playAudio("audioFiles/generalGame/drum.mp3", .5);
      var amount = Math.floor(Math.random() * 5) + 5;
      distance  = distance+amount;
      await playAudio("audioFiles/gameNames/blastOff/wrongQuestion.mp3",2.7);
      speak(amount);
      await waitForSeconds(.5);
      await playAudio("audioFiles/gameNames/blastOff/kilometers.mp3",2);
await playAudio("audioFiles/gameNames/blastOff/correctWas.mp3", 2)
      speak((num1+num2));
      await waitForSeconds(.5);
    } 
  }
  if(distance>=100){
    await playAudio("audioFiles/gameNames/blastOff/congratsPart1.mp3",3);
    speak(distance);
     await waitForSeconds(1);
    await playAudio("audioFiles/gameNames/blastOff/kilometers.mp3",2);
  }
  else{
     await playAudio("audioFiles/gameNames/blastOff/failPart1.mp3",4.5);
    speak(distance);
     await waitForSeconds(1);
    await playAudio("audioFiles/gameNames/blastOff/kilometers.mp3",2);
  }
  clickable = false;
  await waitForSeconds(3);
  gameMenu();
}

async function spellQuestion(){
  generateWord();
  await playAudio("audioFiles/generalGame/howSpell.mp3", 1.7);
  speak(word);
  await waitForSeconds(1);
  clickable = true;
  await waitForRecognitionResult();
  formatString(input);

  if(word==input){
    correct = true;
  }
}
function splitWordWithSpaces(word) {
    // Split the word into an array of letters
    const lettersArray = word.split('');

    // Join the letters back together with spaces in between
    const spacedWord = lettersArray.join(' ');

    return spacedWord;
}


async function mathQuestion() {
  generateAdditionProblems();
  speak("What is");
  await waitForSeconds(1);
  speak(num1);
  await waitForSeconds(2.5);
  await playAudio("audioFiles/generalGame/plus.mp3", 1);
  speak(num2)
  await waitForSeconds(1);
  clickable = true;
  await waitForRecognitionResult();
  if(num1+num2==toNum(input)){
    correct = true;
  }
  }

async function fruitMathQuestion() {
  const fruitNames = 
    ["audioFiles/fruitFrenzy/oranges.mp3", "audioFiles/fruitFrenzy/bananas.mp3", "audioFiles/fruitFrenzy/apples.mp3"];

  generateAdditionProblems();
  await waitForSeconds(1);
  await playAudio("audioFiles/fruitFrenzy/thereAre.mp3",1.2)
  await waitForSeconds(.4);
  speak(num1);
  await waitForSeconds(.3);
  var randomIndex = Math.floor(Math.random() * 3);

  await playAudio(fruitNames[randomIndex], .5);
  await waitForSeconds(.5);
  speak("and"+num2);
  await waitForSeconds(.6);
  
   randomIndex = Math.floor(Math.random() * 3);
  await playAudio(fruitNames[randomIndex], 1);
  clickable = true;
  await playAudio("audioFiles/fruitFrenzy/fruitTotal.mp3",1.5)
  if(count==1){
    await waitForSeconds(.5);
    playAudio("audioFiles/fruitFrenzy/spaceOrClick.mp3",3)
  }
  await waitForRecognitionResult();
  if(num1+num2==toNum(input)){
    correct = true;
  }
  }



async function carCountQuestion() {
 

  carTotal = Math.floor(Math.random() * 5)+1;
  await waitForSeconds(1);
  await playAudio("audioFiles/carCount/carInformation.mp3",4);
  for (let i = 0; i < carTotal; i++) {
await playAudio("audioFiles/carCount/carDrive.wav",4);
  }

    await waitForSeconds(.1);
    playAudio("audioFiles/fruitFrenzy/spaceOrClick.mp3",3)
  
  clickable =true;
  await waitForRecognitionResult();
  if(carTotal==toNum(input)){
    correct = true;
  }
  }
document.body.onclick = function() {

  console.log(clickable + " in function");
  if (clickable) {
    recognition.start();
    console.log('Ready to receive an answer.');

  }
}
document.body.onkeydown = function(event) {

  if (event.code === 'Space') {
    console.log(clickable + " in function");
    if (clickable) {
      recognition.start();
      console.log('Ready to receive an answer.');
    }
    // Prevent the default action (scrolling the page)
    event.preventDefault();
  }
};


async function waitForRecognitionResult() {

  console.log("WQIATING");
  return new Promise(resolve => {
    recognition.onresult = async function(event) {
      input = event.results[0][0].transcript;
      resolve(); 
    }
  });
}

function playAudio(audio) {
    audio.play();
}

function stopAudio(audio) {
    audio.pause();
    audio.currentTime = 0; // Resets audio to beginning
}

recognition.onerror = function() {
  speak("Sorry, I didn't catch that. Please try again.");
  clickable = true;
}
recognition.onspeechend = function() {
  recognition.stop();
}

function generateAdditionProblems() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;

  console.log(`What is  ` + num1 + ` +  ` + num2);

}

function generateWord() {
  word = easyWords[Math.floor(Math.random() * easyWords.length)];

}
function formatString(str) {
  const lowerCaseStr = str.toLowerCase();
  const formattedStr = lowerCaseStr.replace(/\s/g, '');
  input = formattedStr;
}

function waitForSeconds(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

function speak(s) {
  utterance = new SpeechSynthesisUtterance(s);
  voices = speechSynthesis.getVoices()
  utterance.voice = voices[2];
  speechSynthesis.speak(utterance);
}


const easyWords = [
"cat", "dog", "hat", "moon", "star", "fish", "bird", "tree", "cake", "ball", "duck", "frog", "desk", "door", "home", "lamp", "leaf", "milk", "nest", "park", "soap", "sock", "chair", "table", "mouse", "horse", "apple", "banana", "lemon", "grape", "melon", "orange", "peach", "pear", "cherry", "candy", "pizza", "burger", "apple", "bread", "cheese", "chicken", "pasta", "pizza", "salad", "sauce", "coffee", "juice", "water", "muffin", "butter", "sugar", "honey", "bread", "bottle", "bag", "car", "bus", "bike", "train", "truck", "plane", "boat", "van", "house",  "store", "bank", "park", "zoo", "pool", "beach", "river", "lake", "hill", "city", "town", "school", "park", "farm", "forest", "ocean", "planet", "moon", "star", "sky", "cloud", "rain", "snow", "wind", "storm", "light", "dark", "cold", "hot", "warm", "cool", "wet", "dry", "fast", "slow", "quick", "easy", "hard", "soft", "loud",  "quiet", "big", "small", "short", "tall", "thick", "thin", "skinny", "young", "old", "new", "fresh", "clean", "dirty", "happy", "sad", "angry", "scared", "tired", "sleepy", "purple", "green", "brown", "orange", "yellow", "pink",  "black", "fun", "boring", "nice", "mean", "kind", "rude", "good", "bad", "right", "wrong", "true", "false", "smart", "dumb", "brave", "coward",  "rich", "safe", "danger", "healthy", "sick", "alive", "dead", "beautiful",  "ugly", "pretty", "handsome", "clever", "stupid", "calm", "wild", "friendly",  "happy", "merry", "joyful", "sad", "gloomy", "serious", "silly", "laugh",  "cry", "smile", "frown", "wink", "nod", "shake", "blink", "yawn", "stretch",  "jump", "run", "walk", "crawl", "swim", "fly", "climb", "fall", "ride", "drive", "row", "lift", "push", "pull", "throw", "catch", "kick", "hit", "fight", "argue", "agree", "disagree", "listen", "speak", "talk", "whisper",  "shout", "read", "write", "draw", "paint", "color", "build", "destroy", "fix", "break", "open", "close", "start", "finish", "stop", "go", "stay", "leave", "enter", "exit", "find", "lose", "win", "lose", "earn", "spend", "buy", "sell", "pay", "receive", "give", "take", "keep", "throw", "catch", "drop", "pick", "put", "move", "turn", "lift", "pull", "push", "carry", "hold", "touch", "feel", "watch", "listen", "smell", "taste", "drink", "sleep", "dream", "wake", "work", "rest", "play", "study", "learn", "teach", "think", "forget", "know","believe", "doubt", "hope", "wish", "imagine", "create", "invent", "discover",  "explore", "solve", "plan", "decide", "choose", "change", "stay",  "remain", "live", "born", "grow", "develop", "age", "mature", "youth", "adult", "child", "baby", "parent", "mother", "father", "brother", "sister", "friend", "enemy", "stranger", "teacher", "student", "doctor", "nurse", "engineer", "artist", "musician", "actor", "writer", "singer",  "dancer", "chef", "waiter", "driver",  "pilot", "captain", "sailor", "farmer",  "soldier",  "fireman",  "lawyer", "judge", "athlete", "coach",  "referee", "judge",
];
function toNum(num) {
  if (num === 'one' || num === "1") {
    return 1;
  } else if (num === 'two' || num === "2") {
    return 2;
  } else if (num === 'three' || num === "3") {
    return 3;
  } else if (num === 'four' || num === "4") {
    return 4;
  } else if (num === 'five' || num === "5") {
    return 5;
  } else if (num === 'six' || num === "6") {
    return 6;
  } else if (num === 'seven' || num === "7") {
    return 7;
  } else if (num === 'eight' || num === "8") {
    return 8;
  } else if (num === 'nine' || num === "9") {
    return 9;
  } else if (num === 'ten' || num === "10") {
    return 10;
  } else if (num === 'eleven' || num === "11") {
    return 11;
  } else if (num === 'twelve' || num === "12") {
    return 12;
  } else if (num === 'thirteen' || num === "13") {
    return 13;
  } else if (num === 'fourteen' || num === "14") {
    return 14;
  } else if (num === 'fifteen' || num === "15") {
    return 15;
  } else if (num === 'sixteen' || num === "16") {
    return 16;
  } else if (num === 'seventeen' || num === "17") {
    return 17;
  } else if (num === 'eighteen' || num === "18") {
    return 18;
  } else if (num === 'nineteen' || num === "19") {
    return 19;
  } else if (num === 'twenty' || num === "20") {
    return 20;
  } else if (num == 'exit') {
    exit = true;
    return "exit";
  } else {
    return 'unknown'
  }
}

async function playAudio(audio, len){
  var a = new Audio(audio);
  a.play();
  await waitForSeconds(len);
}

const buttonsGrid = [
    [document.getElementById('fruitFrenzy'), document.getElementById('carCounting'), document.getElementById('shapeParade')],
    [document.getElementById('spellingSafari'), document.getElementById('animalSort'), document.getElementById('storyBuilder')],
    
];

// Create an array of corresponding audio elements
const audioGrid = [
    [document.getElementById('fruitFrenzyAudio'), document.getElementById('carCountingAudio'), document.getElementById('shapeParadeAudio')],
    [document.getElementById('spellingSafariAudio'), document.getElementById('animalSortAudio'), document.getElementById('storyBuilderAudio')],
   
];


let currentRow = 0;
let currentCol = 0;

// Initialize current audio
let currentAudio = null;
let  newButton = buttonsGrid[0][0];
changeButtonBorder(newButton);
// Function to stop current audio and play new audio

function playNewAudio(newAudio) {
  if(menu){
    // Stop current audio if playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }

    // Play new audio and set it as the current audio
    newAudio.play();
    currentAudio = newAudio;
  }
}

// Add event listener for keydown events
document.addEventListener('keydown', (event) => {
    // Adjust row and column indices based on the key pressed
  if (event.code === 'Space') {
    console.log(clickable + " in function");
    if (clickable) {
        recognition.start();
        console.log('Ready to receive an answer.');
    }
  
    inGame(newButton.id);
    console.log("Space key was pressed and running inGame function");
    event.preventDefault();
  } 
  else {
    // Handle other key events as needed
    switch (event.key) {
      case 'ArrowUp':
          currentRow = (currentRow > 0) ? currentRow - 1 : buttonsGrid.length - 1;
          break;
      case 'ArrowDown':
          currentRow = (currentRow < buttonsGrid.length - 1) ? currentRow + 1 : 0;
          break;
      case 'ArrowLeft':
          currentCol = (currentCol > 0) ? currentCol - 1 : buttonsGrid[currentRow].length - 1;
          break;
      case 'ArrowRight':
          currentCol = (currentCol < buttonsGrid[currentRow].length - 1) ? currentCol + 1 : 0;
          break;
    }
    // Set focus to the button at the new row and column
  removeButtonBorder(newButton);
    newButton = buttonsGrid[currentRow][currentCol];
    newButton.focus();
  changeButtonBorder(newButton);


    // Play new audio associated with the new button
    const newAudio = audioGrid[currentRow][currentCol];
    playNewAudio(newAudio);
  changeButtonBorder(audioGrid[currentRow][currentCol]);


    // Prevent default action (e.g., scrolling)
    event.preventDefault();
  }
});

// Initialize focus and play sound for the first button
buttonsGrid[currentRow][currentCol].focus();
playNewAudio(audioGrid[currentRow][currentCol]);