import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';
import Error404 from './views/Error404';

// import withTracker from "./withTracker";

import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboard/styles/shards-dashboards.1.3.1.min.css';
import './assets/custom.css';
import ScrollToTop from './components/layout/ScrollToTop';
import { ToastProvider } from 'react-toast-notifications';
import { fetchSetting } from './store/actions/settingActions';
import {connect} from 'react-redux';

class App extends React.Component {

	componentDidMount = () => {
		this.props.fetchSetting();
	};

	render() {		
		const setting = this.props.setting;
		return (
			<ToastProvider styles={{ container: (provided) => ({ ...provided, zIndex: 1039 }) }}>
				<Router basename={process.env.REACT_APP_BASENAME || ''}>
					<ScrollToTop>
						<Switch>
								{routes.map((route, index) => {
									return (
										<Route
											key={index}
											path={route.path}
											exact={route.exact}
											component={(props) => {
												return (
													<route.layout {...props} setting={setting}>
														<route.component {...props} setting={setting} />
													</route.layout>
												);
											}}
										/>
									);
								})}
								<Route component={Error404} />
						</Switch>
					</ScrollToTop>
				</Router>
			</ToastProvider>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		setting: state.setting.setting.data
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		fetchSetting: () => dispatch(fetchSetting())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;