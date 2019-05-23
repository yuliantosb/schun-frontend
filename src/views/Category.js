import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class Category extends React.Component {
	render() {
		return (
			<Container fluid className="main-content-container px-4">
				<Helmet>
					<title>Category | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Category" subtitle="Category" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Category</h6>
							</CardHeader>
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<div className="row">
                                        <div className="col-md-8">
                                            <Link to="/stockin/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
                                        </div>
										<div className="col-md-4 text-right">
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
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">
									<table className="table table-bordered table-custom table-responsive">
										<thead>
											<tr>
												<th>Name</th>
                                                <th>Parent</th>
												<th>Description</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>
													<p className="text-primary">Administrator</p>
													<small className="text-muted">May 23 2019</small>
													<br />
													<button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
														Edit
													</button>
													<button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
														Delete
													</button>
												</td>
                                                <td>-</td>
												<td>
													Lorem ipsum dolor sit amet consectetur adipisicing elit.{' '}
													<small className="text-muted">[..]</small>
												</td>
											</tr>
											<tr>
												<td>
													<p className="text-primary">Cashier</p>
													<small className="text-muted">May 23 2019</small>
                                                    <br/>
													<button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
														Edit
													</button>
													<button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
														Delete
													</button>
												</td>
                                                <td>-</td>
												<td>
													Lorem ipsum dolor sit amet consectetur adipisicing elit.{' '}
													<small className="text-muted">[..]</small>
												</td>
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

export default Category;
