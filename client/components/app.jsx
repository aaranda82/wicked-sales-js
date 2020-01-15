import React from 'react';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view: {
        name: 'catalog',
        params: {}
      },
      cart: []
    };
    this.setView = this.setView.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  componentDidMount() {
    this.getCartItems();
  }

  setView(name, params) {
    let stateCopy = { ...this.state.view };
    stateCopy = {
      name,
      params
    };
    this.setState({ view: stateCopy });
  }

  getCartItems() {
    fetch('/api/cart')
      .then(response => response.json())
      .catch(err => console.error(err));
  }

  addToCart(product) {
    const addToCartInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    };
    fetch('/api/cart', addToCartInit)
      .then(response => response.json())
      .then(cartProduct => {
        const cartCopy = { ...this.state };
        cartCopy.cart.push(cartProduct);
        this.setState(cartCopy);
      });
  }

  render() {
    return (
      <React.Fragment>
        <Header cartItemCount={this.state.cart.length}/>
        {this.state.view.name === 'details' ? <ProductDetails setView={this.setView} addToCart={this.addToCart} params={this.state.view.params} /> : <ProductList setView={this.setView} />}
      </React.Fragment>
    );
  }
}
