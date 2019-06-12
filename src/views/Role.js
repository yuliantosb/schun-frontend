import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Alert } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import {connect} from 'react-redux';
import { fetchRole, deleteRole } from '../store/actions/roleActions';
import moment from 'moment';
import Error500 from './Error500';
import Loading from 'react-loading-bar';
import ScrollToTop from '../components/layout/ScrollToTop';

class Role extends React.Component {
	state = {
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
			keyword: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchRole(this.state);
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

		this.props.deleteRole(this.state.deleteId);
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
            this.props.fetchRole(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchRole(nextState);
        }

        if (this.state.startDate !== nextState.startDate) {
            this.props.fetchRole(nextState);
        }

        if (this.state.endDate !== nextState.endDate) {
            this.props.fetchRole(nextState);
        }
    }
	
	showAlertTimeout = () => {
		setTimeout(() => {
			this.setState({
				...this.state,
				alert: false,
				alertMsgBox: false
			})	
		}, 2000);

	}

	componentDidUpdate = (prevProps, nextState) => {
		if (prevProps.message !== this.props.message) {
			this.props.fetchRole(this.state);
		}
	}

	componentDidMount = ()  => {
		this.showAlertTimeout();
        this.props.fetchRole(this.state);
	}

	
	render() {
		const {payload, error, fetching} =  this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

		const roles = payload.data && payload.data.data.map(role => {
            return (
            <tr key={role._id}>
                <td>
                    <p className="text-primary">{ role.name }</p>
					<small className="text-muted">{ moment(role.created_at).format('MMM Do, YYYY') }</small>
					<br/>
                    <Link to={`role/edit/${role._id}`} className="btn btn-sm btn-link text-success py-0 px-0 pr-2">Edit</Link>
                    <button id={role._id} onClick={this.handleClickDelete} className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">Delete</button>
                </td>
                <td>
                    { role.description }
                </td>
            </tr>
            );
        });
		
		return (
			<div>
				<Container fluid className="px-0">
					 
					 { this.state.alert && this.props.location.state && <Alert className="mb-0" theme="success">
								<i className="mdi mdi-check"></i> {this.props.location.state.message}
							</Alert> }
					
					{ this.state.alertMsgBox && this.props.message && <Alert className="mb-0" theme="success">
						<i className="mdi mdi-check"></i> {this.props.message}
					</Alert> }
					
				</Container>
				
				<Container fluid className="main-content-container px-4">
					<Helmet>
						<title>Role | {appName} </title>
					</Helmet>
					<Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
					<Row noGutters className="page-header py-4">
						<PageTitle sm="4" title="Role" subtitle="Role" className="text-sm-left" />
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
									<h6 className="m-0">Role</h6>
								</CardHeader>
								<CardBody className="p-0 pb-3">
									<div className="col-md-12 mt-4">
										<div className="row">
											<div className="col-md-8">
												<Link to="/role/create" className="btn btn-secondary mr-2">
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
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												{ payload.data && payload.data.data.length > 0 ? roles : (
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
			</div>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        ...state,
        payload: state.role.payload,
        error: state.role.error,
		fetching: state.role.fetching,
		message: state.role.message
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchRole: (filter) => dispatch(fetchRole(filter)),
		deleteRole: (id) => dispatch(deleteRole(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Role);
