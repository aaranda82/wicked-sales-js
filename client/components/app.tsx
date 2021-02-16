import React, { useEffect, useState } from "react";
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
  quantity: number;
}

interface IProduct {
  quantity: number;
  image: string;
  name: string;
  price: number;
  productId: number;
  shortDescription: string;
  longDescription: string;
}

const App = () => {
  const [name, setName] = useState<string>("catalog");
  const [params, setParams] = useState<number | null>(null);
  const [cart, setCart] = useState<ICart[]>([]);

  const setView = (name: string, params: number | null) => {
    setName(name);
    setParams(params);
  };

  useEffect(() => {
    getCartItems();
  }, []);

  const getCartItems = () => {
    fetch("/api/cart")
      .then((response) => response.json())
      .then((response) => {
        setCart(response);
      });
  };

  const addToCart = (product: IProduct) => {
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
        console.log(cartProduct);
        const itemIsInCart = cart.find(
          ({ productId }) => productId === cartProduct.productId,
        );
        if (itemIsInCart && itemIsInCart.productId) {
          return getCartItems();
        }
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

  const placeOrder = (info: {
    name: string;
    creditCard: string;
    shippingAddress: string;
  }) => {
    const placeOrderInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(info),
    };
    fetch("/api/orders", placeOrderInit)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("Order Complete:", result);
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
