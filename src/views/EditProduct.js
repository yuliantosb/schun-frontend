import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { updateProduct, getProduct } from '../store/actions/productAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import NumberFormat from 'react-number-format';
import { customerStyles } from '../utils/selectStyle';
import AsyncSelect from 'react-select/async';
import Axios from 'axios';

class EditProduct extends React.Component {

    state = {
        code: '',
        name: '',
        price: '',
        wholesale: '',
        stock: '',
        cost: '',
        picture: 'Choose file...',
        file: '',
        description: '',
        category_id: '',
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
    }

    handleChangeCategory = (value) => {
        this.setState({
			...this.state,
            category_id: value ? value.value : null,
            category_name: value ? value.label : null
		});
    }
    
    handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			picture: filename[filename.length - 1],
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

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updateProduct(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/product');
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
    
    componentWillUpdate = (nextProps) => {
        if (nextProps !== this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    code: nextProps.data.code ? nextProps.data.code : '',
                    name: nextProps.data.name ? nextProps.data.name : '',
                    price: nextProps.data.price ? nextProps.data.price : '',
                    wholesale: nextProps.data.wholesale ? nextProps.data.wholesale : '',
                    stock: nextProps.data.stock ? nextProps.data.stock.amount : '',
                    cost: nextProps.data.cost ? nextProps.data.cost : '',
                    file: nextProps.data.file ? nextProps.data.file : '',
                    picture: nextProps.data.picture ? nextProps.data.picture : '',
                    description: nextProps.data.description ? nextProps.data.description : '',
                    category_id: nextProps.data.category_id ? nextProps.data.category_id : '',
                    category_name: nextProps.data.category ? nextProps.data.category.name : '',
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getProduct(this.props.match.params.id);
    }
    
	render() {  
        const { fetching, error } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>Edit Product | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit Product" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Product">Back</Link>
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
                                                        <label className="control-label">Code </label>
                                                        <input type="text" id="code" value={this.state.code} className={`form-control ${ error && error.data.errors.code && 'is-invalid' }`} onChange={this.handleChange} placeholder="Enter barcode code" />
                                                        { 
                                                            error && error.data.errors.code && <div class="invalid-feedback">{ error.data.errors.code[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Name <span className="text-danger">*</span></label>
                                                        <input type="text" id="name" value={this.state.name} className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: Milk" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    {/* <div className="form-group">
                                                        <label className="control-label">Cost <span className="text-danger">*</span></label>
                                                        <NumberFormat decimalSeparator="." thousandSeparator="," type="text" id="cost" value={this.state.cost} className={`text-right form-control ${ error && error.data.errors.cost && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                        { 
                                                            error && error.data.errors.cost && <div class="invalid-feedback">{ error.data.errors.cost[0] }</div>
                                                        }
                                                    </div> */}

                                                    {/* <div className="row">
                                                        <div className="col-md-6"> */}
                                                            <div className="form-group">
                                                                <label className="control-label">Price <span className="text-danger">*</span></label>
                                                                <NumberFormat decimalSeparator="." thousandSeparator="," type="text" id="price" value={this.state.price} className={`text-right form-control ${ error && error.data.errors.price && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                                { 
                                                                    error && error.data.errors.price && <div class="invalid-feedback">{ error.data.errors.price[0] }</div>
                                                                }
                                                            </div>
                                                        { /*</div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Wholesale Price <span className="text-danger">*</span></label>
                                                                <NumberFormat decimalSeparator="." thousandSeparator="," type="text" id="wholesale" value={this.state.wholesale} className={`text-right form-control ${ error && error.data.errors.wholesale && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                                { 
                                                                    error && error.data.errors.wholesale && <div class="invalid-feedback">{ error.data.errors.wholesale[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div> */}

                                                    <div className="form-group">
                                                        <label className="control-label">Picture</label>
                                                        <div className="custom-file mb-3">
                                                            <input
                                                                id="picture"
                                                                type="file"
                                                                className="custom-file-input"
                                                                onChange={this.handleChangeUpload}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile2"
                                                                id="placeholderCustomFile2"
                                                            >
                                                                {this.state.picture}
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="col-md-6">    
                                                    <div className="form-group">
                                                        <label className="control-label">Stock <span className="badge badge-pill badge-secondary" title="You can update stock on stock menu" ><i className="mdi mdi-help"></i></span></label>
                                                        <NumberFormat readOnly={true} decimalSeparator="." thousandSeparator="," type="text" id="stock" value={this.state.stock} className={`text-right form-control ${ error && error.data.errors.stock && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                        { 
                                                            error && error.data.errors.stock && <div class="invalid-feedback">{ error.data.errors.stock[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Category <span className="text-danger">*</span></label>
                                                        <AsyncSelect isClearable={true} className={error && error.data.errors.category_id && 'is-invalid'} styles={customerStyles} loadOptions={promiseOptions} id="category_id" value={{ label: this.state.category_name, value: this.state.category_id }} placeholder="Type to search" onChange={this.handleChangeCategory} />
                                                        { 
                                                            error && error.data.errors.category_id && <small class="text-danger">{ error.data.errors.category_id[0] }</small>
                                                        }
                                                    </div>    
                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">Description</label>
                                                        <textarea id="description" value={this.state.description} rows="5" className="form-control" onChange={this.handleChange} placeholder="Product description"></textarea>
                                                    </div>

                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    <button className="btn btn-secondary" type="submit" onClick={this.handleSubmit}>Save Changes</button>
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

const filterInCharge = (categories) => {
    const options = categories.map(category => {
        return { label: category.name, value: category._id }
    })
 
    return options;
 };
   
 const promiseOptions = (inputValue, callback) => {
     Axios.get(`${url}/products/category`, {
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

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.product.saved,
        fetching: state.product.fetching,
        message: state.product.message,
        data: state.product.product.data,
        error: state.product.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (id, data) => dispatch(updateProduct(id, data)),
        getProduct: (id) => dispatch(getProduct(id)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditProduct));
