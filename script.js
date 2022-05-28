let tabs = document.getElementById("menu-tabs");

function menutabs() {
  if (tabs.style.display === "none") {
    tabs.style.display = "flex";
  } else {
    tabs.style.display = "none";
  }
}
// Set a drop date & time
let nextDropDate = new Date("Jun 07, 2022 12:00:00").getTime();

// Runs the function every second (interval is set to 1000 miliseconds)
let x = setInterval(function () {
  // Get current date & time
  let currentDate = new Date().getTime();

  // Measure distance between drop and current date
  let distance = nextDropDate - currentDate;

  // Convert distance to days, hours, minutes and seconds.
  let days = Math.floor(distance / (1000 * 60 * 60 * 24));

  let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));

  let seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Checks if there are any days left, and removes the days once there is under 1 day left.
  if (days > 0) {
    document.getElementById("countdown").innerHTML =
      days + ":" + hours + ":" + minutes + ":" + seconds;
    document.getElementById("countdown").classList.remove("countdown-live");
  }
  if (days === 0) {
    document.getElementById("countdown").innerHTML =
      hours + ":" + minutes + ":" + seconds;
    document.getElementById("countdown").classList.remove("countdown-live");
  }

  // Stops the timer if it reaches 0 and sets the innerhtml of the timer to live along with a styling change
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("countdown").innerHTML = "live";
    document.getElementById("countdown").classList.add("countdown-live");
  }
}, 1000);

function checkScrollTimer() {
  if (window.pageYOffset > 50) {
    document
      .getElementById("countdown")
      .classList.remove("floating-timer-offset");
  }
  if (window.pageYOffset < 50) {
    document.getElementById("countdown").classList.add("floating-timer-offset");
  }
}
window.onscroll = checkScrollTimer;

let notifyspans = document.getElementsByClassName("notify-mark");
let notified = false;

let storedNotify = localStorage.getItem("getNotify");

let storedEmail = localStorage.getItem("getEmail");

let userEmail = "";

function toggleModalNotify() {
  // Checks if user has notifications on, if so, disables notifications & clears email, instead of opening modal.
  if (storedNotify == "on") {
    localStorage.setItem("getNotify", "off");
    storedNotify = localStorage.getItem("getNotify");
    localStorage.setItem("getEmail", "");
    checkNotify();
  }

  // Toggles between shown and hidden modal.
  else {
    if (
      document.getElementById("notify-modal").style.display === "none" ||
      document.getElementById("notify-modal").style.display === ""
    ) {
      document.getElementById("notify-modal").style.display = "block";
    } else {
      document.getElementById("notify-modal").style.display = "none";
    }
  }
}

// Saves the inputted email, if input is empty, it just closes the modal.
function saveEmail() {
  userEmail = document.getElementById("notify-email").value;
  if (userEmail === "") {
    console.log("no email");
    toggleModalNotify();
  } else {
    localStorage.setItem("getEmail", userEmail);
    storedEmail = localStorage.getItem("getEmail");
    localStorage.setItem("getNotify", "on");
    storedNotify = localStorage.getItem("getNotify");
    checkNotify();
    document.getElementById("notify-modal").style.display = "none";
  }
}

console.log(storedEmail);

// check for notifications and changes the innerhtml depending on enabled or disabled, with ✓ or x.
function checkNotify() {
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

  // Checks for the gallery, which of the items you have enabled notifications on and then swaps a picture to a ✓ if enabled.
  let galleryArray = galleryNotify.split(",");
  console.log(galleryArray);

  for (let i = 0; i < galleryArray.length; i++) {
    if (document.getElementById("noti" + galleryArray[i]) !== null) {
      document.getElementById("noti" + galleryArray[i]).classList.add("hidden");
      document
        .getElementById("check" + galleryArray[i])
        .classList.remove("hidden");
    }
  }
}
// Checks notifications on load
window.onload = checkNotify;

let galleryNotify = localStorage.getItem("notiClothes");
let galleryValues = [];

galleryValues = galleryNotify.split(",");

// adds or removes notifications from gallery clothes
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
