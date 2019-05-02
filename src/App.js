import React from 'react';
import moment from 'moment';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Menu from './components/Menu';
import Dashboard from './pages/Dashboard';
import Cashier from './pages/Cashier';
import Product from './pages/Product';
import ProductCreate from './pages/ProductCreate';
import StockOpname from './pages/StockOpname';
import Report from './pages/Report';
import Setting from './pages/Setting';
import NotFound from './pages/NotFound';
import './style.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <div className="wrapper-custom clearfix">
          <div className="col-sm-3 sidebar">
            <Sidebar />
            <Menu />
          </div>
          <div className="col-sm-push-3 col-sm-9 content-container">
            <Switch>
              <Route exact path='/' component={Dashboard} />
              <Route path='/cashier' component={Cashier} />
              <Route exact path='/product' component={Product} />
              <Route path='/product/create' component={ProductCreate} />
              <Route path='/stock-opname' component={StockOpname} />
              <Route path='/report' component={Report} />
              <Route path='/setting' component={Setting} />
              <Route path="*" component={NotFound} />
            </Switch>
          </div>
          <div className="col-sm-push-3 col-sm-9 footer-wrapper">
            <footer className="footer text-right">
              Copyright { moment(Date.now()).format('YYYY') } Schun Allright Reserved
            </footer>
          </div>
        </div>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
