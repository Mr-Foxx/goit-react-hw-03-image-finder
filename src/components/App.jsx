import React , {Component} from "react";
import { getImages } from "./services/api";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ButtonLoadMore } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export class App extends Component {

    state={
      images:[],
      inputValue:'',
      page: 1,
      loading:false,
      selectedImage: null,
      selectedItem:[],
    }
  

    async componentDidUpdate(prevProps, prevState) {
      const { inputValue, page } = this.state;
    
      if (prevState.inputValue !== inputValue || prevState.page !== page) {

        try {
          this.setState({loading:true})
          const response = await getImages(inputValue, page);
          const imagesData = response.data.hits;
          this.setState((prevState) => ({
            images: [
              ...prevState.images,
              ...imagesData.map(({ id, webformatURL, largeImageURL, tags }) => ({
                id,
                webformatURL,
                largeImageURL,
                tags,
              })),
            ],
            loading:false,
          }));
        } catch (error) {
          console.error(error);
          this.setState({loading:false})
        }
      }
    }


  handleSearchSubmit = (query) => {
    this.setState({ inputValue: query });
  };

  handleClickLoadMore=event=>{
    this.setState(prevState=>({
      page:prevState.page +1

    }))
   
  }


  onClickCard = id => {
    const { images } = this.state;

    const item = images.find(img => img.id === id);
    // console.log(item);
   
    this.setState({
      selectedItem: item
    })
    this.toggle()
  }

  toggle = () =>{
      this.setState( prevState =>({
        selectedImage: !prevState.selectedImage
    }))
  }


  render(){
     const { images,loading ,selectedImage,selectedItem} = this.state;
     const { largeImageURL, tags} = selectedItem
     const showButton = images.length > 0;

    return (
      <>
      {loading && <Loader/>}
      {selectedImage && <Modal url ={largeImageURL} tags={tags} toggle ={this.toggle}/>}
      <Searchbar onSubmit={this.handleSearchSubmit}/>
      <ImageGallery images={images} onImagClick={this.onClickCard}/>
      <ButtonLoadMore onClickBtn={this.handleClickLoadMore} showButton={showButton} />
      </>
    );
  }
  
};





// ========================

// import React, { Component } from "react";
// import axios from "axios";

// const KEY = "34551974-263ab9c7e5b8efeaa679c471a";
// const URL = "https://pixabay.com/api/";

// class Searchbar extends Component {
//   state = {
//     searchQuery: ""
//   };

//   handleInputChange = (event) => {
//     this.setState({ searchQuery: event.target.value });
//   };

//   handleSubmit = (event) => {
//     event.preventDefault();
//     this.props.onSubmit(this.state.searchQuery);
//   };

//   render() {
//     const { searchQuery } = this.state;

//     return (
//       <header className="searchbar">
//         <form className="form" onSubmit={this.handleSubmit}>
//           <button type="submit" className="button">
//             <span className="button-label">Search</span>
//           </button>

//           <input
//             className="input"
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={searchQuery}
//             onChange={this.handleInputChange}
//           />
//         </form>
//       </header>
//     );
//   }
// }

// class ImageGallery extends Component {
//   render() {
//     const { images } = this.props;

//     return (
//       <ul className="gallery">
//         {images.map((image) => (
//           <ImageGalleryItem key={image.id} image={image} />
//         ))}
//       </ul>
//     );
//   }
// }

// class ImageGalleryItem extends Component {
//   render() {
//     const { image } = this.props;

//     return (
//       <li className="gallery-item">
//         <img src={image.webformatURL} alt="" />
//       </li>
//     );
//   }
// }

// export class App extends Component {
//   state = {
//     images: []
//   };

//   getImages = async (searchQuery) => {
//     try {
//       const response = await axios.get(
//         `${URL}?q=${searchQuery}&page=1&key=${KEY}&image_type=photo&orientation=horizontal&per_page=12`
//       );
//       this.setState({ images: response.data.hits });
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   render() {
//     const { images } = this.state;

//     return (
//       <div>
//         <Searchbar onSubmit={this.getImages} />
//         <ImageGallery images={images} />
//       </div>
//     );
//   }
// }

