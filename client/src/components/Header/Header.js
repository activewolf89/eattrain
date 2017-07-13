  import React,{Component} from "react";
  import {Grid,Col,Row} from 'react-bootstrap';
  import home from './../../images/home_large_icon.jpg';
  import {Link}  from 'react-router-dom'
  class Header extends Component{
    constructor(props){
      super(props);
      this.state = {
        key: 1,
        day: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
      };
      this.tick = this.tick.bind(this);
      this.handleSelect = this.handleSelect.bind(this);
    }

    componentDidMount(){
      var intervalId = setInterval(this.tick,1000)
      this.setState({intervalId: intervalId});
    }
    componentWillUnmount(){
      clearInterval(this.state.intervalId);
    }
     tick(){
      this.setState(()=>{this.setState({time: new Date().toLocaleTimeString()})})
    }
    handleSelect(Key){
      console.log('selected' + Key)
      this.setState({key: Key})
    }
    render(){
      return(
        <Grid>
          <Row className="show-grid">
            <Col md={1}><Link to="/"><img src={home} alt="Cannot find" width="50px" height="50px"/></Link></Col>
            <Col md={8}><h4> Welcome Home Reed, today is {this.state.day}  Current Time: {this.state.time}</h4></Col>

          </Row>
          <hr></hr>
          </Grid>

          )
          }
          }

          export default Header;
