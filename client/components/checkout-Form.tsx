import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BackButton } from "./BackButton";
import { colorScheme } from "../colorScheme";

const Error = styled.div`
  color: ${colorScheme.red};
`;

const CheckoutForm = ({
  placeOrder,
}: {
  placeOrder: (info: {
    name: string;
    creditCard: string;
    shippingAddress: string;
  }) => void;
}) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [creditCard, setCreditCard] = useState("");
  const [creditCardError, setCreditCardError] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  useEffect(() => {
    setNameError("");
  }, [name, setNameError]);

  useEffect(() => {
    setCreditCardError("");
  }, [creditCard, setCreditCardError]);

  useEffect(() => {
    setAddressError("");
  }, [shippingAddress, setAddressError]);

  const validate = () => {
    let isValid = true;
    if (!name) {
      setNameError("Name Required");
      isValid = false;
    }
    if (!creditCard) {
      setCreditCardError("Credit Card Required");
      isValid = false;
    }
    if (creditCard.length !== 16) {
      setCreditCardError("Credit Card Invalid");
      isValid = false;
    }
    if (!shippingAddress) {
      setAddressError("Shipping Address Required");
      isValid = false;
    }
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      placeOrder({ name, creditCard, shippingAddress });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="Name">Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Name"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
        <Error>{nameError}</Error>
      </div>
      <div className="form-group">
        <label htmlFor="Credit Card #">Credit Card #</label>
        <input
          type="text"
          className="form-control"
          placeholder="Do Not Use Real Credit Card Info"
          onChange={(e) => setCreditCard(e.target.value)}
          value={creditCard}
        />
        <Error>{creditCardError}</Error>
      </div>
      <div className="form-group">
        <label htmlFor="Address">Shipping Address</label>
        <textarea
          name="Address"
          className="form-control"
          id="Address"
          cols={20}
          rows={8}
          onChange={(e) => setShippingAddress(e.target.value)}
          value={shippingAddress}></textarea>
        <Error>{addressError}</Error>
      </div>
      <div className="row">
        <BackButton name="KEEP SHOPPING" />
        <button type="submit" className="btn btn-primary col-2">
          Place Order
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
