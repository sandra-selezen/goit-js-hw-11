export { getData };
import axios from "axios";

// const axios = require('axios');
const API_KEY = "34233936-07b157599ce71148811fea33a";
const URL = "https://pixabay.com/api/";
// axios.defaults.baseURL = URL;
const searchParams = new URLSearchParams({
  image_type: "photo",
  orientation: "horizontal",
  safesearch: true,
});

const getData = async (query, perPage, page) => {
  const { data } = await axios.get(`${URL}?key=${API_KEY}&q=${query}&${searchParams}&per_page=${perPage}&page=${page}`)
    .catch((error) => console.log(error));
  // console.log(data.hits);
  return data;
};