import React from 'react';

function Header(props) {
  return (
    <nav className="navbar navbar-dark bg-dark text-white">
      <div className="col-10">$ Wicked Sales</div>
      <div className="col-2">{`${props.cartItemCount} items`}<i className="fas fa-shopping-cart"></i></div>
    </nav>
  );
}

export default Header;
