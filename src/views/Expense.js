import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import moment from 'moment';

class Expense extends React.Component {
    state = {
        startDate: undefined,
        endDate: undefined
    }

    handleStartDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ startDate: new Date(value) }
        });
    }

    handleEndDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ endDate: new Date(value) }
        });
    }

	render() {
		return (
			<Container fluid className="main-content-container px-4">
				<Helmet>
					<title>Expense | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Expense" subtitle="Expense" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Expense</h6>
							</CardHeader>
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-l">Date From</label>
                                                        <DatePicker
                                                            size="md"
                                                            selected={this.state.startDate}
                                                            onChange={this.handleStartDateChange}
                                                            placeholderText="Date From"
                                                            dropdownMode="select"
                                                            value={moment("2019-05-23").format('MM/DD/YYYY')}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-l">Date To</label>
                                                        <DatePicker
                                                            size="md"
                                                            selected={this.state.endDate}
                                                            onChange={this.handleEndDateChange}
                                                            placeholderText="Date To"
                                                            dropdownMode="select"
                                                            value={moment("2019-05-23").format('MM/DD/YYYY')}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
										<div className="col-md-4 offset-md-2 text-right">
											<div className="input-group mb-3">
												<input
													id="keyword"
													type="text"
													className="form-control"
													placeholder=""
													aria-label="Example text with button addon"
													aria-describedby="button-addon1"
												/>
												<div className="input-group-prepend">
													<button
														className="btn btn-secondary"
														type="submit"
														id="button-addon1"
													>
														<i className="mdi mdi-magnify" /> Search{' '}
													</button>
												</div>
											</div>
                                            <Link to="/stockin/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">
									<table className="table table-bordered table-custom table-responsive">
										<thead>
											<tr>
												<th>Reference</th>
                                                <th>Amount</th>
												<th>Note</th>
                                                <th>In Charge</th>
                                                <th>Evidence</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<p className="text-primary">AX/120/343</p>
													<small className="text-muted">May 23 2019</small>
													<br />
													<button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
														Edit
													</button>
													<button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
														Delete
													</button>
												</td>
                                                <td>Rp3,500,000.00</td>
												<td>Buy stuff</td>
                                                <td>John Doe</td>
                                                <td><span className="text-primary">image213.jpg (120px)</span></td>
											</tr>
											<tr>
												<td>
													<p className="text-primary">AX/120/342</p>
													<small className="text-muted">May 23 2019</small>
													<br />
													<button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
														Edit
													</button>
													<button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
														Delete
													</button>
												</td>
                                                <td>Rp6,500,000.00</td>
												<td>Buy goods</td>
                                                <td>John Doe</td>
                                                <td><span className="text-primary">image212.jpg (120px)</span></td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="col-md-12 py-3">
									<div className="row">
										<div className="col-md-10">
                                            <p>Showing 1 to 10 of 1,290 record(s)</p>
											<nav aria-label="Page navigation example">
												<ul className="pagination">
													<li className="page-item disabled">
														<Link to="/" aria-disabled="true" className="page-link">
															Previous
														</Link>
													</li>
													<li className="page-item active">
														<Link to="/" className="page-link">
															1
														</Link>
													</li>
													<li className="page-item">
														<Link to="/" className="page-link">
															2
														</Link>
													</li>
													<li className="page-item">
														<Link to="/" className="page-link">
															3
														</Link>
													</li>
													<li className="page-item">
														<Link to="/" className="page-link">
															Next
														</Link>
													</li>
												</ul>
											</nav>
										</div>
										<div className="col-md-2 text-right">
											<div className="form-group">
												<label className="control-label">Showing per page </label>
												<select
													defaultValue="10"
													id="perpage"
													className="form-control custom-select"
													onChange={this.hanldeChangePage}
												>
													<option value="10">10</option>
													<option value="20">20</option>
													<option value="50">50</option>
													<option value="100">100</option>
												</select>
											</div>
										</div>
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

export default Expense;
