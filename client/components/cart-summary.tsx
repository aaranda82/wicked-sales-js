import React from "react";
import { Link } from "react-router-dom";
import CartSummaryItem from "./cart-summary-item";
import styled from "styled-components";
import { BackButton } from "./BackButton";

const Container = styled.div`
  margin: 20px 0;
`;

interface IProps {
  addToCart: (prodId: { productId: number }) => void;
  removeFromCart: (prodId: { productId: number }) => void;
  cartItems: {
    image: string;
    name: string;
    price: number;
    productId: number;
    shortDescription: string;
    quantity: number;
  }[];
}

function CartSummary({ cartItems, addToCart, removeFromCart }: IProps) {
  if (!cartItems.length) {
    return (
      <>
        <BackButton name="BACK TO CATALOG" />
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
      <Container>
        <BackButton name="KEEP SHOPPING" />
        <h1>My Cart</h1>
        <div className="container">{cartItemArr}</div>
        <h3>{`Cart Total: ${total}`}</h3>
        <Link to="/checkout">
          <button className="btn btn-primary col-2">checkout</button>
        </Link>
      </Container>
    );
  }
}

export default CartSummary;
