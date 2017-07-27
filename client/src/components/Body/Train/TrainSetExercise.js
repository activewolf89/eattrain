  import React,{Component} from "react";
  import PropTypes from 'prop-types';
  import {Col,Button} from 'react-bootstrap';
  class TrainSetExercise extends Component{
    render(){
      return(
        <div>

          <Col md={1}><input type="number"  name={this.props.exerciseNumber + "goal" + this.props.sessionExercisesSet.key} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}} value={this.props.sessionExercisesSet.goal} /></Col>
          <Col md={1}><input  disabled value={this.props.sessionExercisesSet.key}/></Col>
          <Col md={1}><input  name={this.props.exerciseNumber + "res" + this.props.sessionExercisesSet.key} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}} type="number" value={this.props.sessionExercisesSet.res}/></Col>
          <Col md={1}><input  name={this.props.exerciseNumber + "reps" + this.props.sessionExercisesSet.key} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}} type="number" value={this.props.sessionExercisesSet.reps}/></Col>
          <Col md={1}><input  name={this.props.exerciseNumber + "diff" + this.props.sessionExercisesSet.key} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}} type="number" value={this.props.sessionExercisesSet.diff}/></Col>
          <Col md={1}><input name={this.props.exerciseNumber + "comments" + this.props.sessionExercisesSet.key} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}} type="text" value={this.props.sessionExercisesSet.comments}/></Col>
          <Col mdOffset={1} md={2}>
            
            <Button style={{marginRight:"20px"}} bsStyle="success" onClick={()=>{this.props.inputModal(this.props.exerciseNumber,this.props.sessionExercisesSet.key)}}>Start</Button>
            <Button onClick={()=>{this.props.onMinusClick(this.props.exerciseNumber, this.props.sessionExercisesSet.key)}}> - </Button>

          </Col>
        </div>
      )
    }
  }
  TrainSetExercise.propTypes = {
    inputModal: PropTypes.func,
    sessionExercisesSet: PropTypes.object.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    exerciseNumber: PropTypes.number.isRequired,
    lastOne: PropTypes.string,
    onMinusClick: PropTypes.func
  }
  export default TrainSetExercise;
