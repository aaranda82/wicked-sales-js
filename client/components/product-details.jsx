import React from 'react';

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
    if (product) {
      return (
        <div className="row">
          <div className="backbutton col-12" onClick={() => this.props.setView('catalog', {})}>{'<Back to catalog'}</div>
          <img src={product.image} alt={product.name} className="col-6" />
          <div className="shortInfo col-6">
            <h5>{product.name}</h5>
            <div>{product.price}</div>
            <div>{product.shortDescription}</div>
          </div>
          <div className="col-12">{product.longDescription}</div>
        </div>
      );
    } else {
      return null;
    }
  }
}

export default ProductDetails;
