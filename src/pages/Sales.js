import React from 'react';
import Table from '../components/Table';
import Layout from '../components/Layout';
import moment from 'moment';

class Sales extends React.Component {
    state = {
        ordering: {
            type: 'code',
            sort: 'asc'
        }
    }
    handleSorting = (e) => {
        const type = e.target.id;
        const sort = this.state.ordering.sort;
        this.setState({
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        });
    }
    render() {
        const {ordering} = this.state;
        const theads = [
            {name:'code', 'value': '#'},
            {name:'total', 'value': 'Total', className: 'text-right'},
            {name:'tax', 'value': 'Tax', className: 'text-right'},
            {name:'discount', 'value': 'Discount', className: 'text-right'},
            {name:'grand_total', 'value': 'Grand Total', className: 'text-right'},
            {name:'payment_type', 'value': 'Payment Type'},
        ];

        const tbodies = [
            {
                id: 1,
                code: 1234,
                total: 298000,
                tax: 0,
                discount: 0,
                grand_total: 298000,
                payment_type: 'Cash'
            },
            {
                id: 2,
                code: 1235,
                total: 839000,
                tax: 0,
                discount: 0,
                grand_total: 839000,
                payment_type: 'Cash'
            },
            {
                id: 3,
                code: 1236,
                total: 750000,
                tax: 0,
                discount: 0,
                grand_total: 750000,
                payment_type: 'Cash'
            },
            {
                id: 4,
                code: 1237,
                total: 120000,
                tax: 0,
                discount: 0,
                grand_total: 120000,
                payment_type: 'Cash'
            },
            {
                id: 5,
                code: 1238,
                total: 98000,
                tax: 0,
                discount: 0,
                grand_total: 98000,
                payment_type: 'Cash'
            },
            {
                id: 6,
                code: 1239,
                total: 70000,
                tax: 0,
                discount: 0,
                grand_total: 70000,
                payment_type: 'Cash'
            },
        ]

        const tBody = tbodies.map(tbody => {
            return (
                <tr key={tbody.id}>
                    <td>
                        <p className="text-primary">{tbody.code}</p>
                        <small className="text-muted">{moment(new Date).format('MM-DD-YYYY')}</small>
                        <div>
                            <button className="btn btn-link text-success btn-xs">View</button>
                            <button className="btn btn-link text-danger btn-xs">Delete</button>
                        </div>
                    </td>
                    <td className="text-right">RP. {tbody.total.toLocaleString()}</td>
                    <td className="text-right">RP. {tbody.tax.toLocaleString()}</td>
                    <td className="text-right">RP. {tbody.discount.toLocaleString()}</td>
                    <td className="text-right">RP. {tbody.grand_total.toLocaleString()}</td>
                    <td>{tbody.payment_type}</td>
                </tr>
            )
        })

        return (
             <Layout>
                <div className="row content">
                    <h1 className="content-title">Sales</h1>
                </div>
    
                <div className="col-md-12">
                    <div className="cardbox cards">
                        <div className="row">
                            <div className="col-sm-8">
                                <div className="btn btn-success mr-10">
                                    <i className="mdi mdi-download"></i> Export
                                </div>
                            </div>
                            <div className="col-sm-4 text-right">
                                <div className="input-group">
                                    <input type="text" id="keyword" className="form-control" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-default">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
                            {tBody}
                        </Table>
                        <div className="row mt-30">
                            <div className="col-sm-2">
                                <div className="form-group">
                                    <label className="control-label">Show</label>
                                    <select id="limit" className="form-control">
                                        <option value="10">10</option>
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="all">All</option>
                                    </select>
                                </div>
                            </div>
                            <div className="col-sm-10 text-right">
                                <ul className="pagination">
                                    <li className="active"><a href="#">1</a></li>
                                    <li><a href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">4</a></li>
                                    <li><a href="#">5</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        )
    }
}

export default Sales;