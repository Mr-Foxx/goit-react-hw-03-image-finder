import { Component } from "react";
import PropTypes  from "prop-types";

export class Modal extends Component{

    componentDidMount(){
        window.addEventListener('keydown', this.handeleKeyDown);
        
    }

    componentWillUnmount(){
        window.removeEventListener('keydown',  this.handeleKeyDown );
    }

    handeleKeyDown = event =>{
        if (event.code === 'Escape') {
            this.props.toggle(); 
        }
    }

    onClickOverlay = event =>{

        if (event.target === event.currentTarget) {
            this.props.toggle(); 
        }

    }



    render(){
        const { url, tags } = this.props

        return(
            <div className="Overlay" onClick={this.onClickOverlay}>
                <div className="Modal">
                    <img src={url} alt={tags}/>
                </div>
            </div>
    
        );
    } 
}

Modal.propTypes = {
    toggle: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
};