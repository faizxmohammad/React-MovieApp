import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Navbar extends Component {

  render() {
    return (
      <div style={{display:'flex', padding:'0.5'}}>
        <Link to="/" style={{textDecoration:'none'}}>
        <h1 style={{marginTop:'1rem',marginLeft:'1rem'}}>Movies App</h1>
        </Link>

        <Link to='/favourites' style={{textDecoration:'none'}}>
        <h2 style={{marginLeft :'5rem',marginTop:'2rem'}}>Favorites</h2>
        </Link>
      
     
      </div>
    )
  }
}
