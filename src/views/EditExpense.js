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
import { updateExpense, getExpense } from '../store/actions/expenseAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import NumberFormat from 'react-number-format';

class EditExpense extends React.Component {

    state = {
        reference: '',
        amount: '',
        notes: '',
        user_id: '',
        file: '',
		evidence: 'Choose file...'
    };

    handleChangeInCharge = (value) => {
        this.setState({
			...this.state,
            user_id: value ? value.value : null,
            user_name: value ? value.label : null
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
        this.props.updateExpense(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/expense');
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
                    reference: nextProps.data.reference ? nextProps.data.reference : '',
                    amount: nextProps.data.amount ? nextProps.data.amount : '',
                    notes: nextProps.data.notes ? nextProps.data.notes : '',
                    user_id: nextProps.data.user_id ? nextProps.data.user_id : '',
                    evidence: nextProps.data.evidence ? nextProps.data.evidence : 'Choose file...',
                    user_name: nextProps.data.user && nextProps.data.user.name ? nextProps.data.user.name : null
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getExpense(this.props.match.params.id);
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
					<title>Edit Expense | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit Expense" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Expense">Back</Link>
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
                                                        <input value={this.state.reference} type="text" id="reference" className={`form-control ${ error && error.data.errors.reference && 'is-invalid' }`} onChange={this.handleChange} placeholder="Unique Expense Code eg: 1201001" />
                                                        { 
                                                            error && error.data.errors.reference && <div class="invalid-feedback">{ error.data.errors.reference[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Amount <span className="text-danger">*</span></label>
                                                        <NumberFormat value={this.state.amount} thousandSeparator="," decimalSeparator="." id="amount" className={`form-control text-right ${ error && error.data.errors.amount && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
                                                        { 
                                                            error && error.data.errors.amount && <div class="invalid-feedback">{ error.data.errors.amount[0] }</div>
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

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">In Charge <span className="text-danger">*</span></label>
                                                        <AsyncSelect  value={{ label: this.state.user_name, value: this.state.user_id }} isClearable={true} className={error && error.data.errors.role_id && 'is-invalid'} styles={customerStyles} loadOptions={promiseOptions} id="role_id" placeholder="Type to search" onChange={this.handleChangeInCharge} />
                                                        { 
                                                            error && error.data.errors.role_id && <small class="text-danger">{ error.data.errors.role_id[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Notes</label>
                                                        <textarea value={this.state.notes} id="notes" rows="5" className="form-control" onChange={this.handleChange} placeholder="Any notes, reason or reference"></textarea>
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

const filterInCharge = (users) => {
   const options = users.map(user => {
       return { label: user.name, value: user._id }
   })

   return options;
};
  
const promiseOptions = (inputValue, callback) => {
    Axios.get(`${url}/expense/user`, {
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
        saved: state.expense.saved,
        fetching: state.expense.fetching,
        message: state.expense.message,
        data: state.expense.expense.data,
        error: state.expense.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateExpense: (id, data) => dispatch(updateExpense(id, data)),
        getExpense: (id) => dispatch(getExpense(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditExpense));
