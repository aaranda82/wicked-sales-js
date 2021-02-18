import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";

const Card = styled.div`
  background-color: ${colorScheme.accent};
  border-radius: 10px;
  margin: 5px;
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

const Qty = styled(Container)<{ qty?: boolean }>`
  width: ${(props) => (props.qty ? "25%" : "100%")};
`;

const Info = styled.p`
  width: 100%;
  text-align: center;
  padding: 10px;
`;

const H5 = styled.h4`
  text-align: center;
  width: 30%;
`;

const Icon = styled.i`
  color: ${colorScheme.green};
`;

const Button = styled.button`
  border: 1px solid ${colorScheme.text};
  background: transparent;
  border-radius: 10px;
  &: hover {
    background: ${colorScheme.text};
  }
  &: focus {
    outline: none;
  }
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
          <Link to={`/detail/${productId}`}>
            <img src={image} alt={name} height="150vh" />
          </Link>
        </Sub>
        <Sub width="60%">
          <H5>{name}</H5>
          <H5>{priceMod}</H5>
          <Qty>
            <Button onClick={() => removeFromCart({ productId })}>
              <Icon className="fas fa-minus" />
            </Button>
            <Qty qty>Qty: {quantity}</Qty>
            <Button onClick={() => addToCart({ productId })}>
              <Icon className="fas fa-plus" />
            </Button>
          </Qty>
          <Info>{shortDescription}</Info>
        </Sub>
      </Container>
    </Card>
  );
}

export default CartSummaryItem;
