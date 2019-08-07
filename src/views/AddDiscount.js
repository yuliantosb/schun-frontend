import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { saveDiscount } from '../store/actions/discountAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import NumberFormat from 'react-number-format';

class AddDiscount extends React.Component {

    state = {
        name: '',
        amount: '',
        type: '',
        description: ''
    }
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.saveDiscount(this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/discount');
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
					<title>Add Discount | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Add Discount" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Discount">Back</Link>
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
                                                        <label className="control-label">Name <span className="text-danger">*</span></label>
                                                        <input type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="Discount Name" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">Amount <span className="text-danger">*</span></label>
                                                        <NumberFormat thousandSeparator="," decimalSeparator="." type="text" id="amount" className={`form-control text-right ${ error && error.data.errors.amount && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                        { 
                                                            error && error.data.errors.amount && <div class="invalid-feedback">{ error.data.errors.amount[0] }</div>
                                                        }
                                                    </div>
                                                
                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Type <span className="text-danger">*</span></label>
                                                        <select id="type" className={`custom-select form-control ${ error && error.data.errors.type && 'is-invalid' }`} onChange={this.handleChange}>
                                                            <option value="fixed">Fixed</option>
                                                            <option value="percent">Percent</option>
                                                        </select>
                                                        { 
                                                            error && error.data.errors.type && <div class="invalid-feedback">{ error.data.errors.type[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Description</label>
                                                        <textarea id="description" rows="5" className="form-control" onChange={this.handleChange} placeholder="Discount description"></textarea>
                                                    </div>

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


const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.discount.saved,
        fetching: state.discount.fetching,
        fetched: state.discount.fetched,
        message: state.discount.message,
        error: state.discount.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveDiscount: data => dispatch(saveDiscount(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddDiscount));
