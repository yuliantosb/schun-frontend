import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import AsyncSelect from 'react-select/async';
import { customerStyles } from '../utils/selectStyle';
import Axios from 'axios';
import { savePurchase } from '../store/actions/purchaseActions';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import NumberFormat from 'react-number-format';
import AutoComplete from '../components/common/AutoComplete';

class AddPurchase extends React.Component {

    state = {
        reference: '',
        amount: '',
        notes: '',
        user_id: '',
        file: '',
        evidence: 'Choose file...',
        carts: {},
        keyword: ''
    };

    handleChangeAutoComplete = (e) => {
        
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

    onDeleteCart = (id) => {
		const carts = this.state.carts;
		delete carts[id];
		this.setState({
			...this.state,
			carts: carts
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

    handleSelectInCharge = (value) => {
        this.setState({
			...this.state,
            user_id: value ? value.value : null,
            user_name: value ? value.label : null
		});
    }

    handleSelectSupplier = (value) => {
        this.setState({
			...this.state,
            supplier_id: value ? value.value : null,
            supplier_name: value ? value.label : null
		});
    }
    
    handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			evidence: filename[filename.length - 1],
		});

		const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setState({
				...this.state,
				file: e.target.result
			})
		}
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.savePurchase(this.state);
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
    
    handleChangeQty = (e, v) => {
        const qty = v;
        this.setState({
            ...this.state,
            carts: {
                ...this.state.carts,
                [e]: {
                    ...this.state.carts[e],
                    qty: qty,
                    subtotal: qty * this.state.carts[e].price
                }
            } 
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/purchase');
        }

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
    }
    
	render() {      
        const { fetching, error } = this.props;
        const setting = this.props.setting.setting.data;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
        const {carts} = this.state;
        const subtotal = Object.keys(carts).reduce((total, key) => total + carts[key].subtotal, 0);
		const total = subtotal + (this.state.taxes ? this.state.taxes : 0) - (this.state.discount ? this.state.discount : 0);
        const trollies = Object.keys(carts).map(obj => {
			
			return (
				<tr key={ carts[obj].id } >
					<td>{ carts[obj].name }</td>
					<td><input type="number" min="1" value={ carts[obj].qty } className="form-control" onChange={ (e) => this.handleChangeQty(carts[obj].id, e.target.value ) } /></td>
					<td><NumberFormat value={ carts[obj].price } displayType={'text'} thousandSeparator={setting && setting.thousand_separator} prefix={setting && setting.currency} decimalSeparator={setting && setting.decimal_separator} /></td>
					<td><NumberFormat value={ carts[obj].subtotal } displayType={'text'} thousandSeparator={setting && setting.thousand_separator} prefix={setting && setting.currency} decimalSeparator={setting && setting.decimal_separator} /> <button onClick={ () => this.onDeleteCart(carts[obj].id)  } className="btn btn-link text-danger btn-remove">&times;</button> </td>
				</tr>
			)

			
		}).sort((a, b) => {
			return a === b ? 0 : -1;
        });

		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>Add Purchase | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Add Purchase" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Purchase">Back</Link>
                    </div>
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							    <CardBody className="p-0 pb-3">
                                    <div className="col-md-12 mt-3">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Reference <span className="text-danger">*</span></label>
                                                        <input type="text" id="reference" className={`form-control ${ error && error.data.errors.reference && 'is-invalid' }`} onChange={this.handleChange} placeholder="Unique Purchase Code eg: 1201001" />
                                                        { 
                                                            error && error.data.errors.reference && <div class="invalid-feedback">{ error.data.errors.reference[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Evidence</label>
                                                        <div className="custom-file mb-3">
                                                            <input
                                                                id="evidence"
                                                                type="file"
                                                                className="custom-file-input"
                                                                onChange={this.handleChangeUpload}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile2"
                                                                id="placeholderCustomFile2"
                                                            >
                                                                {this.state.evidence}
                                                            </label>
                                                        </div>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Supplier<span className="text-danger">*</span></label>
                                                        <AsyncSelect menuContainerStyle={{'zIndex': 999}} isClearable={true} className={error && error.data.errors.supplier_id && 'is-invalid'} styles={customerStyles} loadOptions={supplierOptions} id="supplier_id" placeholder="Type to search" onChange={this.handleSelectSupplier} />
                                                        { 
                                                            error && error.data.errors.supplier_id && <small class="text-danger">{ error.data.errors.supplier_id[0] }</small>
                                                        }
                                                    </div>

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">In Charge <span className="text-danger">*</span></label>
                                                        <AsyncSelect isClearable={true} className={error && error.data.errors.user_id && 'is-invalid'} styles={customerStyles} loadOptions={inChargeOptions} id="user_id" placeholder="Type to search" onChange={this.handleSelectInCharge} />
                                                        { 
                                                            error && error.data.errors.user_id && <small class="text-danger">{ error.data.errors.user_id[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Notes</label>
                                                        <textarea id="notes" rows="5" className="form-control" onChange={this.handleChange} placeholder="Any notes, reason or reference"></textarea>
                                                    </div>

                                                </div>
                                                
                                                <div className="col-md-12">
                                                    <div className="form-group">
                                                        <label className="control-label">Products</label>
                                                        <AutoComplete
                                                            onGetValue={this.onGetValue}
                                                            data={this.state.data}
                                                            onChange={this.handleChangeAutoComplete}
                                                            value={this.state.keyword}
                                                            />
                                                    </div>
                                                    <hr/>
                                                    <table className="table table-bordered mt-5 mb-5">
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
                                                               trollies.length > 0 ? trollies : (
                                                                   <tr>
                                                                       <td colSpan="4" className="text-center">No Data</td>
                                                                   </tr>
                                                               )
                                                            }
                                                        </tbody>
                                                        <tfoot>
                                                            <tr>
                                                                <th colSpan="3">Tax</th>
                                                                <th className="text-right">
                                                                    <NumberFormat value={this.state.percent} onChange={this.handleTax} thousandSeparator="," decimalSeparator="." placeholder="%" className="form-control form-control-sm text-right" />
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th colSpan="3">Discount</th>
                                                                <th className="text-right">
                                                                    <NumberFormat value={this.state.discount} onChange={this.handleDiscount} thousandSeparator="," decimalSeparator="." placeholder="0.0" className="form-control form-control-sm text-right" />
                                                                </th>
                                                            </tr>
                                                            <tr>
                                                                <th colSpan="3">Total</th>
                                                                <th className="text-right">
                                                                    <NumberFormat value={ total } displayType={'text'} thousandSeparator={ setting && setting.thousand_separator} prefix={ setting && setting.currency} decimalSeparator={ setting && setting.decimal_separator} />
                                                                </th>
                                                            </tr>
                                                        </tfoot>
                                                    </table>
                                                </div>

                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    <button className="btn btn-secondary" type="submit" onClick={this.handleClickToast}>Save</button>
                                                    <button className="btn btn-default" type="reset">Reset</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
            
		);
	}
}

const filterInCharge = (users) => {
   const options = users.map(user => {
       return { label: user.name, value: user._id }
   })

   return options;
};
  
const inChargeOptions = (inputValue, callback) => {
    Axios.get(`${url}/employee/user`, {
        params: {
            name: inputValue,
        }, 
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(response => {
        callback(filterInCharge(response.data.data));
    });
}

const filterSupplier = (suppliers) => {
    const options = suppliers.map(supplier => {
        return { label: supplier.name, value: supplier._id }
    })
 
    return options;
};
   
const supplierOptions = (inputValue, callback) => {
     Axios.get(`${url}/supplier/supplier`, {
         params: {
             name: inputValue,
         }, 
         headers: {
             Authorization: `Bearer ${sessionStorage.getItem('token')}`
         }
     }).then(response => {
         callback(filterSupplier(response.data.data));
     });
}

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.purchase.saved,
        fetching: state.purchase.fetching,
        fetched: state.purchase.fetched,
        message: state.purchase.message,
        error: state.purchase.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        savePurchase: data => dispatch(savePurchase(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddPurchase));
