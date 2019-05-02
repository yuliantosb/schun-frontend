import React from 'react';
import Logo from '../../img/logo.png';
import {connect} from 'react-redux';
import {login} from '../../actions/authActions';
import {Redirect} from 'react-router-dom';

class Login extends React.Component {
    state = {
        email: '',
        password: ''
    }
    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
       e.preventDefault();
       this.props.login(this.state);
    }
    render() {
        const {response} = this.props;
        const token = localStorage.getItem('token');
        if (token) return <Redirect to='/' />
        return (
            <div className="clearfix login-wrapper">
                <div className="login-area">
                    <div className="row">
                        <div className="col-sm-6">
                            <img src={Logo} alt="logo" />
                            <span className="title-logo">Shun | POS</span>
                        </div>
                        <div className="col-sm-6 text-right">
                            <span className="title-header">Login</span>
                        </div>
                    </div>
                    <form className="mt-20" onSubmit={this.handleSubmit}>
                        <div className={`form-group ${ response.type === 'error' && 'has-error'}`}>
                            <label className="control-label">Email</label>
                            <input type="email" className="form-control" id="email" placeholder="Email" onChange={this.handleChange} />
                            {response.type === 'error' && (<span className="help-block">{response.message}</span>) }
                        </div>

                        <div className="form-group">
                            <label className="control-label">Password</label>
                            <input type="password" id="password" className="form-control" placeholder="Password" onChange={this.handleChange} />
                        </div>
                        <div className="row">
                            <div className="col-sm-5">
                                <input type="checkbox" id="remember"/>&nbsp;
                                <label className="control-label">Remember Me</label> 
                            </div>
                            <div className="col-sm-7 text-right">
                                <a>Forgot Password?</a>
                            </div>
                        </div>
                        <div className="text-center mt-20">
                            <button type="submit" className="btn btn-primary"><i className="mdi mdi-lock"></i> Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        response: state.auth.response,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (credentials) => dispatch(login(credentials))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);