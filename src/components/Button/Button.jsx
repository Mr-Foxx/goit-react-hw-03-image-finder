import PropTypes  from "prop-types";

export const ButtonLoadMore=({onClickBtn,showButton})=>{
    if (!showButton) {
        return null; // Приховати кнопку, якщо showButton === false
      }

    return(
        <ul className="">
            <div className="container">
            <button 
            className="Button" 
            type="button" 
            onClick={onClickBtn}
            // disabled={disabled}
            >Load More</button>
            </div>
        </ul>
    )
}

ButtonLoadMore.propTypes={
    onClickBtn: PropTypes.func.isRequired,
    showButton: PropTypes.bool.isRequired
}