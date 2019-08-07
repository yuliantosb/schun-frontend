import React from 'react';
import { Container, Row, Col, Card, CardHeader, ListGroup, ListGroupItem, Form } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import { updateProduct, getProduct } from '../store/actions/productAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import Barcode from 'react-barcode';
import PhotoDefault from '../images/sales-overview/no-product-image.jpg';
import Axios from 'axios';

class ViewProduct extends React.Component {

    state = {
        code: '',
        name: '',
        price: '',
        wholesale: '',
        stock: '',
        cost: '',
        picture: 'Choose file...',
        file: '',
        description: '',
        category_id: '',
    };

    handleOnClick = () => {
        Axios.post('http://localhost:3002/label', {
            name: this.props.data && this.props.data.name,
            price: this.props.data && this.props.data.price,
            barcode: this.props.data && this.props.data.code
        });
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps !== this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    code: nextProps.data.code ? nextProps.data.code : '',
                    name: nextProps.data.name ? nextProps.data.name : '',
                    price: nextProps.data.price ? nextProps.data.price : '',
                    wholesale: nextProps.data.wholesale ? nextProps.data.wholesale : '',
                    stock: nextProps.data.stock.amount ? nextProps.data.stock.amount : '',
                    cost: nextProps.data.cost ? nextProps.data.cost : '',
                    file: nextProps.data.file ? nextProps.data.file : '',
                    description: nextProps.data.description ? nextProps.data.description : '',
                    category_id: nextProps.data.category.name ? nextProps.data.category.name : '',
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getProduct(this.props.match.params.id);
    }
    
	render() {  
        const { fetching, error, data } = this.props;
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
					<title>View Product | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="View Product" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/product">Back</Link>
                    </div>
				</Row>
				<Row>
					<Col lg="4">
                        <Card small className="mb-4 pt-3">
                            <CardHeader className="border-bottom text-center">
                            <div className="mb-3 mx-auto">
                                <img
                                src={ data ? data.file : PhotoDefault }
                                alt={ data && data.name }
                                width="110"
                                style={{ width:110, height:110, objectFit: 'cover' }}
                                />
                            </div>
                            {
                                data && data.code &&
                                (
                                    <div>
                                        <Barcode value={ data && data.code } />
                                    </div>
                                )
                            }
                            <h4 className="mb-0">{ data && data.name }</h4>
                            <h6 className="text-secondary">{ data && data.price_formatted }</h6>
                            <span className="text-muted d-block mb-2">{ data && data.category.name }</span>
                            </CardHeader>
                        </Card>
					</Col>

                    <Col lg="8">
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <div className="float-left">
                                    <h6 className="m-0">Details Info</h6>
                                </div>
                                <div className="float-right">
                                    <button onClick={this.handleOnClick} className="btn btn-secondary"><i className="mdi mdi-printer"></i> Print Label</button>
                                </div>
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
                                                        <label htmlFor="feFirstName">Retail Price</label>
                                                        <p className="help-block">{ data && data.price_formatted }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Wholesale Price</label>
                                                        <p className="help-block">{ data && data.wholesale_formatted }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Cost</label>
                                                        <p className="help-block">{ data && data.cost_formatted }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Stock</label>
                                                        <p className="help-block">{ data && data.stock.amount_formatted }</p>
                                                    </Col>
                                                    <Col md="6" className="form-group">
                                                        <label htmlFor="feFirstName">Category</label>
                                                        <p className="help-block">{ data && data.category.name }</p>
                                                    </Col>
                                                    <Col md="12" className="form-group">
                                                        <label htmlFor="feFirstName">Description</label>
                                                        <p className="help-block">{ data && data.description }</p>
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
        saved: state.product.saved,
        fetching: state.product.fetching,
        message: state.product.message,
        data: state.product.product.data,
        error: state.product.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateProduct: (id, data) => dispatch(updateProduct(id, data)),
        getProduct: (id) => dispatch(getProduct(id)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(ViewProduct));
