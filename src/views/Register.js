import React from 'react';
import Logo from '../images/shards-dashboards-logo.svg';
import { Link } from 'react-router-dom';

class Register extends React.Component {
    render() {
        return (
            <main className="main-content col mt-5 mb-5">
                <div className="main-content-container container-fluid px-4 my-auto h-100">
                    <div className="row no-gutters h-100">
                    <div className="col-lg-3 col-md-5 auth-form mx-auto my-auto">
                        <div className="card">
                        <div className="card-body">
                            <img className="auth-form__logo d-table mx-auto mb-3" src={Logo} alt="Shards Dashboards - Register Template" />
                            <h5 className="auth-form__title text-center mb-4">Create New Account</h5>
                            <form>
                            <div className="form-group">
                                <label for="exampleInputEmail1">Email address</label>
                                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword1">Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword1" placeholder="Password" />
                            </div>
                            <div className="form-group">
                                <label for="exampleInputPassword2">Repeat Password</label>
                                <input type="password" className="form-control" id="exampleInputPassword2" placeholder="Repeat Password" />
                            </div>
                            <div className="form-group mb-3 d-table mx-auto">
                                <div className="custom-control custom-checkbox mb-1">
                                <input type="checkbox" className="custom-control-input" id="customCheck2" />
                                <label className="custom-control-label" for="customCheck2">I agree with the <a href="#">Terms &amp; Conditions</a>.</label>
                                </div>
                            </div>
                            <button type="submit" className="btn btn-pill btn-accent d-table mx-auto">Create Account</button>
                            </form>
                        </div>
                        <div className="card-footer border-top">
                            <ul className="auth-form__social-icons d-table mx-auto">
                            <li><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                            <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                            <li><a href="#"><i className="fab fa-github"></i></a></li>
                            <li><a href="#"><i className="fab fa-google-plus-g"></i></a></li>
                            </ul>
                        </div>
                        </div>
                        <div className="auth-form__meta d-flex mt-4">
                        <Link to="forgot-password">Forgot your password?</Link>
                        <Link className="ml-auto" to="login">Sign In?</Link>
                        </div>
                    </div>
                    </div>
                </div>
            </main>
        )
    }
}

export default Register;