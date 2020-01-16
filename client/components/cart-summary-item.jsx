import React from 'react';

function CartSummaryItem(props) {
  const product = props.product;
  let price = (product.price / 100).toFixed(2);
  price = `$${price}`;
  return (
    <div className="card mb-3">
      <div className="row">
        <div className="col-4">
          <img src={product.image} alt={product.name} className="mx-auto d-block" height="150vh"/>
        </div>
        <div className="col-6">
          <h5>{product.name}</h5>
          <div>{price}</div>
          <div>{product.shortDescription}</div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
