import throttle from 'lodash.throttle';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getData } from "./api";

let searchQuery = "";
const PER_PAGE = 40;
let page = 1;
let totalPages = 0;
let totalItems = 0;
let items = [];

const refs = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("input[type=text]"),
  gallery: document.querySelector(".gallery"),
  header: document.querySelector(".header"),
  clearBtn: document.querySelector(".btn-clear"),
  loadMoreBtn: document.querySelector(".load-more"),
};

refs.form.addEventListener("submit", onHandleSubmit);

function onHandleSubmit(event) {
  event.preventDefault();

  const { value } = event.target.searchQuery;
  // console.log(value);
  refs.gallery.innerHTML = "";
  page = 1;
  
  // if (searchQuery === value || !value) {
  //   // return;
  //   refs.gallery.innerHTML = "";
  //   page = 0;
  //   getImages();
  // }

  searchQuery = value;

  getImages();
};

function getImages() {
  getData(searchQuery, PER_PAGE, page)
    .then(({ data }) => {
      
      items = data.hits;
      totalItems = data.totalHits;
      totalPages = Math.ceil(totalItems / PER_PAGE);
      console.log(totalPages);

      if (items.length === 0) {
        Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        return;
      }

      if (totalItems > 0) {
        Notify.success(`Hooray! We found ${totalItems} images.`);
      }
      
      if (page >= totalPages) {
        Notify.info("We're sorry, but you've reached the end of search results.");
      }
      
      renderGallery(items);
    })
    .catch((error) => console.log(error));
};

function renderGallery (items) {
  const markup = items.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card"><a class="gallery__item" href="${largeImageURL}">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b> ${likes}
    </p>
    <p class="info-item">
      <b>Views</b> ${views}
    </p>
    <p class="info-item">
      <b>Comments</b> ${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b> ${downloads}
    </p>
  </div></a></div>`
  }).join("");

  refs.gallery.insertAdjacentHTML("beforeend", markup);
  
  let lightBox = new SimpleLightbox(".gallery a", {
    captionsData: "alt",
    captionDelay: 250
  });
  lightBox.refresh();
  const { height: cardHeight } = document
  .querySelector(".gallery")
  .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
};

refs.loadMoreBtn.addEventListener("click", handleLoadMore);

function handleLoadMore() {
  if (items.length && page < totalPages) {
    page += 1;
    getImages();
  }
}

const observer = new IntersectionObserver(onButtonIntersect);
observer.observe(refs.loadMoreBtn);

function onButtonIntersect(entities) {
  const [button] = entities;

  if (button.isIntersecting) {
    handleLoadMore();
  }
};

window.addEventListener("scroll", throttle(onScroll, 3000));
function onScroll() {
  refs.header.classList.add("on-scroll");
};

refs.clearBtn.addEventListener("click", onClearBtnClick);
function onClearBtnClick(event) {
  refs.input.value = "";
}

/*
Notify.failure("Sorry, there are no images matching your search query. Please try again.");
Notify.info("We're sorry, but you've reached the end of search results.");
Notify.success("Hooray! We found totalHits images.");
*/