import React from 'react';
import { Container, Row, Col } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { fetchEmployee, deleteEmployee } from '../store/actions/employeeAction';
import moment from 'moment';
import Loading from 'react-loading-bar';
import ScrollToTop from '../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import Error500 from './Error500';

class Employee extends React.Component {

    state = {
        search: null,
        page: 1,
        perpage: 6,
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
		this.props.fetchEmployee(this.state);
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

		this.props.deleteEmployee(this.state.deleteId);
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
            this.props.fetchEmployee(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchEmployee(nextState);
        }

        if (this.state.startDate !== nextState.startDate) {
            this.props.fetchEmployee(nextState);
        }

        if (this.state.endDate !== nextState.endDate) {
            this.props.fetchEmployee(nextState);
		}
    }
    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.message !== this.props.message) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.fetchEmployee(this.state);
        }
    }

    componentDidMount = () => {
        this.props.fetchEmployee(this.state)
    }

	render() {

        const { payload, fetching, error } = this.props;
        
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

        const users = payload.data && payload.data.data.map(user => {
            return (
                    <div className="col-md-4" key={user._id}>
                        <div className="profile">
                            <div className="profile-card">
                                <img src={user.employee.photo_url} alt={user.name} className="img img-circle" />
                                <h2 className="title-profile">{ user.name }</h2>
                                <p className="text-secondary">{ user.employee.reg_number }</p>
                                <small className="text-muted">{ user.employee.place_of_birth }, { moment(user.employee.date_of_birth).format('LL') } ({ user.employee.age })</small>
                                <p className="text-primary">{ user.role.name }</p>
                                <Link className="btn btn-sm btn-link text-primary py-0 px-0 pr-2" to={`employee/view/${user._id}`}>
                                    View
                                </Link>
                                <Link className="btn btn-sm btn-link text-success py-0 px-0 pr-2" to={`employee/edit/${user._id}`}>
                                    Edit
                                </Link>
                                <button id={user._id} onClick={this.handleClickDelete} className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
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
					<title>Employee | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
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
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Employee" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                        <form onSubmit={this.handleSubmitKeyword}>
                            <div className="input-group mt-3">
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
				</Row>
				<Row>
					<Col>
                        <div className="col-md-12">
                            <Link to="/employee/create" className="btn btn-secondary mr-2">
                                <i className="mdi mdi-plus" /> Add
                            </Link>
                        </div>

                        <div className="col-md-12 mt-5 mb-5">
                            <div className="row">
                                {
                                    payload.data && payload.data.data.length > 0 ? users : (
                                        <div className="col-md-12 py-5">
                                            <div className="text-center">
                                                <h3 className="text-muted">Data not found!</h3>
                                            </div>
                                        </div>
                                )
                            }

                            </div>
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
                                            <option value="6">6</option>
                                            <option value="12">12</option>
                                            <option value="60">60</option>
                                            <option value="120">120</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>                   

					</Col>
				</Row>
			</Container>
		);
	}
}

const mapStateToProps = (state) => {
    return {
        ...state,
        payload: state.employee.payload,
        error: state.employee.error,
		fetching: state.employee.fetching,
		message: state.employee.message
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchEmployee: (filter) => dispatch(fetchEmployee(filter)),
        deleteEmployee: (id) => dispatch(deleteEmployee(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Employee));
