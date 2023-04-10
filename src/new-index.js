import throttle from 'lodash.throttle';
import { Notify } from "notiflix/build/notiflix-notify-aio";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import ImagesAPIService from "./api";

let lightBox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250
});

const imagesAPIService = new ImagesAPIService();

const refs = {
  form: document.querySelector("#search-form"),
  input: document.querySelector("input[type=text]"),
  gallery: document.querySelector(".gallery"),
  header: document.querySelector(".header"),
  clearBtn: document.querySelector(".btn-clear"),
  loadMoreBtn: document.querySelector(".load-more"),
};

let totalPages = 0;
let totalItems = 0;
// let items = [];

refs.form.addEventListener("submit", onHandleSubmit);

function onHandleSubmit(event) {
  event.preventDefault();

  imagesAPIService.query = event.target.searchQuery.value.trim();
  getImages();
  // items = imagesAPIService.getData();
  // console.log(items);
}

async function getImages() {
  try {
    const dataImages = await imagesAPIService.getData();
    console.log(dataImages);
    items = await dataImages.hits;
    console.log(items);
    return items;
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("scroll", throttle(onScroll, 3000));
function onScroll() {
  refs.header.classList.add("on-scroll");
};

refs.clearBtn.addEventListener("click", onClearBtnClick);
function onClearBtnClick(event) {
  refs.input.value = "";
}