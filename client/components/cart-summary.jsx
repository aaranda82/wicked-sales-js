import React from 'react';
import CartSummaryItem from './cart-summary-item';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

const { red, green } = ColorScheme;

const Back = styled.div`
  cursor: pointer;
  font-size: 40px;
  color: ${red};

  &:hover {
    color: ${green};
  }
`;

function CartSummary(props) {
  const { cartItems } = props;
  if (!cartItems.length) {
    return (
      <>
        <Back
          title="Back to Catalog"
          className="fas fa-arrow-circle-left"
          onClick={() => props.setView('catalog', {})}
        ></Back>
        <h5>Cart Empty</h5>
      </>
    );
  } else {
    const cartItemArr = cartItems.map((i, key) => (
      <CartSummaryItem product={i} key={key} />
    ));
    let cartTotal = cartItems.reduce((acc, cur) => acc + cur.price, 0);
    cartTotal = `$${(cartTotal / 100).toFixed(2)}`;
    return (
      <>
        <Back
          title="Back to Catalog"
          className="fas fa-arrow-circle-left"
          onClick={() => props.setView('catalog', {})}
        ></Back>
        <h1>My Cart</h1>
        <div className="container">{cartItemArr}</div>
        <h3>{`Cart Total: ${cartTotal}`}</h3>
        <button
          className="btn btn-primary col-2"
          onClick={() => props.setView('checkout', {})}
        >
          checkout
        </button>
      </>
    );
  }
}

export default CartSummary;
