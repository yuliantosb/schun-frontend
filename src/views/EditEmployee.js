import React from 'react';
import { Container, Row, Col, Card, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import AsyncSelect from 'react-select/async';
import { customerStyles } from '../utils/selectStyle';
import Axios from 'axios';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import { updateEmployee, getEmployee } from '../store/actions/employeeAction';

class EditEmployee extends React.Component {

    state = {
        photo: 'Choose file...',
        name: '',
        username: '',
        place_of_birth: '',
        date_of_birth: '',
        email: '',
        phone_number: '',
        role_id: '',
        address: '',
        role_name: ''
    };
    
    handleDateOfBirthChange = (value) => {
		this.setState({
			...this.state,
			date_of_birth: new Date(value)
		});
    };

    handleChangeRole = (value) => {
        this.setState({
			...this.state,
            role_id: value ? value.value : null,
            role_name: value ? value.label : null
		});
    }
    
    handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			photo: filename[filename.length - 1],
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
        this.props.updateEmployee(this.props.match.params.id, this.state);
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/employee');
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

    componentDidMount = () => {
        this.props.getEmployee(this.props.match.params.id);
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps !== this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    name: nextProps.data.name ? nextProps.data.name : '',
                    username: nextProps.data.employee.username ? nextProps.data.employee.username : '',
                    place_of_birth: nextProps.data.employee.place_of_birth ? nextProps.data.employee.place_of_birth : '',
                    date_of_birth: nextProps.data.employee.date_of_birth ? new Date(nextProps.data.employee.date_of_birth) : undefined,
                    photo: nextProps.data.employee.photo ? nextProps.data.employee.photo : 'Choose file ...',
                    email: nextProps.data.email ? nextProps.data.email : '',
                    phone_number: nextProps.data.employee.phone_number ? nextProps.data.employee.phone_number : '',
                    role_id: nextProps.data.role_id ? nextProps.data.role_id : '',
                    role_name: nextProps.data.role.name ? nextProps.data.role.name : '',
                    address: nextProps.data.employee.address ? nextProps.data.employee.address : '',
                })
            }
        }
    }
    
	render() {      
        const { fetching, error } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>Edit Employee | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit Employee" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Employee">Back</Link>
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
                                                        <input type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} value={this.state.name} onChange={this.handleChange} placeholder="eg: John Doe" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Username <span className="text-danger">*</span></label>
                                                        <input value={this.state.username} type="text" id="username" className={`form-control ${ error && error.data.errors.username && 'is-invalid' }`} onChange={this.handleChange} placeholder="Unique username" />
                                                        { 
                                                            error && error.data.errors.username && <div class="invalid-feedback">{ error.data.errors.username[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Place of birth</label>
                                                                <input value={this.state.place_of_birth} type="text" id="place_of_birth" className="form-control" onChange={this.handleChange} placeholder="eg: Jakarta" />
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

                                                    <div className="row">
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Password </label>
                                                                <input type="password" id="password" className={`form-control ${ error && error.data.errors.password && 'is-invalid' }`} onChange={this.handleChange} placeholder="secret password" />
                                                                { 
                                                                    error && error.data.errors.password && <div class="invalid-feedback">{ error.data.errors.password[0] }</div>
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <div className="form-group">
                                                                <label className="control-label">Retype Password </label>
                                                                <input type="password" id="password_confirmation" className="form-control" onChange={this.handleChange} placeholder="retype your password" />
                                                            </div>
                                                        </div>
                                                        <small className="col-md-12 mb-3 help-block help-block"><em>*) Blank this field if you don't want to change password</em></small>
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Photo</label>
                                                        <div className="custom-file mb-3">
                                                            <input
                                                                id="photo"
                                                                type="file"
                                                                className="custom-file-input"
                                                                onChange={this.handleChangeUpload}
                                                            />
                                                            <label
                                                                className="custom-file-label"
                                                                htmlFor="customFile2"
                                                                id="placeholderCustomFile2"
                                                            >
                                                                {this.state.photo}
                                                            </label>
                                                        </div>
                                                    </div>

                                                </div>


                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Email <span className="text-danger">*</span></label>
                                                        <input value={this.state.email} type="text" id="email" className={`form-control ${ error && error.data.errors.email && 'is-invalid' }`} onChange={this.handleChange} placeholder="eg: johndoe@example.com" />
                                                        { 
                                                            error && error.data.errors.email && <div class="invalid-feedback">{ error.data.errors.email[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Phone number</label>
                                                        <input value={this.state.phone_number} type="text" id="phone_number" className="form-control" onChange={this.handleChange} placeholder="eg: 08123456789" />
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Role<span className="text-danger">*</span></label>
                                                        <AsyncSelect value={{ label: this.state.role_name, value: this.state.role_id }} isClearable={true} styles={customerStyles} loadOptions={promiseOptions} id="role_id" placeholder="Type to search" onChange={this.handleChangeRole} />
                                                        { 
                                                            error && error.data.errors.role && <small class="text-danger">{ error.data.errors.role[0] }</small>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Address</label>
                                                        <textarea value={this.state.address} id="address" rows="5" className="form-control" onChange={this.handleChange} placeholder="Street name, Building Number, Residence, Region, State"></textarea>
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

const filterRole = (roles) => {
   const options = roles.map(role => {
       return { label: role.name, value: role._id }
   })

   return options;
};
  
const promiseOptions = (inputValue, callback) => {
    Axios.get(`${url}/employee/role`, {
        params: {
            name: inputValue,
        }, 
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
    }).then(response => {
        callback(filterRole(response.data.data));
    });
}

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.employee.saved,
        fetching: state.employee.fetching,
        message: state.employee.message,
        data: state.employee.employee.data,
        error: state.employee.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateEmployee: (id, data) => dispatch(updateEmployee(id, data)),
        getEmployee: (id) => dispatch(getEmployee(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditEmployee));
