import { galleryItems } from "./gallery-items.js";
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector(".gallery");
const cardsMarkup = createGalleryItemsMarkup(galleryItems);

galleryContainer.insertAdjacentHTML("beforeend", cardsMarkup);
galleryContainer.addEventListener("click", onClickImg);

// Markup

function createGalleryItemsMarkup(items) {
  // console.log(items);
  return items
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

const instance = basicLightbox.create(`<img width="" height="" src="">`, {
  onShow: (instance) => {
    window.addEventListener("keydown", onCloseEscKey);
    // console.log(instance);
  },
  onClose: (instance) => {
    window.removeEventListener("keydown", onCloseEscKey);
  },
});

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
