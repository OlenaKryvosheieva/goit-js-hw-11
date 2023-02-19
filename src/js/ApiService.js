import axios from 'axios';

const ENDPOINT = 'https://pixabay.com/api/';
const KEY = '33749552-8a2bf10035cffd848e31b3518';

const searchParams = new URLSearchParams({
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
}).toString();

export default class ApiService {
  constructor() {
    this.page = 1;
    this.query = '';
    this.per_page = 40;
  }

  async getData() {
    const URL = `${ENDPOINT}?key=${KEY}&q=${this.query}&${searchParams}'&per_page=${this.per_page}&page=${this.page}`;

    const response = await axios.get(URL);
    this.nextPage();

    return response.data;

    // return axios.get(URL).then(({ data }) => {
    //   this.nextPage();

    //   return data;
    // });
  }

  nextPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  currentHits() {
    return this.page * this.per_page;
  }
}
