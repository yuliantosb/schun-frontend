import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { getSales } from '../store/actions/salesAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import moment from 'moment';

class ViewSales extends React.Component {

    componentDidMount = () => {
        this.props.getSales(this.props.match.params.id);
    }
    
	render() {  
        const { fetching, error, data } = this.props;
        console.log(data);
        if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
        if (error && error.status === 500) return <Error500 message={error.data.message} />
		return (
         
			<Container fluid className="main-content-container px-4">
                <Loading
						show={fetching}
						color="blue"
						showSpinner={false}
						/>
				<Helmet>
					<title>View Sales | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="View Sales" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/sales">Back</Link>
                    </div>
				</Row>
				<Row>
                    <Col lg="12">
                        <Card small className="mb-4">
							<CardBody className="p-0 pb-3">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Customer Name</th>
                                            <th>Sales Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{ data && data._id }</td>
                                            <td>{ data && data.customer && data.customer.name }</td>
                                            <td>{ data && moment(data.created_at).format('LL') }</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col lg="12">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <div className="float-left">
                                    <h6 className="m-0">Sales Details</h6>
                                </div>
                            </CardHeader>
							<CardBody className="p-3">
                                <table className="table table-bordered table-custom">
                                    <thead>
                                        <tr>
                                            <th>Product Name</th>
                                            <th>Price</th>
                                            <th>Qty</th>
                                            <th>Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            data && data.details && data.details.map(cart => {
                                                return (
                                                    <tr key={cart.product_id}>
                                                        <td>{ cart.product_name }</td>
                                                        <td className="text-right">{ cart.price_formatted }</td>
                                                        <td>{ cart.qty }</td>
                                                        <td className="text-right">{ cart.subtotal_formatted }</td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colSpan="3"><strong>Subtotal</strong></td>
                                            <td className="text-right"><strong>{ data && data.subtotal_formatted }</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3"><strong>Tax</strong></td>
                                            <td className="text-right"><strong>{ data && data.tax_formatted }</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3"><strong>Discount</strong></td>
                                            <td className="text-right"><strong>({ data && data.discount_formatted })</strong></td>
                                        </tr>
                                        <tr>
                                            <td colSpan="3"><strong>Total</strong></td>
                                            <td className="text-right"><strong>{ data && data.total_formatted }</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </CardBody>
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
        saved: state.sales.saved,
        fetching: state.sales.fetching,
        message: state.sales.message,
        data: state.sales.sales.data,
        error: state.sales.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getSales: (id) => dispatch(getSales(id)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewSales));
