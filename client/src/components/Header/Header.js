  import React,{Component} from "react";
  import {Nav,Navbar,NavItem,Button} from "react-bootstrap";
  import {LinkContainer, IndexLinkContainer} from 'react-router-bootstrap';

  class Header extends Component{
    render(){
      return(
        <Navbar>
          <Nav>
            <IndexLinkContainer to="/" activeClassName="active">
              <NavItem eventKey={1}>Home</NavItem>
            </IndexLinkContainer>
          </Nav>


          <Nav>
            <LinkContainer to="/exercise">
              <NavItem eventKey={2}>Exercises</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight style={{marginRight:"20px"}}>
            <LinkContainer to="/profile">
              <NavItem eventKey={3}>Profile</NavItem>
            </LinkContainer>
          </Nav>


        </Navbar>

          )
          }
          }

          export default Header;
