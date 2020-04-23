import React from 'react';
import styled from 'styled-components';
import { ColorScheme } from '../ColorScheme';

function Header(props) {
  const Nav = styled.nav`
    background: ${ColorScheme.grey};
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    `;
  const Logo = styled.div`
    color: ${ColorScheme.white};
    width: 60%;
    font-size: 40px;
    `;
  const Cart = styled.div`
    cursor: pointer;
    color: ${ColorScheme.white};
    width: 19%;
    text-align: right;

    &:hover{
      color: ${ColorScheme.green}
    }
  `;
  return (
    <Nav>
      <Logo>$ Wicked Sales</Logo>
      <Cart onClick={() => props.setView('cart', {})}>{`${props.cartItemCount} items`}<i className="fas fa-shopping-cart"></i></Cart>
    </Nav>
  );
}

export default Header;
