import React, { Component } from 'react';
import asyncLoading from 'react-async-loader';

class GoogleMap extends Component {
  constructor( props ){
    super( props );

    this.state = {
      map: null,
      markers : []
    };
  }

  initialize( canvas ) {
    if( this.props.gmap && this.state.map === null && this.props.lat && this.props.lng ) {
      const gmap = this.props.gmap;
      let mapObj = new gmap.Map( canvas, {
        center: new gmap.LatLng(this.props.lat, this.props.lng),
        zoom: 16
      });

      this.setState({
        map : mapObj
      })
    }
  }

  addMarker( location, map ) {
    const gmap = this.props.gmap;
    let marker = new gmap.Marker({
      position: location,
      map: map
    })

    this.state.markers.push( marker )
  }

  componentWillUpdate( nextProps ) {
    if( nextProps.type ) {
      var request = {
        location: this.state.map.getCenter(),
        radius: '500',
        query: nextProps.type
      };

      const gmap = this.props.gmap;
      let service = new gmap.places.PlacesService( this.state.map );
      service.textSearch(request, (results, status) => {
        if( status === 'OK' ){
          var i;
          for( i = 0; i < results.length; i++ ){
            this.addMarker( new gmap.LatLng( results[i].geometry.location.lat(), results[i].geometry.location.lng() ), this.state.map );
          }
        }
      });
    }
  }

  componentDidUpdate( prevProps, prevState ) {
    if( this.state.map === null ) {
      this.initialize( this.containerElem );
    }

    if( this.props.showDefaultCursor && this.state.map ) {
      const gmap = this.props.gmap;
      gmap.event.addListener( this.state.map, 'tilesloaded', (evt) => {
        this.addMarker( new gmap.LatLng(this.props.lat, this.props.lng), this.state.map );
      })
    }
  }

  render() {
    return (
      <div
        id={this.props.container}
        className="mapCanvas"
        style={{ position: 'absolute', width: '100%', height: '100%' }}
        ref={ (instance) => { this.containerElem = instance } }
      ></div>
    );
  }

}

function mapScriptsToProps (ownProps) {
  return {
    gmap: {
      globalPath: 'google.maps',
      url: 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDITCsGciE8bzPBGAuYIIIZh0_6JtyuipI&sensor=true&libraries=places',
      jsonp: true
    }
  };
}

export default asyncLoading(mapScriptsToProps)(GoogleMap);
