const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const heroImage = document.getElementById("heroImage");

let noCount = 0;
const growthStep = 0.12;
const buttonGap = 12;
const initialTopRatio = 0.62;

// Change this to any GIF URL you want to play when "Yes" is clicked.
const selectedGifUrl =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Jqc3h4dzN4MzN2Zm4zM2NpN2Jxb3Q2cm85ZXJ2N3A2MmwwMHVhZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlO2J7el5N9ud7a/giphy.gif";

function setInitialButtonPositions() {
  const areaRect = buttonArea.getBoundingClientRect();
  const yesWidth = yesBtn.offsetWidth;
  const noWidth = noBtn.offsetWidth;
  const buttonHeight = Math.max(yesBtn.offsetHeight, noBtn.offsetHeight);

  const totalWidth = yesWidth + noWidth + buttonGap;
  const startX = Math.max(0, (areaRect.width - totalWidth) / 2);
  const startY = Math.max(0, areaRect.height * initialTopRatio - buttonHeight / 2);

  yesBtn.style.left = `${startX}px`;
  yesBtn.style.top = `${startY}px`;
  noBtn.style.left = `${startX + yesWidth + buttonGap}px`;
  noBtn.style.top = `${startY}px`;
}

function moveNoButton() {
  const areaRect = buttonArea.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();

  const maxX = Math.max(0, areaRect.width - noRect.width);
  const maxY = Math.max(0, areaRect.height - noRect.height);

  const randomX = Math.random() * maxX;
  const randomY = Math.random() * maxY;

  noBtn.style.left = `${randomX}px`;
  noBtn.style.top = `${randomY}px`;
}

noBtn.addEventListener("click", () => {
  noCount += 1;
  const newScale = 1 + noCount * growthStep;
  yesBtn.style.transform = `scale(${newScale})`;
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  heroImage.src = selectedGifUrl;
  heroImage.alt = "Celebration GIF";
});

window.addEventListener("resize", setInitialButtonPositions);

setInitialButtonPositions();
