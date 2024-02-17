let body = document.body;
let bookTitleInput = document.getElementById("book-title-input");
let booksSection = document.querySelector(".books-section");

const LINK =
  "https://thumbs.dreamstime.com/b/book-flat-icon-gray-background-any-occasion-promotion-sale-template-banner-flayer-poster-other-142214053.jpg";

const bookShowLimit = 10;

// EVENT LISTENERS //
bookTitleInput.addEventListener("keydown", e => {
  if (e.key == "Enter" && bookTitleInput.value.trim() !== "") {
    searchForBook(bookTitleInput.value.trim());
    bookTitleInput.value = "";
  }
});

async function searchForBook(bookTitle) {
  const response = await fetch(`https://openlibrary.org/search.json?q=${bookTitle}`);
  const book = await response.json();

  for (let i = 0; i < bookShowLimit; i++) {
    let coverId = book.docs[i].cover_i;
    createImage(coverId);
  }
}

function createImage(coverId) {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-container");

  const bookImage = document.createElement("img");

  if (!coverId) {
    bookImage.src = LINK;
  } else {
    bookImage.src = `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`;
  }

  bookImage.classList.add("book-img");

  bookContainer.appendChild(bookImage);
  booksSection.appendChild(bookContainer);
}
