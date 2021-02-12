import React from 'react';
import { ColorScheme } from '../ColorScheme';
import styled from 'styled-components';

const { lightGrey, grey } = ColorScheme;

const Item = styled.div`
  background-color: ${lightGrey};
  cursor: pointer;
  border: none;

  &:hover {
    box-shadow: 0px 0px 15px 10px ${grey};
  }
`;

function ProductListItem(props) {
  const { price, productId, image, name, shortDescription } = props.product;
  const priceFormatted = `$${(price / 100).toFixed(2)}`;
  return (
    <Item
      className="card col-3 m-3"
      onClick={() => props.setView('details', productId)}
      title={name}
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
