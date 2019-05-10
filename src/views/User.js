import React from 'react';
import { Container, Row, Col, Card, CardHeader } from 'shards-react';
import PageTitle from "../components/common/PageTitle";

class User extends React.Component {
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="User" subtitle="User overview" className="text-sm-left" />
                </Row>
                <Row>
                    <div className="col-md-4 offset-8">
                        <div className="input-group mb-5">
                            <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                            <div className="input-group-prepend">
                                <button className="btn btn-secondary" type="button" id="button-addon1"><i className="mdi mdi-magnify"></i> Search </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={require('../images/user-profile/up-user-details-background.jpg')} alt="User Details Background Image" />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={require('../images/avatars/0.jpg')} alt="User Avatar" />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-github"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-slack"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt="User Details Background Image" />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="User Avatar" />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-github"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-slack"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt="User Details Background Image" />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="User Avatar" />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-github"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-slack"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt="User Details Background Image" />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="User Avatar" />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-github"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-slack"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt="User Details Background Image" />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="User Avatar" />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-github"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-slack"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt="User Details Background Image" />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="User Avatar" />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><a href="#"><i className="fab fa-facebook-f"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-twitter"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-github"></i></a></li>
                                    <li className="mx-1"><a href="#"><i className="fab fa-slack"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 text-right py-3">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item disabled"><a aria-disabled="true" className="page-link" href="#">Previous</a></li>
                                <li className="page-item active"><a className="page-link" href="#">1</a></li>
                                <li className="page-item"><a className="page-link" href="#">2</a></li>
                                <li className="page-item"><a className="page-link" href="#">3</a></li>
                                <li className="page-item"><a className="page-link" href="#">Next</a></li>
                            </ul>
                        </nav>
                    </div>

                </Row>
            </Container>
        )
    }
}

export default User;