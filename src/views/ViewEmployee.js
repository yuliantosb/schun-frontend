import React from 'react';
import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem, Form, FormInput } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import { getEmployee } from '../store/actions/employeeAction';
import moment from 'moment';

class ViewEmployee extends React.Component {

    componentDidMount = () => {
        this.props.getEmployee(this.props.match.params.id);
    }
    
	render() {      
        const { fetching, data } = this.props;
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>View Employee | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-8">
                         <PageTitle sm="4" title="View Employee" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                    <Link className="btn btn-secondary" to="/employee">Back</Link>
                    </div>
					
				</Row>
				<Row>
					<Col lg="4">
                        <Card small className="mb-4 pt-3">
                            <CardHeader className="border-bottom text-center">
                            <div className="mb-3 mx-auto">
                                <img
                                className="rounded-circle"
                                src={ data && data.employee.photo_url }
                                alt={ data && data.name }
                                width="110"
                                style={{ width:110, height:110, objectFit: 'cover' }}
                                />
                            </div>
                            <h4 className="mb-0">{ data && data.name }</h4>
                            <h6 className="text-secondary">{ data && data.employee.username }</h6>
                            <small className="text-muted">{ data && data.employee.place_of_birth }, { data && moment(data.employee.date_of_birth).format('LL') } ({ data && data.employee.age })</small>
                            <span className="text-muted d-block mb-2">{ data && data.role.name }</span>
                            </CardHeader>
                        </Card>
					</Col>

                    <Col lg="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                            <h6 className="m-0">Details Info</h6>
                            </CardHeader>
                            <ListGroup flush>
                                <ListGroupItem className="p-3">
                                    <Row>
                                        <Col>
                                            <Form>
                                                <Row form>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Name</label>
                                                        <p className="help-block">{ data && data.name }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Username</label>
                                                        <p className="help-block">{ data && data.employee.username }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Email</label>
                                                        <p className="help-block">{ data && data.email }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Phone number</label>
                                                        <p className="help-block">{ data && data.employee.phone_number }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">POB</label>
                                                        <p className="help-block">{ data && data.employee.place_of_birth }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">DOB</label>
                                                        <p className="help-block">{ data && moment(data.employee.date_of_birth).format('LL') }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Role</label>
                                                        <p className="help-block">{ data && data.role.name }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Address</label>
                                                        <p className="help-block">{ data && data.employee.address }</p>
                                                    </Col>
                                                </Row>
                                            </Form>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                            </ListGroup>
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
        fetching: state.employee.fetching,
        data: state.employee.employee.data
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getEmployee: (id) => dispatch(getEmployee(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewEmployee));
