import React from 'react';
import Layout from '../components/Layout';
import Profile from '../img/profile.png';

class User extends React.Component {
    render(){
        return (
            <Layout>
            
                <div className="row content">
                    <div className="col-sm-8">
                        <h1 className="content-title">Employee</h1>
                    </div>
                    <div className="col-sm-4">
                        <div className="input-group">
                            <input type="text" id="keyword" className="form-control" />
                            <div className="input-group-btn">
                                <button className="btn btn-default">Search</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12">
                    <div className="row">

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={Profile} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="cards clearfix profile-user">
                                <div className="pull-right btn-profile">
                                    <div className="btn-group">
                                        <button type="button" className="btn btn-transparent btn-lg dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                            <i className="mdi mdi-dots-vertical"></i>
                                        </button>
                                        <ul className="dropdown-menu">
                                            <li><a href="#">View</a></li>
                                            <li><a href="#">Edit</a></li>
                                            <li><a href="#">Delete</a></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="text-center profile-wrapper">
                                    <img src={`https://i.pravatar.cc/300?u=${Math.random()}`} alt="profile" className="img img-circle" />
                                    <h3 className="title">John Doe</h3>
                                    <small>Administrator</small>
                                    <div className="bottom-profile">
                                        <span className="pull-left text-small">Male 33 yo</span>
                                        <span className="pull-right text-small">Work Period 2yrs 3mos</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="row text-right col-xs-12">
                            <ul className="pagination">
                                <li className="active"><a href="#">1</a></li>
                                <li><a href="#">2</a></li>
                                <li><a href="#">3</a></li>
                                <li><a href="#">4</a></li>
                                <li><a href="#">5</a></li>
                            </ul>
                        </div>

                    </div>
                </div>

            </Layout>
        )
    }
}

export default User;