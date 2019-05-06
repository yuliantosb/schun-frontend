import React from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import moment from 'moment';

class Giftcard extends React.Component {
    state = {
        ordering: {
            type: 'card_no',
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
            { name:'card_no', 'value': '#' },
            { name:'value', 'value': 'Value' },
            { name:'balance', 'value': 'Balance' },
            { name:'created_by', 'value': 'Created By' },
            { name:'expiry', 'value': 'Expiry' },
        ];

        const tbodies = [
            {
                id: 1,
                card_no: '918191837181',
                value: 298000,
                balance: 298000,
                created_by: 'John Doe',
                expiry: '2019-05-01'
            },
            {
                id: 2,
                card_no: '918191837181',
                value: 298000,
                balance: 298000,
                created_by: 'John Doe',
                expiry: '2019-05-01'
            },
            {
                id: 3,
                card_no: '918191837181',
                value: 298000,
                balance: 298000,
                created_by: 'John Doe',
                expiry: '2019-05-01'
            },
            {
                id: 4,
                card_no: '918191837181',
                value: 298000,
                balance: 298000,
                created_by: 'John Doe',
                expiry: '2019-05-01'
            },
            
        ];

        const tBody = tbodies.map(tbody => {
            return (
                <tr key={tbody.id}>
                    <td>
                        <p className="text-primary"><strong>{tbody.card_no}</strong></p>
                        <small className="text-muted">{moment(new Date).format('MM/DD/YYYY HH:mm:ss')}</small>
                        <div>
                            <button className="btn btn-link text-success btn-xs">Edit</button>
                            <button className="btn btn-link text-info btn-xs">View</button>
                            <button className="btn btn-link text-danger btn-xs">Delete</button>
                        </div>
                    </td>
                    <td className="text-right">RP. {tbody.value.toLocaleString()}</td>
                    <td className="text-right">RP. {tbody.balance.toLocaleString()}</td>
                    <td>{tbody.created_by}</td>
                    <td>{moment(tbody.expiry).format('DD/MM/YYYY')}</td>
                </tr>
            )
        })

        return (
            <Layout>
            <div className="row content">
                    <h1 className="content-title">Giftcard</h1>
                </div>
    
                <div className="col-md-12">
                    <div className="cardbox cards">
                        <div className="row">
                            <div className="col-sm-8">
                                <button className="btn btn-primary mr-10">
                                    <i className="mdi mdi-plus"></i> Add Giftcard
                                </button>
                                <button className="btn btn-success mr-10">
                                    <i className="mdi mdi-download"></i> Export
                                </button>
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

export default Giftcard;