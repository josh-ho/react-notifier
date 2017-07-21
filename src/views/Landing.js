import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMap from '../components/map/'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import { addItem } from '../actions/'

class Landing extends Component {
  constructor( props ) {
    super( props )

    this.state = {
      lat : 43.6525,
      lng : -79.381667,
      markerData : null
    }

    let options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    navigator.geolocation.getCurrentPosition( this.successHandler.bind(this), this.errorHandler, options );
  }

  successHandler( pos ) {
    this.setState({
      lat : pos.coords.latitude,
      lng : pos.coords.longitude
    })
    console.log( pos.coords )
  }

  errorHandler( err ) {
    console.log( "error loading geolocation", err );
  }

  markerselect( data ) {
    this.setState({
      markerData : data
    })
  }

  clickHandler() {
    this.setState({
      markerData : null
    })
  }

  render(){
    let dataType = null;
    let style = {
      height: '100%'
    }

    let cardStyle = {
      height: '50%',
      display: 'none'
    }

    let cardTitle = "";
    let cardData = "";

    if( this.props.data ) {
      dataType = this.props.data.todo;
    }

    if( this.state.markerData ) {
      style = {
        height: '50%'
      }
      cardStyle.display = 'block'
      cardTitle = this.state.markerData.todo;
      cardData = this.state.markerData.todoAction
    }

    return(
      <section className="mid-content">
        <section className="map-container" style={style}>
          <GoogleMap container="mapContainer" lat={this.state.lat} lng={this.state.lng} showDefaultCursor={true} type={dataType} data={this.props.data} markerCallback={this.markerselect.bind(this)} />
        </section>
        <section style={cardStyle}>
          <Card>
            <CardTitle
              title={cardTitle}
            />
          <CardText>
            {cardData}
          </CardText>
          <CardActions>
            <FlatButton label="Got it" onClick={this.clickHandler.bind(this)}/>
          </CardActions>
          </Card>
        </section>
      </section>
    )
  }
}

export default connect(
  ( state ) => ({ data : state.reducers.addTodoItems.data }),
  { addItem }
)(Landing);
