import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import { getPermission, saveRole, getRole, updateRole } from '../store/actions/roleActions';
import Error500 from './Error500';
import {Redirect} from 'react-router-dom';
import Loading from 'react-loading-bar';
import { Link } from 'react-router-dom';

class EditRole extends React.Component {

    state = {
        name: '',
        description: '',
        permissions: []
    }

    handleChangePermission = (e) => {
        const value = this.state.permissions && this.state.permissions[e.target.value] ? false : true;
        this.setState({
            ...this.state,
            permissions: {
                ...this.state.permissions,
                [e.target.value]: value
            }
        })
    }

    handleChange = e => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updateRole(this.props.match.params.id, this.state);
    }

    componentWillUpdate = (nextProps) => {
        
        if (nextProps != this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    name: nextProps.data.name,
                    description: nextProps.data.description,
                    permissions: nextProps.data.permissions ? nextProps.data.permissions : [] 
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getPermission();
        this.props.getRole(this.props.match.params.id);
    }
	render() {
        
        const {fetching, error, payload, saved, message} = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />
        if (saved) return <Redirect to={{
            pathname: '/role',
            state: { message: message }
        }} />

        const permissions = payload && payload.data.map(permission => {
            return (
                <div className="col-md-3 mt-3" key={permission._id}>
                    <FormCheckbox
                        checked={
                           this.state.permissions && this.state.permissions[permission.slug] ? true : false
                        }
                        value={permission.slug} 
                        onChange={this.handleChangePermission}> { permission.name } </FormCheckbox>
                    { permission.children && permission.children.map(child => {
                        return <FormCheckbox 
                        checked={
                           this.state.permissions && this.state.permissions[child.slug] ? true : false
                        }
                        key={child._id} value={child.slug} onChange={this.handleChangePermission}>{ child.name }</FormCheckbox>
                    }) }
                </div>
            )
        })

		return (
			<Container fluid className="main-content-container px-4">
                <Loading
                    show={fetching}
                    color="blue"
                    showSpinner={false}
                    />
				<Helmet>
					<title>Edit Role | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit Role" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Role">Back</Link>
                    </div>
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardBody className="p-0 pb-3">
                                <form onSubmit={this.handleSubmit}>
                                    <div className="col-md-12 mt-4">
                                        <div className="form-group">
                                            <label className="control-label">Name</label>
                                            <input type="text" className="form-control" placeholder="Name" id="name" onChange={this.handleChange} value={this.state.name} />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Description</label>
                                            <textarea id="description" rows="5" className="form-control" onChange={this.handleChange} value={this.state.description}></textarea>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mt-2">
                                        <h6>Permission</h6>
                                        <div className="row">
                                           { permissions }
                                        </div>
                                    </div>

                                    <div className="col-md-12 text-right">
                                        <hr/>
                                        <button className="btn btn-secondary" type="submit">Save</button>
                                        <button className="btn btn-default" type="reset">Reset</button>
                                    </div>
                                </form>
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
        fetching: state.role.fetching,
        error: state.role.error,
        payload: state.role.permissions,
        saved: state.role.saved,
        message: state.role.message,
        data: state.role.role.data
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        getPermission: () => dispatch(getPermission()),
        updateRole: (id, data) => dispatch(updateRole(id, data)),
        getRole: id => dispatch(getRole(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditRole);
