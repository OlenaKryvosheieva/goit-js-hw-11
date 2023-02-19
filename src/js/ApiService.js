const ENDPOINT = 'https://pixabay.com/api/';
const KEY = '33749552-8a2bf10035cffd848e31b3518';
const searchParams = '&image_type=photo&orientation=horizontal&safesearch=true';
const per_page = '&per_page=40';

export default class ApiService {
  constructor() {
    this.page = 1;
    this.query = '';
  }

  getData() {
    const URL = `${ENDPOINT}?key=${KEY}&q=${this.query}${searchParams}${per_page}&page=${this.page}`;

    return fetch(URL)
      .then(response => response.json())
      .then(({ hits }) => {
        this.nextPage();
        return hits;
      });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}

// const URL = 'https://restcountries.com/v3.1/name/';
// const searchParams = 'fields=name,capital,population,flags,languages';

// export function fetchCountries(name) {
//   return fetch(`${URL}${name}?${searchParams}`).then(response => {
//     console.log(response);
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }

// const URL = 'https://pixabay.com/api/';
// const KEY = '33749552-8a2bf10035cffd848e31b3518';
// const searchParams = '&image_type=photo&orientation=horizontal&safesearch=true';
// const per_page = '&per_page=40';

// const URL =
//   'https://pixabay.com/api/?key=33749552-8a2bf10035cffd848e31b3518&q=cat&image_type=photo&orientation=horizontal&safesearch=true';

// const searchParams = new URLSearchParams({
//   image_type: 'photo',
//   orientation: 'horizontal',
//   safesearch: true,
// });
