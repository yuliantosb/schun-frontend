import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import Select from 'react-select';
import { fetchItemList, saveStockIn } from '../store/actions/stockInAction';
import { connect } from 'react-redux';
import Loading from 'react-loading-bar';
import 'react-loading-bar/dist/index.css';
import NumberFormat from 'react-number-format';

class AddStockIn extends React.Component {
	state = {
		stockInDate: undefined,
		uploadFile: 'Choose file...'
	};

	handlestockInDateChange = (value) => {
		this.setState({
			...this.state,
			...{ stockInDate: new Date(value) }
		});
	};

	handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			uploadFile: filename[filename.length - 1],
		});

		const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setState({
				...this.state,
				fileRaw: e.target.result
			})
		}
	};

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.saveStockIn(this.state);
	}

	componentDidMount = () => {
		this.props.fetchItemList();
	}

	handleChangeItem = (e) => {
		this.setState({
			...this.state,
			item_id: e.value
		});
	}

	render() {
		const customerStyles = { 
			control: (styles, {isFocused}) => ({ 
				...styles, 
				backgroundColor: 'transparent',
				boxShadow: isFocused ? '0 0.313rem 0.719rem rgba(0,123,255,.1), 0 0.156rem 0.125rem rgba(0,0,0,.06)' : 'none'
			}),
		};

		const {payload, fetching} = this.props;
		
		const items = payload.data && payload.data.map(item => {
				return {
					value: item._id,
					label: item.name + ' - ' + item.item_code
				}
			});


		return (

			<Container fluid className="main-content-container px-4">
				<Loading
                    show={fetching}
                    color="blue"
                    showSpinner={false}
                    />
                <Helmet>
                    <title>Add new stock in | {appName} </title>
                </Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Stock In" subtitle="Add new stock in material" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Add new stock in Material</h6>
							</CardHeader>
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<form onSubmit={this.handleSubmit}>
										<div className="row">
											<div className="col-md-6">
												<div className="form-group">
													<label className="control-label">Stock In Date</label>
													<DatePicker
														size="md"
														selected={this.state.stockInDate}
														onChange={this.handlestockInDateChange}
														placeholderText="Date From"
														dropdownMode="select"
													/>
												</div>

												<div className="row">
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Price</label>
															<NumberFormat id="price" className="text-right form-control" placeholder="Price" thousandSeparator="," decimalSeparator="." onChange={this.handleChange} />
														</div>
													</div>
													<div className="col-md-6">
														<div className="form-group">
															<label className="control-label">Qty</label>
															<NumberFormat id="qty" className="text-right form-control" placeholder="Price" thousandSeparator="," decimalSeparator="." onChange={this.handleChange} />
														</div>
													</div>
												</div>

											</div>
											<div className="col-md-6">
												<div className="form-group">
													<label className="control-label">Item</label>
													<Select styles={customerStyles} options={items} name="item_id" onChange={this.handleChangeItem} />
												</div>
												<div className="form-group">
													<label className="control-label">Evidence</label>
													<div className="custom-file mb-3">
														<input
															id="evidence"
															type="file"
															className="custom-file-input"
															id="customFile2"
															onChange={this.handleChangeUpload}
														/>
														<label
															className="custom-file-label"
															htmlFor="customFile2"
															id="placeholderCustomFile2"
														>
															{this.state.uploadFile}
														</label>
													</div>
												</div>
											</div>
										</div>
										<div className="col-md-12 text-right mt-4 mb-4">
											<hr />
											<button className="btn btn-primary mr-2">Save</button>
											<button className="btn btn-secondary" type="reset">Reset</button>
										</div>
									</form>
								</div>
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
        payload: state.stockIn.itemsList,
        error: state.stockIn.error,
        fetching: state.stockIn.fetching
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
		fetchItemList: () => dispatch(fetchItemList()),
		saveStockIn: (data) => dispatch(saveStockIn(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddStockIn);
