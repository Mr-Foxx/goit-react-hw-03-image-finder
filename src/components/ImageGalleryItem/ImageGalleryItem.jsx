import PropTypes  from "prop-types";

export const ImageGalleryItem=({webformatURL,tags,id, onClick})=>{
  
 
    return(
        <li className="ImageGalleryItem" onClick={()=>onClick(id)}>
          <img className="ImageGalleryItem-image" src={webformatURL} alt={tags} 
           />
        </li>
    )
}

ImageGalleryItem.propTypes={
    onClick:PropTypes.func.isRequired,
    images:PropTypes.arrayOf(
        PropTypes.shape({
            webkitURL:PropTypes.number.isRequired,
            tags:PropTypes.string.isRequired,
            id: PropTypes.string.isRequired,
        })
    )
}