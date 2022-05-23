let tabs = document.getElementById("menu-tabs");

function menutabs() {
  if (tabs.style.display === "none") {
    tabs.style.display = "flex";
  } else {
    tabs.style.display = "none";
  }
}
// Set a drop date & time
let nextDropDate = new Date("May 24, 2022 15:30:00").getTime();

// Updates the count down for given interval, set to 1 second (1000 miliseconds)
let x = setInterval(function () {
  // Get current date & time
  let currentDate = new Date().getTime();

  // Measure distance between drop and current date
  let distance = nextDropDate - currentDate;

  let days = Math.floor(distance / (1000 * 60 * 60 * 24));

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (days > 0) {
    document.getElementById("countdown").innerHTML =
      days + ":" + hours + ":" + minutes + ":" + seconds;
  }
  if (days === 0) {
    document.getElementById("countdown").innerHTML =
      hours + ":" + minutes + ":" + seconds;
  }

  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "live";
  }
}, 1000);

function testScroll(ev) {
  if (window.pageYOffset > 50) {
    document
      .getElementById("countdown")
      .classList.remove("floating-timer-offset");
  }
  if (window.pageYOffset < 50) {
    document.getElementById("countdown").classList.add("floating-timer-offset");
  }
}
window.onscroll = testScroll;

let notifyspans = document.getElementsByClassName("notify-mark");
let notified = false;

let storedNotify = localStorage.getItem("getNotify");

console.log(storedNotify);

function toggleNotify() {
  console.log("toggleNotify");
  console.log(storedNotify);
  if (storedNotify == "on") {
    console.log("toggleoff");
    localStorage.setItem("getNotify", "off");
    storedNotify = localStorage.getItem("getNotify");
    checkNotify();
  } else if (storedNotify == "off" || storedNotify == null) {
    console.log("toggleon");
    localStorage.setItem("getNotify", "on");
    storedNotify = localStorage.getItem("getNotify");
    checkNotify();
  }
}

function checkNotify() {
  console.log(storedNotify);
  if (storedNotify == "on") {
    [].slice.call(notifyspans).forEach(function (span) {
      span.innerHTML = "✓";
      span.classList.add("checkmark");
    });
  } else if (storedNotify == "off") {
    [].slice.call(notifyspans).forEach(function (span) {
      span.innerHTML = "x";
      span.classList.remove("checkmark");
    });
  }
  let galleryArray = galleryNotify.split(",");
  console.log(galleryArray);
  for (let i = 0; i < galleryArray.length; i++) {
    document.getElementById("noti" + galleryArray[i]).classList.add("hidden");
    document
      .getElementById("check" + galleryArray[i])
      .classList.remove("hidden");
  }
}

window.onload = checkNotify;

let galleryNotify = localStorage.getItem("notiClothes");
console.log(galleryNotify);
let galleryValues = [];

galleryValues = galleryNotify.split(",");

console.log(galleryValues);

function galleryClothesNotify(x) {
  for (let i = 0; i < galleryValues.length; i++) {
    if (galleryValues[i] == x) {
      galleryValues.splice(i, 1);
      localStorage.setItem("notiClothes", galleryValues);
      galleryNotify = localStorage.getItem("notiClothes");
      document.getElementById("noti" + x).classList.remove("hidden");
      document.getElementById("check" + x).classList.add("hidden");
      return;
    }
  }
  galleryValues.push(x);
  localStorage.setItem("notiClothes", galleryValues);
  galleryNotify = localStorage.getItem("notiClothes");
  loadNotiClothes();
}

function loadNotiClothes() {
  let galleryArray = galleryNotify.split(",");
  console.log(galleryArray);
  for (let i = 0; i < galleryArray.length; i++) {
    document.getElementById("noti" + galleryArray[i]).classList.add("hidden");
    document
      .getElementById("check" + galleryArray[i])
      .classList.remove("hidden");
  }
}
