import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import routes from './routes';
import Error404 from './views/Error404';

// import withTracker from "./withTracker";

import 'bootstrap/dist/css/bootstrap.min.css';
import './shards-dashboard/styles/shards-dashboards.1.3.1.min.css';
import './assets/custom.css';
import ScrollToTop from './components/layout/ScrollToTop';

class App extends React.Component {
	render() {
		return (
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
												<route.layout {...props}>
													<route.component {...props} />
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
		)
	}
}

export default App;