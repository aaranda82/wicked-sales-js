import React from "react";
import CartSummaryItem from "./cart-summary-item";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { red, green } = ColorScheme;

const Back = styled.div`
  cursor: pointer;
  font-size: 40px;
  color: ${red};

  &:hover {
    color: ${green};
  }
`;

interface IProps {
  addToCart: (prodId: { productId: number }) => void;
  removeFromCart: (prodId: { productId: number }) => void;
  setView: (name: string, params: number | null) => void;
  cartItems: {
    image: string;
    name: string;
    price: number;
    productId: number;
    shortDescription: string;
    quantity: number;
  }[];
}

function CartSummary({
  setView,
  cartItems,
  addToCart,
  removeFromCart,
}: IProps) {
  if (!cartItems.length) {
    return (
      <>
        <Back
          title="Back to Catalog"
          className="fas fa-arrow-circle-left"
          onClick={() => setView("catalog", null)}></Back>
        <h5>Cart Empty</h5>
      </>
    );
  } else {
    const cartItemArr = cartItems.map((i, key) => (
      <CartSummaryItem
        product={i}
        key={key}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
      />
    ));
    const cartTotal = cartItems.reduce(
      (acc, cur) => acc + cur.price * cur.quantity,
      0,
    );
    const total = `$${(cartTotal / 100).toFixed(2)}`;
    return (
      <>
        <Back
          title="Back to Catalog"
          className="fas fa-arrow-circle-left"
          onClick={() => setView("catalog", null)}></Back>
        <h1>My Cart</h1>
        <div className="container">{cartItemArr}</div>
        <h3>{`Cart Total: ${total}`}</h3>
        <button
          className="btn btn-primary col-2"
          onClick={() => setView("checkout", null)}>
          checkout
        </button>
      </>
    );
  }
}

export default CartSummary;
