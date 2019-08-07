import React from 'react';
import { Container, Row, Col, Card, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName, url } from '../global';
import { Helmet } from 'react-helmet';
import { Link, Redirect } from 'react-router-dom';
import { withToastManager } from 'react-toast-notifications';
import {connect} from 'react-redux';
import Loading from 'react-loading-bar';
import Error500 from './Error500';
import Axios from 'axios';
import AsyncSelect from 'react-select/async';
import { customerStyles } from '../utils/selectStyle';
import { updateCategory, getCategory } from '../store/actions/categoryAction';


class EditCategory extends React.Component {

    state = {
        id: '',
        name: '',
        parent_id: '',
        parent_name: '',
        description: ''
    };
    
    handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	}

	handleSubmit = (e) => {
		e.preventDefault();
        this.props.updateCategory(this.props.match.params.id, this.state);
    }

    handleChangeParent = (value) => {
        this.setState({
			...this.state,
            parent_id: value ? value.value : null,
            parent_name: value ? value.label : null
		});
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.saved !== this.props.saved) {

            const { toastManager } = this.props;
            toastManager.add(this.props.message, {
                appearance: 'success',
                autoDismiss: true
            });

            this.props.history.push('/category');
        }

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
    }

    componentWillUpdate = (nextProps) => {
        if (nextProps !== this.props) {
            if (nextProps.data) {
                this.setState({
                    ...this.state,
                    id: nextProps.data._id ? nextProps.data._id : '',
                    name: nextProps.data.name ? nextProps.data.name : '',
                    parent_id: nextProps.data.parent_id ? nextProps.data.parent_id : null,
                    parent_name: nextProps.data.parent && nextProps.data.parent.name ? nextProps.data.parent.name : null,
                    description: nextProps.data.description ? nextProps.data.description : '',
                })
            }
        }
    }

    componentDidMount = () => {
        this.props.getCategory(this.props.match.params.id);
    }
    
	render() {      
        const { fetching, error } = this.props;

        const filterParent = (parents) => {
            const options = parents.map(parent => {
                return { label: parent.name, value: parent._id }
            })
         
            return options;
         };
           
         const promiseOptions = (inputValue, callback) => {
        
             Axios.get(`${url}/category/parent`, {
                 params: {
                     name: inputValue,
                     id: this.state.id
                 }, 
                 headers: {
                     Authorization: `Bearer ${sessionStorage.getItem('token')}`
                 }
             }).then(response => {
                 callback(filterParent(response.data.data));
             });
         }

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
					<title>Edit Category | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
                <div className="col-md-8">
					    <PageTitle sm="4" title="Edit Category" className="text-sm-left" />
                    </div>
                    <div className="col-md-4 text-right">
                         <Link className="btn btn-secondary" to="/Category">Back</Link>
                    </div>
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							    <CardBody className="p-0 pb-3">
                                    <div className="col-md-12 mt-3">
                                        <form onSubmit={this.handleSubmit}>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Name <span className="text-danger">*</span></label>
                                                        <input value={this.state.name} type="text" id="name" className={`form-control ${ error && error.data.errors.name && 'is-invalid' }`} onChange={this.handleChange} placeholder="Category Name" />
                                                        { 
                                                            error && error.data.errors.name && <div class="invalid-feedback">{ error.data.errors.name[0] }</div>
                                                        }
                                                    </div>

                                                    <div className="form-group">
                                                        <label className="control-label">Parent <span className="text-danger">*</span></label>
                                                        <AsyncSelect value={ this.state.parent_id && {  label: this.state.parent_name, value: this.state.parent_id }} isClearable={true} className={error && error.data.errors.parent_id && 'is-invalid'} styles={customerStyles} loadOptions={ promiseOptions } id="parent_id" placeholder="Type to search" onChange={this.handleChangeParent} />
                                                    </div>

                                                </div>


                                                <div className="col-md-6">

                                                    <div className="form-group">
                                                        <label className="control-label">Description</label>
                                                        <textarea value={this.state.description} id="description" rows="5" className="form-control" onChange={this.handleChange} placeholder="Description"></textarea>
                                                    </div>

                                                </div>
                                                <div className="col-md-12 text-right">
                                                    <hr/>
                                                    <button className="btn btn-secondary" type="submit" onClick={this.handleClickToast}>Save Changes</button>
                                                    <button className="btn btn-default" type="reset">Reset</button>
                                                </div>
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
        saved: state.category.saved,
        fetching: state.category.fetching,
        message: state.category.message,
        data: state.category.category.data,
        error: state.category.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateCategory: (id, data) => dispatch(updateCategory(id, data)),
        getCategory: (id) => dispatch(getCategory(id)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(EditCategory));
