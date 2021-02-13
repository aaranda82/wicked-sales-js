import React from 'react';
import { ColorScheme } from '../ColorScheme';
import styled from 'styled-components';

const { accent } = ColorScheme;

const Item = styled.div`
  cursor: pointer;
  border: 1px solid lightgrey;
  transition: all ease 0.2s;
  background-color: ${accent};
  padding: 0;
  &:hover {
    z-index: 1;
    position: relative;
    transform: scale(1.05);
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
      <img
        src={image}
        alt={name}
        className="card-image-top"
        height="250vh"
        style={{ borderRadius: '5px' }}
      />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div>{priceFormatted}</div>
        <p className="card-text">{shortDescription}</p>
      </div>
    </Item>
  );
}

export default ProductListItem;
