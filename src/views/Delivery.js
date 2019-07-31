import React from 'react';
import PageTitle from "../components/common/PageTitle";
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from 'shards-react';
import "../assets/range-date-picker.css";
import Modal from 'react-bootstrap-modal';
import { Link } from 'react-router-dom';
import { appName } from '../global';
import { Helmet } from 'react-helmet';

class Delivery extends React.Component {
    state = {
        startDate: undefined,
        endDate: undefined,
        modalOpen: false
    }

    handleStartDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ startDate: new Date(value) }
        });
    }

    handleEndDateChange = (value) => {
        console.log(value);
        this.setState({
            ...this.state,
            ...{ endDate: new Date(value) }
        });
    }
    handleModalOpen = () => {
        this.setState({
            ...this.state,
            ...{ modalOpen: true }
        })
    }
    closeModal = () => {
        this.setState({
            ...this.state,
            ...{ modalOpen: false }
        })
    }
    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Helmet>
                    <title>Delivery | {appName} </title>
                </Helmet>
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Overview delivery" subtitle="Delivery" className="text-sm-left" />
                </Row>
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Inquiery Deliery</h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <div className="col-md-12 mt-4">
                                    <div className="row">
                                        <div className="col-sm-12 text-right">
                                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                                Advanced Search <i className="mdi mdi-chevron-down"></i>
                                            </button>
                                        </div>
                                        <div className="col-sm-12">
                                            <div className="collapse" id="collapseExample">
                                                <div className="card card-body mb-5 mt-4">
                                                    <div className="row mb-2">
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="control-l">Batching Plan</label>
                                                                <select className="form-control custom-select">
                                                                    <option>Choose...</option>
                                                                </select>
                                                            </div>
                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-l">Ticket #</label>
                                                                        <input type="text" id="" className="form-control" placeholder="Ticket Number" />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-l">Ref/Name</label>
                                                                        <input type="text" id="" className="form-control" placeholder="Ref/Name" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            
                                                            <div className="form-group">
                                                                <label className="control-l">Customer</label>
                                                                <select className="form-control custom-select">
                                                                    <option>Choose...</option>
                                                                </select>
                                                            </div>

                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="control-l">Jobsite</label>
                                                                <select className="form-control custom-select">
                                                                    <option>Choose...</option>
                                                                </select>
                                                            </div>

                                                            <div className="row">
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-l">Date From</label>
                                                                        <DatePicker
                                                                            size="md"
                                                                            selected={this.state.startDate}
                                                                            onChange={this.handleStartDateChange}
                                                                            placeholderText="Date From"
                                                                            dropdownMode="select"
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className="col-md-6">
                                                                    <div className="form-group">
                                                                        <label className="control-l">Date To</label>
                                                                        <DatePicker
                                                                            size="md"
                                                                            selected={this.state.endDate}
                                                                            onChange={this.handleEndDateChange}
                                                                            placeholderText="Date To"
                                                                            dropdownMode="select"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            
                                                            <div className="form-group">
                                                                <label className="control-l">Driver</label>
                                                                <input type="text" id="" className="form-control" placeholder="Driver" />
                                                            </div>

                                                        </div>
                                                        <div className="col-md-4">
                                                            <div className="form-group">
                                                                <label className="control-l">Mix Design</label>
                                                                <select className="form-control custom-select">
                                                                    <option>Choose...</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-l">Static Control</label>
                                                                <select className="form-control custom-select">
                                                                    <option>Choose...</option>
                                                                </select>
                                                            </div>
                                                            <div className="form-group">
                                                                <label className="control-l">User</label>
                                                                <input type="text" id="" className="form-control" placeholder="User" />
                                                            </div>
                                                        </div>
                                                        <div className="col-md-12 text-right mt-2 mb-2">
                                                            <button className="btn btn-primary">Search</button> &nbsp;
                                                            <button className="btn btn-secondary">Reset</button> &nbsp;
                                                            <button className="btn btn-info"><i className="mdi mdi-download"></i> Download</button> &nbsp;
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-12 mt-4">
                                    <table className="table table-bordered table-custom table-hover">
                                        <thead>
                                            <tr>
                                                <th>Batching Plan</th>
                                                <th>Tikcet #</th>
                                                <th>Customer</th>
                                                <th>Jobsite</th>
                                                <th>Truck</th>
                                                <th>Driver</th>
                                                <th>User</th>
                                                <th>Mix Code</th>
                                                <th>Load Size</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                            <tr className="clickable-row" onClick={this.handleModalOpen}>
                                                <td>
                                                    <p className="text-primary">BKS001 - JAPEK-BEKASI BARAT</p>
                                                    <small className="text-muted">05/20/2019</small>
                                                </td>
                                                <td>828282921</td>
                                                <td>PT Waskita Karya</td>
                                                <td>(316) Proyek TOL JAPEK</td>
                                                <td>379</td>
                                                <td>David</td>
                                                <td>Pamuji</td>
                                                <td>A2</td>
                                                <td>7.00 m3</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="col-md-12 text-right py-3">
                                    <nav aria-label="Page navigation example">
                                        <ul className="pagination">
                                            <li className="page-item disabled"><Link to="/" aria-disabled="true" className="page-link">Previous</Link></li>
                                            <li className="page-item active"><Link to="/" className="page-link">1</Link></li>
                                            <li className="page-item"><Link to="/" className="page-link">2</Link></li>
                                            <li className="page-item"><Link to="/" className="page-link">3</Link></li>
                                            <li className="page-item"><Link to="/" className="page-link">Next</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Modal
                    show={this.state.modalOpen}
                    onHide={this.closeModal}
                    aria-labelledby="ModalHeader"
                    lg
                    >
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">BKS001 - JAPEK-BEKASI-BARAT</h5>
                        <button type="button" className="close" onClick={this.closeModal}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-md-12">
                                <table className="table table-bordered table-custom">
                                    <thead>
                                        <tr>
                                            <th>Material</th>
                                            <th>Design Qty</th>
                                            <th>Required</th>
                                            <th>Bacthed</th>
                                            <th>Var</th>
                                            <th>%Var</th>
                                            <th>Moisture</th>
                                            <th>Actual Wat</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                        <tr>
                                            <td>Cement</td>
                                            <td>450 Kg</td>
                                            <td>3,150 Kg</td>
                                            <td>3,145 Kg</td>
                                            <td>-5</td>
                                            <td>0.16%</td>
                                            <td></td>
                                            <td></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </Modal>

            </Container>
        )
    }
}

export default Delivery;
