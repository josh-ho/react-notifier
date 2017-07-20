import React, { Component } from 'react';
import asyncLoading from 'react-async-loader';

const TORONTO_POSITION = {
  lat: 43.6532,
  lng: -79.3832
}

class GoogleMap extends Component {
  constructor( props ){
    super( props );

    this.state = {
      map: null,
      currentLat : TORONTO_POSITION.lat,
      currentLng : TORONTO_POSITION.lng
    };
  }

  initialize( canvas ) {
    if (this.props.gmap && this.state.map == null) {
      const gmap = this.props.gmap;

      this.state.map = new gmap.Map( canvas, {
        center: new gmap.LatLng(TORONTO_POSITION.lat, TORONTO_POSITION.lng),
        zoom: 16
      });

      gmap.event.addListener( this.state.map, 'click', (evt) => {
        this.addMarker( evt.latLng, this.state.map );
      })
    }
  }

  addMarker( location, map ) {
    const gmap = this.props.gmap;
    if( this.state.marker ) {
      this.state.marker.setPosition( location );
    } else {
      this.setState({
        marker: new gmap.Marker({
          position: location,
          map: map
        })
      });
    }

    var geocoder = new gmap.Geocoder;
    geocoder.geocode({
      location: location
    }, (results, status) => {
      if( status === 'OK' ){
        if( results[0] ){
          this.props.makerSelectHandler( results[0] );
        }
      }
    })
  }

  componentDidMount () {
    this.initialize(document.getElementById(this.props.container));
  }

  componentDidUpdate () {
    this.initialize(document.getElementById(this.props.container));
  }

  render () {
    return (
      <div id={this.props.container} className="mapCanvas" style={{ position: 'absolute', width: '100%', height: 'calc( 100% - 56px)' }}></div>
    );
  }

}

function mapScriptsToProps (ownProps) {
  return {
    gmap: {
      globalPath: 'google.maps',
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDITCsGciE8bzPBGAuYIIIZh0_6JtyuipI',
      jsonp: true
    }
  };
}

export default asyncLoading(mapScriptsToProps)(GoogleMap);
