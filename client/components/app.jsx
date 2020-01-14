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
      }
    };
    this.setView = this.setView.bind(this);
  }

  setView(name, params) {
    let stateCopy = { ...this.state.view };
    stateCopy = {
      name,
      params
    };
    this.setState({ view: stateCopy });
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        {this.state.view.name === 'details' ? <ProductDetails setView={this.setView} params={this.state.view.params} /> : <ProductList setView={this.setView} />}
      </React.Fragment>
    );
  }
}
