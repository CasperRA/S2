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
let notified = true;
let notifyspans = document.getElementsByClassName("notify-mark");
function checkNotify() {
  if (notified == true) {
    [].slice.call(notifyspans).forEach(function (span) {
      span.innerHTML = "✓";
      span.classList.add("checkmark");
    });
  }
  if (notified !== true) {
    [].slice.call(notifyspans).forEach(function (span) {
      span.innerHTML = "x";
    });
  }
}

window.onload = checkNotify;

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
