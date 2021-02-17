import React, { useState } from "react";
import { BackButton } from "./BackButton";

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
  const [creditCard, setCreditCard] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    placeOrder({ name, creditCard, shippingAddress });
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
