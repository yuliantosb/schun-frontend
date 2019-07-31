import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import AsyncSelect from 'react-select/async';
import { customerStyles } from '../utils/selectStyle';
import Axios from 'axios';
import { saveExpense } from '../store/actions/expenseAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import NumberFormat from 'react-number-format';

class AddExpense extends React.Component {

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
        this.props.saveExpense(this.state);
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
    
	render() {      
        const { fetching, saved, error } = this.props;
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
					<title>Add Expense | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Add Expense" className="text-sm-left" />
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
                                                        <input type="text" id="reference" className={`form-control ${ error && error.data.errors.reference && 'is-invalid' }`} onChange={this.handleChange} placeholder="Unique Expense Code eg: 1201001" />
                                                        { 
                                                            error && error.data.errors.reference && <div class="invalid-feedback">{ error.data.errors.reference[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Amount <span className="text-danger">*</span></label>
                                                        <NumberFormat thousandSeparator="," decimalSeparator="." id="amount" className={`form-control text-right ${ error && error.data.errors.amount && 'is-invalid' }`} onChange={this.handleChange} placeholder="0.0" />
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
                                                        <AsyncSelect isClearable={true} className={error && error.data.errors.user_id && 'is-invalid'} styles={customerStyles} loadOptions={promiseOptions} id="user_id" placeholder="Type to search" onChange={this.handleChangeInCharge} />
                                                        { 
                                                            error && error.data.errors.user_id && <small class="text-danger">{ error.data.errors.user_id[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Notes</label>
                                                        <textarea id="notes" rows="5" className="form-control" onChange={this.handleChange} placeholder="Any notes, reason or reference"></textarea>
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
        fetched: state.expense.fetched,
        message: state.expense.message,
        error: state.expense.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveExpense: data => dispatch(saveExpense(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(AddExpense));
