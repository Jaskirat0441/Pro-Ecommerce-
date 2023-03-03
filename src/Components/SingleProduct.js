import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { cartActions } from "../Store/cartSlice";
import "./../App.css";

const SingleProduct = () => {
  const { prodId } = useParams();
  // console.log(prodId)
  const [products, setProducts] = useState();
  const [alert, setAlert] = useState(false);
  const [singleProduct, setSingleProducts] = useState();
  const dispatch = useDispatch();

  const fetchProducts = async () => {
    const { data } = await axios.get("https://fakestoreapi.com/products");
    if (data) {
      // console.log(data);
      const products = data;
      const singleProd = products && products.find((prop) => prop.id == prodId);
      setSingleProducts(singleProd);
    }
  };
  // const
  useEffect(() => {
    fetchProducts();
  }, []);

  const cartItems = useSelector((state) => state.cart.itemsList);
  // console.log(cartItems);

  const addToCart = ({ id, title, price }) => {
    console.log(id, price, title);
    dispatch(cartActions.addToCart({ title, id, price }));
    setAlert(true);
  };
  setTimeout(() => {
    setAlert(false);
  }, 4000);

  if (singleProduct) {
    return (
      <div className="conatiner m-5">
        {alert && (
          <div
            className="container alert alert-info alert-dismissible fade show"
            role="alert"
          >
            <strong>{singleProduct.title}</strong>Successfully Added To Cart
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
            ></button>
          </div>
        )}
        <h2 className="p-2 text-secondary mt-4">
          Product Details : {singleProduct.title}
        </h2>

        <div className="upper-details d-flex mt-4">
          <div className="img-carausel ">
            <img
              src={singleProduct.image}
              className="single-prop-img"
              alt={singleProduct.image}
            />
          </div>

          <div className=" ms-5 flex-grow-1 d-flex  flex-column">
            <div className="fs-2 ">{singleProduct.title}</div>

            <ul variant="flush" className="my-5 list-group">
              <li className="list-group-item">
                Price: {"  " + singleProduct.price}$
              </li>
              <li className="list-group-item">
                Category : {" " + singleProduct.category.toUpperCase()}
              </li>
              <li className="list-group-item">
                Rating : {" " + singleProduct.rating.rate}
              </li>
              <li className="list-group-item ps-5">
                <button
                  className="btn btn-success btn-lg"
                  onClick={() => addToCart(singleProduct)}
                >
                  Add To Cart
                </button>
              </li>
            </ul>
          </div>
        </div>
        <div className="container mt-5">
          <h2>Product Description</h2>
          {singleProduct.description}
        </div>
      </div>
    );
  } else {
    return <div>Loading ...</div>;
  }
};

export default SingleProduct;
