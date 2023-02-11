import React, { Component } from "react";
import { movies } from "./getMovies";


export default class Favourite extends Component {
  constructor() {
    super();
    this.state = {
      genres: [],
      currGenre: "All Genres",
      moviesData: [],
      currText:'',
      limit:5,
      currPage:1,

    };
  }


  componentDidMount() {
    let genreids ={ 28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western", }; 

    let data = JSON.parse(localStorage.getItem('movies-app') || "[]")

    let temp = []
    data.forEach((movieObj) => {
      if (!temp.includes(genreids[movieObj.genre_ids[0]])) {
        temp.push(genreids[movieObj.genre_ids[0]]);
      }
    });
    temp.unshift("All Genres");
    this.setState({
      genres: [...temp],
      moviesData: [...data]
    })
  }


  handleGenreChange = (genre) => {
    this.setState({
      currGenre: genre
    })
  }


  sortPopularityDesc = () =>{
    let temp = this.state.moviesData;
    temp.sort(function(objA,objB){
      return objB.popularity - objA.popularity; 
    })
    this.setState({
      moviesData:[...temp]
    })
  }


  sortPopularityAesc = () =>{
    let temp = this.state.moviesData;
    temp.sort(function(objA,objB){
      return objA.popularity - objB.popularity; 
    })
    this.setState({
      moviesData:[...temp]
    })
  }



  sortRatingAesc = () =>{
    let temp = this.state.moviesData;
    temp.sort(function(objA,objB){
      return objA.vote_average - objB.vote_average; 
    })
    this.setState({
      moviesData:[...temp]
    })

  }

  sortRatingDesc = () =>{
    let temp = this.state.moviesData;
    temp.sort(function(objA,objB){
      return objB.vote_average - objA.vote_average ; 
    })
    this.setState({
      moviesData:[...temp]
    })
  }

  handlePageChange = (page) =>{
    this.setState({
      currPage:page
    })


  }
  handleDelete = (id) =>{
    let newArr = [];
    newArr = this.state.moviesData.filter((movieObj) =>{
      return movieObj.id != id
    })
    this.setState({
      moviesData:[...newArr]
    })
    localStorage.setItem("movies-app" , JSON.stringify(newArr))

  }


  render() {
    // const movie = movies.results;
    // let temp = [];
    // this.setState({
    //   genres: [...temp],
    // });
    // console.log(temp);
    let genreids = {28: "Action", 12: "Adventure", 16: "Animation", 35: "Comedy", 80: "Crime", 99: "Documentary", 18: "Drama", 10751: "Family", 14: "Fantasy", 36: "History", 27: "Horror", 10402: "Music", 9648: "Mystery", 10749: "Romance", 878: "Sci-Fi", 10770: "TV", 53: "Thriller", 10752: "War", 37: "Western",};

    let filterArr = [];

    if(this.currText == ''){
      filterArr = this.state.moviesData;
    }else{
      filterArr = this.state.moviesData.filter((movieObj)=>{
        let title = movieObj.original_title.toLowerCase();
        return title.includes(this.state.currText.toLowerCase())
      })
    }



      
    // if(this.state.currGenre == 'All Genres'){
    //   filterArr = this.state.moviesData;
    // }
    if(this.state.currGenre !== 'All Genres'){
      filterArr = this.state.moviesData.filter((movieObj)=>genreids[movieObj.genre_ids[0]]==this.state.currGenre);
    }
    let pages = Math.ceil(filterArr.length / this.state.limit);
    let pagesArr = []
    for(let i = 1 ; i <= pages;i++){
      pagesArr.push(i)
    }

    let startIndex = (this.state.currPage - 1) * this.state.limit;
    let lastIndex = startIndex +  this.state.limit;

    filterArr = filterArr.slice(startIndex,lastIndex)

    return (
      <div>
        <>
          <div className="main">
            <div className="row">
              <div className="col-lg-3 col-sm-12">
                <ul className="list-group favourite-genres">
                  {this.state.genres.map((genre) =>
                    this.state.currGenre == genre ?
                      <li className="list-group-item" style={{ background: "#3f51b5", color: "white", cursor: 'pointer', fontWeight: "bold" }} >{genre} </li>
                      :
                      <li className="list-group-item" style={{ background: "white", color: "#3f51b5", cursor: 'pointer' }} onClick={() => this.handleGenreChange(genre)}>{genre}</li>
                  )}
                </ul>
              </div>
              <div className="col-lg-9 favorites-table col-sm-12">
                <div className="row">
                  <input
                    type="text"
                    style={{ margin: "1rem" }}
                    className="input-group-text col"
                    placeholder="Search here" value={this.state.currText} onChange={(e)=>this.setState({currText:e.target.value})}></input>
                  <input
                    type="number"
                    style={{ margin: "1rem" }}
                    className="input-group-text col"
                    placeholder="Rows count" value={this.state.limit} onChange={(e)=>this.setState({limit: e.target.value})}></input>
                </div>
                <div className="row"> 
                  <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Genre</th>
                        <th scope="col"> <i class="fa-solid fa-sort-up" onClick={this.sortPopularityDesc} style={{cursor:'pointer'}}>
                        </i> Popularity <i class="fa-solid fa-sort-down" onClick={this.sortPopularityAesc} style={{cursor:'pointer'}}></i></th>

                        <th scope="col"> <i class="fa-solid fa-sort-up"  onClick={this.sortRatingDesc} style={{cursor:'pointer'}}></i> Rating <i class="fa-solid fa-sort-down" onClick={this.sortRatingAesc} style={{cursor:'pointer'}}></i></th>
                        {/* <th scope="col">Rating</th> */}
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        filterArr.map((movieObj) => (
                          <tr>
                            <td>
                              <img
                                style={{ width: "5rem" ,marginRight: "1rem" ,borderRadius: "2px",
                                }}
                                src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`}
                                alt={movieObj.title}
                              />
                              {movieObj.original_title}
                            </td>
                            <td>{genreids[movieObj.genre_ids[0]]}</td>
                            <td>{movieObj.popularity}</td>
                            <td>{movieObj.vote_average}</td>
                            <td>
                              <button type="button" class="btn btn-danger" onClick={() => this.handleDelete(movieObj.id)}>Delete </button>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>

                <nav aria-label="Page navigation example">
                  <ul class="pagination">
                  {
                   pagesArr.map((page)=>(
                    <li className="page-item"><a className="page-link" style={{cursor:'pointer'}} onClick={ () =>this.handlePageChange(page)}>{page}</a></li>
                   ))
                  }
                
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </>
      </div>
    );
  }
}
