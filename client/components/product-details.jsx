import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

const { red, green, lightGrey } = ColorScheme;

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
  background: ${lightGrey};
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

class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params}`)
      .then(response => response.json())
      .then(product => {
        let price = '$' + product.price;
        price = price.split('');
        price.splice(price.length - 2, 0, '.');
        product.price = price.join('');
        return this.setState({ product });
      });
  }

  render() {
    const { product } = this.state;
    const { setView, addToCart } = this.props;

    if (product) {
      const { image, name, price, shortDescription, longDescription } = product;
      return (
        <ProductDetailPage>
          <Content>
            <Back
              title="Back to Catalog"
              className="fas fa-arrow-circle-left"
              onClick={() => setView('catalog', {})}
            ></Back>
            <Image src={image} alt={name} />
            <BasicInfo>
              <Name>{name}</Name>
              <Info>
                Price:<Price>{price}</Price>
              </Info>
              <Info>{shortDescription}</Info>
              <button
                className="btn btn-primary"
                onClick={() => addToCart(product)}
              >
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
