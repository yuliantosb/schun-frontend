import React from 'react';
import Logo from '../img/logo.png';

const Sidebar = () => {
    return (
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <img src={Logo} alt="logo" />
          </div>
          <div className="sidebar-title">
            <h3>Schun | POS</h3>
          </div>
        </div>
    )
}

export default Sidebar;