import React from 'react';
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";
import PropTypes  from "prop-types";

export const ImageGallery = ({images, onImagClick}) => {
    return (
      <ul className="ImageGallery">
        {images.map(({id,webformatURL,tags})=>(

           <ImageGalleryItem 
           key={id}
           webformatURL={webformatURL}
           id={id}
           tags={tags}
           onClick={onImagClick}
           />

        ))
            
        }
      </ul>
    );
  };
  
  ImageGallery.protoTypes={
    onImagClick: PropTypes.func.isRequired,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id:PropTypes.number.isRequired,
        webformatURL: PropTypes.string.isRequired,
        tags: PropTypes.string.isRequired,
      })
    )
  }