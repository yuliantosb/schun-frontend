import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { customerStyles } from '../utils/selectStyle';
import Select from 'react-select';
import Loading from 'react-loading-bar';
import { fetchParent, savePermission } from '../store/actions/permissionAction';
import { connect } from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
import Error500 from './Error500';

class AddPermission extends React.Component {

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
        this.props.savePermission(this.state);
    }

    componentDidMount = () => {
        this.props.fetchParent();
    }

	render() {
        
        const {fetching, error, payload, saved, message} = this.props;

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
					<title>Add Permission | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Add Permission" subtitle="Permission" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
                                <div className="float-left">
								    <h6 className="m-0">Add Permission</h6>
                                </div>
                                <div className="float-right">
                                    <Link className="btn btn-secondary" to="/permission">Back</Link>
                                </div>
							</CardHeader>
							    <CardBody className="p-0 pb-3">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="col-md-12 mt-4">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Name</label>
                                                        <input type="text" className="form-control" placeholder="Name" id="name" onChange={this.handleChange} />
                                                    </div>
                                                </div>

                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Parent</label>
                                                        <select id="parent_id" className="form-control" onChange={this.handleChange}>
                                                            {parents}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Description</label>
                                                <textarea id="description" rows="5" className="form-control" onChange={this.handleChange}></textarea>
                                            </div>
                                        </div>

                                        <div className="col-md-12 text-right">
                                            <hr/>
                                            <button className="btn btn-secondary">Save</button>
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
        message: state.permission.message
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
        fetchParent: () => dispatch(fetchParent()),
        savePermission: (data) => dispatch(savePermission(data))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(AddPermission);
