import React from 'react';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { resetPassword } from '../store/actions/authActions';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';

class ResetPassword extends React.Component {
    state = {
        email: '',
        new_password: '',
        new_password_confirmation: '',
        message: '',
        type: ''
    }
    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.resetPassword(this.state);
    }
    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            this.setState({
                ...this.state,
                message: this.props.message,
                type: 'success'
            });

        }

        if (prevProps.error !== this.props.error) {
            if (!this.props.fetched) {
                if (this.props.error) {
                    this.setState({
                        ...this.state,
                        message: this.props.error.data.message,
                        type: 'error'
                    })
                }
            }
        }
    }
    componentDidMount = () => {
        this.setState({
            ...this.state,
            token: this.props.match.params.token
        })
    }
    render() {
        const { fetching, error } = this.props;
        const setting = this.props.setting.setting.data;
        if (error && error.status === 500) return <Error500 message={error.data.message} />
        return (
            <main className="main-content col mt-5">
                <Loading
                    show={fetching}
                    color="blue"
                    showSpinner={false}
                    />
                <Helmet>
                    <title>Reset Password | {appName} </title>
                </Helmet>
                <div className="main-content-container container-fluid px-4 my-auto h-100">
                    <div className="row no-gutters h-100">
                    <div className="col-lg-3 col-md-5 auth-form mx-auto my-auto">
                        <div className="card">
                        <div className="card-body">
                            <img className="auth-form__logo_custom d-table mx-auto mb-3" src={ setting && setting.file } alt="logo" />
                            <h5 className="auth-form__title text-center mb-4">Reset Password</h5>
                            <form onSubmit={this.handleSubmit}>
                            { this.state.message && !this.state.dismisAlert && (
                            <div className={`alert alert-${this.state.type === 'success' ? 'success' : 'danger'} fade show`} role="alert">
                                <strong>{ this.state.type === 'success' ? 'Success' : 'Error' }</strong> { this.state.message }
                            </div> ) }
                            <div className="form-group mb-4">
                                <label htmlFor="exampleInputEmail1">Email address</label>
                                <input onChange={this.handleChange} type="email" className={`form-control ${ error && error.status === 422 && error.data.errors.email && 'is-invalid' }`} aria-describedby="emailHelp" placeholder="Enter email" id="email" />
                                { 
                                    error && error.status === 422 && error.data.errors.email && <div class="invalid-feedback">{ error.data.errors.email[0] }</div>
                                }
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="exampleInputEmail1">New password</label>
                                <input onChange={this.handleChange} type="password" className={`form-control ${ error && error.status === 422 && error.data.errors.new_password && 'is-invalid' }`} aria-describedby="new_passwordHelp" placeholder="Enter new password" id="new_password" />
                                { 
                                    error && error.status === 422 && error.data.errors.new_password && <div class="invalid-feedback">{ error.data.errors.new_password[0] }</div>
                                }
                            </div>
                            <div className="form-group mb-4">
                                <label htmlFor="exampleInputEmail1">Confirm new password</label>
                                <input onChange={this.handleChange} type="password" className="form-control" aria-describedby="password_confirmationHelp" placeholder="Enter password confirmation" id="password_confirmation" />
                            </div>
                            <button type="submit" className="btn btn-pill btn-accent d-table mx-auto">Change Password</button>
                            </form>
                        </div>
                        </div>
                        <div className="auth-form__meta d-flex mt-4">
                        <Link className="mx-auto" to="/login">Take me back to login.</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        saved: state.password.saved,
        fetching: state.password.fetching,
        fetched: state.password.fetched,
        message: state.password.message,
        error: state.password.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        resetPassword: data => dispatch(resetPassword(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);