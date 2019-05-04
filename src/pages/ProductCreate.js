import React from 'react';
import CreatableSelect from 'react-select/lib/Creatable';
import Layout from '../components/Layout';
import ReactNumeric from 'react-numeric';

const ProductCreate = () => {
    return (
        <Layout>
            <div className="row content">
                <h1 className="content-title">Create new product</h1>
            </div>

            
                
            <div className="col-md-12">
                <div className="cards cardbox">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Name <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" placeholder="Name" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Code <span className="text-danger">*</span></label>
                                <input type="text" className="form-control" placeholder="Code" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Cost <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">RP.</span>
                                    <ReactNumeric minimumValue="0" decimalCharacter="." digitGroupSeparator="," type="text" className="form-control text-right" placeholder="0.0" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Price <span className="text-danger">*</span></label>
                                <div className="input-group">
                                    <span className="input-group-addon" id="basic-addon1">RP.</span>
                                    <ReactNumeric minimumValue="0" decimalCharacter="." digitGroupSeparator="," type="text" className="form-control text-right" placeholder="0.0"/>
                                </div>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Category <span className="text-danger">*</span></label>
                                <CreatableSelect options={[
                                        { value: 'chocolate', label: 'Chocolate' },
                                        { value: 'strawberry', label: 'Strawberry' },
                                        { value: 'vanilla', label: 'Vanilla' }
                                        ]} isMulti={true} placeholder="Select or type categories" />
                            </div>
                        

                            <div className="form-group">
                                <label className="control-label">Stock <span className="text-danger">*</span></label>
                                <ReactNumeric minimumValue="0" digitGroupSeparator="," type="text" className="form-control text-right" placeholder="0.0" />
                            </div>

                            <div className="form-group">
                                <label className="control-label">Description <span className="text-danger">*</span></label>
                                <textarea type="text" className="form-control" rows="5" placeholder="Description"></textarea>
                            </div>
                        </div>

                        <div className="col-md-12 text-right mt-20">
                            <hr/>
                            <button className="btn btn-default mr-10">Reset</button>
                            <button className="btn btn-primary">Save</button>
                        </div>
                    </div>
                    
                </div>
            </div>
        </Layout>
    
    )
}

export default ProductCreate;