import React from 'react';
import ScrollToTop from './components/ScrollToTop';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Cashier from './pages/Cashier';
import Product from './pages/Product';
import ProductCreate from './pages/ProductCreate';
import Category from './pages/Category';
import Sales from './pages/Sales';
import Purchase from './pages/Purchase';
import Expense from './pages/Expense';
import Giftcard from './pages/Giftcard';
import StockOpname from './pages/StockOpname';
import Report from './pages/Report';
import Setting from './pages/Setting';
import User from './pages/User';

import NotFound from './pages/NotFound';
import Login from './pages/Auth/Login';
import './style.css';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop>
        <Switch>
          <Route exact path='/' component={Dashboard} />
          <Route path='/cashier' component={Cashier} />
          <Route exact path='/product' component={Product} />
          <Route path='/product/create' component={ProductCreate} />
          <Route path='/category' component={Category} />
          <Route path='/sales' component={Sales} />
          <Route path='/purchase' component={Purchase} />
          <Route path='/expense' component={Expense} />
          <Route path='/giftcard' component={Giftcard} />
          <Route path='/stock-opname' component={StockOpname} />
          <Route path='/report' component={Report} />
          <Route path='/setting' component={Setting} />
          <Route path='/user' component={User} />
          <Route path='/login' component={Login} />
          <Route path="*" component={NotFound} />
        </Switch>
      </ScrollToTop>
    </BrowserRouter>
  );
}

export default App;
