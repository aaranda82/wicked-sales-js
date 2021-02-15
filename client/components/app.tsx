import React, { useState } from "react";
import styled from "styled-components";
import Header from "./header";
import ProductList from "./product-list";
import ProductDetails from "./product-details";
import CartSummary from "./cart-summary";
import CheckoutForm from "./checkout-Form";

const Main = styled.div`
  width: 80%;
  margin: auto;
`;

interface ICart {
  image: string;
  name: string;
  price: number;
  productId: number;
  shortDescription: string;
}

const App = () => {
  const [name, setName] = useState<string>("catalog");
  const [params, setParams] = useState<number | null>(null);
  const [cart, setCart] = useState<ICart[]>([]);

  const setView = (name: string, params: number | null) => {
    setName(name);
    setParams(params);
  };

  const addToCart = (product: number) => {
    const addToCartInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    };
    fetch("/api/cart", addToCartInit)
      .then((response) => response.json())
      .then((cartProduct) => {
        const newCart = [...cart, cartProduct];
        setCart(newCart);
      });
  };

  const handleRender = () => {
    let domView = null;
    switch (name) {
      case "catalog":
        domView = <ProductList setView={setView} />;
        break;
      case "details":
        domView = (
          <ProductDetails
            setView={setView}
            addToCart={addToCart}
            params={params}
          />
        );
        break;
      case "cart":
        domView = <CartSummary setView={setView} cartItems={cart} />;
        break;
      case "checkout":
        domView = <CheckoutForm setView={setView} placeOrder={placeOrder} />;
    }
    return domView;
  };

  const placeOrder = (info: any) => {
    const placeOrderInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch("/api/orders", placeOrderInit)
      .then((response) => {
        response.json();
        setName("catalog");
        setParams(null);
        setCart([]);
        return false;
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <Header cartItemCount={cart.length} setView={setView} />
      <Main>{handleRender()}</Main>
    </>
  );
};

export default App;
