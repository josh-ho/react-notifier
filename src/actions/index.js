import APP from '../constants.js';

export function addItem( data ) {
  return {
    type: APP.ADD_TODO_ITEMS,
    data,
    lastUpdated : Date.now()
  }
}
