import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Redirect } from 'react-router-dom';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import { withToastManager } from 'react-toast-notifications';
import { fetchStockItem } from '../store/actions/stockItemAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import Table from '../components/table/Table';
import moment from 'moment';
import Axios from 'axios';

class ReportStock extends React.Component {
	state = {
		startDate: new Date(),
		endDate: new Date(),
        search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		showMsgBox: false,
		isDeleted: false,
		ordering: {
            type: 'created_at',
            sort: 'asc'
        },
		modal: false,
		download: false
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
		this.props.fetchStockItem(this.state);
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
    
    
    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchStockItem(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchStockItem(nextState);
		}
		
		if (this.state.ordering !== nextState.ordering) {
			this.props.fetchStockItem(nextState);
		}

		if (this.state.startDate !== nextState.startDate) {
			this.props.fetchStockItem(nextState);
		}

		if (this.state.endDate !== nextState.endDate) {
			this.props.fetchStockItem(nextState);
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
				this.props.fetchStockItem(this.state);
			}
		}
    }
	
	handleDownload = async () => {

		this.setState({
			...this.state,
			download: true
		});

		await Axios.post(`${url}/report/stock`, {
			start_date: moment(this.state.startDate).format('YYYY-MM-DD'),
			end_date: moment(this.state.endDate).format('YYYY-MM-DD')
		}, {
			responseType: 'blob',
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`
			}
		}).then(response => {
			
			this.setState({
				...this.state,
				download: false
			});

			const file = new Blob(
				[response.data], 
				{type: 'application/pdf'});
			const fileURL = URL.createObjectURL(file);
			window.open(fileURL);
		  
		})
	}

    componentDidMount = () => {
        this.props.fetchStockItem(this.state)
	}	
	
	render() {
        const {payload, error, fetching} = this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

		const {ordering} = this.state;
        const theads = [
            {name:'created_at', 'value': 'Date', sortable: false},
            {name:'product_bane', 'value': 'Product', sortable: false},
            {name:'description', 'value': 'Description', sortable: false},
            {name:'amount', 'value': 'Amount', sortable: false}
        ];

		const stockitems = payload.data && payload.data.data.map(stockitem => {
            return (
            <tr key={stockitem._id}>
				<td>{ moment(stockitem.created_at).format('ll') }</td>
				<td>{ stockitem.stock && stockitem.stock.product && stockitem.stock.product.name }</td>
                <td>{ stockitem.description }</td>
                <td className="text-right">{ stockitem.type === 'induction' ? <span className="text-success">+{stockitem.amount}</span> : <span className="text-danger">-{stockitem.amount}</span> }</td>
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
					<title>Report Stock Item | {appName} </title>
				</Helmet>


				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Report Stock Item"  className="text-sm-left" />
				</Row>
				<Row>
					
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
											{
												this.state.download ? (
													<button className="btn btn-secondary btn-disabled" disabled>
														<i className="mdi mdi-timer-sand"></i> Loading...
													</button>
												) : (
													<button className="btn btn-secondary" onClick={this.handleDownload}>
														<i className="mdi mdi-download"></i> Download
													</button>
												)
											}
                                            
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">

									<Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
										{ 
											fetching ? 
											(
												<tr>
													<td className="text-center" colSpan="8">Loading...</td>
												</tr>
											)
											:
											payload.data && payload.data.data.length > 0 ? stockitems : (
												<tr>
													<td className="text-center" colSpan="8">Data not found</td>
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
        payload: state.stockitem.payload,
        error: state.stockitem.error,
		fetching: state.stockitem.fetching,
		message: state.stockitem.message,
		saved: state.stockitem.saved,
		isDeleted: state.stockitem.isDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchStockItem: (filter) => dispatch(fetchStockItem(filter))		
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ReportStock));
