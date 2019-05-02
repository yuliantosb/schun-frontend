import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../components/Layout';

class Product extends React.Component {
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
                cost: 230000,
                price: 300000,
                stock: 20,
                categories: ['office tools', 'computer stuff']

            },
            {
                id: 2,
                name: 'Mos Leptop',
                code: '223456',
                cost: 80000,
                price: 120000,
                stock: 80,
                categories: ['office tools', 'computer stuff', 'small tools']

            },
            {
                id: 3,
                name: 'Kibot Leptop',
                code: '323456',
                cost: 120000,
                price: 160000,
                stock: 50,
                categories: ['computer stuff', 'stuff always broken']

            },
            {
                id: 4,
                name: 'LED Leptop 4.5 inci',
                code: '423456',
                cost: 450000,
                price: 650000,
                stock: 150,
                categories: ['computer stuff', 'small tools', 'stuff always broken']

            },
        ];

        const rows = datas.map(data => {
            return (
                <tr key={data.id}>
                    <td>
                        <p className="text-primary">{data.name}</p>
                        <small className="text-muted">{data.code}</small>
                        <div>
                            <button className="btn btn-link text-success btn-xs">Edit</button>
                            <button className="btn btn-link text-danger btn-xs">Delete</button>
                        </div>
                    </td>
                    <td className="text-right">RP.{data.cost.toLocaleString()}</td>
                    <td className="text-right">RP.{data.price.toLocaleString()}</td>
                    <td className="text-center">{data.stock.toLocaleString()}</td>
                    <td>
                        {data.categories.map((category, index) => {
                            return (
                                <span key={index} className="label label-primary">{category}</span>
                            )
                        })}
                    </td>
                </tr>
            )
        });
            

        return (
            <Layout>
                <div className="row content">
                    <h1 className="content-title">Product</h1>
                </div>
    
                <div className="col-md-12">
                    <div className="cardbox cards">
                        <div className="row">                        
                            <div className="col-sm-8">
                                <Link to="product/create" className="btn btn-primary mr-10">
                                    <i className="mdi mdi-plus"></i> Add new product
                                </Link>
                                <div className="btn btn-info mr-10">
                                    <i className="mdi mdi-upload"></i> Import
                                </div>
                                <div className="btn btn-success">
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
                        <table className="table table-primary table-bordered table-hover mt-20 table-custom">
                            <thead>
                                <tr>
                                    <th onClick={this.handleSorting} id="name">Name 
                                            <div className={`table-sorting ${this.state.ordering.type === 'name' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'name' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                            </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="cost">Cost 
                                        <div className={`table-sorting ${this.state.ordering.type === 'cost' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'cost' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                        </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="price">Price 
                                        <div className={`table-sorting ${this.state.ordering.type === 'price' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'price' ?
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
                                    <th onClick={this.handleSorting} id="categories">Categories
                                        <div className={`table-sorting ${this.state.ordering.type === 'categories' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'categories' ?
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

export default Product;