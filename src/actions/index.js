import APP from '../constants.js';

export function fetchWebsiteData() {
  return {
    type: APP.FETCHING_DATA,
    lastUpdated: Date.now()
  }
}

export function loadedWebsiteData( data ) {
  return {
    type: App.LOADED_DATA,
    data,
    lastUpdated : Date.now()
  }
}

export function getWebsiteData() {
  return function( dispatch ) {
    dispatch( fetchWebsiteData() )
    return fetch( "" ).then( ( response ) => {
      if( response.ok ) {
        return reponse.json()
      }
    }).then( ( data ) => {
      dispatch( loadedWebsiteData( data ) );
    }).catch( ( err ) => {
      console.log( "ERROR LOADING DATA", err );
    });
  }
}
