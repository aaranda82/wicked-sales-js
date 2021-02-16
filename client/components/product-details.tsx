import React, { Component } from "react";
import styled from "styled-components";
import { ColorScheme } from "../ColorScheme";

const { red, green } = ColorScheme;

const Back = styled.div`
  cursor: pointer;
  position: absolute;
  top: 70px;
  z-index: 1;
  font-size: 40px;
  color: ${red};

  &:hover {
    color: ${green};
  }
`;
const ProductDetailPage = styled.div`
  display: flex;
  flex-wrap: warp;
  justify-content: center;
`;
const Content = styled.div`
  width: 80%;
  display: flex;
  flex-wrap: wrap;
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
const LongDesc = styled.div`
  width: 100%;
`;
const Name = styled.div`
  font-size: 40px;
  width: 100%;
`;
const Info = styled.div`
  width: 100%;
`;
const Price = styled.div`
  color: ${red};
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
interface IProps {
  params: number | null;
  setView: (name: string, params: number | null) => void;
  addToCart: (product: IProduct) => void;
}

interface IState {
  product: IProduct | null;
}

class ProductDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      product: null,
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params}`)
      .then((response) => response.json())
      .then((product) => {
        return this.setState({ product });
      });
  }

  render() {
    const { product } = this.state;
    const { setView, addToCart } = this.props;

    if (product) {
      const { image, name, shortDescription, longDescription } = product;
      const formattedPrice = ("$" + product.price).split("");
      formattedPrice.splice(formattedPrice.length - 2, 0, ".").join("");
      return (
        <ProductDetailPage>
          <Content>
            <Back
              title="Back to Catalog"
              className="fas fa-arrow-circle-left"
              onClick={() => setView("catalog", null)}></Back>
            <Image src={image} alt={name} />
            <BasicInfo>
              <Name>{name}</Name>
              <Info>
                Price:<Price>{formattedPrice}</Price>
              </Info>
              <Info>{shortDescription}</Info>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </BasicInfo>
            <LongDesc>{longDescription}</LongDesc>
          </Content>
        </ProductDetailPage>
      );
    } else {
      return null;
    }
  }
}

export default ProductDetails;
