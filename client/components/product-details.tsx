import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";
import { BackButton } from "./BackButton";

const ProductDetailPage = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 20px 0;
`;

const Image = styled.img`
  width: 50%;
`;

const BasicInfo = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

const Info = styled.div`
  width: 100%;
`;

const Name = styled(Info)`
  font-size: 40px;
`;

const Price = styled.div`
  color: ${colorScheme.red};
  font-size: 40px;
`;

interface IProduct {
  image: string;
  name: string;
  price: number;
  productId: number;
  shortDescription: string;
  longDescription: string;
  quantity: number;
}

const ProductDetails = ({
  addToCart,
}: {
  addToCart: (prodId: { productId: number }) => void;
}) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const { id } = useParams<{ id: string }>();
  const paramId = parseInt(id);

  useEffect(() => {
    fetch(`/api/products/${paramId}`)
      .then((response) => response.json())
      .then((product) => {
        return setProduct(product);
      });
  }, [paramId]);

  if (product) {
    const {
      image,
      name,
      shortDescription,
      longDescription,
      productId,
    } = product;
    const formattedPrice = ("$" + product.price).split("");
    formattedPrice.splice(formattedPrice.length - 2, 0, ".").join("");
    return (
      <ProductDetailPage>
        <BackButton name="BACK TO CATALOG" />
        <Image src={image} alt={name} />
        <BasicInfo>
          <Name>{name}</Name>
          <Info>
            Price:<Price>{formattedPrice}</Price>
          </Info>
          <Info>{shortDescription}</Info>
          <button
            className="btn btn-primary"
            onClick={() => addToCart({ productId })}>
            Add to Cart
          </button>
        </BasicInfo>
        <Info>{longDescription}</Info>
      </ProductDetailPage>
    );
  } else {
    return null;
  }
};

export default ProductDetails;
