const body = document.body;
const navbar = document.querySelector(".nav-bar");
const galeryModal = document.querySelector(".galery-modal");
const exitGaleryBtn = document.querySelector(".btn-g-exit");
const leftGaleryBtn = document.querySelector(".btn-left");
const rightGaleryBtn = document.querySelector(".btn-right");
const imageContainer = document.querySelector(".image-container");
const galeryImg = document.getElementById("galery-img");
const imageGalery = document.querySelector(".image-galery-container");
const factText = document.querySelector(".fact");
const video = document.querySelector(".video");
const videoLoadingScreen = document.querySelector(".video-loading-screen");
video.onloadeddata = e => {
  setInterval(() => {
    videoLoadingScreen.classList.add("hide");
  }, 1500);
};

let imgIdx = 0;
let factIdx = 0;
let previousScrollPos = window.scrollY;
let timeOut = 0;

const tigerFacts = [
  "Tīģera acis ir apaļas atšķirībā no mājas kaķiem. Kam tās ir mazliet sašaurinātas. Tas tāpēc, ka citi kaķi labāk medi naktīs, bet tīģeri krēslas laikā, galvanokārt no rīta un vakarā.",
  "Tīģeri neredz naktīs tik labi ,ka daudzi citi kaķu dzimtes pārstāvji, tīģerim naktī redze ir aptuveni 6 reizes labāka nekā cilvēkam.",
  "Vairums tīģeru ir dzeltanas acis, bet baltajiem tīģeriem tās ir zilas.",
  "Katra tīģera svītras ir unikālas tā pat kā cilvēka pirkstu nospiedumi. Nav tīģeru ar vienādu kažoku.",
  "Tīģera pieres marķējums līdzinās ķīniešu heroglifam, ko apzīmē kā karalis. Tas dod tīģerim kulta reliģisko statusu.",
  "Atšķirībā gandrīz no visiem lielajiem kaķiem tīģeri ir lieliski peldētāji. Viņi bauda peldēšanu un bieži spēlējās ūdenī. Pieauguši tīģeri var nopeldēt vairākus kilometrus ,lai piekļūtu medījumam, viņi bez problēmām šķerso upes. Garākais reģistrētais tīģera peldējums ir mazliet vairāk kā 30 km.",
  "Tīģeri ir pilnīgi akli savas dzīves pirmajā nedēļā. Apēram puse tīģeru neizdzīvo līdz pilngadībai.",
  "Tīģeris parasti neuzbrūk ,ja medījamais dzīvnieks viņu jau ir ieraudzījis, jo tad zūd pārsteiguma moments.",
  "Tīģeri vat atīstīt atrumu virs 60 km/h , bet tikai nelielos attālumos.",
  "Tīģeris var aizlēkt vairāk nekā 6 m tālu un uzlēkt vairāk nekā 5 metru augstumā.",
];

/// EVENTS
Array.from(imageGalery.children).forEach((img, idx) => {
  img.addEventListener("click", () => openGaleryModal(idx + 1));
});
exitGaleryBtn.addEventListener("click", closeGaleryModal);
leftGaleryBtn.addEventListener("click", decreaseImgIdx);
rightGaleryBtn.addEventListener("click", increaseImgIdx);
window.addEventListener("resize", () => {
  if ((window.innerWidth <= 1000 || window.innerHeight <= 300) && !galeryModal.className.includes("close")) {
    galeryModal.classList.add("close");
  }
});

window.addEventListener("scroll", () => showHideNavbar());

function closeGaleryModal() {
  if (!galeryModal.className.includes("close")) {
    galeryModal.classList.add("close");
  }
}

function openGaleryModal(idx) {
  if (window.innerWidth <= 1000) return;

  if (galeryModal.className.includes("close")) {
    imgIdx = idx;
    changeImage();
    galeryModal.classList.remove("close");
  }
}

async function changeImage() {
  const newImg = document.createElement("img");
  newImg.classList.add("galery-img");
  newImg.src = `/images/galery/tiger_galery_${imgIdx}.jpg`;

  imageContainer.children[0].replaceWith(newImg);
}

function decreaseImgIdx() {
  if (timeOut > 0) return;
  if (imgIdx <= 1) {
    imgIdx = imageGalery.children.length;
  } else {
    imgIdx--;
  }
  timeOut++;
  changeImage();
  setTimeout(() => {
    timeOut = 0;
  }, 50);
}

function increaseImgIdx() {
  if (timeOut > 0) return;
  if (imgIdx >= 6) {
    imgIdx = 1;
  } else {
    imgIdx++;
  }
  timeOut++;
  changeImage();
  setTimeout(() => {
    timeOut = 0;
  }, 50);
}

factIdx++;

let sum = (tigerFacts[factIdx].length * tigerFacts[factIdx].length + 1) / 1.8;

textAnimation();

setInterval(async () => {
  factText.innerHTML = "";
  if (factIdx >= tigerFacts.length) {
    factIdx = 0;
  }
  factIdx++;
  textAnimation();
}, sum + 5000);

function textAnimation() {
  let fact = tigerFacts[factIdx];
  //let result = "";
  for (let i = 0; i < fact.length; i++) {
    const spanText = document.createElement("span");
    spanText.classList.add("hide");
    spanText.innerText = fact[i];
    factText.appendChild(spanText);
    setTimeout(() => {
      const newSpanText = document.createElement("span");
      newSpanText.innerText = fact[i];

      // factText.replaceChild(spanText, newSpanText);
      spanText.replaceWith(newSpanText);
      //spanText.innerText = fact[i];

      //console.log(result);
    }, i * 40);
  }
}

function showHideNavbar() {
  let nextPos = window.scrollY;

  if (nextPos > previousScrollPos) {
    previousScrollPos = nextPos;
    if (!navbar.className.includes("hide")) {
      navbar.classList.add("hide");
    }
  } else if (nextPos < previousScrollPos) {
    previousScrollPos = nextPos;
    if (navbar.className.includes("hide")) {
      navbar.classList.remove("hide");
    }
  }
}
