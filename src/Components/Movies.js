import React, { Component } from "react";
import { movies } from "./getMovies";

export default class extends Component {
  constructor() {
    super();
    this.state = {
      hover: "",
      pArr: [1]
    };
  }
  render() {
    let movie = movies.results;
    return (
      <> {
        movie.length == 0 ? (
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        ) : (
          <div>
            <h3 className="text-center">
              <strong>Trending</strong>
            </h3>
            <div className="movies-list">
              {
                movie.map((movieObj) => (
                  <div className="card movies-card" onMouseEnter={() => this.setState({ hover: movieObj.id })} onMouseLeave={() => this.setState({ hover: "" })}>
                    <img className="card-img-top movies-img" src={`https://image.tmdb.org/t/p/original${movieObj.backdrop_path}`} alt={ movie.title}/>
                    <h5 className="card-title movies-title"><strong>{movieObj.title}</strong>
                    </h5>
                    <div className="button-wrapper" style={{display: "flex",justifyContent: "center",width: "100%"}}>
                      {
                        this.state.hover == movieObj.id && (
                          <a className="btn btn-primary movies-button">
                            Add to Favorite
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
                    <a class="page-link" href="#">Previous</a>
                  </li>
                  {
                    this.state.pArr.map((value) => (
                      <li class="page-item">
                        <a class="page-link" href="#">
                          {value}
                        </a>
                      </li>
                    ))
                  }
                  <li class="page-item">
                    <a class="page-link" href="#">Next</a>
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
