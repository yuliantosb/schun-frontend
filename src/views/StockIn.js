import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import "../assets/range-date-picker.css";
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { fetchStockIn } from '../store/actions/stockInAction';
import {connect} from 'react-redux';
import moment from 'moment';
import Error500 from './Error500';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';


class StockIn extends React.Component {
    state = {
        startDate: null,
        endDate: null,
        search: null,
        page: 1,
        perpage: 10,
        keyword: null
    }

    handleStartDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ startDate: new Date(value) }
        });
    }

    handleEndDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ endDate: new Date(value) }
        });
    }

    handleClickPage = (e) => {
        this.setState({
            ...this.state,
            page: e
        });
    }

    hanldeChangePage  = (e) => {
        this.setState({
            ...this.state,
            perpage: e.target.value
        });
    }

    handleChangeKeyword = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    handleClickKeyword = () => {
        this.props.fetchStockIn(this.state);
    }

    handlePressKeyword = (e) => {
        if (e.key === 'Enter') {
            this.props.fetchStockIn(this.state);
        }
    }
    
    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchStockIn(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchStockIn(nextState);
        }

        if (this.state.startDate !== nextState.startDate) {
            this.props.fetchStockIn(nextState);
        }

        if (this.state.endDate !== nextState.endDate) {
            this.props.fetchStockIn(nextState);
        }
    }

    componentDidMount = ()  => {
        this.props.fetchStockIn(this.state);
    }

    render() {
        const {payload, error, fetching} =  this.props;
        if (error && error.status === 401) {
            sessionStorage.removeItem('token');
            return <Redirect to="/" />
        } else if (error && error.status === 500) {
            return <Error500 message={error.data.message} />
        }        

        const stockIns = payload.data && payload.data.data.map(stockIn => {
            return (
            <tr key={stockIn._id}>
                <td>
                    <p className="text-primary">{ moment(stockIn.stock_in_date).format('MMM Do, YYYY') }</p>
                    <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">Edit</button>
                    <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">Delete</button>
                </td>
                <td>
                    <p className="text-secondary">{ stockIn.items.name }</p>
                    <small>{ stockIn.items.item_code }</small>
                </td>
                <td>{ stockIn.items.uom.name }</td>
                <td>{ stockIn.qty }</td>
                <td>{ stockIn.formatted_price }</td>
                <td><Link to="/">{ stockIn.evidence }</Link></td>
            </tr>
            );
        });

        return (
            <Container fluid className="main-content-container px-4">
                <Loading
                    show={fetching}
                    color="blue"
                    showSpinner={false}
                    />
                <Helmet>
                    <title>Stock In | {appName} </title>
                </Helmet>
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Stock In" subtitle="Stock in material" className="text-sm-left" />
                </Row>
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Stock in Material</h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <div className="col-md-12 mt-4">
                                    <div className="row">
                                        <div className="col-md-5">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-l">Date From</label>
                                                        <DatePicker
                                                            size="md"
                                                            selected={this.state.startDate}
                                                            onChange={this.handleStartDateChange}
                                                            placeholderText="Date From"
                                                            dropdownMode="select"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-l">Date To</label>
                                                        <DatePicker
                                                            size="md"
                                                            selected={this.state.endDate}
                                                            onChange={this.handleEndDateChange}
                                                            placeholderText="Date To"
                                                            dropdownMode="select"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="col-md-4 offset-md-3 text-right">
                                            <div className="input-group mb-3">
                                                <input onKeyPress={this.handlePressKeyword} onChange={this.handleChangeKeyword} id="keyword" type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                                <div className="input-group-prepend">
                                                    <button onClick={this.handleClickKeyword} className="btn btn-secondary" type="submit" id="button-addon1"><i className="mdi mdi-magnify"></i> Search </button>
                                                </div>
                                            </div>
                                            <Link to="/stockin/create" className="btn btn-secondary mr-2"><i className="mdi mdi-plus"></i> Add</Link>
                                            <button type="button" className="btn btn-primary"><i className="mdi mdi-download"></i> Download</button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="col-md-12 mt-3">
                                    <table className="table table-bordered table-custom table-responsive">
                                        <thead>
                                            <tr>
                                                <th>Stock In Date</th>
                                                <th>Item Name</th>
                                                <th>UoM</th>
                                                <th>Qty</th>
                                                <th>Price (RP)</th>
                                                <th>Evidence</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            { payload.data && payload.data.data.length > 0 ? stockIns : (
                                                <tr>
                                                    <td className="text-center" colSpan="6">Data not found</td>
                                                </tr>
                                            ) }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12 py-3">
                                    <div className="row">
                                        <div className="col-md-10">
                                            { payload.data && payload.data.total > 1 && (
                                                <p>Showing { payload.data && payload.data.from.toLocaleString() } to { payload.data && payload.data.to.toLocaleString() } of { payload.data && payload.data.total.toLocaleString() } record(s)</p>

                                            )}

                                            {
                                                payload.data && payload.data.total > 1 && (
                                                    <nav aria-label="Page navigation example">
                                                        <ul className="pagination">

                                                            { payload.data.current_page > 1 && <li key="prev" className="page-item"><button onClick={this.handleClickPage.bind(null, payload.data.current_page - 1)} className="page-link">Prev</button></li> }

                                                            {
                                                                payload.data.pages.map((page, index) => {
                                                                    return (
                                                                        
                                                                        <li key={index} className={`page-item ${page === '...' ? 'disabled' : '' } ${page === payload.data.current_page ? 'active' : '' }`}><button onClick={this.handleClickPage.bind(null, page)} className="page-link">{page}</button></li>
                                                                        
                                                                    )
                                                                })
                                                            }

                                                            { payload.data.current_page < payload.data.last_page && <li key="next" className="page-item"><button onClick={this.handleClickPage.bind(null, payload.data.current_page + 1)} className="page-link">Next</button></li> }


                                                        </ul>
                                                    </nav>
                                                )
                                            }
                                            
                                        </div>
                                        <div className="col-md-2 text-right">
                                            <div className="form-group">
                                                <label className="control-label">Showing per page </label>
                                                <select defaultValue={this.state.perpage} id="perpage" className="form-control custom-select" onChange={this.hanldeChangePage}>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        payload: state.stockIn.payload,
        error: state.stockIn.error,
        fetching: state.stockIn.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchStockIn: (filter) => dispatch(fetchStockIn(filter))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StockIn);