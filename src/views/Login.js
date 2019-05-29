import React from 'react';
import Logo from '../images/shards-dashboards-logo.svg';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {login} from '../store/actions/authActions';
import {Helmet} from 'react-helmet';
import { appName } from '../global';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }

    handleChangeCreds = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleLoginSubmit = (e) => {
        e.preventDefault();
        this.props.login(this.state);
    }

    render() {
        const {error, fetching, payload} = this.props;
        const errorMessage = payload.response ? payload.response.data.message : error;
        if (sessionStorage.getItem('token')) return (<Redirect to="/" />);
        return (
            <main className="main-content col mt-5">
                <Loading
                    show={fetching}
                    color="blue"
                    showSpinner={false}
                    />
                <Helmet>
                    <title>Login | {appName} </title>
                </Helmet>
                <div className="main-content-container container-fluid px-4 my-auto h-100">
                    <div className="row no-gutters h-100">
                        <div className="col-lg-3 col-md-5 auth-form mx-auto my-auto">
                            <div className="card">
                                <div className="card-body">
                                    <img className="auth-form__logo d-table mx-auto mb-3" src={Logo} alt="Shards Dashboards - Register Template" />
                                    <h5 className="auth-form__title text-center mb-4">Access Your Account </h5>
                                    { error && !this.state.dismisAlert && (
                                    <div className="alert alert-danger fade show" role="alert">
                                        <strong>Error!</strong> { errorMessage }
                                    </div> ) }
                                    <form onSubmit={this.handleLoginSubmit}>
                                        <div className="form-group">
                                            <label htmlFor="email">Email address</label>
                                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={this.handleChangeCreds} />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="password">Password</label>
                                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={this.handleChangeCreds} />
                                        </div>
                                        <div className="form-group mb-3 d-table mx-auto">
                                            <div className="custom-control custom-checkbox mb-1">
                                                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                                <label className="custom-control-label" htmlFor="customCheck2">Remember me for 30 days.</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-pill btn-accent d-table mx-auto">Access Account</button>
                                    </form>
                                </div>
                                <div className="card-footer border-top">
                                    <ul className="auth-form__social-icons d-table mx-auto">
                                        <li><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                        <li><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                        <li><Link to="/"><i className="fab fa-github"></i></Link></li>
                                        <li><Link to="/"><i className="fab fa-google-plus-g"></i></Link></li>
                                    </ul>
                                </div>
                            </div>
                            <div className="auth-form__meta d-flex mt-4">
                                <Link to="forgot-password">Forgot your password?</Link>
                                <Link className="ml-auto" to="register">Create new account?</Link>
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
        payload: state.auth.payload,
        error: state.auth.error,
        fetching: state.auth.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(login(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);