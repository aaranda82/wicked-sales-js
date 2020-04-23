import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

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
        let price = ('$' + product.price);
        price = price.split('');
        price.splice(price.length - 2, 0, '.');
        product.price = price.join('');
        return this.setState({ product });
      });
  }

  render() {
    const product = this.state.product;
    const Back = styled.div`
    cursor: pointer;
    position: absolute;
    top: 70px;
    z-index: 1;
    font-size: 40px;
    color: ${ColorScheme.red};

    &:hover{
      color: ${ColorScheme.green}
    }    `;
    const ProductDetailPage = styled.div`
      display: flex;
      flex-wrap: warp;
      justify-content: center;
      background: ${ColorScheme.lightGrey};
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
      color: ${ColorScheme.red};
      font-size: 40px;
    `;
    if (product) {
      return (
        <ProductDetailPage>
          <Content>
            <Back title='Back to Catalog' className="fas fa-arrow-circle-left" onClick={() => this.props.setView('catalog', {})}></Back>
            <Image src={product.image} alt={product.name} />
            <BasicInfo >
              <Name>{product.name}</Name>
              <Info>Price:<Price>{product.price}</Price></Info>
              <Info>{product.shortDescription}</Info>
              <button className='btn btn-primary' onClick={() => this.props.addToCart(this.state.product)}>Add to Cart</button>
            </BasicInfo>
            <LongDesc >{product.longDescription}</LongDesc>
          </Content>
        </ProductDetailPage>
      );
    } else {
      return null;
    }
  }
}

export default ProductDetails;
