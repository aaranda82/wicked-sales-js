import React from 'react';
import { ColorScheme } from '../ColorScheme';
import styled from 'styled-components';

function ProductListItem(props) {
  const product = props.product;
  let price = (product.price / 100).toFixed(2);
  price = `$${price}`;
  const Item = styled.div`
    background-color: ${ColorScheme.lightGreen}`;
  return (
    <Item className="card col-3 m-3" onClick={() => props.setView('details', product.productId)}>
      <img src= {product.image} alt={product.name} className="card-image-top" height="250vh"/>
      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <div>{price}</div>
        <p className="card-text">{product.shortDescription}</p>
      </div>
    </Item>
  );
}

export default ProductListItem;
