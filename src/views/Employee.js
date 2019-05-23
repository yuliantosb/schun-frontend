import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class Employee extends React.Component {
	render() {
		return (
			<Container fluid className="main-content-container px-4">
				<Helmet>
					<title>Employee | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
					    <PageTitle sm="4" title="Employee" subtitle="Employee" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                        <div className="input-group mt-3">
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
				</Row>
				<Row>
					<Col>
                        <div className="col-md-12">
                            <Link to="/stockin/create" className="btn btn-secondary mr-2">
                                <i className="mdi mdi-plus" /> Add
                            </Link>
                        </div>

                        <div className="col-md-12 mt-5 mb-5">
                            <div className="row">
                                <div className="col-md-4">
                                    <div className="profile">
                                        <div className="profile-card">
                                            <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} className="img img-circle" />
                                            <h2 className="title-profile">John Doe</h2>
                                            <p className="text-primary">Administrator</p>
                                            <button className="btn btn-sm btn-link text-primary py-0 px-0 pr-2">
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="profile">
                                        <div className="profile-card">
                                            <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} className="img img-circle" />
                                            <h2 className="title-profile">John Doe</h2>
                                            <p className="text-primary">Administrator</p>
                                            <button className="btn btn-sm btn-link text-primary py-0 px-0 pr-2">
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="profile">
                                        <div className="profile-card">
                                            <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} className="img img-circle" />
                                            <h2 className="title-profile">John Doe</h2>
                                            <p className="text-primary">Administrator</p>
                                            <button className="btn btn-sm btn-link text-primary py-0 px-0 pr-2">
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="profile">
                                        <div className="profile-card">
                                            <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} className="img img-circle" />
                                            <h2 className="title-profile">John Doe</h2>
                                            <p className="text-primary">Administrator</p>
                                            <button className="btn btn-sm btn-link text-primary py-0 px-0 pr-2">
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="profile">
                                        <div className="profile-card">
                                            <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} className="img img-circle" />
                                            <h2 className="title-profile">John Doe</h2>
                                            <p className="text-primary">Administrator</p>
                                            <button className="btn btn-sm btn-link text-primary py-0 px-0 pr-2">
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <div className="profile">
                                        <div className="profile-card">
                                            <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} className="img img-circle" />
                                            <h2 className="title-profile">John Doe</h2>
                                            <p className="text-primary">Administrator</p>
                                            <button className="btn btn-sm btn-link text-primary py-0 px-0 pr-2">
                                                View
                                            </button>
                                            <button className="btn btn-sm btn-link text-success py-0 px-0 pr-2">
                                                Edit
                                            </button>
                                            <button className="btn btn-sm btn-link text-danger py-0 px-0 pr-2">
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        
                        <div className="col-md-10 pull-md-2 mb-4">
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
					</Col>
				</Row>
			</Container>
		);
	}
}

export default Employee;
