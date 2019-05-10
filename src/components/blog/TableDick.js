import React from 'react';
import { Card, CardHeader, CardBody, DatePicker } from "shards-react";
import "../../assets/range-date-picker.css";

class TableDick extends React.Component {
    
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
        console.log(value);
        this.setState({
            ...this.state,
            ...{ endDate: new Date(value) }
        });
    }

    render() {
        return (
            <Card small className="h-100">
                <CardHeader className="border-bottom">
                    <h6 className="m-0">Data Batching</h6>
                </CardHeader>
                <CardBody className="d-flex py-0 mt-4">
                    <div className="row">
                        <div className="col-sm-12 text-right mb-4">
                            <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Advanced Search <i className="mdi mdi-chevron-down"></i>
                            </button>
                        </div>
                        <div className="col-sm-12">
                            <div className="collapse" id="collapseExample">
                                <div className="card card-body mb-5">
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
                                        </div>
                                        <div className="col-md-12 text-right mt-2 mb-2">
                                            <button className="btn btn-primary">Search</button> &nbsp;
                                            <button className="btn btn-secondary">Reset</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
                    <div className="col-sm-12 mb-5">
                            <table className="table table-bordered table-custom table-responsive">
                                <thead>
                                    <tr>
                                        <th>Batching Plan</th>
                                        <th>Jobsite</th>
                                        <th>Mix Design</th>
                                        <th>Ticket #</th>
                                        <th>Ref/Name</th>
                                        <th>Static Control</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <p className="text-primary">JAPEK Bekasi Barat</p>
                                            <small className="text-muted">05/20/2019</small>
                                        </td>
                                        <td>Proyek Tol JAPEK</td>
                                        <td>Kelas A2</td>
                                        <td>100201010</td>
                                        <td>FPWP-PROD-05-03</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="text-primary">Apartment Mahogany Karawang Barat</p>
                                            <small className="text-muted">05/25/2019</small>
                                        </td>
                                        <td>Proyek Mahogany</td>
                                        <td>Kelas A2</td>
                                        <td>100201030</td>
                                        <td>FPWP-PROD-05-30</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="text-primary">JAPEK Bekasi Barat</p>
                                            <small className="text-muted">05/20/2019</small>
                                        </td>
                                        <td>Proyek Tol JAPEK</td>
                                        <td>Kelas A2</td>
                                        <td>100201010</td>
                                        <td>FPWP-PROD-05-03</td>
                                        <td>Yes</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <p className="text-primary">Apartment Mahogany Karawang Barat</p>
                                            <small className="text-muted">05/25/2019</small>
                                        </td>
                                        <td>Proyek Mahogany</td>
                                        <td>Kelas A2</td>
                                        <td>100201030</td>
                                        <td>FPWP-PROD-05-30</td>
                                        <td>Yes</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </CardBody>
            </Card>
        )
    }
}

export default TableDick;