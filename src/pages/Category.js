import React from 'react';
import {Link} from 'react-router-dom';
import Layout from '../components/Layout';

class Category extends React.Component {
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
                name: 'Broken Goods',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sapiente dignissimos porro, vero modi aliquid fugit sequi'

            },
            {
                id: 2,
                name: 'Easy to broke',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sapiente dignissimos porro, vero modi aliquid fugit sequi'

            },
            {
                id: 3,
                name: 'Cheap goods',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sapiente dignissimos porro, vero modi aliquid fugit sequi'

            },
            {
                id: 4,
                name: 'expensive goods',
                description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse sapiente dignissimos porro, vero modi aliquid fugit sequi'

            },
        ];

        const rows = datas.map(data => {
            return (
                <tr key={data.id}>
                    <td>
                        <p className="text-primary">{data.name}</p>
                        <div>
                            <button className="btn btn-link text-success btn-xs">Edit</button>
                            <button className="btn btn-link text-danger btn-xs">Delete</button>
                        </div>
                    </td>                    
                    <td>{data.description} <small className="text-muted">[...]</small> </td>
                </tr>
            )
        });
            

        return (
            <Layout>
                <div className="row content">
                    <h1 className="content-title">Category</h1>
                </div>
    
                <div className="col-md-12">
                    <div className="cardbox cards">
                        <div className="row">                        
                            <div className="col-sm-8">
                                <Link to="category/create" className="btn btn-primary mr-10">
                                    <i className="mdi mdi-plus"></i> Add new category
                                </Link>
                                <div className="btn btn-info mr-10">
                                    <i className="mdi mdi-upload"></i> Import
                                </div>
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
                        <table className="table table-primary table-bordered table-hover mt-20 table-custom">
                            <thead>
                                <tr>
                                    <th onClick={this.handleSorting} id="name" style={{ width: '250px' }}>Name 
                                            <div className={`table-sorting ${this.state.ordering.type === 'name' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'name' ?
                                                    (<i className={`mdi mdi-${ this.state.ordering.sort === 'asc' ? 'sort-ascending' : 'sort-descending' }`}></i>)
                                                :
                                                    (<i className="mdi mdi-sort"></i>)
                                            }
                                            
                                            </div>
                                    </th>
                                    <th onClick={this.handleSorting} id="description">Description 
                                        <div className={`table-sorting ${this.state.ordering.type === 'description' && 'active' }`} >
                                            { 
                                                this.state.ordering.type === 'description' ?
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

export default Category;