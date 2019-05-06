import React from 'react';
import Layout from '../components/Layout';
import Table from '../components/Table';
import moment from 'moment';

class Purchase extends React.Component {
    state = {
        ordering: {
            type: 'reference',
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
            { name:'reference', 'value': 'Reference' },
            { name:'total', 'value': 'Total' },
            { name:'distributor', 'value': 'Distributor' },
            { name:'status', 'value': 'Status' },
            { name:'note', 'value': 'Note' },
        ];

        const tbodies = [
            {
                id: 1,
                reference: 'PO/01/2019',
                total: 298000,
                distributor: 'Indomarco',
                status: 'Received',
                notes: ''
            },
            {
                id: 2,
                reference: 'PO/03/2019',
                total: 189000,
                distributor: 'Indomarco',
                status: 'Received',
                notes: ''
            },
            {
                id: 3,
                reference: 'PO/02/2019',
                total: 1240000,
                distributor: 'Indomarco',
                status: 'Received',
                notes: ''
            },
            {
                id: 4,
                reference: 'PO/04/2019',
                total: 872000,
                distributor: 'Indomarco',
                status: 'Received',
                notes: ''
            },            
            {
                id: 5,
                reference: 'PO/05/2019',
                total: 2138000,
                distributor: 'Indomarco',
                status: 'Received',
                notes: ''
            },
        ];

        const tBody = tbodies.map(tbody => {
            return (
                <tr key={tbody.id}>
                    <td>
                        <p className="text-primary"><strong>{tbody.reference}</strong></p>
                        <small className="text-muted">{moment(new Date).format('MM/DD/YYYY HH:mm:ss')}</small>
                        <div>
                            <button className="btn btn-link text-success btn-xs">Edit</button>
                            <button className="btn btn-link text-info btn-xs">View</button>
                            <button className="btn btn-link text-danger btn-xs">Delete</button>
                        </div>
                    </td>
                    <td className="text-right">RP. {tbody.total.toLocaleString()}</td>
                    <td>{tbody.distributor}</td>
                    <td>{tbody.status}</td>
                    <td>{tbody.notes}</td>
                </tr>
            )
        })

        return (
            <Layout>
            <div className="row content">
                    <h1 className="content-title">Purchase</h1>
                </div>
    
                <div className="col-md-12">
                    <div className="cardbox cards">
                        <div className="row">
                            <div className="col-sm-8">
                                <button className="btn btn-primary mr-10">
                                    <i className="mdi mdi-plus"></i> Add purchase
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

export default Purchase;