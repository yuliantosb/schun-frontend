import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { withToastManager } from 'react-toast-notifications';
import { fetchStockOpname, deleteStockOpname, updateStockOpname } from '../store/actions/stockOpnameActions';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import Table from '../components/table/Table';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';
import Modal from 'react-bootstrap4-modal';

class StockOpname extends React.Component {
	state = {
        search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteIdStockOpname: null,
		showMsgBox: false,
		isDeleted: false,
		ordering: {
            type: 'name',
            sort: 'asc'
		},
		modal: false,
		currentStock: null,
		id: null,
		stock: null,
		notes: ''
	}
	
	modalBackdropClicked = () => {
		this.setState({
			...this.state,
			modal: false,
			id: '',
			currentStock: ''
		});
	}

	handleAdjust = (id, stock) => {
		this.setState({
			...this.state,
			modal: true,
			id: id,
			currentStock: stock
		});
	}
    
    handleStartDateChange = (value) => {
        this.setState({
            ...this.state,
            startDate: new Date(value)
        });
    }

    handleEndDateChange = (value) => {
        this.setState({
            ...this.state,
            endDate: new Date(value)
        });
	}
	
    handleSorting = (e) => {
        const type = e.target.id;
        const sort = this.state.ordering.sort;
        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        });
    }

    handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchStockOpname(this.state);
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
	
	handleChangeStock = (e) => {
		this.setState({
			...this.state,
			stock: e.target.value
		});
	}

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateStockOpname(this.state.id, this.state);
		this.modalBackdropClicked();
	}
    
    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchStockOpname(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchStockOpname(nextState);
		}
		
		if (this.state.ordering !== nextState.ordering) {
			this.props.fetchStockOpname(nextState);
		}
    }
    
    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.error !== this.props.error) {
            if (!this.props.fetched) {
                if (this.props.error) {
                    const { toastManager } = this.props;
                    toastManager.add(this.props.error.data.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }
		}
		
		if (prevProps.isUpdated !== this.props.isUpdated) {
			if (this.props.isUpdated) {
				const { toastManager } = this.props;
				toastManager.add(this.props.message, {
					appearance: 'success',
					autoDismiss: true
				});
				this.props.fetchStockOpname(this.state);
			}
		}
    }

    componentDidMount = () => {
        this.props.fetchStockOpname(this.state)
	}	
	
	render() {
		const {payload, error, fetching} = this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

		const {ordering} = this.state;
        const theads = [
            {name:'name', 'value': 'Product', sortable: true},
            {name:'stock', value: 'Stock', sortable: true},
            {name:'total_sales', 'value': 'Total Sales (Today)', sortable: false},
            {name:'total_purchase', 'value': 'Total Purchase (Today)', sortable: false},
            {name:'option', 'value': 'Options', sortable: false}
        ];

		const stocks = payload.data && payload.data.data.map(stock => {
            return (
            <tr key={stock._id}>
                <td>
                    <strong>{ stock.name }</strong>
                </td>
                <td className="text-center">{ stock.stock.amount }</td>
				<td className="text-center">{ stock.total_sales }</td>				
				<td className="text-center">{ stock.total_purchase }</td>
				<td className="text-center">
					<Link data-tip="View" to={`/stock-opname/view/${stock._id}`} className="btn btn-link text-info btn-sm  py-0 px-0 pr-4"><i className="mdi mdi-eye"></i></Link>
                    <button data-tip="Adjust" onClick={() => this.handleAdjust(stock._id, stock.stock.amount) } className="btn btn-link text-success btn-sm  py-0 px-0"><i className="mdi mdi-tune"></i></button>
					<ReactTooltip/>
				</td>
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
					<title>Stock Opname | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="StockOpname"  className="text-sm-left" />
				</Row>
				<Row>
					<Modal visible={this.state.modal} onClickBackdrop={this.modalBackdropClicked}>
						<form onSubmit={this.handleSubmit}>
							<div className="modal-header">
							<h5 className="modal-title">Adjust Stock</h5>
							</div>
							<div className="modal-body py-0 pt-2 px-4">
								<div className="row">
									<div className="col-md-12">
										<div className="form-group">
											<label className="control-label">Stock <span className="text-danger">*</span></label>
											<input id="stock" onChange={this.handleChangeStock} type="text" className={`form-control ${ error && error.data.errors.stock && 'is-invalid' }`} placeholder="0" />
											{ 
												error && error.data.errors.stock && <div className="invalid-feedback">{ error.data.errors.stock[0] }</div>
											}
											<span className="help-block">
												<small className="text-muted">Use (-) to deduct the stock</small>
											</span>
											<p className="text-primary">Current Stock : { !isNaN(parseInt(this.state.stock)) ? parseInt(this.state.stock) + this.state.currentStock : this.state.currentStock }</p>
										</div>
										<div className="form-group">
											<label className="control-label">Notes <span className="text-danger">*</span></label>
											<textarea id="notes" rows="5" className={`form-control ${ error && error.data.errors.notes && 'is-invalid' }`} onChange={this.handleChange}></textarea>
											{ 
												error && error.data.errors.notes && <div className="invalid-feedback">{ error.data.errors.notes[0] }</div>
											}
										</div>
									</div>
								</div>
							</div>
							<div className="modal-footer">
							<button type="button" className="btn btn-default" onClick={this.modalBackdropClicked}>
								Close
							</button>
							<button type="submit" className="btn btn-secondary" onClick={this.handleUpdateStock}>
								Save Changes
							</button>
							</div>
						</form>
					</Modal>
					<Col>
						<Card small className="mb-4">
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
                                    <div className="row">
                                        <div className="col-md-6">
                                            
                                        </div>
										<div className="col-md-4 offset-md-2 text-right">
											<div className="input-group mb-3">
											<form onSubmit={this.handleSubmitKeyword}>
													<div className="input-group mb-3">
														<input
															id="keyword"
															type="text"
															className="form-control"
															placeholder=""
															aria-label="Example text with button addon"
															aria-describedby="button-addon1"
															onChange={this.handleChangeKeyword}
														/>
														<div className="input-group-prepend">
															<button
																className="btn btn-secondary"
																type="submit"
																id="button-addon1"
															>
																<i className="mdi mdi-magnify" /> Search{' '}
															</button>
														</div>
													</div>
												</form>
											</div>
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">

									<Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
										{ 
											fetching ? 
											(
												<tr>
													<td className="text-center" colSpan="7">Loading...</td>
												</tr>
											)
											:
											payload.data && payload.data.data.length > 0 ? stocks : (
												<tr>
													<td className="text-center" colSpan="7">Data not found</td>
												</tr>
										) }
									</Table>

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
												<select
													defaultValue="10"
													id="perpage"
													className="form-control custom-select"
													onChange={this.hanldeChangePage}
												>
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
		);
	}
}



const mapStateToProps = (state) => {
    return {
        ...state,
        payload: state.stock.payload,
        error: state.stock.error,
		fetching: state.stock.fetching,
		message: state.stock.message,
		saved: state.stock.saved,
		isUpdated: state.stock.isUpdated
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockOpname: (filter) => dispatch(fetchStockOpname(filter)),
		updateStockOpname: (id, data) => dispatch(updateStockOpname(id, data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(StockOpname));
