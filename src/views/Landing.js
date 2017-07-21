import React, { Component } from 'react'
import { connect } from 'react-redux'
import GoogleMap from '../components/map/'
import { addItem } from '../actions/'

class Landing extends Component {
  render(){
    let dataType = null;
    let style = {
      height: '100%'
    }

    if( this.props.data ) {
      dataType = this.props.data.todo;
      style = {
        height: '50%'
      }
    }
    
    return(
      <section style={style}>
        <GoogleMap container="mapContainer" lat={43.6525} lng={-79.381667} showDefaultCursor={true} type={dataType} />
      </section>
    )
  }
}

export default connect(
  ( state ) => ({ data : state.reducers.addTodoItems.data }),
  { addItem }
)(Landing);
