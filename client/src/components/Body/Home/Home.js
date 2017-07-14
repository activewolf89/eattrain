  import React,{Component} from "react";
  import {Grid,Row,Col} from 'react-bootstrap';
  import {Link} from 'react-router-dom';
  import {Button} from 'react-bootstrap';


  class Home extends Component{

    render(){
      return(
        <div style={{backgroundColor:'salmon', color:'white', height:"100%"}}>
          <Grid>
            <Row className="show-grid" style={{marginTop:"40px"}}>

              <Col sm={9} md={3} mdOffset={2}> <Link to="/train"><Button style={{color: "white", fontSize: "200%",backgroundColor:'lightGreen',width:"200px",height:"150px"}}>Train</Button></Link></Col>
              <Col sm={9} md={3} mdOffset={1}> <Link to="/eat"><Button style={{color: "white", fontSize: "200%",backgroundColor:'darkOrange', width:"200px",height:"150px"}}>Eat</Button></Link></Col>
            </Row>
          </Grid>
        </div>
      )
    }
  }

  export default Home;
