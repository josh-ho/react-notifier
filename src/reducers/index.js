import APP from '../constants'
import { combineReducers } from 'redux'

function loadWebsiteData( state = [], action ) {
  switch( action.type ) {
    case APP.LOADED_DATA :
      return Object.assign( {}, {
        data : action.data,
        lastUpdated : action.lastUpdated
      });
    default :
      return state
  }
}

const websiteReducer = combineReducers({
  loadWebsiteData
})

export default websiteReducer;
