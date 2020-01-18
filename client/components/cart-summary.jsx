import React from 'react';
import CartSummaryItem from './cart-summary-item';

function CartSummary(props) {
  const cartItems = props.cartItems;
  if (cartItems.length === 0) {
    return <h5>Cart Empty</h5>;
  } else {
    const cartItemArr = cartItems.map(index => <CartSummaryItem product={index} key={index.productId}/>);
    let cartTotal = cartItems.reduce((acc, cur) => acc + cur.price, 0);
    cartTotal = (cartTotal / 100).toFixed(2);
    cartTotal = `$${cartTotal}`;
    return (
      <>
        <div className="backbutton col-12" onClick={() => props.setView('catalog', {})}>{'<Back to catalog'}</div>
        <h1>My Cart</h1>
        <div className="container">
          {cartItemArr}
        </div>
        <h3>{`Cart Total: ${cartTotal}`}</h3>
        <button className="btn btn-primary col-2" onClick={() => props.setView('checkout', {})}>checkout</button>
      </>
    );
  }
}

export default CartSummary;
