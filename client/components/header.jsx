import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: ${ColorScheme.accent};
`;
const Logo = styled.div`
  width: 60%;
  font-size: 40px;
`;
const Cart = styled.div`
  cursor: pointer;
  width: 19%;
  text-align: right;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  &:hover {
    color: ${ColorScheme.green};
  }
`;

function Header(props) {
  const { setView, cartItemCount } = props;
  return (
    <Nav>
      <Logo>$ Wicked Sales</Logo>
      <Cart onClick={() => setView('cart', {})}>
        {cartItemCount} items <i className="fas fa-shopping-cart"></i>
      </Cart>
    </Nav>
  );
}

export default Header;
