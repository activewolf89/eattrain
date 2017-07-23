  import React,{Component} from "react";
  import {Grid,Row,Col,Button} from 'react-bootstrap';
  import {Link} from 'react-router-dom';

  class Train extends Component{

    render(){
      return(
          <Grid style={{border:"1px solid black", minHeight: "600px", width:"100%"}}>

            <Row className="show-grid" style={{height: "50%"}}>
              <Col sm={9} md={6} style={{height:"300px"}}><Link to="/train/hangboard"><Button style={{background: "green", width:"100%",height:"100%"}}>Hangboard</Button></Link></Col>
              <Col sm={9} md={6} style={{height:"300px"}}><Link to="/train/bike"><Button style={{background: "yellow", width:"100%",height:"100%"}}>Bike Ride</Button></Link></Col>
            </Row>

          </Grid>

          )
          }
          }

          export default Train;
