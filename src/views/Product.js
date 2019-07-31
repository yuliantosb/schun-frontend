import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { Link, Redirect } from 'react-router-dom';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import ScrollToTop from '../components/layout/ScrollToTop';
import { withToastManager } from 'react-toast-notifications';
import { fetchProduct, deleteProduct } from '../store/actions/productAction';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import Table from '../components/table/Table';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-bootstrap4-modal';
import Axios from 'axios';

class Product extends React.Component {
	state = {
        search: null,
        page: 1,
        perpage: 10,
		keyword: null,
		alert: true,
		alertMsgBox: false,
		deleteIdProduct: null,
		showMsgBox: false,
		isDeleted: false,
		ordering: {
            type: 'name',
            sort: 'asc'
		},
		modal: false,
		file_import: null,
		import: 'Choose file...'
	}
	
    handleSorting = (e) => {
        const type = e.target.id;
        const sort = this.state.ordering.sort;
        this.setState({
			...this.state,
            ordering: {
                type: type,
                sort: sort === 'asc' ? 'desc' : 'asc'
            }
        });
    }

    handleChangeKeyword = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmitKeyword = (e) => {
		e.preventDefault();
		this.props.fetchProduct(this.state);
	}

	handleClickPage = (e) => {
        this.setState({
            ...this.state,
            page: e
        });
    }

    hanldeChangePage  = (e) => {
        this.setState({
            ...this.state,
            perpage: e.target.value
        });
    }
    
    handleClickDelete = (id) => {
		this.setState({
			...this.state,
			deleteIdProduct: id,
			showMsgBox: true
		});
	}
	
	handleClickYes = () => {

		this.setState({
			...this.state,
			alertMsgBox: true,
			showMsgBox: false,
			isDeleted: true
		});

		this.props.deleteProduct(this.state.deleteIdProduct);
	}

	handleClickNo = () => {
		this.setState({
			...this.state,
			showMsgBox: false,
			deleteIdProduct: null
		});
	}

    componentWillUpdate(nextProps, nextState) {
        if (this.state.page !== nextState.page) {
            this.props.fetchProduct(nextState);
        }

        if (this.state.perpage !== nextState.perpage) {
            this.props.fetchProduct(nextState);
		}
		
		if (this.state.ordering !== nextState.ordering) {
			this.props.fetchProduct(nextState);
		}
    }
    
    componentDidUpdate = (prevProps, prevState) => {

        if (prevProps.error !== this.props.error) {
            if (!this.props.fetched) {
                if (this.props.error) {
                    const { toastManager } = this.props;
                    toastManager.add(this.props.error.data.message, {
                        appearance: 'error',
                        autoDismiss: true
                    });
                }
            }
		}
		
		if (prevProps.isDeleted !== this.props.isDeleted) {
			if (this.props.isDeleted) {
				const { toastManager } = this.props;
				toastManager.add(this.props.message, {
					appearance: 'success',
					autoDismiss: true
				});
				this.props.fetchProduct(this.state);
			}
		}
	}
	
	handleModal = () => {
		this.setState({
			...this.state,
			modal: true
		})
	}

	modalBackdropClicked = () => {
		this.setState({
			...this.state,
			modal: false
		});
	}

    componentDidMount = () => {
        this.props.fetchProduct(this.state)
	}

	handleChangeFileImport = (e) => {
		
		if (e.target.files.length > 0) {

			const toastManager = this.props.toastManager;
			const file_size = e.target.files[0].size;
			const file_name = e.target.files[0].name;
			const file_type = e.target.files[0].type;
	
			if (file_type !==  'application/wps-office.xls' && file_type !== 'application/wps-office.xlsx' && file_type !== 'text/csv') {
				toastManager.add("file format is not supported", {
					appearance: 'error',
					autoDismiss: true
				});
				console.log(file_type);
				e.preventDefault();
			
			} else if (file_size >=  1000000) {
				toastManager.add("file size too big", {
					appearance: 'error',
					autoDismiss: true
				});
				console.log(file_size);
				e.preventDefault();
			
			} else {

				const file = e.target.files[0];
				const reader = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = (e) => {
					this.setState({
						...this.state,
						import_file: e.target.result,
						import: file_name
					})
				}
			}
	
		}
	}

	handleImport = () => {
		const { toastManager } = this.props;
		Axios.post(`${url}/products/import`, {
			import_file: this.state.import_file,
			import: this.state.import
		},
		{
			headers: {
				Authorization: `Bearer ${sessionStorage.getItem('token')}`
			}
		}).then(res => {
			
			this.setState({
				...this.state,
				modal: false
			});

			toastManager.add(res.data.message, {
				appearance: 'success',
				autoDismiss: true
			});
		})
		.catch(error => {
			toastManager.add(error.data.message, {
				appearance: 'success',
				autoDismiss: true
			});
		});
	}
	
	render() {
		const {payload, error, fetching} = this.props;
		
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />
		if (error && error.status === 500) return <Error500 message={error.data.message} />

		const {ordering} = this.state;
        const theads = [
            {name:'name', 'value': 'Name', sortable: true},
            {name:'price', 'value': 'Retail price', sortable: true},
            {name:'wholesale', 'value': 'Wholesale price', sortable: true},
            {name:'category', 'value': 'Category', sortable: true},
            {name:'stock', 'value': 'Stock', sortable: true},
            {name:'option', 'value': 'Options', sortable: false}
        ];

		const products = payload.data && payload.data.data.map(product => {
            return (
            <tr key={product._id}>
                <td>
                    <strong>{ product.name }</strong>
                </td>
				<td className="text-right">{ product.price_formatted }</td>
				<td className="text-right">{ product.wholesale_formatted }</td>				
				<td>{ product.category && product.category.name }</td>
                <td>{ product.stock ? product.stock.amount : 0 }</td>
				<td className="text-center">
					<Link data-tip="Edit" to={`/product/edit/${product._id}`} className="btn btn-link text-success btn-sm  py-0 px-0 pr-4"><i className="mdi mdi-pencil"></i></Link>
					<Link data-tip="View" to={`/product/view/${product._id}`} className="btn btn-link text-info btn-sm  py-0 px-0 pr-4"><i className="mdi mdi-eye"></i></Link>
                    <button data-tip="Delete" onClick={() => this.handleClickDelete(product._id)} className="btn btn-link text-danger btn-sm  py-0 px-0"><i className="mdi mdi-delete"></i></button>
					<ReactTooltip/>
				</td>
            </tr>
            );
		});


		return (
			<Container fluid className="main-content-container px-4">
				<Loading
					show={fetching}
					color="blue"
					showSpinner={false}
					/>
				<Helmet>
					<title>Product | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Product"  className="text-sm-left" />
				</Row>
					<Modal visible={this.state.modal} onClickBackdrop={this.modalBackdropClicked}>
						<div className="modal-header">
							<h5 className="modal-title">Import products</h5>
						</div>
						<div className="modal-body py-0 pt-2 px-4">
							<div className="row">
								<div className="custom-file mb-3">
									<input
										id="import"
										type="file"
										className="custom-file-input"
										onChange={this.handleChangeFileImport} 
										accept=".xlsx, .xls, .csv"
									/>
									<label
										className="custom-file-label"
										htmlFor="customFile2"
										id="placeholderCustomFile2"
									>
										{this.state.import}
									</label>
								</div>
								<div className="my-3">
									<small>
										*) File format is xlsx, xlsx, or csv (semicolon separator ';')<br />
										*) Warning! existing data will be overwritted, be carefully! <br />
										*) Max file size 1MBs <br />
									</small>
								</div>
							</div>
						</div>
						<div className="modal-footer">
						<button type="button" className="btn btn-default" onClick={this.modalBackdropClicked}>
							Close
						</button>
						<button type="button" className="btn btn-secondary" onClick={this.handleImport}>
							Import
						</button>
						</div>
					</Modal>
				<Row>
					{
						this.state.showMsgBox &&
						(
							<ScrollToTop>
								<div className="messagebox">
									<p className="mb-5">Are you sure want to delete this data?</p>
									<button className="btn btn-secondary mr-4" onClick={this.handleClickYes}>Yes</button>
									<button className="btn btn-white" onClick={this.handleClickNo}>No Cancel</button>
								</div>
								<div className="backdrop"></div>
							</ScrollToTop>
						)
					}
					<Col>
						<Card small className="mb-4">
							<CardBody className="p-0 pb-3">
								<div className="col-md-12 mt-4">
									<div className="row">
                                        <div className="col-md-8">
                                            <Link to="/product/create" className="btn btn-secondary mr-2">
                                                <i className="mdi mdi-plus" /> Add
                                            </Link>
											<button className="btn btn-secondary" onClick={this.handleModal}>
												<i className="mdi mdi-upload" /> Import
											</button>
                                        </div>
										<div className="col-md-4 text-right">
											<form onSubmit={this.handleSubmitKeyword}>
												<div className="input-group mb-3">
													<input
														id="keyword"
														type="text"
														className="form-control"
														placeholder=""
														aria-label="Example text with button addon"
														aria-describedby="button-addon1"
														onChange={this.handleChangeKeyword}
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
											</form>
										</div>
									</div>
								</div>
								<div className="col-md-12 mt-3">

									<Table theads={theads} ordering={ordering} handleSorting={this.handleSorting}>
										{ 
											fetching ? 
											(
												<tr>
													<td className="text-center" colSpan="6">Loading...</td>
												</tr>
											)
											:
											payload.data && payload.data.data.length > 0 ? products : (
												<tr>
													<td className="text-center" colSpan="6">Data not found</td>
												</tr>
										) }
									</Table>

								</div>

								<div className="col-md-12 py-3">
									<div className="row">
										<div className="col-md-10">
											{ payload.data && payload.data.total > 1 && (
												<p>Showing { payload.data && payload.data.from.toLocaleString() } to { payload.data && payload.data.to.toLocaleString() } of { payload.data && payload.data.total.toLocaleString() } record(s)</p>

											)}

											{
												payload.data && payload.data.total > 1 && (
													<nav aria-label="Page navigation example">
														<ul className="pagination">

															{ payload.data.current_page > 1 && <li key="prev" className="page-item"><button onClick={this.handleClickPage.bind(null, payload.data.current_page - 1)} className="page-link">Prev</button></li> }

															{
																payload.data.pages.map((page, index) => {
																	return (
																		
																		<li key={index} className={`page-item ${page === '...' ? 'disabled' : '' } ${page === payload.data.current_page ? 'active' : '' }`}><button onClick={this.handleClickPage.bind(null, page)} className="page-link">{page}</button></li>
																		
																	)
																})
															}

															{ payload.data.current_page < payload.data.last_page && <li key="next" className="page-item"><button onClick={this.handleClickPage.bind(null, payload.data.current_page + 1)} className="page-link">Next</button></li> }


														</ul>
													</nav>
												)
											}
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



const mapStateToProps = (state) => {
    return {
        ...state,
        payload: state.product.payload,
        error: state.product.error,
		fetching: state.product.fetching,
		message: state.product.message,
		saved: state.product.saved,
		isDeleted: state.product.isDeleted
    }
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchProduct: (filter) => dispatch(fetchProduct(filter)),
		deleteProduct: (id) => dispatch(deleteProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Product));
