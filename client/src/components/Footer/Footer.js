  import React,{Component} from "react";
  import {Nav,Navbar,NavItem} from "react-bootstrap";
  import {LinkContainer} from 'react-router-bootstrap';
  class Footer extends Component{
    render(){
      return(
        <Navbar>
          <Nav>

            <LinkContainer to="/about">
              <NavItem eventKey={1}>About</NavItem>
            </LinkContainer>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/technology">
              <NavItem eventKey={2}>Technology</NavItem>
            </LinkContainer>

          </Nav>
        </Navbar>
      )
    }
  }

  export default Footer;
