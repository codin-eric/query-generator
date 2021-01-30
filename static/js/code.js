var lclicks = 0;
var rclicks = 0;
var number = 0;
var startTime = 7;
var photosCount = 6;
var interval;
var timer = 7;

function main() {
  setTimeout(getImagePair, 1000);
  setInterval(showCountDown, 1000);
  interval = setInterval(getImagePair, timer * 1000);
}

function showCountDown() {
  document.getElementById("container-timer").innerHTML = startTime--;
}

function getImagePair() {
  lclicks = 0;
  rclicks = 0;
  startTime = timer;
  document.getElementById("left").innerHTML = lclicks;
  document.getElementById("right").innerHTML = rclicks;

  document.getElementById("success-box").style.backgroundImage = "url('/static/img/" + number + ".png')"
  document.getElementById("error-box").style.backgroundImage = "url('/static/img/" + (number + 1) + ".png')"
  number += 2;
  if (number > 6) {
    clearTimeout(interval);
  }
}

function onLeft() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://192.168.86.234:5000/counter', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    url: 0
  }));
};

function onRight() {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", 'http://192.168.86.234:5000/counter', true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    url: 1
  }));
};

main();