const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const buttonArea = document.getElementById("buttonArea");
const heroImage = document.getElementById("heroImage");

let noCount = 0;
const growthStep = 0.12;
const buttonGap = 12;
const initialTopRatio = 0.62;

// Replace these with your own GIF links.
const yesGifUrl =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExN2Jqc3h4dzN4MzN2Zm4zM2NpN2Jxb3Q2cm85ZXJ2N3A2MmwwMHVhZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlO2J7el5N9ud7a/giphy.gif";
const noGifUrl =
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcm5qZWk3aDB3bWZqMjV0NG5zM2Q5eTR3MzQwa3JjNWEybHF4NnM5dCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/13borq7Zo2kulO/giphy.gif";

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

function intersectsYes(nextX, nextY) {
  const yesRect = yesBtn.getBoundingClientRect();
  const areaRect = buttonArea.getBoundingClientRect();

  const yesLeft = yesRect.left - areaRect.left;
  const yesTop = yesRect.top - areaRect.top;
  const yesRight = yesLeft + yesRect.width;
  const yesBottom = yesTop + yesRect.height;

  const noLeft = nextX;
  const noTop = nextY;
  const noRight = noLeft + noBtn.offsetWidth;
  const noBottom = noTop + noBtn.offsetHeight;

  const overlaps =
    noLeft < yesRight &&
    noRight > yesLeft &&
    noTop < yesBottom &&
    noBottom > yesTop;

  return overlaps;
}

function moveNoButton() {
  const areaRect = buttonArea.getBoundingClientRect();
  const maxX = Math.max(0, areaRect.width - noBtn.offsetWidth);
  const maxY = Math.max(0, areaRect.height - noBtn.offsetHeight);

  let randomX = 0;
  let randomY = 0;

  for (let i = 0; i < 100; i += 1) {
    randomX = Math.random() * maxX;
    randomY = Math.random() * maxY;

    if (!intersectsYes(randomX, randomY)) {
      noBtn.style.left = `${randomX}px`;
      noBtn.style.top = `${randomY}px`;
      return;
    }
  }

  noBtn.style.left = `${Math.max(0, maxX - 8)}px`;
  noBtn.style.top = "0px";
}

noBtn.addEventListener("click", () => {
  noCount += 1;
  const newScale = 1 + noCount * growthStep;
  yesBtn.style.transform = `scale(${newScale})`;
  heroImage.src = noGifUrl;
  heroImage.alt = "No response GIF";
  moveNoButton();
});

yesBtn.addEventListener("click", () => {
  heroImage.src = yesGifUrl;
  heroImage.alt = "Yes response GIF";
});

window.addEventListener("resize", setInitialButtonPositions);

setInitialButtonPositions();
