import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import { fetchCustomer, deleteCustomer } from '../store/actions/customerAction';
import Loading from 'react-loading-bar';
import moment from 'moment';
import {connect} from 'react-redux';

class Customer extends React.Component {

	state = {
        search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteId: null,
		showMsgBox: false
    }

    handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchCustomer(this.state);
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
    
    handleClickDelete = (e) => {
		this.setState({
			...this.state,
			deleteId: e.target.id,
			showMsgBox: true
		});
	}
	
	handleClickYes = () => {

		this.setState({
			...this.state,
			alertMsgBox: true,
			showMsgBox: false
		});

		this.props.deleteCustomer(this.state.deleteId);
	}

	handleClickNo = () => {
		this.setState({
			...this.state,
			showMsgBox: false,
			deleteId: null
		});
	}

    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchCustomer(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchCustomer(nextState);
        }
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.message !== this.props.message) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.fetchCustomer(this.state);
        }
    }

    componentDidMount = () => {
        this.props.fetchCustomer(this.state)
    }	

	render() {
		const {payload, fetching} = this.props;
		const customers = payload.data && payload.data.data.map(customer => {
            return (
            <tr key={customer._id}>
                <td>
                    <p className="text-primary">{ customer.name }</p>
					<small className="text-muted">{ moment(customer.created_at).format('MMM Do, YYYY') }</small>
					<br/>
                    <Link to={`/customer/edit/${customer._id}`} className="btn btn-sm btn-link text-success py-0 px-0 pr-2">Edit</Link>
                    <button id={customer._id} onClick={this.handleClickDelete} className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">Delete</button>
                </td>
				<td>{ customer.email }</td>
				<td>{ customer.phone_number }</td>
				<td>{ customer.address }</td>
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
					<title>Customer | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Customer" subtitle="Customer" className="text-sm-left" />
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
							<CardHeader className="border-bottom">
								<h6 className="m-0">Customer</h6>
							</CardHeader>
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<div className="row">
                                        <div className="col-md-8">
                                            <Link to="/customer/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
                                        </div>
										<div className="col-md-4 text-right">
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
								<div className="col-md-12 mt-3">
									<table className="table table-bordered table-custom table-responsive">
										<thead>
											<tr>
												<th>Name</th>
                                                <th>Email</th>
												<th>Phone</th>
                                                <th>Address</th>
											</tr>
										</thead>
										<tbody>
											{ payload.data && payload.data.data.length > 0 ? customers : (
													<tr>
														<td className="text-center" colSpan="4">Data not found</td>
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
        payload: state.customer.payload,
        error: state.customer.error,
		fetching: state.customer.fetching,
		message: state.customer.message
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCustomer: (filter) => dispatch(fetchCustomer(filter)),
		deleteCustomer: (id) => dispatch(deleteCustomer(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Customer));