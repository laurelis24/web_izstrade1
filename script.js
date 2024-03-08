const body = document.body;
const navbar = document.querySelector(".nav-bar");
const galeryModal = document.querySelector(".galery-modal");
const exitGaleryBtn = document.querySelector(".btn-g-exit");
const leftGaleryBtn = document.querySelector(".btn-left");
const rightGaleryBtn = document.querySelector(".btn-right");
const imageContainer = document.querySelector(".image-container");
const galeryImg = document.getElementById("galery-img");
const imageGalery = document.querySelector(".pictures-container");
const factText = document.querySelector(".fact");
const video = document.querySelector(".video");
const videoLoadingScreen = document.querySelector(".video-loading-screen");
const scrollUpBtn = document.querySelector(".btn-scroll-up");
const audioBtn = document.querySelector(".btn-tiger-roar");
const audioTigerRoar = document.getElementById("audio-tiger-roar");

/// settings
const INTERVAL_BETWEEN_FACTS_MS = 5000;
const AUDIO_VOLUME = 20;

let imgIdx = 0;
let factIdx = 0;
let previousScrollPos = window.scrollY;
let timeOut = 0;
let audioClicked = false;

const tigerFacts = [
  "Tīģera acis ir apaļas atšķirībā no mājas kaķiem, kam tās ir mazliet sašaurinātas. Tas tāpēc, ka citi kaķi labāk medī naktīs, bet tīģeri krēslas laikā, galvenokārt no rīta un vakarā.",
  "Tīģeri neredz naktīs tik labi kā daudzi citi kaķu dzimtes pārstāvji. Tīģerim naktī redze ir aptuveni 6 reizes labāka nekā cilvēkam.",
  "Vairums tīģeru ir dzeltanas acis, bet baltajiem tīģeriem tās ir zilas.",
  "Katra tīģera svītras ir unikālas tā pat kā cilvēka pirkstu nospiedumi. Nav tīģeru ar vienādu kažoku.",
  "Tīģera pieres marķējums līdzinās ķīniešu heroglifam, ko apzīmē kā karalis. Tas dod tīģerim kulta reliģisko statusu.",
  "Atšķirībā gandrīz no visiem lielajiem kaķiem tīģeri ir lieliski peldētāji. Viņi bauda peldēšanu un bieži spēlējās ūdenī. Pieauguši tīģeri var nopeldēt vairākus kilometrus, lai piekļūtu medījumam, viņi bez problēmām šķērso upes. Garākais reģistrētais tīģera peldējums ir mazliet vairāk kā 30 km.",
  "Tīģeri ir pilnīgi akli savas dzīves pirmajā nedēļā.",
  "Tīģeris parasti neuzbrūk, ja medījamais dzīvnieks viņu jau ir ieraudzījis, jo tad zūd pārsteiguma moments.",
  "Tīģeri var atīstīt ātrumu virs 60 km/h, bet tikai nelielos attālumos.",
  "Tīģeris var aizlēkt vairāk nekā 6 m tālu un uzlēkt vairāk nekā 5 metru augstumā.",
  "Apēram puse tīģeru neizdzīvo līdz pilngadībai.",
];

const tigerImageUrl = {
  1: "https://images6.alphacoders.com/352/352939.jpg",
  2: "https://www.itl.cat/pngfile/big/10-105136_full-hd-1080p-tiger-wallpapers-hd-desktop-backgrounds.jpg",
  3: "https://i.ytimg.com/vi/F1Lo5DPXgHE/maxresdefault.jpg",
  4: "https://www.wallpapers13.com/wp-content/uploads/2019/02/Tiger-in-the-Trees-4K-Ultra-HD-Wallpaper-for-Desktop-Laptop-Tablet-Mobile-Phones-And-TV-3840x2400-.jpg",
  5: "https://res.cloudinary.com/jerrick/image/upload/c_scale,f_jpg,q_auto/6092be934fae18001df9f57d.jpg",
  6: "https://static.vecteezy.com/system/resources/previews/024/615/614/large_2x/majestic-bengal-tiger-staring-beauty-in-nature-wildcat-in-focus-generated-by-ai-free-photo.jpg",
  7: "https://wallpapermemory.com/uploads/104/tiger-background-hd-1920x1080-115590.jpg",
  8: "https://wallpapers-hub.art/wallpaper-images/366140.jpg",
};

window.onload = () => {
  createImages();
  textFactAnimation();
  setAudioVolume();
};

video.addEventListener("loadeddata", () => {
  setInterval(() => {
    videoLoadingScreen.classList.add("hide");
  }, 1500);
});

/// EVENTS

exitGaleryBtn.addEventListener("click", closeGaleryModal);
leftGaleryBtn.addEventListener("click", decreaseImgIdx);
rightGaleryBtn.addEventListener("click", increaseImgIdx);
scrollUpBtn.addEventListener("click", scrollUp);
audioBtn.addEventListener("click", playSound);

window.addEventListener("resize", () => {
  if ((window.innerWidth <= 1000 || window.innerHeight <= 300) && !galeryModal.className.includes("close")) {
    galeryModal.classList.add("close");
  }
});
window.addEventListener("scroll", () => {
  showHideNavbar();
  hideScrollUpBtn();
});

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
  newImg.src = tigerImageUrl[imgIdx];
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

function textFactAnimation(idx = 0) {
  let fact = tigerFacts[idx];

  for (let i = 0; i < fact.length; i++) {
    const spanText = document.createElement("span");
    spanText.classList.add("hide");
    spanText.innerText = fact[i];
    factText.appendChild(spanText);
    setTimeout(async () => {
      const newSpanText = document.createElement("span");
      newSpanText.innerText = fact[i];
      spanText.replaceWith(newSpanText);

      if (i >= fact.length - 1) {
        await checkPromiseForAnimation();
        await shrinkAnimation();
        textFactAnimation(idx >= tigerFacts.length - 1 ? 0 : idx + 1);
      }
    }, i * 60);
  }
}

function shrinkAnimation() {
  return new Promise(res => {
    setTimeout(() => {
      Array.from(factText.children).forEach(char => {
        char.classList.add("shrink");
        setTimeout(() => {
          factText.removeChild(factText.firstChild);
          res(1);
        }, 1000);
      });
    }, INTERVAL_BETWEEN_FACTS_MS);
  });
}
function checkPromiseForAnimation() {
  return new Promise(res => {
    res(1);
  });
}

function showHideNavbar() {
  let nextPos = window.scrollY;
  if (nextPos <= 280) return;

  if (nextPos > previousScrollPos) {
    if (!navbar.className.includes("hide")) {
      navbar.classList.add("hide");
    }
  } else if (nextPos < previousScrollPos) {
    if (navbar.className.includes("hide")) {
      navbar.classList.remove("hide");
    }
  }
  previousScrollPos = nextPos;
}

function hideScrollUpBtn() {
  let half = body.scrollHeight / 3;
  if (window.scrollY >= half && scrollUpBtn.className.includes("hide")) {
    scrollUpBtn.classList.remove("hide");
  } else if (window.scrollY < half && !scrollUpBtn.className.includes("hide")) {
    scrollUpBtn.classList.add("hide");
  }
}

function playSound() {
  if (audioClicked) return;
  audioClicked = true;
  if (audioClicked) {
    setTimeout(() => {
      audioClicked = false;
    }, audioTigerRoar.duration * 1000);

    audioTigerRoar.currentTime = 0;
    audioTigerRoar.play();
  }
}

function setAudioVolume() {
  audioTigerRoar.volume = AUDIO_VOLUME / 100;
}

function scrollUp() {
  window.scroll(0, 0);
}

function createImages() {
  for (let i in tigerImageUrl) {
    const newImg = document.createElement("img");
    newImg.src = tigerImageUrl[i];
    newImg.alt = `Tiger${i}`;

    newImg.addEventListener("click", () => openGaleryModal(i));

    imageGalery.appendChild(newImg);
  }
}
