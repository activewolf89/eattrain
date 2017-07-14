  import React,{Component} from "react";
  import {Grid,Row,Col,Button} from 'react-bootstrap';
  import {Link} from 'react-router-dom';
  class CRUDExercise extends Component{
    render(){
      return(
        <Grid style={{border:"1px solid black", height: "100%", width:"100%"}}>

          <Row className="show-grid" style={{height: "50%"}}>
            <Col sm={9} md={6} style={{height:"100%"}}><Link to="/exercise/add"><Button style={{background: "black",color:'white', width:"100%",height:"100%"}}>Add Exercise</Button></Link></Col>
            <Col sm={9} md={6} style={{height:"100%"}}><Link to="/exercise/update"><Button style={{background: "green",color:'white', width:"100%",height:"100%"}}>Update Exercise</Button></Link></Col>
          </Row>
          <Row className="show-grid" style={{height: "50%", border: "1px solid black"}}>
            <Col sm={9} md={6} style={{height:"100%"}}><Link to="/exercise/show"><Button style={{background: "pink", width:"100%",height:"100%"}}>Show All Exercises</Button></Link></Col>
            <Col sm={9} md={6} style={{height:"100%"}}><Link to="/exercise/remove"><Button style={{background: "red", color:'white', width:"100%",height:"100%"}}>Destroy Exercise</Button></Link></Col>

          </Row>
        </Grid>
      )
    }
  }

  export default CRUDExercise;
