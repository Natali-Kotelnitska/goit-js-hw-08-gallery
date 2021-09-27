// export default
const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

// 1. Створення і рендер розмітки по масиву даних galleryItems з app.js і наданим шаблоном.

const galleryItemsRef = document.querySelector('.js-gallery');

const galleryMarkup = createGalleryMarkup(galleryItems);
galleryItemsRef.insertAdjacentHTML('beforeend', galleryMarkup);

function createGalleryMarkup(items) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
`;
    })
    .join('');
}

// 2. Реалізація делегування на галереї ul.js-gallery (і отримання url великого зображення).
const modalWindowRef = document.querySelector('.js-lightbox');
const modalBtnRef = document.querySelector('[data-action="close-lightbox"]');
const imageSourceRef = document.querySelector('.lightbox__image');
const lightboxContentRef = document.querySelector('.lightbox__overlay');

galleryItemsRef.addEventListener('click', onOpenModalWindow);
modalBtnRef.addEventListener('click', onCloseModalBtn);
lightboxContentRef.addEventListener('click', onCloseLightbox);

// 3. Відкриття модального вікна при натисканні на елементі галереї.
function onOpenModalWindow(e) {
  e.preventDefault();
  console.log(e.target.nodeName);
  if (e.target.nodeName !== 'IMG') {
    return;
  } else {
    window.addEventListener('keydown', onEskKeyPress);
    modalWindowRef.classList.add('is-open');
    //   4. Підміна значення атрибута src елемента img.lightbox\*\* image.
    imageSourceRef.src = e.target.dataset.source;
    imageSourceRef.alt = e.target.alt;
  }
}

//   5. Закриття модального вікна при натисканні на кнопку
// button[data - action= ""close - lightbox"].
function onCloseModalBtn(e) {
  window.removeEventListener('keydown', onEskKeyPress);
  modalWindowRef.classList.remove('is-open');
  // 6. Очищення значення атрибута src елемента img.lightbox\*\*image. Це необхідно для того, щоб при
  //    наступному відкритті модального вікна, поки вантажиться зображення, ми не бачили попереднє.
  imageSourceRef.src = '';
  imageSourceRef.alt = '';
}

// 7.(Додатково)Закриття модального вікна при натисканні на div.lightbox__overlay.
function onCloseLightbox(event) {
  if (event.currentTarget === event.target) {
    // console.log('click on overlay') - перевірка;
    onCloseModalBtn();
  }
}

// 8. Закриття модального вікна після натискання клавіші ESC.
function onEskKeyPress(event) {
  const isEscape = event.code === 'Escape';
  if (isEscape) {
    onCloseModalBtn();
  }
}

// 9. Перегортування зображень галереї у відкритому модальному вікні клавішами "вліво"   і "вправо".
const imagesDataSources = galleryItems.map(element => {
  return element.original;
});
// console.log(imagesDataSources);

document.addEventListener('keydown', e => {
  const currentIndex = imagesDataSources.indexOf(imageSourceRef.src);
  if (e.key === 'ArrowLeft') {
    leftClick(currentIndex);
  } else if (e.key === 'ArrowRight') {
    rightClick(currentIndex);
  }
});

function leftClick(currentIndex) {
  let nextIndex = currentIndex - 1;
  if (nextIndex === -1) {
    nextIndex = imagesDataSources.length - 1;
  }
  imageSourceRef.src = imagesDataSources[nextIndex];
}

function rightClick(currentIndex) {
  let nextIndex = currentIndex + 1;
  if (nextIndex === imagesDataSources.length) {
    nextIndex = 0;
  }
  imageSourceRef.src = imagesDataSources[nextIndex];
}
