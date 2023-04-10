// export { getData };
import axios from "axios";

const API_KEY = "34233936-07b157599ce71148811fea33a";
const BASE_URL = "https://pixabay.com/api/";
const PER_PAGE = 40;

const searchParams = new URLSearchParams({
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
});

export default class ImagesAPIService {
  constructor() {
    this.searchQuery = '';
    this.searchParams = searchParams;
    this.API_KEY = API_KEY;
    this.BASE_URL = BASE_URL;
    this.PER_PAGE = PER_PAGE;
    this.page = 1;
  }

  async getData() {
    const url = `${this.BASE_URL}?key=${this.API_KEY}&q=${this.searchQuery}&${this.searchParams}&per_page=${this.PER_PAGE}&page=${this.page}`;
    try {
      const response = await axios.get(url);
      const data = await response.data;
      console.log(data);
      return data;
      
      // const items = await data.hits;
      // console.log(items);
    } catch (error) {
      console.log(error);
    }
    //   const data = axios.get(url).then(() => {
    //   this.incrementPage();
    //   return data.hits;
    // }).catch((error) => console.log(error));
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}


// const getData = async (query, perPage, page) => {
//   const { data } = await axios.get(`${URL}?key=${API_KEY}&q=${query}&${searchParams}&per_page=${perPage}&page=${page}`)
//     .catch((error) => console.log(error));
//   // console.log(data.hits);
//   return data;
// };