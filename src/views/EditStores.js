import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { updateStore, getStore } from '../store/actions/storeAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';

class EditStore extends React.Component {

    state = {
        name: '',
        phone_number: '',
        address: ''
    };

    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updateStore(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/stores');
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
        if (nextProps != this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    name: nextProps.data.name ? nextProps.data.name : '',
                    phone_number: nextProps.data.phone_number ? nextProps.data.phone_number : '',
                    address: nextProps.data.address ? nextProps.data.address : '',
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getStore(this.props.match.params.id);
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
					<title>Edit Store | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Edit Store" subtitle="Store" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
                                <div className="float-left">
								    <h6 className="m-0">Edit Store</h6>
                                </div>
                                <div className="float-right">
                                    <Link className="btn btn-secondary" to="/stores">Back</Link>
                                </div>
							</CardHeader>
							    <CardBody className="p-0 pb-3">
                                    <div className="col-md-12 mt-3">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Name <span className="text-danger">*</span></label>
                                                        <input value={this.state.name} type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="Store name" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>
                                                    
                                                    <div className="form-group">
                                                        <label className="control-label">Phone Number</label>
                                                        <input value={ this.state.phone_number } type="text" id="phone_number" className="form-control" onChange={this.handleChange} placeholder="eg: (021) 1234-456" />
                                                    </div>
                                                    

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">Address</label>
                                                        <textarea value={this.state.address} id="address" rows="5" className="form-control" onChange={this.handleChange} placeholder="Street name, Building Number, Residence, Region, State"></textarea>
                                                    </div>

                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    <button className="btn btn-secondary" type="submit" onClick={this.handleClickToast}>Save Changes</button>
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
        saved: state.store.saved,
        fetching: state.store.fetching,
        message: state.store.message,
        data: state.store.store.data,
        error: state.store.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateStore: (id, data) => dispatch(updateStore(id, data)),
        getStore: (id) => dispatch(getStore(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditStore));