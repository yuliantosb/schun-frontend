import React from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Collapse,
  NavItem,
  NavLink
} from "shards-react";

import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import { logout } from "../../../../store/actions/authActions";
import {connect} from 'react-redux';

class UserActions extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: false,
      logout: false,
    };

    this.toggleUserActions = this.toggleUserActions.bind(this);
  }

  handleClickLogOut = () => {
    this.props.logout();
  }

  toggleUserActions() {
    this.setState({
      visible: !this.state.visible
    });
  }

  render() {
    const {isLogout, message, error, fetching} = this.props;
    console.log(isLogout);
    // console.log(isLogout);
    
    return (
      <NavItem tag={Dropdown} caret toggle={this.toggleUserActions}>
        <Loading show={fetching}
                    color="blue"
                    showSpinner={false} />
        <DropdownToggle caret tag={NavLink} className="text-nowrap px-3">
          <img
            className="user-avatar rounded-circle mr-2"
            src={require("./../../../../images/avatars/0.jpg")}
            alt="User Avatar"
          />{" "}
          <span className="d-none d-md-inline-block">Sierra Brooks</span>
        </DropdownToggle>
        <Collapse tag={DropdownMenu} right small open={this.state.visible}>
          <DropdownItem tag={Link} to="user-profile">
            <i className="material-icons">&#xE7FD;</i> Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="edit-user-profile">
            <i className="material-icons">&#xE8B8;</i> Edit Profile
          </DropdownItem>
          <DropdownItem tag={Link} to="file-manager-list">
            <i className="material-icons">&#xE2C7;</i> Files
          </DropdownItem>
          <DropdownItem tag={Link} to="transaction-history">
            <i className="material-icons">&#xE896;</i> Transactions
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={this.handleClickLogOut} className="text-danger">
            <i className="material-icons text-danger">&#xE879;</i> Logout
          </DropdownItem>
        </Collapse>
      </NavItem>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    message: state.auth.payload,
    error: state.auth.error,
    fetching: state.auth.fetching.data,
    isLogout: state.auth.logout
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserActions);