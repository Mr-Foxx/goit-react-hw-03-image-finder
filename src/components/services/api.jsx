import axios from "axios";

const KEY ='34551974-263ab9c7e5b8efeaa679c471a';
const URL = 'https://pixabay.com/api/'

const getImages = async (inputValue,page) => {
    return await axios.get(`${URL}?q=${inputValue}&page=${page}&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  }
  
export {getImages}

