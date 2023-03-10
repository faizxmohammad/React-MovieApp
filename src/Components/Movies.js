import React, { Component , useState, useEffect } from "react";
// import { movies } from "./getMovies";
import axios from "axios";


export default class extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      pArr: [1],
      currPage:1,
      movies:[],
      favourites:[]
    };

  }

  async componentDidMount(){
    // side effects
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f32b596eb47cf1813b4e0abf79592446&language=en-US&page=${this.state.currPage}`)
    let data = res.data;
    // console.log(data);
    this.setState({
      movies:[...data.results]
    })
  }

  changeMovies = async () =>{
    let cPage = this.state.currPage;
    const res = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=f32b596eb47cf1813b4e0abf79592446&language=en-US&page=${cPage}`)
    let data = res.data;
    // console.log(data);
    this.setState({
      movies:[...data.results]
    },() =>{window.scrollTo(0,0)}
    )}


  handleClick = (value) =>{
    if(value != this.state.currPage){
      this.setState({currPage: value},this.changeMovies)
    }}


  handleRight = () =>{
    let tempArr = []
    for(let i = 1 ; i <= this.state.pArr.length + 1 ; i++){
      tempArr.push(i);
    }
    this.setState({
      pArr:[...tempArr],
      currPage: this.state.currPage+1
    },this.changeMovies)
  }


  handlePrevious = () =>{
    if(this.state.currPage != 1){
      this.setState({
        currPage:this.state.currPage - 1
      },this.changeMovies)
    }
  }


  handleFavourite = (movie) =>{
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
        if(this.state.favourites.includes(movie.id)){
            oldData = oldData.filter((m)=>m.id!=movie.id)
        }else{
            oldData.push(movie)
        }
        localStorage.setItem("movies-app",JSON.stringify(oldData));
        console.log(oldData);
        this.handleFavouritesState();
  }


  handleFavouritesState = () =>{
    let oldData = JSON.parse(localStorage.getItem("movies-app") || "[]")
    let temp = oldData.map((movie)=>movie.id);
    this.setState({
        favourites:[...temp]
    })

  }


  render() {
    return (
      <> {
        this.state.movies.length == 0 ? (
          <div class="spinner-border text-primary loader" role="status">
            <span class="visually-hidden loader">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
          
            <div className="movies-list">
              {
                this.state.movies.map((movieObj) => (
                  <div  className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: "" })}>
                    <img className="card-img-top movies-img" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={this.state.movies.title}/>
                    <h5 className="card-title movies-title"><strong>{movieObj.title}</strong>
                    </h5>
                    <div className="button-wrapper" style={{display: "flex",justifyContent: "center",width: "100%"}}>
                      {
                        this.state.hover == movieObj.id && (
                          <a className="btn btn-primary movies-button"
                          onClick={()=>this.handleFavourite(movieObj)}>{this.state.favourites.includes(movieObj.id)?"Remove from favourites":"Add to favourites"}
                          </a>
                        )
                      }
                    </div>
                  </div>
                  
                ))
              }
            </div>

            <div style={{ display: "flex", justifyContent: "center"}}>
              <nav aria-label="Page navigation example">
                <ul class="pagination">
                  <li class="page-item">
                    <a class="page-link" onClick={this.handlePrevious} style={{cursor:'pointer'}}>Previous</a>
                  </li>
                  {
                    this.state.pArr.map((value) => (
                      <li class="page-item">
                        <a class="page-link"onClick={ () => this.handleClick(value)} style={{cursor:'pointer'}}>
                          {value}
                        </a>
                      </li>
                    ))
                  }
                  <li class="page-item">
                    <a class="page-link" onClick={this.handleRight} style={{cursor:'pointer'}}>Next</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>    
        )
      }
      </>
  
    );
  
  }
}
