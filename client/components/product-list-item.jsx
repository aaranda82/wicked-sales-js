import React from 'react';

function formatPrice(price) {
  price = ('$' + price);
  price = price.split('');
  price.splice(price.length - 2, 0, '.');
  price = price.join('');
  return price;
}

function ProductListItem(props) {
  const product = props.product;
  const price = formatPrice(product.price);
  return (
    <div className="card col-3 m-3">
      <img src= {product.image} alt={product.name} className="card-image-top" height="150vh" width="auto"/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div>{price}</div>
        <p className="card-text">{product.shortDescription}</p>
      </div>
    </div>
  );
}

export default ProductListItem;
