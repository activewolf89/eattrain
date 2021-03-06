  import React,{Component} from "react";
  import PropTypes from 'prop-types';
  import {Row,Col,Button} from 'react-bootstrap';
  import TrainSetExercise from './TrainSetExercise.js';
  class TrainSet extends Component{


    render(){
      var workOutOptions = this.props.workOuts.map((singleWorkout)=>{

          return <option key={singleWorkout.Title}>{singleWorkout.Title}</option>

      })
      var trainSetRows = [];
      for(var i = 0; i < this.props.sessionExercises.sets.length;i++){
          trainSetRows.push(<Row className="show-grid" key={i}><TrainSetExercise inputModal = {this.props.inputModal} onMinusClick = {this.props.onMinusClick} exerciseNumber = {this.props.sessionExercises.key} onChangeInput = {this.props.onChangeInput} sessionExercisesSet={this.props.sessionExercises.sets[i]}/> </Row>);

      }
// one of: "success", "warning", "danger", "info", "default", "primary", "link"
      return(
        <div>

          <Row className="show-grid">
            <label style={{"marginRight":"20px"}}>{"Exercise #"+this.props.sessionExercises.key}</label>
            <select value = {this.props.sessionExercises.title} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}} name={this.props.sessionExercises.key+"title"} >
              <option disabled name="select">--select--</option>
              {workOutOptions}
            </select>
            <label style={{"marginRight":"20px","marginLeft":"20px"}}>Notes: </label>
            <input type="text" name={this.props.sessionExercises.key+"notes"} value={this.props.sessionExercises.notes} onChange = {(e)=>{this.props.onChangeInput(e.target.name,e.target.value)}}></input>
            <Button bsStyle="primary" style={{marginLeft:"20px"}} onClick={()=>{this.props.onPlusClick(this.props.sessionExercises.key)}}>Add Set</Button>
            <Button bsStyle="danger" style={{marginLeft:"20px"}} onClick={()=>{this.props.onRemoveExercise(this.props.sessionExercises.key)}}>Remove Exercise</Button>
          </Row>
          <Row className="show-grid">
            <Col md={1}><h5>Goal:</h5></Col>
            <Col md={1}><h5>Set:</h5></Col>
            <Col md={1}><h5>Resistance:</h5></Col>
            <Col md={1}><h5>#Reps:</h5></Col>
            <Col md={1}><h5>Difficulty:</h5></Col>
            <Col md={1}><h5>Comments:</h5></Col>
            <Col mdOffset={1} md={1}><h5>Actions:</h5></Col>

          </Row>
          {trainSetRows}


          <hr></hr>
        </div>

      )
    }
  }
  TrainSet.propTypes = {
    inputModal: PropTypes.func,
    onRemoveExercise: PropTypes.func.isRequired,
    sessionExercises: PropTypes.object.isRequired,
    onChangeInput: PropTypes.func.isRequired,
    workOuts: PropTypes.array.isRequired,
    onMinusClick: PropTypes.func
  }
  export default TrainSet;
