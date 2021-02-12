import React from 'react';
import styled from 'styled-components';
import ProductListItem from './product-list-item';
import { ColorScheme } from '../ColorScheme';

const Container = styled.div`
  background-color: ${ColorScheme.lightGrey};
`;

class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { products: [] };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => this.setState({ products }))
      .catch(err => console.error(err));
  }

  generateItems() {
    if (this.state.products.length > 0) {
      const productArray = this.state.products.map(index => {
        return (
          <ProductListItem
            product={index}
            key={index.productId}
            setView={this.props.setView}
          />
        );
      });
      return productArray;
    }
  }

  render() {
    return (
      <Container className="conatiner">
        <div className="row justify-content-center">{this.generateItems()}</div>
      </Container>
    );
  }
}

export default ProductList;
