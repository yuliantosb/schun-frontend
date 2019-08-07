import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import Loading from 'react-loading-bar';
import { fetchParent, getPermission, updatePermission } from '../store/actions/permissionAction';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import Error500 from './Error500';

class EditPermission extends React.Component {

    state = {
        name: '',
        description: '',
        parent_id: ''
    }

    handleChange = (e) => {
        this.setState({
            ...this.state,
            [e.target.id]: e.target.value
        });
    }

    handleChangeParent = (e) => {
        this.setState({
			...this.state,
			parent_id: e.value
		});
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.updatePermission(this.props.match.params.id, this.state);
    }

    componentDidMount = () => {
        this.props.fetchParent();
        this.props.getPermission(this.props.match.params.id);
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps !== this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    name: nextProps.data.name,
                    parent_id: nextProps.data.parent_id,
                    description: nextProps.data.description
                })
            }
        }
    }

	render() {
        
        const {fetching, error, payload, saved, message} = this.props;
        const {name, parent_id, description} = this.state;

        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />
        if (saved) return <Redirect to={{
            pathname: '/permission',
            state: { message: message }
        }} />

        const parents = payload.data && payload.data.map(parent => {
            return (
                <option value={parent._id} key={parent._id}>{parent.name}</option>
            )
        });

		return (
			<Container fluid className="main-content-container px-4">
                <Loading
                    show={fetching}
                    color="blue"
                    showSpinner={false}
                    />
				<Helmet>
					<title>Edit Permission | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit Permission" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Permission">Back</Link>
                    </div>
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							    <CardBody className="p-0 pb-3">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="col-md-12 mt-4">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Name</label>
                                                        <input type="text" className="form-control" placeholder="Name" id="name" onChange={this.handleChange} value={ name } />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Parent</label>
                                                        <select id="parent_id" className="form-control" value={parent_id} onChange={this.handleChange}>
                                                           {parents}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Description</label>
                                                <textarea id="description" rows="5" className="form-control" onChange={this.handleChange} value={ description }></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-12 text-right">
                                            <hr/>
                                            <button className="btn btn-secondary">Save Changes</button>
                                            <button className="btn btn-default">Reset</button>
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
        fetching: state.permission.fetching,
        error: state.permission.error,
        payload: state.permission.parents,
        saved: state.permission.saved,
        message: state.permission.message,
        data: state.permission.permission.data
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        fetchParent: () => dispatch(fetchParent()),
        getPermission: id => dispatch(getPermission(id)),
        updatePermission: (id, data) => dispatch(updatePermission(id, data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EditPermission);
