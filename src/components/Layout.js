import React from 'react';
import moment from 'moment';
import Sidebar from '../components/Sidebar';
import Menu from '../components/Menu';
import Loading from '../img/loading.gif';
import LoadingBar from 'react-redux-loading-bar'

class Layout extends React.Component {
    render() {
        const { loading } = this.props;
        return (
          <div className="wrapper-custom clearfix">
            <LoadingBar style={{ backgroundColor: 'blue', height: '5px' }} />
            { loading && 
            <div className="loading">
              <img src={Loading} alt="loading" />
            </div>
            }
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