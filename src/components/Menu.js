import React from 'react';
import Profile from '../img/profile.png';
import { NavLink } from 'react-router-dom';

class Menu extends React.Component {
  state = {
    isToggle: null
  }
  handleChildren = (e) => {
    const name = e.target.id;
    const isToggle = this.state.isToggle;
    if (isToggle !== null) {
      this.setState({
        isToggle: null
      })
    } else {
      this.setState({
        isToggle: name
      })
    }
  }
  render() {
    const {isToggle} = this.state;
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
          </li>
          <li>
              <NavLink to="/cashier">
                <i className="mdi mdi-desktop-mac" /> POS
              </NavLink>
          </li>
          <li>
              <button onClick={this.handleChildren} id="product">
                <i className="mdi mdi-book" /> Product
                <span className="dropdown"><i className="mdi mdi-chevron-down"></i></span>
              </button>
              { isToggle === 'product' && 
              <ul className="child" >
                <li><NavLink to="/product">Product</NavLink></li>
                <li><NavLink to="/category">Category</NavLink></li>
              </ul>
              }
          </li>
          <li>
              <NavLink to="/sales">
                <i className="mdi mdi-cart" /> Sales
              </NavLink>
          </li>
          <li>
              <NavLink to="/service">
                <i className="mdi mdi-face-agent" /> Service
              </NavLink>
          </li>
          <li>
              <button onClick={this.handleChildren} id="purchase">
                <i className="mdi mdi-shopping" /> Purchase
                <span className="dropdown"><i className="mdi mdi-chevron-down"></i></span>
              </button>
              { isToggle === 'purchase' && 
              <ul className="child" >
                <li><NavLink to="/purchase">Purchase</NavLink></li>
                <li><NavLink to="/expense">Expense</NavLink></li>
              </ul>
              }
          </li>
          <li>
              <NavLink to="/stock-opname">
                <i className="mdi mdi-alarm" /> Stock Opname
              </NavLink>
          </li>
          <li>
              <NavLink to="/giftcard">
                <i className="mdi mdi-credit-card" /> Giftcard
              </NavLink>
          </li>
          <li>
              <button onClick={this.handleChildren} id="users">
                <i className="mdi mdi-account-group" /> Users
                <span className="dropdown"><i className="mdi mdi-chevron-down"></i></span>
              </button>
              { isToggle === 'users' && 
              <ul className="child" >
                <li><NavLink to="/user">Employee</NavLink></li>
                <li><NavLink to="/customer">Customer</NavLink></li>
                <li><NavLink to="/distributor">Distributor</NavLink></li>
              </ul>
              }
          </li>
          <li>
              <NavLink to="/report">
                <i className="mdi mdi-file" /> Report
              </NavLink>
          </li>
          <li>
              <button onClick={this.handleChildren} id="setting">
                <i className="mdi mdi-settings" /> Settings
                <span className="dropdown"><i className="mdi mdi-chevron-down"></i></span>
              </button>
              { isToggle === 'setting' && 
              <ul className="child" >
                <li><NavLink to="/setting">Site Setting</NavLink></li>
                <li><NavLink to="/store">Store</NavLink></li>
                <li><NavLink to="/role">Role</NavLink></li>
                <li><NavLink to="/permission">Permission</NavLink></li>
                <li><NavLink to="/printer">Printer</NavLink></li>
                <li><NavLink to="/backup">Backup</NavLink></li>
              </ul>
              }
          </li>
        </ul>
    )
  }
}

export default Menu;