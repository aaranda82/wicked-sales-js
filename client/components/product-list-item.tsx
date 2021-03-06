import React from "react";
import { colorScheme } from "../colorScheme";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { accent, green, text } = colorScheme;

const Item = styled(Link)`
  color: ${text};
  cursor: pointer;
  border: 1px solid lightgrey;
  border-radius: 10px;
  transition: all ease 0.2s;
  background-color: ${accent};
  padding: 0;
  &:hover {
    z-index: 1;
    position: relative;
    transform: scale(1.05);
    color: ${text};
    text-decoration: none;
  }
`;

const Name = styled.h5`
  ${Item}: hover & {
    color: ${green};
  }
`;

interface IProps {
  product: {
    image: string;
    name: string;
    price: number;
    productId: number;
    shortDescription: string;
  };
}

function ProductListItem({ product }: IProps) {
  const { price, productId, image, name, shortDescription } = product;
  const formattedPrice = `$${(price / 100).toFixed(2)}`;
  return (
    <Item to={`/detail/${productId}`} className="card col-3 m-3" title={name}>
      <img
        src={image}
        alt={name}
        className="card-image-top"
        height="250vh"
        style={{ borderRadius: "10px" }}
      />
      <div className="card-body">
        <Name className="card-title">{name}</Name>

        <div>{formattedPrice}</div>
        <p className="card-text">{shortDescription}</p>
      </div>
    </Item>
  );
}

export default ProductListItem;
