import React from 'react';

import '../assets/search.css';

class Search extends React.Component{
    constructor(props){
        super(props);
        this.state={
            query:'',
            results:{},
            total:0,
            limit:18,
            count:18
        }
    }

    fetchGiphs = (query,count) => {
        const url = `https://api.giphy.com/v1/gifs/search?q=${query}&api_key=VbzM10dEcZ6YFX5ypUQ4UjhXS5Wwf5mG&limit=${count}`
          const options = {
                  method: 'GET',
                  headers: {
                    
                  },
                }
          fetch(url, options)
            .then((res) => {return res.json()})
            .then((response) => {
              this.setState({results:response.data}) ;
              //console.log(this.state.results);
            })
            .catch(error => console.log(error))
        
      }
      handleOnInputChange = ( event ) => {
        event.preventDefault();
		const query = event.target.value;
		if ( ! query ) {
			//do nothing
		} else {
			this.setState( { query }, () => {
				this.fetchGiphs( query,this.state.count );
			} );
		}
    };
    updateCount=()=>{
        this.setState({count:this.state.count+18});
        this.fetchGiphs( this.state.query,this.state.count );
    }
     

      render(){
        return (
			<div className="container neomorphic-shadows ">
			<div className="header">
                <div><h2 className="heading">Giphy Search</h2></div>
			
            <button className="header-button neomorphic-shadows neomorphic-shadows-hover" onClick={()=>this.props.callback()}>Close</button>
			</div>
            <div className="header">
			<label className="search-label" htmlFor="search-input">
				<input
					type="text"
					name="query"
					value={this.state.query }
					id="search-input"
					placeholder="Search..."
					onChange={this.handleOnInputChange}
				/>
				
			</label>
            <button className="header-button neomorphic-shadows neomorphic-shadows-hover" onClick={this.updateCount}>Load More...</button>
            </div>
            
            
            <div className="results-container neomorphic-shadows-i">
                {this.state.results && this.state.results.length>0?
                this.state.results.map(res=>{
                    return (
                        <a key={ res.id }  value={res.images.preview_gif.url} onClick={()=>this.props.callback(res.images.preview_gif.url)} className="neomorphic-shadows neomorphic-shadows-hover result-item">
								<h6 className="image-name">{res.title}</h6>
								<div className="image-wrapper">
									<img className="image" src={ res.images.preview_gif.url } alt={`${res.title} image`}/>
								</div>
							</a>
                    )
                })
               :
                <p> No results yet, type in serach box..</p>
                }

            </div>

			
			
			
			
			

			</div>
		)
      }
}

export default Search;