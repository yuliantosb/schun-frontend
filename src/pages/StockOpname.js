import React from 'react';
import Layout from '../components/Layout';

class StockOpname extends React.Component {
    state = {
        ordering: {
            type: 'name',
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
        const datas = [
            {
                id: 1,
                name: 'Charjer Leptop',
                code: '123456',
                first_stock: 10,
                purchased: 10,
                sales: 5,
                stock: 20,
                notes: ''

            },
            {
                id: 2,
                name: 'Mos Leptop',
                code: '223456',
                first_stock: 10,
                purchased: 10,
                sales: 5,
                stock: 80,
                notes: ''

            },
            {
                id: 3,
                name: 'Kibot Leptop',
                code: '323456',
                first_stock: 10,
                purchased: 10,
                sales: 5,
                stock: 50,
                notes: ''

            },
            {
                id: 4,
                name: 'LED Leptop 4.5 inci',
                code: '423456',
                stock: 150,
                first_stock: 10,
                purchased: 10,
                sales: 5,
                notes: ''

            },
        ];

        const rows = datas.map(data => {
            return (
                <tr key={data.id}>
                    <td>
                        <p className="text-primary">{data.name}</p>
                        <small className="text-muted">{data.code}</small>
                        <div>
                            <button className="btn btn-link text-success btn-xs">View History</button>
                            <button className="btn btn-link text-info btn-xs">Adjust Stock</button>
                        </div>
                    </td>
                    <td className="text-center">{data.first_stock.toLocaleString()}</td>
                    <td className="text-center">{data.purchased.toLocaleString()}</td>
                    <td className="text-center">{data.sales.toLocaleString()}</td>
                    <td className="text-center">{data.stock.toLocaleString()}</td>
                    <td>{data.notes}</td>
                    
                </tr>
            )
        });
            

        return (
            <Layout>
                <div className="row content">
                    <h1 className="content-title">StockOpname</h1>
                </div>
    
                <div className="col-md-12">
                    <div className="cardbox cards">
                        <div className="row">
                            <div className="col-sm-8"></div>
                            <div className="col-sm-4 text-right">
                                <div className="input-group">
                                    <input type="text" id="keyword" className="form-control" />
                                    <div className="input-group-btn">
                                        <button className="btn btn-default">Search</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <table className="table table-primary table-bordered table-hover mt-20 table-custom">
                            <thead>
                            <tr>
                                    <th onClick={this.handleSorting} id="name" style={{ width: '200px' }}>Name 
                                            <div className={`table-sorting ${this.state.ordering.type === 'name' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'name' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                            </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="first_stock">First stock 
                                        <div className={`table-sorting ${this.state.ordering.type === 'first_stock' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'stock' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                        </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="purchased">Purchased 
                                        <div className={`table-sorting ${this.state.ordering.type === 'purchased' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'purchased' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                        </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="sales">Sales 
                                        <div className={`table-sorting ${this.state.ordering.type === 'sales' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'sales' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                        </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="stock">Stock 
                                        <div className={`table-sorting ${this.state.ordering.type === 'stock' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'stock' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                        </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="notes" style={{ width: '100px' }}>Notes
                                        <div className={`table-sorting ${this.state.ordering.type === 'notes' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'notes' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                        </div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>{ rows }</tbody>
                        </table>
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

export default StockOpname;