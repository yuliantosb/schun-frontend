import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class AddRole extends React.Component {
	render() {
		return (
			<Container fluid className="main-content-container px-4">
				<Helmet>
					<title>Add Role | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Add Role" subtitle="Role" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Add Role</h6>
							</CardHeader>
							<CardBody className="p-0 pb-3">
                                
                                    <div className="col-md-12 mt-4">
                                        <div className="form-group">
                                            <label className="control-label">Name</label>
                                            <input type="text" className="form-control" placeholder="Name" id="name" />
                                        </div>
                                        <div className="form-group">
                                            <label className="control-label">Description</label>
                                            <textarea id="description" rows="5" className="form-control"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-md-12 mt-2">
                                        <h6>Permission</h6>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <FormCheckbox>User</FormCheckbox>
                                                <FormCheckbox>View User</FormCheckbox>
                                                <FormCheckbox>Add User</FormCheckbox>
                                                <FormCheckbox>Edit User</FormCheckbox>
                                                <FormCheckbox>Delete User</FormCheckbox>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-md-12 text-right">
                                        <hr/>
                                        <button className="btn btn-secondary">Save</button>
                                        <button className="btn btn-default">Reset</button>
                                    </div>
                            </CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default AddRole;
