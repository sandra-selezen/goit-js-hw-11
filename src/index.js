import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import { getImages } from './api';

let searchQuery = "";
const PER_PAGE = 40;
let page = 1;
let totalPages = 0;
let items = [];
let totalItems = 0;

const refs = {
  form: document.querySelector("#search-form"),
  gallery: document.querySelector(".gallery"),
}

const renderGallery = items => {
  const murkup = items.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<a class="gallery__item" href="${largeImageURL}"><div class="photo-card">
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
  </div>
</div></a>`
  }).join("");
  
  refs.gallery.innerHTML = murkup;
  // refs.gallery.insertAdjacentElement("beforeend", murkup);
}

const onHandleSubmit = (event) => {
  event.preventDefault();
  const { value } = event.target.searchQuery;
  searchQuery = value;

  getImages(searchQuery, PER_PAGE, page)
    .then(({data}) => {
      items = data.hits;
      totalItems = data.totalHits;
      renderGallery(items);
      console.log(items);
    })
    .catch((error) => console.log(error));
}

refs.form.addEventListener("submit", onHandleSubmit);

let lightBox = new SimpleLightbox('.gallery a', {
  captionsData: "alt",
  captionDelay: 250
});

lightBox.on('show.simplelightbox', function () {
  console.log(lightBox);
});

lightBox.on('error.simplelightbox', function (event) {
	console.log(event); // some usefull information
});

/*
Notify.failure("Sorry, there are no images matching your search query. Please try again.");
Notify.info("We're sorry, but you've reached the end of search results.");
Notify.success("Hooray! We found totalHits images.");
*/