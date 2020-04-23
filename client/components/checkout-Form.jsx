import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

class CheckoutForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      creditCard: '',
      shippingAddress: ''
    };
    this.handleName = this.handleName.bind(this);
    this.handleCreditCard = this.handleCreditCard.bind(this);
    this.handleAddress = this.handleAddress.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.placeOrder(this.state);
  }

  handleName(event) {
    this.setState({ name: event.target.value });
  }

  handleCreditCard(event) {
    this.setState({ creditCard: event.target.value });
  }

  handleAddress(event) {
    this.setState({ shippingAddress: event.target.value });
  }

  render() {
    const Back = styled.div`
    cursor: pointer;

    &:hover{
      color: ${ColorScheme.green}
    }
    `;
    return (
      <form onSubmit={() => this.handleSubmit() }>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input type="text" className="form-control" placeholder="Name" onChange={this.handleName} value={this.state.name} />
        </div>
        <div className="form-group">
          <label htmlFor="Credit Card #">Credit Card #</label>
          <input type="text" className="form-control" placeholder="Credit Card #" onChange={this.handleCreditCard} value={this.state.creditCard} />
        </div>
        <div className="form-group">
          <label htmlFor="Address">Shipping Address</label>
          <textarea name="Address" className="form-control" id="Address" cols="20" rows="8" onChange={this.handleAddress} value={this.state.address}></textarea>
        </div>
        <div className="row">
          <Back className="backbutton col-10" onClick={() => this.props.setView('catalog', {})}>{'<Back to catalog'}</Back>
          <button type="submit" className="btn btn-primary col-2">Place Order</button>
        </div>
      </form>
    );
  }
}

export default CheckoutForm;
