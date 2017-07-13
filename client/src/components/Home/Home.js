  import React,{Component} from "react";
  import {Grid,Row} from 'react-bootstrap';
  import Body from './Body/Body.js';


  class Home extends Component{

    render(){
      return(
        <div>
          <Grid>

            <Row className="show-grid">

              <Body />

            </Row>
          </Grid>
        </div>
      )
    }
  }

  export default Home;
