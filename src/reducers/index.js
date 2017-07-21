import APP from '../constants'
import { combineReducers } from 'redux'

function addTodoItems( state = [], action ) {
  switch( action.type ) {
    case APP.ADD_TODO_ITEMS:
      return Object.assign( {}, {
        data: action.data,
        lastUpdated : action.lastUpdated
      })
    default:
      return state
  }
}

const websiteReducer = combineReducers({
  addTodoItems
})

export default websiteReducer;
