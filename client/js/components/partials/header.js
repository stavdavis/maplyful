import React from 'react';
import { Nav, Navbar, NavItem, NavDropdown, MenuItem, Modal, OverlayTrigger, Popover, Tooltip, Button } from 'react-bootstrap';
import * as actionCreators from '../../actions/sync.js';
import { connect } from 'react-redux';


class Header extends React.Component  {
  constructor (props) {
    super(props); 
  }

  openSignUp () {
    this.props.dispatch(actionCreators.signUpModal());
  }

  openSignIn () {
    this.props.dispatch(actionCreators.signInModal());
  }

  render () {

    const { currentUser } = this.props; 
    let rightNavLinks; 
    if (currentUser) {
      rightNavLinks = (
      <Nav pullRight>
        <NavItem className="right-link" eventKey={1} href="#">My Account</NavItem>
        <NavItem className="right-link" eventKey={2} href="#">Log Out</NavItem>
      </Nav>
      )
    } else {
      rightNavLinks = (
      <Nav pullRight>
        <NavItem className="right-link" eventKey={1} href="#" onClick={this.openSignUp.bind(this)}>Sign Up</NavItem>
        <NavItem className="right-link" eventKey={2} href="#" onClick={this.openSignIn.bind(this)}>Sign In</NavItem>
      </Nav>
      )
    }

    return (
      <Navbar className="nav" inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a className="app-name" href="#">Localize</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {rightNavLinks}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.currentUser
})
export default connect(mapStateToProps)(Header);

