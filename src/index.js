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

  const form = e.currentTarget;
  const value = form.elements.searchQuery.value.trim();
  apiService.query = value;
  clearGallery();
  apiService.resetPage();

  loadMoreBtn.show();

  fetchData().finally(() => form.reset());
}

function fetchData() {
  loadMoreBtn.disable();
  let currentHits = apiService.currentHits();
  // console.log(currentHits);

  return apiService
    .getData()
    .then(({ hits, totalHits }) => {
      if (!hits.length) {
        loadMoreBtn.hide();
        Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
        return;
      }

      const markup = hits.reduce(
        (markup, hit) => createMarkup(hit) + markup,
        ''
      );
      appendToGallery(markup);

      if (currentHits >= totalHits) {
        loadMoreBtn.hide();
        Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        return '';
      }

      loadMoreBtn.enable();
    })

    .catch(console.log);
}
