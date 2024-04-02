var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var recognition = new SpeechRecognition();
var stop = false;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//change mode and clickable
var roundCount = 10;
var clickable = false;
var mode = "";
var input = "";

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var num1;
var num2;
var word = "";
var count = 0;
var right = 0;
var again = false;

function waitForSeconds(seconds) {
  return new Promise(resolve => {
    setTimeout(resolve, seconds * 1000);
  });
}

main();

async function main() {

  console.log(count);

  var intro = new Audio("audioFiles/audemyIntro.mp3");
  intro.play();
  await waitForSeconds(11);

  var options = new Audio("audioFiles/options.mp3");
  options.play();
  await waitForSeconds(4);



  again = true;
  while (again) {
    if (again) {

      again = false;

      var option = new Audio("audioFiles/optionAction.mp3");

      option.play();
      await waitForSeconds(8);
      clickable = true;
      console.log("at front again");
      mode = "mode";
      while (mode == "mode") {
        console.log("in the while mode");
        clickable = true;
        await waitForRecognitionResult();
        clickable = false;
      }

    }
    count = 0;
    right = 0;

    let mainPromise;
    if (mode == "math") {
      mainPromise = mainMath();
    } else if (mode == "spell") {
      mainPromise = mainSpell();
    }

    if (mainPromise) {
      await mainPromise;
    }
    console.log("HERE");
    mode = "again";
    while (mode == "again") {
      var again = new Audio("audioFiles/again.mp3");
      clickable = true;
      again.play();

      console.log(mode);
      await waitForSeconds(8);
      await waitForRecognitionResult();
      console.log("not stuck in wait...");
    }
    console.log(mode);
    //would you like to play again? respond yes or no
  }
}

//make gnereate word function
async function mainSpell() {

  var introSpell = new Audio('audioFiles/introSpell.mp3');
  introSpell.play();
  await waitForSeconds(12);

  while (count < roundCount) {
    count++;
    clickable = false;
    generateWord();
    // Perform some actions
    var qNum = new Audio('audioFiles/qNum.mp3');
    qNum.play();
    await waitForSeconds(2);
    speak(count);
    await waitForSeconds(2);

    var howSpell = new Audio('audioFiles/howSpell.mp3');
    howSpell.play();
    await waitForSeconds(2);

    console.log(word);
    speak(word);
    await waitForSeconds(1);
    clickable = true;
    await waitForRecognitionResult();

    await waitForSeconds(2);
    console.log(clickable);
  }
  if (right == 10) {
    var allRight = new Audio('audioFiles/allRight.mp3');
    allRight.play();
    await waitForSeconds(3);
  }
  else if (right >= 5) {
    var youGot = new Audio('audioFiles/youGot.mp3');
    youGot.play();
    await waitForSeconds(2);
    speak(right);
    var good = new Audio('audioFiles/good.mp3');
    good.play();
    await waitForSeconds(3);
  }
  else {

    var youGot = new Audio('audioFiles/youGot.mp3');
    youGot.play();
    await waitForSeconds(2);

    speak(right);
    var better = new Audio('audioFiles/better.mp3');
    better.play();
    await waitForSeconds(5);
  }
}

// Example usage

async function mainMath() {

  var introMath = new Audio('audioFiles/introMath.mp3');
  introMath.play();
  await waitForSeconds(11);


  while (count < roundCount) {
    count++;
    clickable = false;
    generateAdditionProblems();
    // Perform some actions
    var qNum = new Audio('audioFiles/qNum.mp3');
    qNum.play();
    await waitForSeconds(2);
    speak(count);
    await waitForSeconds(2);
    var whatIs = new Audio('audioFiles/whatIs.mp3');
    whatIs.play();
    await waitForSeconds(2);

    speak(num1);
    await waitForSeconds(1);

    var plus = new Audio('audioFiles/plus.mp3');
    plus.play();
    await waitForSeconds(1);

    speak(num2)
    await waitForSeconds(1);
    console.log(clickable);
    clickable = true;
    await waitForRecognitionResult();

    await waitForSeconds(2);


    console.log(clickable);
  }
  if (right == 10) {
    var allRight = new Audio('audioFiles/allRight.mp3');
    allRight.play();
    await waitForSeconds(3);
  }
  else if (right >= 5) {
    var youGot = new Audio('audioFiles/youGot.mp3');
    youGot.play();
    await waitForSeconds(1);
    speak(right);
    var good = new Audio('audioFiles/good.mp3');
    good.play();
    await waitForSeconds(3);
  }
  else {
    var youGot = new Audio('audioFiles/youGot.mp3');
    youGot.play();
    await waitForSeconds(1);
    speak(right);
    var better = new Audio('audioFiles/better.mp3');
    better.play();
    await waitForSeconds(5);
  }
}

// Continue with other actions

function generateAdditionProblems() {
  num1 = Math.floor(Math.random() * 10) + 1;
  num2 = Math.floor(Math.random() * 10) + 1;

  console.log(`What is  ` + num1 + ` +  ` + num2);

}


document.body.onclick = function() {

  console.log(clickable + " in function");
  if (clickable) {
    recognition.start();
    var start = new Audio('audioFiles/start.mp3');
    start.play();
    console.log('Ready to receive an answer.');

  }
}

async function waitForRecognitionResult() {
  return new Promise(resolve => {
    recognition.onresult = async function(event) {
      input = event.results[0][0].transcript;
      clickable = false;
      console.log(input + " input!");
      await checkInput();
      console.log("GOT HERE OMG");
      resolve(); // Resolve the promise to indicate the recognition result event has been received
    }
  });

}
async function checkInput() {
  console.log("CHECKERS");
  console.log(mode);
  console.log(input);
  if (mode == "mode") {
    if (input.includes("math")) {
      mode = "math";

    }
    else if (input.includes("spell")) {
      mode = "spell"
    }
    else {
      var errorMode = new Audio("audioFiles/errorMode.mp3");
      errorMode.play();
      await waitForSeconds(9);
    }
  }
  else if (mode == "math") {

    console.log("in math");

    console.log((num1 + num2) + "expected");
    console.log(input);
    console.log(toNum(input));
    if (num1 + num2 == toNum(input) || input.includes(num1 + num2)) {
      right++;
      var ding = new Audio('audioFiles/ding.mp3');
      ding.play();
      await waitForSeconds(.5);
      var correct = new Audio('audioFiles/correct.mp3');
      correct.play();

    } else {
      var drum = new Audio('audioFiles/drum.mp3');
      drum.play();
      await waitForSeconds(.5);
      var wrong = new Audio('audioFiles/wrong.mp3');
      wrong.play();
      await waitForSeconds(2);
      var correctWas = new Audio('audioFiles/correctWas.mp3');
      correctWas.play();
      await waitForSeconds(3);
      speak(num1 + num2);

    }
  }
  else if (mode == "spell") {

    formatString(input);
    console.log(input == word);
    console.log(word);
    if (input == word) {
      right++;
      var ding = new Audio('audioFiles/ding.mp3');
      ding.play();
      await waitForSeconds(.5);
      var correct = new Audio('audioFiles/correct.mp3');
      correct.play();

    } else {
      console.log(word);
      var drum = new Audio('audioFiles/drum.mp3');
      drum.play();
      await waitForSeconds(.5);
      var wrong = new Audio('audioFiles/wrong.mp3');
      wrong.play();
      await waitForSeconds(.5);
      await waitForSeconds(2);
      var correctWas = new Audio('audioFiles/correctWas.mp3');
      correctWas.play();
      await waitForSeconds(3);
      console.log(word + " d");
      console.log(separateWithSpaces(word));
      speak(separateWithSpaces(word));

    }
  }
  else if (mode == "again") {
    if (input.includes("yes")) {
      again = true;
      mode = "mode";

    }
    else if (input.includes("no")) {
      var outro = new Audio("audioFiles/outro.mp3");
      outro.play();
      mode = "done";
      await waitForSeconds(9);
    }

  }
  // resolve();
}
function separateWithSpaces(str) {
  // Split the string into an array of characters
  const characters = str.split('');

  // Join the characters with spaces in between
  const separatedString = characters.join(' ');

  return separatedString;
}

function formatString(str) {
  // Convert the string to lowercase
  const lowerCaseStr = str.toLowerCase();

  // Remove spaces from the string
  const formattedStr = lowerCaseStr.replace(/\s/g, '');

  input = formattedStr;
}

// Output: "helloworld"
function generateWord() {
  // Return the word at the randomly generated index
  word = easyWords[Math.floor(Math.random() * easyWords.length)];

}

recognition.onspeechend = function() {
  recognition.stop();
}


recognition.onnomatch = function(event) {

  clickable = true;
}

recognition.onerror = function(event) {
  if (event.error == "no-speech") {
    speak("Sorry, I didn't catch that. Please try again.");
    clickable = true;
  }

  clickable = true;
}
function speak(s) {
  utterance = new SpeechSynthesisUtterance(s);
  voices = speechSynthesis.getVoices()
  utterance.voice = voices[2];
  speechSynthesis.speak(utterance);
}

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

const easyWords = [
  "cat",
  "dog",
  "hat",
  "moon",
  "star",
  "fish",
  "bird",
  "tree",
  "cake",
  "ball",
  "duck",
  "frog",
  "desk",
  "door",
  "home",
  "lamp",
  "leaf",
  "milk",
  "nest",
  "park",
  "soap",
  "sock",
  "chair",
  "table",
  "mouse",
  "horse",
  "apple",
  "banana",
  "lemon",
  "grape",
  "melon",
  "orange",
  "peach",
  "pear",
  "cherry",
  "candy",
  "pizza",
  "burger",
  "apple",
  "bread",
  "cheese",
  "chicken",
  "pasta",
  "pizza",
  "salad",
  "sauce",
  "coffee",
  "juice",
  "water",
  "muffin",
  "butter",
  "sugar",
  "honey",
  "bread",
  "bottle",
  "bag",
  "car",
  "bus",
  "bike",
  "train",
  "truck",
  "plane",
  "boat",
  "van",
  "house",
  "store",
  "bank",
  "park",
  "zoo",
  "pool",
  "beach",
  "river",
  "lake",
  "hill",
  "city",
  "town",
  "school",
  "park",
  "farm",
  "forest",
  "ocean",
  "planet",
  "moon",
  "star",
  "sky",
  "cloud",
  "rain",
  "snow",
  "wind",
  "storm",
  "light",
  "dark",
  "cold",
  "hot",
  "warm",
  "cool",
  "wet",
  "dry",
  "fast",
  "slow",
  "quick",
  "easy",
  "hard",
  "soft",
  "loud",
  "quiet",
  "big",
  "small",
  "short",
  "tall",
  "thick",
  "thin",
  "skinny",
  "young",
  "old",
  "new",
  "fresh",
  "clean",
  "dirty",
  "happy",
  "sad",
  "angry",
  "scared",
  "tired",
  "sleepy",
  "purple",
  "green",
  "brown",
  "orange",
  "yellow",
  "pink",
  "black",
  "fun",
  "boring",
  "nice",
  "mean",
  "kind",
  "rude",
  "good",
  "bad",
  "right",
  "wrong",
  "true",
  "false",
  "smart",
  "dumb",
  "brave",
  "coward",
  "rich",
  "safe",
  "danger",
  "healthy",
  "sick",
  "alive",
  "dead",
  "beautiful",
  "ugly",
  "pretty",
  "handsome",
  "clever",
  "stupid",
  "calm",
  "wild",
  "friendly",
  "happy",
  "merry",
  "joyful",
  "sad",
  "gloomy",
  "serious",
  "silly",
  "laugh",
  "cry",
  "smile",
  "frown",
  "wink",
  "nod",
  "shake",
  "blink",
  "yawn",
  "stretch",
  "jump",
  "run",
  "walk",
  "crawl",
  "swim",
  "fly",
  "climb",
  "fall",
  "ride",
  "drive",
  "row",
  "lift",
  "push",
  "pull",
  "throw",
  "catch",
  "kick",
  "hit",
  "fight",
  "argue",
  "agree",
  "disagree",
  "listen",
  "speak",
  "talk",
  "whisper",
  "shout",
  "read",
  "write",
  "draw",
  "paint",
  "color",
  "build",
  "destroy",
  "fix",
  "break",
  "open",
  "close",
  "start",
  "finish",
  "stop",
  "go",
  "stay",
  "leave",
  "enter",
  "exit",
  "find",
  "lose",
  "win",
  "lose",
  "earn",
  "spend",
  "buy",
  "sell",
  "pay",
  "receive",
  "give",
  "take",
  "keep",
  "throw",
  "catch",
  "drop",
  "pick",
  "put",
  "move",
  "turn",
  "lift",
  "pull",
  "push",
  "carry",
  "hold",
  "touch",
  "feel",
  "watch",
  "listen",
  "smell",
  "taste",
  "drink",
  "sleep",
  "dream",
  "wake",
  "work",
  "rest",
  "play",
  "study",
  "learn",
  "teach",
  "think",
  "remember",
  "forget",
  "understand",
  "know",
  "believe",
  "doubt",
  "hope",
  "wish",
  "imagine",
  "create",
  "invent",
  "discover",
  "explore",
  "solve",
  "plan",
  "decide",
  "choose",
  "change",
  "stay",
  "remain",
  "live",
  "born",
  "grow",
  "develop",
  "age",
  "mature",
  "youth",
  "adult",
  "child",
  "baby",
  "parent",
  "mother",
  "father",
  "brother",
  "sister",
  "friend",
  "enemy",
  "stranger",
  "neighbor",
  "teacher",
  "student",
  "doctor",
  "nurse",
  "engineer",
  "artist",
  "musician",
  "actor",
  "writer",
  "singer",
  "dancer",
  "chef",
  "waiter",
  "driver",
  "pilot",
  "captain",
  "sailor",
  "farmer",
  "soldier",
  "policeman",
  "fireman",
  "lawyer",
  "judge",
  "athlete",
  "coach",
  "referee",
  "judge",

]