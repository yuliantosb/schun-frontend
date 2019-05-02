import React from 'react';
import Modal from 'react-bootstrap-modal';
import Datetime from 'react-datetime';
import '../../node_modules/react-datetime/css/react-datetime.css';

class Cashier extends React.Component {
    state = {
        open: false,
        credit_card: false,
        giftcard: false,
        startDate: new Date()
    }
    openModal = () => {
        this.setState({ open: true })
    }
    closeModal = () => {
        this.setState({ open: false })
    }
    saveAndClose = () => {  
        this.setState({ open: false })
    }
    handleChange = (e) => {
        const type = e.target.value;
        if (type === 'credit_card') {
            this.setState({
                credit_card: true,
                giftcard: false
            })
        } else if (type === 'giftcard') {
            this.setState({
                credit_card: false,
                giftcard: true
            })
        } else {
            this.setState({
                credit_card: false,
                giftcard: false
            })
        }
    }
    handleChangeDate = (date) => {
        this.setState({
            startDate: date
        });
    }

    render() {
        return (
            <div>
               <div className="row content">
                   <h1 className="content-title">POS</h1>
               </div>
   
               <div className="col-md-12">
                   <div className="row">
                       <div className="col-md-12">
                           <div className="cards">
   
                               <ul className="nav nav-tabs" role="tablist">
                                   <li role="presentation" className="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Barcode</a></li>
                                   <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Manual Input</a></li>
                               </ul>
   
                               <div className="tab-content mt-30">
                                   <div role="tabpanel" className="tab-pane in fade active" id="home">
                                       <input type="text" name="code" id="code" className="input-lg form-control" placeholder="Enter Barcode" />
                                   </div>
                                   <div role="tabpanel" className="tab-pane fade" id="profile">
                                       <div className="input-group">
                                           <input type="text" name="code" id="code" className="input-lg form-control" placeholder="Enter Barcode or Name" />
                                           <span className="input-group-btn">
                                               <button className="btn btn-primary btn-lg" type="button">Submit</button>
                                           </span>
                                       </div>
                                   </div>
                               </div>
   
                               <div className="clearfix mt-20">
                                   <div className="col-md-7">
                                       <div className="row">
                                           <div className="col-md-6 mt-10"><button className="btn btn-block btn-danger">Cancel</button></div>
                                           <div className="col-md-6 mt-10"><button className="btn btn-block btn-info">Print Order</button></div>
                                           <div className="col-md-6 mt-10"><button className="btn btn-block btn-warning">Hold</button></div>
                                           <div className="col-md-6 mt-10"><button className="btn btn-block btn-primary">Print Bill</button></div>
                                           <div className="col-md-12 mt-10"><button className="btn btn-block btn-success" onClick={this.openModal}>Payment</button></div>
                                       </div>
                                   </div>
                                   <div className="col-md-5">
                                       <div className="clearfix text-right">
                                           <table className="table table-bordered">
                                               <tbody>
                                                   <tr>
                                                       <th>Total Items</th>
                                                       <td>4</td>
                                                   </tr>
                                                   <tr>
                                                       <th>Tax</th>
                                                       <td>RP.0</td>
                                                   </tr>
                                                   <tr>
                                                       <th>Discount</th>
                                                       <td>(RP.0)</td>
                                                   </tr>
                                                   <tr>
                                                       <th>Total</th>
                                                       <td>RP.825,000</td>
                                                   </tr>
                                               </tbody>
                                           </table>
                                       </div>
                                   </div>
                                   <div className="clearfix">
                                       <hr/> 
                                       <table className="table table-bordered mb-30">
                                           <thead>
                                               <tr>
                                                   <th>Name</th>
                                                   <th className="text-right">Price</th>
                                                   <th className="text-center" style={{ width:"80px" }}>Qty</th>
                                                   <th className="text-right">Subtotal</th>
                                                   <th style={{ width:'12px' }}></th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               <tr>
                                                   <td>Charjer Leptop</td>
                                                   <td className="text-right">RP.300,000</td>
                                                   <td className="text-center"><input type="number" name="qty" min="1" defaultValue="1" className="form-control text-center" /></td>
                                                   <td className="text-right">RP.300,000</td>
                                                   <td className="text-center">
                                                       <strong>
                                                           <button className="btn btn-sm btn-link text-danger">
                                                               <i className="mdi mdi-close"></i>
                                                           </button>
                                                       </strong>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <td>Kesing Hendpon</td>
                                                   <td className="text-right">RP.150,000</td>
                                                   <td className="text-center"><input type="number" name="qty" min="1" defaultValue="1" className="form-control text-center" /></td>
                                                   <td className="text-right">RP.150,000</td>
                                                   <td className="text-center">
                                                       <strong>
                                                           <button className="btn btn-sm btn-link text-danger">
                                                               <i className="mdi mdi-close"></i>
                                                           </button>
                                                       </strong>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <td>Mos Wirles</td>
                                                   <td className="text-right">RP.250,000</td>
                                                   <td className="text-center"><input type="number" name="qty" min="1" defaultValue="1" className="form-control text-center" /></td>
                                                   <td className="text-right">RP.250,000</td>
                                                   <td className="text-center">
                                                       <strong>
                                                           <button className="btn btn-sm btn-link text-danger">
                                                               <i className="mdi mdi-close"></i>
                                                           </button>
                                                       </strong>
                                                   </td>
                                               </tr>
                                               <tr>
                                                   <td>Kibot Leptop</td>
                                                   <td className="text-right">RP.125,000</td>
                                                   <td className="text-center"><input type="number" name="qty" min="1" defaultValue="1" className="form-control text-center" /></td>
                                                   <td className="text-right">RP.125,000</td>
                                                   <td className="text-center">
                                                       <strong>
                                                           <button className="btn btn-sm btn-link text-danger">
                                                               <i className="mdi mdi-close"></i>
                                                           </button>
                                                       </strong>
                                                   </td>
                                               </tr>
                                           </tbody>
                                       </table>
                                   </div>
                                   <div className="col-md-12 text-right">
                                       <button className="btn btn-success"><i className="mdi mdi-credit-card"></i> Sell Giftcard</button>
                                   </div>
                               </div>
                           </div>
                       </div>
                   </div>
               </div>

               <Modal
                    show={this.state.open}
                    onHide={this.closeModal}
                    aria-labelledby="ModalHeader"
                    >
                    <Modal.Header closeButton>
                        <Modal.Title id='ModalHeader'>Payment</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className="row mb-30" style={{ padding: '0px 20px' }}>
                            <div className="col-md-12">
                                <table className="table table-bordered">
                                    <tbody>
                                        <tr>
                                            <th>Total Purchase</th>
                                            <td className="text-right">RP.825,000</td>
                                            <th>Total Pay</th>
                                            <td className="text-right">RP.850,000</td>
                                        </tr>
                                        <tr>
                                            <th colSpan="3">Total Changes</th>
                                            <td className="text-right">RP.25.000</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="form-group">
                                    <label className="control-label">Notes</label>
                                    <textarea id="notes" className="form-control" rows="5"></textarea>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label className="control-label">Amount</label>
                                            <input id="amount" className="form-control text-right" defaultValue="850.000" />
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-g">
                                            <label className="control-label">Payment Method</label>
                                            <select id="payment_method" className="form-control text-right" onChange={this.handleChange}>
                                                <option value="cash">Cash</option>
                                                <option value="credit_card">Credit Card</option>
                                                <option value="giftcard">Giftcard</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                { this.state.credit_card && 
                                <div id="credit-card">
                                    <div className="row">
                                        <div className="col-sm-8">
                                            <div className="form-group">
                                                <label className="control-label">Card Number</label>
                                                <input type="text" id="card_number" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-sm-4">
                                            <div className="form-group datepicker-top">
                                                <label className="control-label">Card Exp</label>
                                                <Datetime 
                                                    id="month_exp" 
                                                    placeholder="MM"
                                                    dateFormat="MM/YY"
                                                    closeOnSelect={true}
                                                    closeOnTab={true} />
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                }

                                { this.state.giftcard &&
                                <div id="gift-card">
                                    <div className="form-group">
                                        <label className="control-label">Enter giftcard number</label>
                                        <input type="text" id="giftcard_number" className="form-control" />
                                    </div>
                                </div>
                                }

                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Modal.Dismiss className='btn btn-default'>Cancel</Modal.Dismiss>
                        <button className='btn btn-primary' onClick={this.saveAndClose}>
                            Save and print
                        </button>
                    </Modal.Footer>
                </Modal>

           </div>
       )
    }
}

export default Cashier;