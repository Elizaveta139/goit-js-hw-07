import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
galleryContainer.addEventListener("click", onClickImg);

// Markup

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `<li class="gallery__item">
        <a class="gallery__link" href="${original}">
            <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
            />
        </a>
        </li>`;
    })
    .join("");
}

// Модальне вікно

const instance = basicLightbox.create(
  `<img width="auto" height="auto" src="">`,
  {
    onShow: (instance) => {
      window.addEventListener("keydown", onCloseEscKey);
    },
    onClose: (instance) => {
      window.removeEventListener("keydown", onCloseEscKey);
    },
  }
);

function onClickImg(event) {
  event.preventDefault();

  const dataSource = event.target.dataset.source;

  if (!dataSource) {
    return;
  }

  instance.element().querySelector("img").src = dataSource;
  instance.show();
}

// закриття Esc

function onCloseEscKey(event) {
  if (event.code !== "Escape") {
    return;
  }
  instance.close();
}
