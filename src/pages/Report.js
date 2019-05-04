import React from 'react';
import Layout from '../components/Layout';
import test from '../actions/testAction';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

class Report extends React.Component {
    state = {
        user: null
    }
    componentDidMount() {
        this.props.test();
    }
    render() {
        // console.log(this.props);
        const { response } = this.props;
        if (!localStorage.getItem('token')) return <Redirect to='login' />
        return (
            <Layout loading={!response ? true : false}>
                <h1>Report</h1>
                {(response) ? (<p>Hello {response.name} <small>{response.email}</small></p>) : (<p>Loading...</p>) }

                <button onClick={this.handleClick} className="btn btn-primary">Click Me</button>
            </Layout>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ...state,
        response: state.test.response
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        test: () => dispatch(test())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Report);