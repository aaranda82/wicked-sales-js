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
const Logo = styled(Link)`
  color: ${colorScheme.text};
  width: 60%;
  font-size: 40px;
  &:hover {
    color: ${colorScheme.green};
    text-decoration: none;
  }
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

const Icon = styled.i`
  font-size: 27px;
  transition: all ease 0.3s;
  ${Logo}: hover & {
    font-size: 40px;
  }
`;

function Header({ cartItemCount }: { cartItemCount: number }) {
  return (
    <Nav>
      <Logo to="/">
        The Sp
        <Icon className="fas fa-circle" />t
      </Logo>
      <Cart to="/cart">
        {cartItemCount} items <i className="fas fa-shopping-cart"></i>
      </Cart>
    </Nav>
  );
}

export default Header;
