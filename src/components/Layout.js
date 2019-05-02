import React from 'react';
import moment from 'moment';
import Sidebar from '../components/Sidebar';
import Menu from '../components/Menu';

class Layout extends React.Component {
    render() {
        return (
            <div className="wrapper-custom clearfix">
            <div className="col-sm-3 sidebar">
              <Sidebar />
              <Menu />
            </div>
            <div className="col-sm-push-3 col-sm-9 content-container">
                {this.props.children}
            </div>
            <div className="col-sm-push-3 col-sm-9 footer-wrapper">
              <footer className="footer text-right">
                Copyright { moment(Date.now()).format('YYYY') } Schun Allright Reserved
              </footer>
            </div>
          </div>
        )
    }
}

export default Layout;