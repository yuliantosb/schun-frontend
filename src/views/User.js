import React from 'react';
import { Container, Row } from 'shards-react';
import PageTitle from "../components/common/PageTitle";
import {Link} from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class User extends React.Component {
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Helmet>
                    <title>Dashboard | {appName} </title>
                </Helmet>
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
                                    <img src={require('../images/user-profile/up-user-details-background.jpg')} alt={Math.random()} />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={require('../images/avatars/0.jpg')} alt={Math.random()} />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-github"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-slack"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt={Math.random()} />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-github"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-slack"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt={Math.random()} />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-github"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-slack"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt={Math.random()} />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-github"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-slack"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt={Math.random()} />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-github"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-slack"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 col-lg-4">
                        <div className="card card-small user-details mb-4">
                            <div className="card-header p-0">
                                <div className="user-details__bg">
                                    <img src={`http://lorempixel.com/600/300/nature/${Math.floor(Math.random() * Math.floor(8))}`} alt={Math.random()} />
                                </div>
                            </div>
                            <div className="card-body p-0">
                                <div className="user-details__avatar mx-auto">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt={Math.random()} />
                                </div>
                                <h4 className="text-center m-0 mt-2">Sierra Brooks</h4>
                                <p className="text-center text-light m-0 mb-2">I'm a design focused engineer.</p>
                                <ul className="user-details__social user-details__social--primary d-table mx-auto mb-4">
                                    <li className="mx-1"><Link to="/"><i className="fab fa-facebook-f"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-twitter"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-github"></i></Link></li>
                                    <li className="mx-1"><Link to="/"><i className="fab fa-slack"></i></Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-12 text-right py-3">
                        <nav aria-label="Page navigation example">
                            <ul className="pagination">
                                <li className="page-item disabled"><Link aria-disabled="true" className="page-link" to="/">Previous</Link></li>
                                <li className="page-item active"><Link className="page-link" to="/">1</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">2</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">3</Link></li>
                                <li className="page-item"><Link className="page-link" to="/">Next</Link></li>
                            </ul>
                        </nav>
                    </div>

                </Row>
            </Container>
        )
    }
}

export default User;