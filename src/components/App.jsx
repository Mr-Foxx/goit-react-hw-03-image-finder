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
    this.setState({ 
      inputValue: query,
      images:[],
      page:1,
    });
  };

  handleClickLoadMore=event=>{
    this.setState(prevState=>({
      page:prevState.page +1

    }))
   
  }

  
  onClickCard = id => {
    const { images } = this.state;

    const item = images.find(img => img.id === id);
   
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
     const { images,loading ,selectedImage,selectedItem,inputValue} = this.state;
     const { largeImageURL, tags} = selectedItem
     const showButton = images.length > 0;

     let message= null;
     if (images.length === 0 && inputValue.length > 0) {
      message = "No results. Enter something else in the search.";
    } else if (images.length === 0 && inputValue.length === 0) {
      message = "There are no pictures yet. Enter something in the search.";
    }

    return (
      <>
      {loading && <Loader/>}
      {selectedImage && <Modal url ={largeImageURL} tags={tags} toggle ={this.toggle}/>}
      <Searchbar onSubmit={this.handleSearchSubmit}/>
      {message && <div className="container-message">{message}</div>}
      <ImageGallery images={images} onImagClick={this.onClickCard}/>
      <ButtonLoadMore onClickBtn={this.handleClickLoadMore} showButton={showButton} />
      </>
    );
  }
  
};



