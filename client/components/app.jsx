import React from 'react';
import styled from 'styled-components';
import Header from './header';
import ProductList from './product-list';
import ProductDetails from './product-details';
import CartSummary from './cart-summary';
import CheckoutForm from './checkout-Form';

const Main = styled.div`
  width: 80%;
  margin: auto;
`;

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
    this.placeOrder = this.placeOrder.bind(this);
  }

  // componentDidMount() {
  //   this.getCartItems();
  // }

  setView(name, params) {
    let view = { ...this.state.view };
    view = {
      name,
      params
    };
    this.setState({ view });
  }

  // getCartItems() {
  //   fetch("/api/cart")
  //     .then((response) => response.json())
  //     .then((result) => console.log(result))
  //     .catch((err) => console.error(err));
  // }

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

  handleRender() {
    let domView = null;
    switch (this.state.view.name) {
      case 'catalog':
        domView = <ProductList setView={this.setView} />;
        break;
      case 'details':
        domView = (
          <ProductDetails
            setView={this.setView}
            addToCart={this.addToCart}
            params={this.state.view.params}
          />
        );
        break;
      case 'cart':
        domView = (
          <CartSummary setView={this.setView} cartItems={this.state.cart} />
        );
        break;
      case 'checkout':
        domView = (
          <CheckoutForm setView={this.setView} placeOrder={this.placeOrder} />
        );
    }
    return domView;
  }

  placeOrder(info) {
    const placeOrderInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(info)
    };
    fetch('/api/orders', placeOrderInit)
      .then(response => {
        response.json();
        return this.setState({
          view: {
            name: 'catalog',
            params: {}
          },
          cart: []
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <>
        <Header cartItemCount={this.state.cart.length} setView={this.setView} />
        <Main>{this.handleRender()}</Main>
      </>
    );
  }
}
