import React from 'react';

function ProductListItem(props) {
  const product = props.product;
  let price = (product.price / 100).toFixed(2);
  price = `$${price}`;
  return (
    <div className="card col-3 m-3" onClick={() => props.setView('details', product.productId)}>
      <img src= {product.image} alt={product.name} className="card-image-top" height="250vh"/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div>{price}</div>
        <p className="card-text">{product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
