import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import moment from 'moment';
import { fetchExpense, deleteExpense } from '../store/actions/expenseAction';
import ScrollToTop from '../components/layout/ScrollToTop';
import Loading from 'react-loading-bar';
import { withToastManager } from 'react-toast-notifications';
import { connect } from 'react-redux';

class Expense extends React.Component {
    state = {
        startDate: new Date(),
		endDate: new Date(),
		search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteId: null,
		showMsgBox: false
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
	
	handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			keyword: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchExpense(this.state);
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

		this.props.deleteExpense(this.state.deleteId);
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
            this.props.fetchExpense(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchExpense(nextState);
        }

        if (this.state.startDate !== nextState.startDate) {
            this.props.fetchExpense(nextState);
        }

        if (this.state.endDate !== nextState.endDate) {
            this.props.fetchExpense(nextState);
		}
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.message !== this.props.message) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.fetchExpense(this.state);
        }
    }

    componentDidMount = () => {
        this.props.fetchExpense(this.state)
    }

	render() {
		const {payload, fetching} = this.props;
		const expenses = payload.data && payload.data.data.map(expense => {
			return (
				<tr key={expense._id}>
					<td>
						<p className="text-primary">{ expense.reference }</p>
						<small className="text-muted">{ moment(expense.created_at).format('MMM Do, YYYY') }</small>
						<br />
						<Link className="btn btn-sm btn-link text-success py-0 px-0 pr-2" to={`expense/edit/${expense._id}`}>
							Edit
						</Link>
						<button id={expense._id} onClick={this.handleClickDelete} className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
							Delete
						</button>
					</td>
					<td>{ expense.amount_formatted }</td>
					<td>{ expense.notes }</td>
					<td>{ expense.user && expense.user.name }</td>
					<td><a href={ expense.evidence_link } className="text-primary">{ expense.evidence }</a></td>
				</tr>
			)
		}) 		

		return (
			<Container fluid className="main-content-container px-4">
				<Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>Expense | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Expense" subtitle="Expense" className="text-sm-left" />
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
								<h6 className="m-0">Expense</h6>
							</CardHeader>
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
                                            <Link to="/expense/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">
									<table className="table table-bordered table-custom table-responsive">
										<thead>
											<tr>
												<th>Reference</th>
                                                <th>Amount</th>
												<th>Note</th>
                                                <th>In Charge</th>
                                                <th>Evidence</th>
											</tr>
										</thead>
										<tbody>
											{ payload.data && payload.data.data.length > 0 ? expenses : (
													<tr>
														<td className="text-center" colSpan="5">Data not found</td>
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
        payload: state.expense.payload,
        error: state.expense.error,
		fetching: state.expense.fetching,
		message: state.expense.message
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchExpense: (filter) => dispatch(fetchExpense(filter)),
		deleteExpense: (id) => dispatch(deleteExpense(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Expense));
