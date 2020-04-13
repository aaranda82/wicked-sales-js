import React from 'react';
import { ColorScheme } from '../ColorScheme';
import styled from 'styled-components';

function ProductListItem(props) {
  const { price, productId, image, name, shortDescription } = props.product;
  const priceFormatted = `$${(price / 100).toFixed(2)}`;
  const { lightGreen } = ColorScheme;
  const Item = styled.div`
    background-color: ${lightGreen};
  `;
  return (
    <Item
      className="card col-3 m-3"
      onClick={() => props.setView('details', productId)}
    >
      <img src={image} alt={name} className="card-image-top" height="250vh" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div>{priceFormatted}</div>
        <p className="card-text">{shortDescription}</p>
      </div>
    </Item>
  );
}

export default ProductListItem;
