import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineShoppingCart} from "react-icons/ai"
import { useSelector } from 'react-redux';

const Header = () => {
  const cartQuantity = useSelector((state)=>state.cart.totalQuantity);
  const navigate= useNavigate();

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary"  data-bs-theme="dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Provis-Ecommerce </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link> 
        </li>
      </ul>
      <div className="d-flex text-white" role="search">
        {/* <GrCart/>  */}
        <h5 onClick={()=> navigate("/cart")} >Cart  <span className="text-white">
           <AiOutlineShoppingCart/></span>:  <span className="badge bg-secondary">{cartQuantity}</span></h5>

        {/* <p className="text-white" type="submit">{cartQuantity}</p> */}
      </div>
    </div>
  </div>
</nav>
  )
}

export default Header