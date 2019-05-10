import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody, DatePicker } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import "../assets/range-date-picker.css";
import { Link } from 'react-router-dom';

class ResumeMaterial extends React.Component {
    state = {
        startDate: undefined,
        endDate: undefined
    }

    handleStartDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ startDate: new Date(value) }
        });
    }

    handleEndDateChange = (value) => {
        this.setState({
            ...this.state,
            ...{ endDate: new Date(value) }
        });
    }

    render() {
        return (
            <Container fluid className="main-content-container px-4">
                <Row noGutters className="page-header py-4">
                    <PageTitle sm="4" title="Overview resume material" subtitle="Resume Material" className="text-sm-left" />
                </Row>
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">Inquiery Resume Material</h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <div className="col-md-12 mt-4">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="form-group">
                                                <label className="control-label">Project Name</label>
                                                <select className="form-control select-custom">
                                                    <option value="">Choose...</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
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
                                            </div>
                                        
                                    <div className="col-md-4 text-right">
                                        <div className="input-group mb-3">
                                            <input type="text" className="form-control" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                            <div className="input-group-prepend">
                                                <button className="btn btn-secondary" type="button" id="button-addon1"><i className="mdi mdi-magnify"></i> Search </button>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary"><i className="mdi mdi-download"></i> Download</button>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-12 mt-3">
                                <table className="table table-bordered table-custom table-responsive">
                                    <thead>
                                        <tr>
                                            <th rowSpan="2" className="align-middle">Item Name</th>
                                            <th rowSpan="2" className="align-middle">UoM</th>
                                            <th colSpan="2" className="align-middle">Begining Stock</th>
                                            <th colSpan="2" className="align-middle">Stock In</th>
                                            <th colSpan="2" className="align-middle">Stock Out</th>
                                            <th colSpan="2" className="align-middle">Stock</th>
                                        </tr>
                                        <tr>
                                            <th>Volume</th>
                                            <th>Price (RP)</th>
                                            <th>Volume</th>
                                            <th>Price (RP)</th>
                                            <th>Volume</th>
                                            <th>Price (RP)</th>
                                            <th>Volume</th>
                                            <th>Price (RP)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <p className="text-primary">Sand</p>
                                                <small className="text-muted">05/01/2019</small>
                                            </td>
                                            <td>Ton</td>
                                            <td>652</td>
                                            <td>474,4940,923</td>
                                            <td>9,8273</td>
                                            <td>991,131,674</td>
                                            <td>1,242</td>
                                            <td>678,642,4940</td>
                                            <td>445</td>
                                            <td>678,642,4940</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="text-primary">Split</p>
                                                <small className="text-muted">05/01/2019</small>
                                            </td>
                                            <td>Ton</td>
                                            <td>652</td>
                                            <td>474,4940,923</td>
                                            <td>9,8273</td>
                                            <td>991,131,674</td>
                                            <td>1,242</td>
                                            <td>678,642,4940</td>
                                            <td>445</td>
                                            <td>678,642,4940</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="text-primary">Screening</p>
                                                <small className="text-muted">05/01/2019</small>
                                            </td>
                                            <td>Ton</td>
                                            <td>652</td>
                                            <td>474,4940,923</td>
                                            <td>9,8273</td>
                                            <td>991,131,674</td>
                                            <td>1,242</td>
                                            <td>678,642,4940</td>
                                            <td>445</td>
                                            <td>678,642,4940</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="text-primary">Sand</p>
                                                <small className="text-muted">05/01/2019</small>
                                            </td>
                                            <td>Ton</td>
                                            <td>652</td>
                                            <td>474,4940,923</td>
                                            <td>9,8273</td>
                                            <td>991,131,674</td>
                                            <td>1,242</td>
                                            <td>678,642,4940</td>
                                            <td>445</td>
                                            <td>678,642,4940</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <p className="text-primary">Sand</p>
                                                <small className="text-muted">05/01/2019</small>
                                            </td>
                                            <td>Ton</td>
                                            <td>652</td>
                                            <td>474,4940,923</td>
                                            <td>9,8273</td>
                                            <td>991,131,674</td>
                                            <td>1,242</td>
                                            <td>678,642,4940</td>
                                            <td>445</td>
                                            <td>678,642,4940</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-md-12 text-right py-3">
                                <nav aria-label="Page navigation example">
                                    <ul className="pagination">
                                        <li className="page-item disabled"><Link aria-disabled="true" className="page-link">Previous</Link></li>
                                        <li className="page-item active"><Link className="page-link">1</Link></li>
                                        <li className="page-item"><Link className="page-link">2</Link></li>
                                        <li className="page-item"><Link className="page-link">3</Link></li>
                                        <li className="page-item"><Link className="page-link">Next</Link></li>
                                    </ul>
                                </nav>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
        )
    }
}

export default ResumeMaterial;