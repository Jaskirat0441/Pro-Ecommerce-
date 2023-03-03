import axios from "axios";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./../App.css";

const ProductListing = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const navigate= useNavigate();


  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    if (data) {
      setProducts(data);
    }
  };
  useLayoutEffect(() => {
    fetchProducts();
  }, []);
  // console.log(products);

  const selectPage =(selPage)=>{
        if(selPage >=1 && selPage !==page && selPage <=products.length/10){
    setPage(selPage);
        }

  }

  return (
    <div className="container-fluid">
      <h1 className="text-center pt-3 ">Latest Products Hurry up!</h1>

      {/* product listing */}
      {products.length > 0 && (
        <div className="products m-4">
          <div className="g-4 row row-cols-md-4 mt-5  row-cols-2">
            {products.slice(page*10-10,page*10).map((prod) => (
              <div className="card m-3 " key={prod.id} style={{width: "18rem"}}  onClick={()=> navigate(`/product/${prod.id}`)} >
              <img src={prod.image} className="card-img-top prod-img" alt={prod.title}/>
              <div className="card-body">
                <h5 className="card-title">{prod.title.substring(0,20)}</h5>
                <ul className="list-group">
  <li className="list-group-item">Price :  {prod.price}$</li>
  <li className="list-group-item">Category :{prod.category.toUpperCase()}</li>
</ul>
<div className="text-center m-2">
                <Link to={`/product/${prod.id}`} className="btn btn-primary text-center">Read More..</Link>
</div>
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
      {
        products.length> 0 && 
        <div className="pagination">
            <span onClick={()=>selectPage(page-1)}>◀</span>
            {
                [...Array(products.length/ 10)].map((val,idx)=>(
                    <span className={page===idx+1 ? "pagination_selected" : ""}
                     onClick={()=>selectPage(idx+1)} key={idx}>{idx+1}</span>

                ))
            }
            <span onClick={()=>selectPage(page+1)}>▶</span>
            </div>
      }
    </div>
  );
};

export default ProductListing;
