import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//load reducer
import reducers from './reducers'

import Shell from './views/Shell.js'
import Landing from './views/Landing.js'

const reducer = combineReducers({
  reducers
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Shell}>
        <IndexRoute component={Landing} />
      </Route>
    </Router>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
