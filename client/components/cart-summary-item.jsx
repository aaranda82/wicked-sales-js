import React from 'react';

function CartSummaryItem(props) {
  const { price, image, name, shortDescription } = props.product;
  const priceMod = `$${(price / 100).toFixed(2)}`;
  return (
    <div className="card mb-3">
      <div className="row">
        <div className="col-4">
          <img src={image} alt={name} className="mx-auto d-block" height="150vh"/>
        </div>
        <div className="col-6">
          <h5>{name}</h5>
          <div>{priceMod}</div>
          <div>{shortDescription}</div>
        </div>
      </div>
    </div>
  );
}

export default CartSummaryItem;
