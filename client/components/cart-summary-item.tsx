import React from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const Card = styled.div`
  background-color: ${ColorScheme.accent};
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Sub = styled(Container)<{ width: string }>`
  width: ${(props) => props.width};
  justify-content: space-evenly;
  @media screen and (max-width: 700px) {
    width: 100%;
  }
`;

const Qty = styled(Container)`
  width: 100%;
`;

const Info = styled.p`
  width: 75%;
  text-align: center;
`;

const H5 = styled.h5`
  text-align: center;
  width: 30%;
`;

interface IProps {
  addToCart: (prodId: { productId: number }) => void;
  removeFromCart: (prodId: { productId: number }) => void;
  product: {
    image: string;
    name: string;
    price: number;
    productId: number;
    shortDescription: string;
    quantity: number;
  };
}

function CartSummaryItem({ product, addToCart, removeFromCart }: IProps) {
  const { price, image, name, shortDescription, quantity, productId } = product;
  const priceMod = `$${(price / 100).toFixed(2)}`;
  return (
    <Card>
      <Container>
        <Sub width="40%">
          <img src={image} alt={name} height="150vh" />
        </Sub>
        <Sub width="60%">
          <H5>{name}</H5>
          <H5>{priceMod}</H5>
          <Qty>
            <button onClick={() => removeFromCart({ productId })}>
              <i className="fas fa-minus" />
            </button>
            <Info>Qty: {quantity}</Info>
            <button onClick={() => addToCart({ productId })}>
              <i className="fas fa-plus" />
            </button>
          </Qty>
          <Info>{shortDescription}</Info>
        </Sub>
      </Container>
    </Card>
  );
}

export default CartSummaryItem;
