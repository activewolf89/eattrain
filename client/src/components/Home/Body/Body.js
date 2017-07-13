import React,{Component} from "react";
import {Grid,Row,Col,Button} from 'react-bootstrap';
import {LinkContainer } from 'react-router-bootstrap';
  class Body extends Component{
    render(){
      return(
          <Grid>
            <Row className="show-grid">
              <Col md={6}><LinkContainer to="/training"><Button bsStyle="warning" block bsSize="large">Training</Button></LinkContainer></Col>
              <Col md={6}></Col>
            </Row>
          </Grid>
      )
    }
  }

  export default Body;
