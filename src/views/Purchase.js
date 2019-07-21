import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import { fetchPurchase, deletePurchase } from '../store/actions/purchaseActions';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import Table from '../components/table/Table';
import ReactTooltip from 'react-tooltip';
import moment from 'moment';

class Purchase extends React.Component {
	state = {
        startDate: new Date(),
        endDate: new Date(),
        search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteIdPurchase: null,
		showMsgBox: false,
		isDeleted: false,
		ordering: {
            type: 'reference',
            sort: 'asc'
        }
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
		this.props.fetchPurchase(this.state);
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
    
    handleClickDelete = (id) => {
		this.setState({
			...this.state,
			deleteIdPurchase: id,
			showMsgBox: true
		});
	}
	
	handleClickYes = () => {

		this.setState({
			...this.state,
			alertMsgBox: true,
			showMsgBox: false,
			isDeleted: true
		});

		this.props.deletePurchase(this.state.deleteIdPurchase);
	}

	handleClickNo = () => {
		this.setState({
			...this.state,
			showMsgBox: false,
			deleteIdPurchase: null
		});
	}

    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchPurchase(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchPurchase(nextState);
		}
		
		if (this.state.ordering !== nextState.ordering) {
			this.props.fetchPurchase(nextState);
		}

		if (this.state.startDate !== nextState.startDate) {
            this.props.fetchPurchase(nextState);
        }

        if (this.state.endDate !== nextState.endDate) {
            this.props.fetchPurchase(nextState);
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
		
		if (prevProps.isDeleted !== this.props.isDeleted) {
			if (this.props.isDeleted) {
				const { toastManager } = this.props;
				toastManager.add(this.props.message, {
					appearance: 'success',
					autoDismiss: true
				});
				this.props.fetchPurchase(this.state);
			}
		}
    }

    componentDidMount = () => {
        this.props.fetchPurchase(this.state)
	}	
	
	render() {
		const {payload, error, fetching} = this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

		const {ordering} = this.state;
        const theads = [
            {name:'reference', 'value': 'Reference', sortable: true},
            {name:'created_at', value: 'Date', sortable: true},
            {name:'supplier_name', 'value': 'Supplier', sortable: true},
            {name:'user_name', 'value': 'In Charge', sortable: true},
            {name:'evidence', 'value': 'Evidence', sortable: true},
            {name:'total', 'value': 'Total', sortable: true},
            {name:'option', 'value': 'Options', sortable: false}
        ];

		const purchases = payload.data && payload.data.data.map(purchase => {
            return (
            <tr key={purchase._id}>
                <td>
                    <strong>{ purchase.reference }</strong>
                </td>
                <td>{ moment(purchase.created_at).format('ll') }</td>
				<td>{ purchase.supplier && purchase.supplier.name }</td>				
				<td>{ purchase.user && purchase.user.name }</td>
                <td><a download={purchase.evidence} href={ purchase.file }>{ purchase.evidence }</a></td>
                <td className="text-right">{ purchase.total_formatted }</td>
				<td className="text-center">
					<Link data-tip="Edit" to={`/purchase/edit/${purchase._id}`} className="btn btn-link text-success btn-sm  py-0 px-0 pr-4"><i className="mdi mdi-pencil"></i></Link>
					<Link data-tip="View" to={`/purchase/view/${purchase._id}`} className="btn btn-link text-info btn-sm  py-0 px-0 pr-4"><i className="mdi mdi-eye"></i></Link>
                    <button data-tip="Delete" onClick={() => this.handleClickDelete(purchase._id)} className="btn btn-link text-danger btn-sm  py-0 px-0"><i className="mdi mdi-delete"></i></button>
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
					<title>Purchase | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Purchase"  className="text-sm-left" />
				</Row>
				<Row>
					{
						this.state.showMsgBox &&
						(
							<ScrollToTop>
								<div className="messagebox">
									<p className="mb-5">Are you sure want to delete this data?</p>
									<button className="btn btn-secondary mr-4" onClick={this.handleClickYes}>Yes</button>
									<button className="btn btn-white" onClick={this.handleClickNo}>No Cancel</button>
								</div>
								<div className="backdrop"></div>
							</ScrollToTop>
						)
					}
					<Col>
						<Card small className="mb-4">
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
                                    <div className="row">
                                        <div className="col-md-6">
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
                                            <Link to="/purchase/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
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
											payload.data && payload.data.data.length > 0 ? purchases : (
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
        payload: state.purchase.payload,
        error: state.purchase.error,
		fetching: state.purchase.fetching,
		message: state.purchase.message,
		saved: state.purchase.saved,
		isDeleted: state.purchase.isDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPurchase: (filter) => dispatch(fetchPurchase(filter)),
		deletePurchase: (id) => dispatch(deletePurchase(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Purchase));
