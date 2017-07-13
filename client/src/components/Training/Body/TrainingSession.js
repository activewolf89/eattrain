  import React,{Component} from "react";
  import PropTypes from 'prop-types';
  import {Col,Grid,Row,Button} from 'react-bootstrap';
  import api from './../../../api.js';
  import {Link} from 'react-router-dom';
  class TrainingSession extends Component{
    constructor(props){
      super(props);
      this.state = {
        status: "",
        date: ""
      }
      this.convertDate = this.convertDate.bind(this);
    }
    componentDidMount(){
      const {date} = this.props;
      api.getDate(date)
      var newDate = new Date(date)
      this.setState({date: newDate.toDateString()})
      var today = new Date();
      if(today > newDate){
        this.setState({status: "Past"})
      }
      if(today.toDateString() === newDate.toDateString()){
        this.setState({status: "Present"})
      }
      if(today < newDate){
        this.setState({status: "Future"})
      }

    }
    convertDate(d){
      var parts = d.split(" ");
      var day = parts[0];

      return day +" "+ parts[1]+"-"+parts[2]+ "-"+ parts[3]
    }

    render(){
      return(
        <Grid style={{border: "1px solid black"}}>
          <Row className = "show-grid">
            <Col md={6}> <h1>You Selected {this.state.date}</h1> </Col>

          </Row>
          <Row className = "show-grid">
            <Col md={12}> <h4> DateType: {this.state.status}</h4> </Col>
          </Row>
          <Row className = "show-grid">
            <Col md={12}> <h4> Status: [No Past Session, Recorded Past Session, Add Session]</h4> </Col>
          </Row>
          <Row className = "show-grid">
            <Col md={6}> <Link to="/training/session/present"><Button bsStyle="primary">Start Session/See Past Session</Button></Link> </Col>
            <Col md={6}> <Button onClick = {this.props.onBackClick} bsStyle="warning" >Back To Calendar</Button> </Col>
          </Row>
        </Grid>
      )
    }
  }
  TrainingSession.propTypes = {
    date: PropTypes.string.isRequired,
    onBackClick: PropTypes.func.isRequired
  }
  export default TrainingSession;
