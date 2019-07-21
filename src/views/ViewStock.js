import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { withToastManager } from 'react-toast-notifications';
import { getStockOpname } from '../store/actions/stockOpnameActions';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import moment from 'moment';

class ViewStock extends React.Component {

    componentDidMount = () => {
        this.props.getStockOpname(this.props.match.params.id);
    }
	
	render() {
		const {payload, error, fetching} = this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

        const stock = this.props.stock
        console.log(stock);
		return (
			<Container fluid className="main-content-container px-4">
				<Loading
					show={fetching}
					color="blue"
					showSpinner={false}
					/>
				<Helmet>
					<title>View Stock Opname | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                    <div className="col-md-10">
					    <PageTitle title="View Stock Details" className="text-sm-left" />
                    </div>
                    <div className="col-md-2 text-right">
                         <Link className="btn btn-secondary" to="/stock-opname">Back</Link>
                    </div>
				</Row>
				<Row>
                    <Col lg="12">
                        <Card small className="mb-4">
							<CardBody className="pb-3">
                                <table className="table table-bordered table-custom table-responsive">
                                    <thead>
                                        <tr>
                                            <th>Notes</th>
                                            <th>Stock</th>
                                            <th>Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            stock ? 
                                                stock.details.map(stock => {
                                                    return (
                                                        <tr key={stock._id}>
                                                            <td>
                                                            {
                                                                stock.purchase_id ?
                                                                    <Link to={`/purchase/view/${stock.purchase_id}`}>{ stock.description }</Link>
                                                                : stock.sales_id  ?
                                                                    <Link to={`/sales/view/${stock.sales_id}`}>{ stock.description }</Link>
                                                               :
                                                                    stock.description
                                                            }
                                                            </td>
                                                            <td className="text-right">{ stock.type === 'induction' ? <span className="text-success">+{stock.amount}</span> : <span className="text-danger">-{stock.amount}</span> }</td>
                                                            <td>{ moment(stock.created_at).format('ll') }</td>
                                                        </tr>
                                                    )
                                                }).sort((a, b) => {
                                                    return a === b ? 0 : -1;
                                                })
                                             : (
                                                 <tr>
                                                     <td colSpan="3" className="text-center">No Data</td>
                                                 </tr>
                                             )
                                        }
                                    </tbody>
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
        stock: state.stock.stockOpname.data
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		getStockOpname: (id) => dispatch(getStockOpname(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewStock));
