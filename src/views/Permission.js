import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, Alert } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import Error500 from './Error500';
import moment from 'moment';
import { fetchPermission, deletePermission } from '../store/actions/permissionAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import ScrollToTop from '../components/layout/ScrollToTop';

class Permission extends React.Component {

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
		this.props.fetchPermission(this.state);
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

		this.props.deletePermission(this.state.deleteId);
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
            this.props.fetchPermission(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchPermission(nextState);
        }

        if (this.state.startDate !== nextState.startDate) {
            this.props.fetchPermission(nextState);
        }

        if (this.state.endDate !== nextState.endDate) {
            this.props.fetchPermission(nextState);
		}
	}
	
	componentDidUpdate = (prevProps, nextState) => {
		if (prevProps.message !== this.props.message) {
			this.props.fetchPermission(this.state);
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

	componentDidMount = ()  => {
		this.showAlertTimeout();
        this.props.fetchPermission(this.state);
	}
	
	render() {

		const {payload, error, fetching} =  this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

		const permissions = payload.data && payload.data.data.map(permission => {
            return (
            <tr key={permission._id}>
                <td>
                    <p className="text-primary">{ permission.name }</p>
					<small className="text-muted">{ moment(permission.created_at).format('MMM Do, YYYY') }</small>
					<br/>
                    <Link to={`/permission/edit/${permission._id}`} className="btn btn-sm btn-link text-success py-0 px-0 pr-2">Edit</Link>
                    <button id={permission._id} onClick={this.handleClickDelete} className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">Delete</button>
                </td>
				<td>{permission.parent ? permission.parent.name : ''}</td>
                <td>
                    { permission.description }
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
				<Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
					<Helmet>
						<title>Permission | {appName} </title>
					</Helmet>
					<Row noGutters className="page-header py-4">
						<PageTitle sm="4" title="Permission" subtitle="Permission" className="text-sm-left" />
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
									<h6 className="m-0">Permission</h6>
								</CardHeader>
								<CardBody className="p-0 pb-3">
									<div className="col-md-12 mt-4">
										<div className="row">
											<div className="col-md-8">
												<Link to="/permission/create" className="btn btn-secondary mr-2">
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
													<th>Parent</th>
													<th>Description</th>
												</tr>
											</thead>
											<tbody>
												{ payload.data && payload.data.data.length > 0 ? permissions : (
													<tr>
														<td className="text-center" colSpan="3">Data not found</td>
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
        payload: state.permission.payload,
        error: state.permission.error,
		fetching: state.permission.fetching,
		message: state.permission.message
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchPermission: (filter) => dispatch(fetchPermission(filter)),
		deletePermission: (id) => dispatch(deletePermission(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Permission);
