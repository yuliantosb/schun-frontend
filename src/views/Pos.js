import React from 'react';
import { Container, Row, Col, Card, CardHeader } from 'shards-react';
import { Redirect, Link } from 'react-router-dom';
import Error500 from './Error500';
import Helmet from 'react-helmet';
import Loading from 'react-loading-bar';
import { appName, url } from '../global';
import PageTitle from '../components/common/PageTitle';
import AsyncSelect from 'react-select/async';
import Axios from 'axios';
import { customerStyles } from '../utils/selectStyle';
import PhotoDefault from '../images/sales-overview/no-product-image.jpg';
import { withToastManager } from 'react-toast-notifications';
import { fetchProduct } from '../store/actions/productAction';
import { connect } from 'react-redux';
import AutoComplete from '../components/common/AutoComplete';
import NumberFormat from 'react-number-format';
import Modal from 'react-bootstrap4-modal';
import Datetime from 'react-datetime';
import '../../node_modules/react-datetime/css/react-datetime.css';
import { saveSales, getCart } from '../store/actions/salesAction';
import moment from 'moment';

class Pos extends React.Component {

	state = {
		page: 1,
        perpage: 8,
        keyword: '',
		ordering: {
			type: 'name',
			sort: 'asc'
        },
		carts: {},
		modal: false,
		payment_type: 'cash',
		taxes: null,
		percent: null,
		discount: null,
		changes: null,
		amount: null,
		customer_id: '',
		customer_name: '',
		card_number: null,
		card_expired: undefined
    };

    handleClickPage = (e) => {
        this.setState({
            ...this.state,
            page: e
        });
    }

    handleChange = (e) => {
        
        Axios.get(`${url}/products/search`, {
            params: {
                keyword: e.target.value
            },
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((response) => {

			if (response.data.accurate) {

				const id = response.data.data._id;
				const qty = this.state.carts[id] ? this.state.carts[id].qty + 1 : 1;
				this.setState({
					...this.state,
					carts: {
						...this.state.carts,
						[id]: {
							id: id,
							name: response.data.data.name,
							price: response.data.data.price,
							qty: qty,
							subtotal: qty * response.data.data.price
						}
					}
				});

				this.setState({
					...this.state,
					data: [],
					keyword: ''
				});

			} else {

				this.setState({
					...this.state,
					data: response.data.data
				})
			}
        });

        this.setState({
            ...this.state,
            keyword: e.target.value,
        });
        
    }

    onGetValue = (e) => {
		Axios.get(`${url}/products/${e.target.id}`, {
            headers: {
                Authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        }).then((response) => {
			const id = response.data.data._id;
			const qty = this.state.carts[id] ? this.state.carts[id].qty + 1 : 1;
            this.setState({
				...this.state,
				carts: {
					...this.state.carts,
					[id]: {
						id: id,
						name: response.data.data.name,
						price: response.data.data.price,
						qty: qty,
						subtotal: qty * response.data.data.price
					}
				} 
			})
        });

        this.setState({
			...this.state,
			data: [],
            keyword: ''
        });
    }

    componentWillUpdate = (nextProps, nextState) => {
        if (this.state.page !== nextState.page) {
            this.props.fetchProduct(nextState);
        }

        if (this.state.keyword !== nextState.keyword) {
            this.props.fetchProduct(nextState);
		}
		
		if (nextProps.data !== this.props.data) {
			if (nextProps.data) {
					
				this.setState({
					...this.state,
					carts: nextProps.data
				});
			}
		}

	}

	modalBackdropClicked = () => {
		this.setState({
			...this.state,
			modal: false
		});
	}
	
	handlePay = () => {
		this.setState({
			...this.state,
			modal: true
		})
	}

	handleTax = (e) => {
		const total = Object.keys(this.state.carts).reduce((total, key) => total + this.state.carts[key].subtotal, 0);
		const tax = total * (e.target.value.replace(/,/g, '') / 100);
		this.setState({
			...this.state,
			taxes: tax,
			percent: e.target.value
		});
	}

	handleDiscount = (e) => {
		this.setState({
			...this.state,
			discount: e.target.value.replace(/,/g, '')
		});
	}

	onDeleteCart = (id) => {
		const carts = this.state.carts;
		delete carts[id];
		this.setState({
			...this.state,
			carts: carts
		});
	}

	handlePaymentType = (e) => {
		this.setState({
			...this.state,
			payment_type: e.target.value
		})
	}

	handleChangeInput = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleChangeDate = (value) => {
		this.setState({
			...this.state,
			card_expired: value
		});
	}

	handlePayAndPrint = () => {
		this.props.saveSales(this.state, {is_hold: false, id: this.props.match.params.id});
	}

	handleHold = () => {
		this.props.saveSales(this.state, {is_hold: true});
	}

	handleAmount = (e) => {
		const subtotal = Object.keys(this.state.carts).reduce((total, key) => total + this.state.carts[key].subtotal, 0);
		const total = subtotal + (this.state.taxes ? this.state.taxes : 0) - (this.state.discount ? this.state.discount : 0);
		const changes = e.target.value.replace(/,/g, '') - total; 

		this.setState({
			...this.state,
			amount: e.target.value,
			changes: changes
		});
	}

	componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

			if (this.props.saved) {

				const { toastManager } = this.props;
				toastManager.add(this.props.message, {
					appearance: 'success',
					autoDismiss: true
				});
				
				this.setState({
					...this.state,
					carts: {},
					modal: false,
					payment_type: 'cash',
					taxes: null,
					percent: null,
					discount: null,
					changes: null,
					amount: null,
					customer_id: '',
					customer_name: '',
					card_number: null,
					card_expired: undefined
				});
			}

			if (this.props.match.params.id) {
				this.props.history.push('/pos');
			}

        }

        if (prevProps.errorsales !== this.props.errorsales) {
            if (!this.props.fetched) {
                if (this.props.errorsales) {
                    const { toastManager } = this.props;
                    toastManager.add(this.props.errorsales.data.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }
        }
	}

	
	handleChangeCustomer = (value) => {
		this.setState({
			...this.state,
            customer_id: value ? value.value : null,
            customer_name: value ? value.label : null
		});
	}
    

	componentDidMount = () => {
		if (this.props.match.params.id) {
			this.props.getCart(this.props.match.params.id);
        }
		this.props.fetchProduct(this.state);
    };   


	render() {
		console.log(this.state);
		const setting = this.props.setting.setting.data;
		const { carts } = this.state;
		const { fetching, error, payload } = this.props;
		const subtotal = Object.keys(carts).reduce((total, key) => total + carts[key].subtotal, 0);
		const total = subtotal + (this.state.taxes ? this.state.taxes : 0) - (this.state.discount ? this.state.discount : 0);
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />;
		if (error && error.status === 500) return <Error500 message={error.data.message} />;
		
		const trollies = Object.keys(carts).map(obj => {
			
			return (
				<tr key={ carts[obj].id } >
					<td>{ carts[obj].name }</td>
					<td>{ carts[obj].qty }</td>
					<td><NumberFormat value={ carts[obj].price } displayType={'text'} thousandSeparator={setting && setting.thousand_separator} prefix={setting && setting.currency} decimalSeparator={setting && setting.decimal_separator} /></td>
					<td><NumberFormat value={ carts[obj].subtotal } displayType={'text'} thousandSeparator={setting && setting.thousand_separator} prefix={setting && setting.currency} decimalSeparator={setting && setting.decimal_separator} /> <button onClick={ () => this.onDeleteCart(carts[obj].id)  } className="btn btn-link text-danger btn-remove">&times;</button> </td>
				</tr>
			)

			
		}).sort((a, b) => {
			return a === b ? 0 : -1;
		}); 

		const products =
			payload.data &&
			payload.data.data.map((product) => {
				return (
					<div className="col-sm-3 mb-5 card-clickable" key={product._id}>
						<div className="card">
							<img
								onClick={this.onGetValue}
								id={product._id}
								className="card-img-top img-small"
								src={product.file ? product.file : PhotoDefault}
								alt={product.name}
							/>
							<div className="card-body text-center">
								<p className="card-title" title={product.name}>{product.name}</p>
							</div>
						</div>
					</div>
				);
			});
		return (
			<Container fluid className="main-content-container px-4">
				<Loading show={fetching} color="blue" showSpinner={false} />
				<Helmet>
					<title>Cashier | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<div className="col-md-8">
						<PageTitle sm="4" title="Cashier" className="text-sm-left" />
					</div>
					<div className="col-md-4 text-right">
						<Link className="btn btn-secondary" to="/dashboard">
							Back to dashboard
						</Link>
					</div>
				</Row>
				<Row>
					<Modal visible={this.state.modal} onClickBackdrop={this.modalBackdropClicked} dialogClassName="modal-lg">
						<div className="modal-header">
						<h5 className="modal-title">Pay</h5>
						</div>
						<div className="modal-body py-0 pt-2 px-4">
							<div className="row">
								<div className="col-md-6">
									<div className="form-group">
										<label className="control-label">Customer</label>
										<AsyncSelect value={ this.state.customer_id && { label: this.state.customer_name, value: this.state.customer_id }} isClearable={true} className={error && error.data.errors.user_id && 'is-invalid'} styles={customerStyles} loadOptions={promiseOptions} id="user_id" placeholder="Type to search" onChange={this.handleChangeCustomer} />
									</div>
									<div className="form-group">
										<label className="control-label">Payment Type</label>
										<select value={this.state.payment_type} id="payment_type" className="form-control custom-select" onChange={this.handlePaymentType}>
											<option value="cash">Cash</option>
											<option value="debit_credit">Debit or Credit</option>
										</select>
									</div>
									{
										(this.state.payment_type === 'cash') ?
											
										<div>
											<div className="form-group">
												<label className="control-label">Amount</label>
												<NumberFormat value={this.state.amount} onChange={this.handleAmount} id="amount" className="form-control text-right" thousandSeparator="," decimalSeparator="." placeholder="0.0" />
											</div>
											<div className="form-g">
												<label className="control-label">Changes</label>
												<div className="help-block text-right">
													<strong>
														<NumberFormat value={ this.state.changes } displayType={'text'} thousandSeparator={ setting && setting.thousand_separator} prefix={ setting && setting.currency} decimalSeparator={ setting && setting.decimal_separator} />
													</strong>
												</div>
											</div>
										</div>

										: 
										
										<div>
											<div className="form-group">
												<label className="control-label">Card Number</label>
												<NumberFormat value={this.state.card_number} onChange={this.handleChangeInput} id="card_number" className="form-control" format="#### #### #### ####" placeholder="Card number" />
											</div>

											<div className="form-group">
												<label className="control-label">Card Expired</label>
												<Datetime 
													id="card_expired" 
													placeholder="MM"
													dateFormat="MM/YY"
													onChange={this.handleChangeDate}
													value={moment(this.state.card_expired)}
													closeOnSelect={true}
													closeOnTab={true} />
											</div>
										</div>
									}
									


								</div>
								<div className="col-md-6">
									<table className="table table-scrollable">
										<thead>
											<tr>
												<th>Name</th>
												<th>Qty</th>
												<th>Price</th>
												<th>Subtotal</th>
											</tr>
										</thead>
										<tbody>
											{
												trollies && trollies
											}
										</tbody>
										<tfoot>
											<tr>
												<th>Tax</th>
												<th className="text-right">
													<NumberFormat value={this.state.percent} onChange={this.handleTax} thousandSeparator="," decimalSeparator="." placeholder="%" className="form-control form-control-sm text-right" />
												</th>
											</tr>
											<tr>
												<th>Discount</th>
												<th className="text-right">
													<NumberFormat value={this.state.discount} onChange={this.handleDiscount} thousandSeparator="," decimalSeparator="." placeholder="0.0" className="form-control form-control-sm text-right" />
												</th>
											</tr>
											<tr>
												<th>Total</th>
												<th />
												<th />
												<th className="text-right">
												<NumberFormat value={ total } displayType={'text'} thousandSeparator={ setting && setting.thousand_separator} prefix={ setting && setting.currency} decimalSeparator={ setting && setting.decimal_separator} />
												</th>
											</tr>
										</tfoot>
									</table>
								</div>
							</div>
						</div>
						<div className="modal-footer">
						<button type="button" className="btn btn-default" onClick={this.modalBackdropClicked}>
							Close
						</button>
						<button type="button" className="btn btn-secondary" onClick={this.handlePayAndPrint}>
							Pay and print
						</button>
						</div>
					</Modal>
					<Col lg="5">
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<div className="form-group">
									<label className="control-label">Product</label>
                                    <AutoComplete
                                        onGetValue={this.onGetValue}
                                        data={this.state.data}
                                        onChange={this.handleChange}
                                        value={this.state.keyword}
                                        />
								</div>

								<div className="row">
									<div className="col-md-12">
										<table className="table table-scrollable">
											<thead>
												<tr>
													<th>Name</th>
													<th>Qty</th>
													<th>Price</th>
													<th>Subtotal</th>
												</tr>
											</thead>
											<tbody>
												{
													trollies && trollies
												}
											</tbody>
											<tfoot>
												<tr>
													<th>Total</th>
													<th />
													<th />
													<th className="text-right">
													<NumberFormat value={ total } displayType={'text'} thousandSeparator={ setting && setting.thousand_separator} prefix={ setting && setting.currency} decimalSeparator={ setting && setting.decimal_separator} />
													</th>
												</tr>
											</tfoot>
										</table>
										<div className="form-group text-right mt-2">
											<button className="btn btn-default mr-2" onClick={this.handleHold}>Hold</button>
											<button className="btn btn-secondary" onClick={this.handlePay}>Pay</button>
										</div>
									</div>
								</div>
							</CardHeader>
						</Card>
					</Col>
					<Col lg="7">
						<div className="row">
							{fetching ? (
								<div className="col-md-12 text-center">
									<h5 className="title">Loading...</h5>
								</div>
							) : payload.data && payload.data.data.length > 0 ? (
								products
							) : (
								<div className="col-md-12 text-center">
									<h5 className="title">Not found</h5>
								</div>
							)}
						</div>
						<div className="row">
							<div className="col-md-12">
								{payload.data &&
								payload.data.total > 1 && (
									<nav className="justify-content-center mb-5">
										<ul className="pagination">
											{payload.data.current_page > 1 && (
												<li key="prev" className="page-item">
													<button
														onClick={this.handleClickPage.bind(
															null,
															payload.data.current_page - 1
														)}
														className="page-link"
													>
														Prev
													</button>
												</li>
											)}

											{payload.data.pages.map((page, index) => {
												return (
													<li
														key={index}
														className={`page-item ${page === '...'
															? 'disabled'
															: ''} ${page === payload.data.current_page
															? 'active'
															: ''}`}
													>
														<button
															onClick={this.handleClickPage.bind(null, page)}
															className="page-link"
														>
															{page}
														</button>
													</li>
												);
											})}

											{payload.data.current_page < payload.data.last_page && (
												<li key="next" className="page-item">
													<button
														onClick={this.handleClickPage.bind(
															null,
															payload.data.current_page + 1
														)}
														className="page-link"
													>
														Next
													</button>
												</li>
											)}
										</ul>
									</nav>
								)}
							</div>
						</div>
					</Col>
				</Row>
			</Container>
		);
	}
}

const filterInCharge = (users) => {
	const options = users.map((user) => {
		return { label: user.name, value: user._id };
	});

	return options;
};

const promiseOptions = (inputValue, callback) => {
	Axios.get(`${url}/sales/customer`, {
		params: {
			name: inputValue
		},
		headers: {
			Authorization: `Bearer ${sessionStorage.getItem('token')}`
		}
	}).then((response) => {
		callback(filterInCharge(response.data.data));
	});
};

const mapStateToProps = (state) => {
	return {
		...state,
		payload: state.product.payload,
		error: state.product.error,
		fetching: state.product.fetching,
		errorsales: state.sales.error,
		saved: state.sales.saved,
		message: state.sales.message,
		data: state.sales.sales.data
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProduct: (filter) => dispatch(fetchProduct(filter)),
		saveSales: (carts, is_hold, id) => dispatch(saveSales(carts, is_hold, id)),
		getCart: (id) => dispatch(getCart(id))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Pos));
