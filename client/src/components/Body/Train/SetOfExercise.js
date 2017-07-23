  import React,{Component} from "react";
  import {Grid,Col,Row,Button} from 'react-bootstrap';
  import PropTypes from 'prop-types';

  class SetOfExercise extends Component{

    render(){

      return(

          <Row className="show-grid">
            <Col md={1}><input type="number" name= {this.props.exSet+"Goal"+this.props.exNumber} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}/></Col>
            <Col md={1}><input type="number" name= {this.props.exSet+"Set"+this.props.exNumber} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}/></Col>
            <Col md={2}><input type="number" name= {this.props.exSet+"Resistance"+this.props.exNumber} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}/></Col>
            <Col md={1}><input type="number" name= {this.props.exSet+"Reps"+this.props.exNumber} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}/></Col>
            <Col md={2}><input type="number" name= {this.props.exSet+"Difficulty"+this.props.exNumber} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}/></Col>
            <Col md={3}><input type="number" name= {this.props.exSet+"Comments"+this.props.exNumber} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}/></Col>

          </Row>


      )
    }
  }

  SetOfExercise.propTypes = {
    exNumber: PropTypes.number.isRequired,
    exSet: PropTypes.number.isRequired,
    onInputChange: PropTypes.func.isRequired,
  }
  export default SetOfExercise;
