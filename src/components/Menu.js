import React from 'react';
import Profile from '../img/profile.png';
import { NavLink } from 'react-router-dom';

const Menu = () => {
    return (
        <ul className="list-unstyled components">
          <div className="profile clearfix">
            <div className="col-xs-4">
              <img
                src={Profile}
                className="img img-circle img-responsive"
                alt="Profile"
              />
            </div>
            <div className="col-xs-8 profile-title">
              <h2>John Doe</h2>
              <p>Administrator</p>
              <div className="btn-group btn-dropdown-custom">
                <button
                  type="button"
                  className="btn btn-transparent dropdown-toggle"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="mdi mdi-chevron-down" />
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <NavLink to="/">
                      <i className="mdi mdi-lock" /> &nbsp; Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <li>
              <NavLink exact to="/">
                <i className="mdi mdi-view-dashboard" /> Dashboard
              </NavLink>
              <ul className="child" style={{display:'none'}}>
                <li><NavLink to="/">Dashboard 1</NavLink></li>
                <li><NavLink to="/">Dashboard 2</NavLink></li>
              </ul>
          </li>
          <li>
              <NavLink to="/cashier">
                <i className="mdi mdi-desktop-mac" /> POS
              </NavLink>
          </li>
          <li>
              <NavLink to="/product">
                <i className="mdi mdi-book" /> Product
              </NavLink>
          </li>
          <li>
              <NavLink to="/stock-opname">
                <i className="mdi mdi-alarm" /> Stock Opname
              </NavLink>
          </li>
          <li>
              <NavLink to="/report">
                <i className="mdi mdi-file" /> Report
              </NavLink>
          </li>
          <li>
              <NavLink to="/setting">
                <i className="mdi mdi-settings" /> Settings
              </NavLink>
          </li>
        </ul>
    )
}

export default Menu;