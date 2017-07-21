import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import injectTapEventPlugin from 'react-tap-event-plugin';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

//load reducer
import reducers from './reducers'

import Shell from './views/Shell.js'
import Landing from './views/Landing.js'
import Offline from './views/Offline.js'

injectTapEventPlugin();

const reducer = combineReducers({
  reducers
})

const store = createStore(
  reducer,
  applyMiddleware(thunk)
)

ReactDOM.render(
  <MuiThemeProvider>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={Shell}>
          <IndexRoute component={Landing} />
        </Route>
        <Route path="/offline" component={Offline} />
      </Router>
    </Provider>
  </MuiThemeProvider>
  , document.getElementById('root')
);
registerServiceWorker();
