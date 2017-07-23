  import React,{Component} from "react";
  import PropTypes from 'prop-types';
  import SetOfExercise from './SetOfExercise.js';
  import {Grid,Row,Button,Col} from 'react-bootstrap';
  class TrainSet extends Component{
    constructor(props){
      super(props);
      this.state = {
        numberOfSetsInExercise: 1
      }
      this.handleAddASet = this.handleAddASet.bind(this);
    }
    handleAddASet(){
      this.setState({
        numberOfSetsInExercise: this.state.numberOfSetsInExercise + 1
      })
    }
    render(){
      var setsInExercise = Array(this.state.numberOfSetsInExercise).fill();
      const {workOuts} = this.props;
      if(typeof(workOuts) === "object"){

      var optionWorkOuts = workOuts.map((workout)=>{
        return <option key={workout._id}>{workout.Title}</option>
      })
    }
      setsInExercise = setsInExercise.map((test,index)=>{
        return(

        <div key={index}>
          <SetOfExercise exNumber = {this.props.number} exSet={index} onInputChange = {this.props.onInputChange}/>
        </div>
      )
      })
      return(
        <Grid style={{marginTop:"10px"}}>
          <Row className="show-grid">
            <label style={{marginRight:"10px"}}>Exercise {this.props.number + 1} </label>
            <select id= {"title"+this.props.number} name={"title"+this.props.number} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}>
              <option>Select Your Option </option>
              {optionWorkOuts}
            </select>
            <label style={{marginRight:"10px",marginLeft:"10px"}} ><b>Notes</b> </label>
            <input type="text" id={"notes"+this.props.number} name={"notes"+this.props.number} onChange={(e)=>{this.props.onInputChange(e.target.name,e.target.value)}}></input>
            <Button style={{marginLeft:"20px"}} bsStyle="primary" onClick={this.handleAddASet}>Add Set</Button>
          </Row>
          <Row className="show-grid">
            <Col md={1}><b>Goal:</b></Col>
            <Col md={1}><b>Set:</b></Col>
            <Col md={2}><b>Resistance:</b></Col>
            <Col md={1}><b>#Reps:</b></Col>
            <Col md={2}><b>Difficulty(1-10):</b></Col>
            <Col md={3}><b>Comments:</b></Col>
          </Row>

          {setsInExercise}
        </Grid>

      )
    }
  }
  TrainSet.propTypes = {
    number: PropTypes.number.isRequired,
    workOuts: PropTypes.array.isRequired,
    onInputChange: PropTypes.func.isRequired,
    sessionExercisesArray: PropTypes.array.isRequired
  }
  export default TrainSet;
