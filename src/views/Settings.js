import React from 'react';
import { Container, Row, Col, Card, CardHeader, CardBody } from 'shards-react';
import PageTitle from '../components/common/PageTitle';
import '../assets/range-date-picker.css';
import { appName } from '../global';
import { Helmet } from 'react-helmet';
import { updateSetting, fetchSetting } from '../store/actions/settingActions';
import {Redirect} from 'react-router-dom';
import Error500 from './Error500';
import Loading from 'react-loading-bar';
import {connect} from 'react-redux';
import { withToastManager } from 'react-toast-notifications/dist/ToastProvider';

class Settings extends React.Component {
	state = {
		site_name: '',
        logo: 'Choose file...',
        file: '',
		currency: '',
		thousand_separator: '',
		decimal_separator: ''
	};

	handleChange = (e) => {
		this.setState({
			...this.state,
			[e.target.id]: e.target.value
		});
	};

	handleSubmit = (e) => {
		e.preventDefault();
		this.props.updateSetting(this.state);
    };
    
    handleChangeUpload = (e) => {
		const value = e.target.value;
		const filename = value.split('\\');
		this.setState({
			...this.state,
			logo: filename[filename.length - 1],
		});

		const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            this.setState({
				...this.state,
				file: e.target.result
			})
		}
    };

	componentDidUpdate = (prevProps, prevState) => {
		
		if (prevProps.saved !== this.props.saved) {
			const { toastManager } = this.props;
			toastManager.add(this.props.message, {
				appearance: 'success',
				autoDismiss: true
			});

			this.props.fetchSetting();
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
	};

	componentDidMount = () => {
		const { setting } = this.props;
		
		this.setState({
			site_name: setting && setting.site_name ? setting.site_name : '',
			logo: setting && setting.logo ? setting.logo : '',
			currency: setting && setting.currency ? setting.currency : '',
			thousand_separator: setting && setting.thousand_separator ? setting.thousand_separator : '',
			decimal_separator: setting && setting.decimal_separator ? setting.decimal_separator : ''
		});
	}

	render() {		
		const { fetching, error } = this.props;
		if (!sessionStorage.getItem('token')) return <Redirect to="/login" />;
		if (error && error.status === 500) return <Error500 message={error.data.message} />;

		return (
			<Container fluid className="main-content-container px-4">
				<Loading show={fetching} color="blue" showSpinner={false} />

				<Helmet>
					<title>Settings | {appName} </title>
				</Helmet>
				<Row noGutters className="page-header py-4">
					<PageTitle sm="4" title="Settings" subtitle="Settings" className="text-sm-left" />
				</Row>
				<Row>
					<Col>
						<Card small className="mb-4">
							<CardHeader className="border-bottom">
								<h6 className="m-0">Settings</h6>
							</CardHeader>
							<CardBody className="mt-3">
                                <form onSubmit={this.handleSubmit} >
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Site Name <span className="text-danger">*</span></label>
                                                <input onChange={this.handleChange} value={this.state.site_name} type="text" id="site_name" className={`form-control ${ error && error.data.errors.site_name && 'is-invalid' }`} onChange={this.handleChange} placeholder="Site Name" />
                                                { 
                                                    error && error.data.errors.site_name && <div class="invalid-feedback">{ error.data.errors.site_name[0] }</div>
                                                }
                                            </div>
                                            <div className="form-group">
                                                <label className="control-label">Logo</label>
                                                <div className="custom-file mb-3">
                                                    <input
                                                        id="logo"
                                                        type="file"
                                                        className="custom-file-input"
                                                        onChange={this.handleChangeUpload}
                                                    />
                                                    <label
                                                        className="custom-file-label"
                                                        htmlFor="customFile2"
                                                        id="placeholderCustomFile2"
                                                    >
                                                        {this.state.logo}
                                                    </label> 
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="form-group">
                                                <label className="control-label">Currency</label>
                                                <input id="currency" onChange={this.handleChange} type="text" className="form-control" value={this.state.currency} />
                                            </div>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Thousand Separator</label>
                                                        <input id="thousand_separator" onChange={this.handleChange} type="text" className="form-control" value={ this.state.thousand_separator } />
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-group">
                                                        <label className="control-label">Decimal Separator</label>
                                                        <input id="decimal_separator" onChange={this.handleChange} type="text" className="form-control" value={ this.state.decimal_separator } />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-12 my-3 text-right">
                                            <hr />
                                            <button className="btn btn-secondary" type="submit">Save Changes</button>
                                        </div>
                                    </div>
                                </form>
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
		saved: state.setting.saved,
		fetching: state.setting.fetching,
		message: state.setting.message,
		setting: state.setting.setting.data,
		error: state.setting.error
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSetting: () => dispatch(fetchSetting()),
		updateSetting: (data) => dispatch(updateSetting(data)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(withToastManager(Settings));
