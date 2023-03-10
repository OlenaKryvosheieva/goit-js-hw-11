import { Notify } from 'notiflix';

import ApiService from './js/ApiService';
import LoadMoreBtn from './js/LoadMoreBtn';
import { refs } from './js/refs';
import {
  createMarkup,
  appendToGallery,
  clearGallery,
} from './js/render-functions';

const apiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

refs.form.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', fetchData);

function onSubmit(e) {
  e.preventDefault();

  loadMoreBtn.hide();

  // const form = e.currentTarget;
  // const value = form.elements.searchQuery.value.trim();

  // const form = e.currentTarget;
  const inputValue = e.target.elements.searchQuery.value.trim();

  if (!inputValue) {
    loadMoreBtn.hide();
    clearGallery();
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  }

  apiService.query = inputValue;

  clearGallery();
  apiService.resetPage();

  fetchData();
  refs.form.reset();
}

async function fetchData() {
  try {
    let currentHits = apiService.currentHits();

    const { hits, totalHits } = await apiService.getData();

    if (!hits.length) {
      loadMoreBtn.hide();
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    const markup = hits.reduce((markup, hit) => createMarkup(hit) + markup, '');
    appendToGallery(markup);

    if (currentHits >= totalHits) {
      loadMoreBtn.hide();
      Notify.info("We're sorry, but you've reached the end of search results.");
      return '';
    }

    loadMoreBtn.show();
  } catch (error) {
    console.log(error);
  }
}
