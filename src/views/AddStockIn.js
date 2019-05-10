import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class AddStockIn extends React.Component {
	state = {
		stockInDate: undefined,
		uploadFile: 'Choose file...'
	};

	handlestockInDateChange = (value) => {
		this.setState({
			...this.state,
			...{ stockInDate: new Date(value) }
		});
	};

	handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			...{
				uploadFile: filename[filename.length - 1]
			}
		});
	};

	render() {
		return (
			<Container fluid className="main-content-container px-4">
                <Helmet>
                    <title>Add new stock in | {appName} </title>
                </Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Stock In" subtitle="Add new stock in material" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Add new stock in Material</h6>
							</CardHeader>
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<div className="row">
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Stock In Date</label>
												<DatePicker
													size="md"
													selected={this.state.stockInDate}
													onChange={this.handlestockInDateChange}
													placeholderText="Date From"
													dropdownMode="select"
												/>
											</div>

											<div className="form-group">
												<label className="control-label">UOM</label>
												<input
													type="text"
													className="form-control"
													placeholder="Unit of material"
												/>
											</div>

											<div className="form-group">
												<label className="control-label">Price</label>
												<input type="text" className="form-control" placeholder="Price" />
											</div>
										</div>
										<div className="col-md-6">
											<div className="form-group">
												<label className="control-label">Item</label>
												<select className="custom-select form-control">
													<option value="">Choose...</option>
												</select>
											</div>

											<div className="form-group">
												<label className="control-label">Qty</label>
												<input type="text" className="form-control" placeholder="Qty" />
											</div>

											<div className="form-group">
												<label className="control-label">Evidence</label>
												<div className="custom-file mb-3">
													<input
														type="file"
														className="custom-file-input"
														id="customFile2"
														onChange={this.handleChangeUpload}
													/>
													<label
														className="custom-file-label"
														htmlFor="customFile2"
														id="placeholderCustomFile2"
													>
														{this.state.uploadFile}
													</label>
												</div>
											</div>
										</div>
									</div>
									<div className="col-md-12 text-right mt-4 mb-4">
										<hr />
										<button className="btn btn-primary mr-2">Save</button>
										<button className="btn btn-secondary">Reset</button>
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

export default AddStockIn;
