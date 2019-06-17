import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { saveCustomer } from '../store/actions/customerAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';

class AddCustomer extends React.Component {

    state = {
		date_of_birth: undefined,
    };
    
    handleDateOfBirthChange = (value) => {
		this.setState({
			...this.state,
			date_of_birth: new Date(value)
		});
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.saveCustomer(this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/customer');
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
					<title>Add Customer | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Add Customer" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Customer">Back</Link>
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
                                                        <input type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: John Doe" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Place of birth</label>
                                                                <input type="text" id="place_of_birth" className="form-control" onChange={this.handleChange} placeholder="eg: Jakarta" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Date of birth</label>
                                                                <DatePicker
                                                                    size="md"
                                                                    selected={this.state.date_of_birth}
                                                                    onChange={this.handleDateOfBirthChange}
                                                                    dropdownMode="select"
                                                                    placeholderText="12/31/1999"
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email <span className="text-danger">*</span></label>
                                                        <input type="text" id="email" className={`form-control ${ error && error.data.errors.email && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: johndoe@example.com" />
                                                        { 
                                                            error && error.data.errors.email && <div class="invalid-feedback">{ error.data.errors.email[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Phone number</label>
                                                        <input type="text" id="phone_number" className="form-control" onChange={this.handleChange} placeholder="eg: 08123456789" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Address</label>
                                                        <textarea id="address" rows="5" className="form-control" onChange={this.handleChange} placeholder="Street name, Building Number, Residence, Region, State"></textarea>
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
        saved: state.customer.saved,
        fetching: state.customer.fetching,
        fetched: state.customer.fetched,
        message: state.customer.message,
        error: state.customer.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveCustomer: data => dispatch(saveCustomer(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddCustomer));
