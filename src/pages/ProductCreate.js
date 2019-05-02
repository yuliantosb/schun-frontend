import React from 'react';
import Select from 'react-select';
import Layout from '../components/Layout';

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
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Code <span className="text-danger">*</span></label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Cost <span className="text-danger">*</span></label>
                                <input type="text" className="form-control text-right"/>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Price <span className="text-danger">*</span></label>
                                <input type="text" className="form-control text-right"/>
                            </div>

                        </div>

                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Category <span className="text-danger">*</span></label>
                                <Select options={[
                                        { value: 'chocolate', label: 'Chocolate' },
                                        { value: 'strawberry', label: 'Strawberry' },
                                        { value: 'vanilla', label: 'Vanilla' }
                                        ]} isMulti={true} />
                            </div>
                        

                            <div className="form-group">
                                <label className="control-label">Stock <span className="text-danger">*</span></label>
                                <input type="text" className="form-control"/>
                            </div>

                            <div className="form-group">
                                <label className="control-label">Description <span className="text-danger">*</span></label>
                                <textarea type="text" className="form-control" rows="5"></textarea>
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