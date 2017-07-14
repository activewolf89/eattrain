  import React,{Component} from "react";
  import {Grid,Row,Col,Button,Navbar} from 'react-bootstrap';
  import {Link} from 'react-router-dom';

  class Train extends Component{
    componentWillReceiveProps() {
      alert('props')
}
componentDidMount(){
  alert('mounted')
}
    render(){
      return(
          <Grid style={{border:"1px solid black", height: "100%", width:"100%"}}>

            <Row className="show-grid" style={{height: "50%"}}>
              <Col sm={9} md={6} style={{height:"100%"}}><Link to="/train/hangboard"><Button style={{background: "green", width:"100%",height:"100%"}}>Hangboard</Button></Link></Col>
              <Col sm={9} md={6} style={{height:"100%"}}><Link to="/train/addexercise"><Button style={{background: "yellow", width:"100%",height:"100%"}}>Add Exercise</Button></Link></Col>
            </Row>
            <Row className="show-grid" style={{height: "50%", border: "1px solid black"}}>
              <Col sm={9} md={6} style={{height:"100%"}}><Link to="/train/userprogress"><Button style={{background: "orange", width:"100%",height:"100%"}}>See Progress</Button></Link></Col>
              <Col sm={9} md={6} style={{height:"100%"}}><Link to="/train/coming soon"><Button style={{background: "pink", width:"100%",height:"100%"}}>Coming Soon</Button></Link></Col>

            </Row>
          </Grid>

          )
          }
          }

          export default Train;
