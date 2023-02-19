import { refs } from './refs';

export function createMarkup({
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) {
  return `
    <div class="photo-card">
  <img src="${webformatURL}" alt="${tags}" loading="lazy" width="250px" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>
    `;
}

export function appendToGallery(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

export function clearGallery() {
  refs.gallery.innerHTML = '';
}

// import { refs } from './refs';

// export function clearForm() {
//   refs.form.innerHTML = '';
// }

// export function clearCountryInfo() {
//   refs.countryInfo.innerHTML = '';
// }

// export function createCountryInfo({
//   name,
//   capital,
//   population,
//   flags,
//   languages,
// }) {
//   const langEl = Object.values(languages).join(', ');

//   return `
//   <div class="country-card">
//   <img src="${flags.svg}" width="100px">
//   <h2> ${name.official} </h2>
//   </div>
//   <p><span class="country-text"> Capital:</span> ${capital} </p>
//   <p><span class="country-text">Population:</span> ${population} </p>
//   <p><span class="country-text">Languages:</span> ${langEl}</p>
//    `;
// }

// export function createCountryList({ flags, name }) {
//   return `
//       <li class="country-item"><img src="${flags.svg}" width="40px" >${name.official}
//       </li>
