import React from 'react';
import Chart from '../components/Chart';
import {Link, Redirect} from 'react-router-dom';
import Layout from '../components/Layout';

class Dashboard extends React.Component {
    render() {
        // const token = sessionStorage.getItem('token');
        // if (!token) return <Redirect to='/login' />
        return (
            <Layout>
                <div className="row content">
                    <h1 className="content-title">Dashboard</h1>
                </div>

                <div className="col-md-12">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="cards">
                                <div className="icon-holder">
                                    <i className="mdi mdi-currency-usd" />
                                </div>
                                <h1>$195.60</h1>
                                <div className="text-left">Income</div>
                                <div className="text-right text-success">
                                    <i className="mdi mdi-arrow-up-bold" /> 25%
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards">
                                <div className="icon-holder">
                                    <i className="mdi mdi-currency-usd" />
                                </div>
                                <h1>$89.60</h1>
                                <div className="text-left">Outcome</div>
                                <div className="text-right text-danger">
                                    <i className="mdi mdi-arrow-down-bold" /> 10%
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards">
                                <div className="icon-holder">
                                    <i className="mdi mdi-currency-usd" />
                                </div>
                                <h1>$106.0</h1>
                                <div className="text-left">Net Income</div>
                                <div className="text-right text-danger">
                                    <i className="mdi mdi-arrow-down-bold" /> 10%
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12 mt-50">
                            <div className="cardbox">
                                <h3 className="title-heading">Quick Links</h3>
                                <div className="clearfix mt-20">
                                    <ul className="quick-link">
                                        <li><Link to="/cashier"><i className="mdi mdi-view-dashboard"></i> <small className="text-muted">POS</small></Link></li>
                                        <li><Link to="/product"><i className="mdi mdi-barcode"></i> <small className="text-muted">Product</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-cart"></i> <small className="text-muted">Sales</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-bell"></i> <small className="text-muted">Open Bills</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-folder-open"></i> <small className="text-muted">Categories</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-credit-card"></i> <small className="text-muted">Gift Card</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-account-group"></i> <small className="text-muted">Customer</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-cogs"></i> <small className="text-muted">Settings</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-finance"></i> <small className="text-muted">Reports</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-account"></i> <small className="text-muted">Users</small></Link></li>
                                        <li><Link to="/cashier"><i className="mdi mdi-database"></i> <small className="text-muted">Backups</small></Link></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-md-12">
                            <div className="cardbox cards clearfix mt-50">
                                <div className="col-md-8">
                                    <h3 className="title-heading">Net income 2018</h3>
                                </div>
                                <div className="col-md-4">
                                    <select className="form-control">
                                        <option value="2018">2018</option>
                                    </select>
                                </div>
                                <div className="col-md-12 mt-30">
                                    <Chart type="line" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-7">
                            <div className="cardbox cards clearfix mt-50">
                                <div className="col-md-12">
                                    <h3 className="title-heading">Top Products (April 2019)</h3>
                                </div>
                                <div className="col-md-12 mt-30">
                                    <Chart type="pie" />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="cardbox cards clearfix mt-50">
                                <div className="col-md-12">
                                    <h3 className="title-heading">Incoming out of stock</h3>
                                </div>
                                <div className="col-md-12 mt-30">
                                    <table className="table table-scroll">
                                        <thead>
                                            <tr>
                                                <th>Product Name</th>
                                                <th className="text-right">Stock Available</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Product One</td>
                                                <td className="text-right">2</td>
                                            </tr>
                                            <tr>
                                                <td>Product Two</td>
                                                <td className="text-right">3</td>
                                            </tr>
                                            <tr>
                                                <td>Product Three</td>
                                                <td className="text-right">4</td>
                                            </tr>
                                            <tr>
                                                <td>Product Four</td>
                                                <td className="text-right">5</td>
                                            </tr>
                                            <tr>
                                                <td>Product Five</td>
                                                <td className="text-right">5</td>
                                            </tr>
                                            <tr>
                                                <td>Product Five</td>
                                                <td className="text-right">5</td>
                                            </tr>
                                            <tr>
                                                <td>Product Five</td>
                                                <td className="text-right">5</td>
                                            </tr>
                                            
                                        </tbody>
                                    </table>
                                    <div className="card-footer text-right">
                                        <Link to="/"> <i className="mdi mdi-chevron-right"></i> Go to stock</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Dashboard;