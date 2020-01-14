import React from 'react';
import ProductListItem from './product-list-item';

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
      .then(products => this.setState({ products: products }))
      .catch(err => console.error(err));
  }

  generateItems() {
    if (this.state.products.length > 0) {
      const productArray = this.state.products.map(index => {
        return <ProductListItem product={index} key={index.productId} />;
      });
      return productArray;
    }
  }

  render() {
    return (
      <div className="conatiner bg-light">
        <div className="row justify-content-center">
          {this.generateItems()}
        </div>
      </div>
    );
  }
}

export default ProductList;
