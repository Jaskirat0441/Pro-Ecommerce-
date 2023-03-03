import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoMdRemoveCircle } from "react-icons/io";
import { GrAddCircle } from "react-icons/gr";
import { cartActions } from "../Store/cartSlice";

const Cart = () => {

  let total=0;
  const cartItems = useSelector((state) => state.cart.itemsList);
  const dispatch = useDispatch();
  // console.log(cartItems);

  cartItems.forEach(item => {
    total+= item.totalPrice;
  });

  const incrementItems = ({ id, name, price }) => {
    dispatch(
      cartActions.addToCart({
        name,
        id,
        price,
      })
    );
  };
  const decrementItems = ({ id }) => {
    dispatch(cartActions.removeFromCart(id));
  };

  return (
    <div className="container">
      <h3 className="text-center my-4">
        Your Cart{" "}
        <span className="badge bg-secondary">
          <AiOutlineShoppingCart />
        </span>
      </h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Price</th>
            <th scope="col">Remove</th>
            <th scope="col">Add</th>
          </tr>
        </thead>
        <tbody>
          {cartItems &&
            cartItems.map((prod,idx) => (
              <tr key={prod.id}>
                <th scope="row">{idx+1}</th>
                <th>{prod.name}</th>
                <td>{prod.quantity}✖</td>
                <th>{prod.price}$</th>


                <td>
                  <span onClick={() => decrementItems(prod)}>
                    <IoMdRemoveCircle />
                  </span>
                </td>
                <td>
                  <span onClick={() => incrementItems(prod)}>
                    <GrAddCircle />
                  </span>
                </td>
              </tr>
            ))}
            <tr className="table-dark">
      <th scope="row"></th>
      <th colSpan="4">Total Price</th>
      <th>{total}$</th>
    </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Cart;
