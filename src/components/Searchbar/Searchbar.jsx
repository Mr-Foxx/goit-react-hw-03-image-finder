import { Component } from "react";
import PropTypes  from "prop-types";

export class Searchbar extends Component{

    state={
        query:''
    }

    handleChangeInput=(event)=>{
            this.setState({query: event.target.value})
    }

    handleSubmitForm=(event)=>{
        event.preventDefault();

        const { query } = this.state;
        this.props.onSubmit(query); 

        console.log('Searchbar  handleSubmitForm');
        this.reset()
    }

    reset=()=>{
        this.setState({query:'',})
    }

    render(){
        return(
            <header className="Searchbar">
              <form className="SearchForm" onSubmit={this.handleSubmitForm}>

              <button type="submit" className="SearchForm-button">
              <span className="SearchForm-button-label">Search</span>
              </button>

             <input
              className="SearchForm-input "
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={this.state.query}
              onChange={this.handleChangeInput}
              />
             </form>
            </header>
        )
    }
}

Searchbar.propTypes={
    onSubmit:PropTypes.func.isRequired
}