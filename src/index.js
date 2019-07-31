import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './store/reducers/rootReducer';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom'

const store = createStore(
    rootReducer,
    applyMiddleware(thunk, promise)
);

ReactDOM.render(
    <MemoryRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </MemoryRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
