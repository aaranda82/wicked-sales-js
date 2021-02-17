import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { colorScheme } from "../colorScheme";

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${colorScheme.accent};
`;
const Logo = styled.div`
  width: 60%;
  font-size: 40px;
`;
const Cart = styled(Link)`
  color: ${colorScheme.text};
  cursor: pointer;
  width: 19%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    color: ${colorScheme.green};
    text-decoration: none;
  }
`;

function Header({ cartItemCount }: { cartItemCount: number }) {
  return (
    <Nav>
      <Logo>E-Commerce Site</Logo>
      <Cart to="/cart">
        {cartItemCount} items <i className="fas fa-shopping-cart"></i>
      </Cart>
    </Nav>
  );
}

export default Header;
