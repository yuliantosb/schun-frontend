import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class Settings extends React.Component {
	render() {
		return (
			<Container fluid className="main-content-container px-4">
				<Helmet>
					<title>Settings | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Settings" subtitle="Settings" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Settings</h6>
							</CardHeader>
							<CardBody className="mt-3">                                   
                                <div className="row">
                                <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Site Name</label>
                                                <input type="text" className="form-control" defaultValue="Shard Dashboard" />
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Logo</label>
                                                <div className="custom-file mb-3">
                                                    <input
                                                        id="evidence"
                                                        type="file"
                                                        className="custom-file-input"
                                                        id="customFile2"
                                                    />
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="customFile2"
                                                        id="placeholderCustomFile2"
                                                    >
                                                        logo.svg
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Currency</label>
                                                <input type="text" className="form-control" defaultValue="Rp" />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Thousand Separator</label>
                                                        <input type="text" className="form-control" defaultValue="," />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Decimal Separator</label>
                                                        <input type="text" className="form-control" defaultValue="." />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    <div className="col-md-12 my-3 text-right">
                                        <hr/>
                                        <button className="btn btn-secondary">Save Changes</button>
                                    </div>
                                </div>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Settings;
