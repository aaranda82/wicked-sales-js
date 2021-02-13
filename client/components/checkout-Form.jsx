import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

const { red, green } = ColorScheme;

const Back = styled.div`
  cursor: pointer;
  font-size: 40px;
  color: ${red};

  &:hover {
    color: ${green};
  }
`;
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
    return (
      <form onSubmit={() => this.handleSubmit()}>
        <div className="form-group">
          <label htmlFor="Name">Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Name"
            onChange={this.handleName}
            value={this.state.name}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Credit Card #">Credit Card #</label>
          <input
            type="text"
            className="form-control"
            placeholder="Do Not Use Real Credit Card Info"
            onChange={this.handleCreditCard}
            value={this.state.creditCard}
          />
        </div>
        <div className="form-group">
          <label htmlFor="Address">Shipping Address</label>
          <textarea
            name="Address"
            className="form-control"
            id="Address"
            cols="20"
            rows="8"
            onChange={this.handleAddress}
            value={this.state.address}
          ></textarea>
        </div>
        <div className="row">
          <Back
            title="Back to Catalog"
            className="fas fa-arrow-circle-left"
            onClick={() => this.props.setView('catalog', {})}
          ></Back>
          <button type="submit" className="btn btn-primary col-2">
            Place Order
          </button>
        </div>
      </form>
    );
  }
}

export default CheckoutForm;
