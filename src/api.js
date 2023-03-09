export { getImages };
import axios from "axios";

// const axios = require('axios');
const API_KEY = "34233936-07b157599ce71148811fea33a";
const URL = "https://pixabay.com/api/";
// axios.defaults.baseURL = URL;

const getImages = async (query, perPage, page) => {
  const response = await axios.get(`${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${perPage}&page=${page}`).catch((error) => console.log(error));
  return response;
};