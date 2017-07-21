import React, { Component } from 'react'
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu.js'
import Dialog from 'material-ui/Dialog';
import DropDownMenu from 'material-ui/DropDownMenu';
import TextField from 'material-ui/TextField';

import { connect } from 'react-redux'
import { addItem } from '../actions/'

import './scss/index.scss'

class Shell extends Component {
  constructor( props ) {
    super( props );

    this.dropdownValues = [
      {
        name: "groceries"
      },
      {
        name: "restaurants"
      },
      {
        name: "drinks"
      }
    ];

    this.state = {
      open : false,
      modelOpen : false,
      todo: "",
      todoAction: ""
    }
  }

  handleToggle() {
    this.setState({
      open : !this.state.open
    })
  }

  handleModalClose() {
    this.props.addItem({
      todo: this.state.todo,
      todoAction: this.state.todoAction
    })
    this.setState({
      modelOpen : false
    })
  }

  handleDropdownChange( evt, index, value ) {
    this.setState({
      todo: value
    })
  }

  handleTextChange( evt ) {
    this.setState({
      todoAction : evt.target.value
    })
  }

  openDialog() {
    this.setState({
      modelOpen : true
    })
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleModalClose.bind(this)}
      />,
      <FlatButton
        label="Add Item"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleModalClose.bind(this)}
      />,
    ];

    return(
      <div>
        <AppBar title="" iconElementLeft={
            <IconButton onClick={this.handleToggle.bind(this)}>
              <MenuIcon />
            </IconButton>
        } />
        <Drawer
          docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
        >
          <MenuItem onClick={() => {
              this.openDialog()
              this.handleToggle()
          }}>Add Item</MenuItem>
        </Drawer>
        <main role="main">
          {this.props.children}
        </main>
        <Dialog
          title="Add new item"
          actions={actions}
          modal={false}
          open={this.state.modelOpen}
          onRequestClose={this.handleClose}
        >
          <h2>Select Category</h2>
          <DropDownMenu value={this.state.todo} onChange={this.handleDropdownChange.bind(this)}>
            {
              this.dropdownValues.map( ( toDo ) => {
                return <MenuItem key={toDo.name} value={toDo.name} primaryText={toDo.name} />
              })
            }
          </DropDownMenu>
          <div>
            <TextField
              hintText="List things to do here"
              floatingLabelText="To do list:"
              multiLine={true}
              rows={4}
              onChange={this.handleTextChange.bind(this)}
            />
          </div>
        </Dialog>
      </div>
    )
  }
}

export default connect(
  ( state ) => ({}),
  { addItem }
)(Shell);
