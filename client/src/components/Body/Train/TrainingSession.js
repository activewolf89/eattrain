  import React,{Component} from "react";
  import axios from 'axios';
  import TrainSet from './TrainSet';
  import {Button} from 'react-bootstrap';

  class TrainingSession extends Component{
    constructor(props){
      super(props);
      this.state = {
        workOuts: [],
        numberOfExercises: 1,
        sessionExercises: []
      }
      this.handleAddingGroupSet = this.handleAddingGroupSet.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(controlName,value){
      console.log(this.state)
      var exerciseSessionCopy = this.state.sessionExercises.slice();
      var spotToResetInArray;
      var exerciseNumber = "";
      var  exerciseInput = "";
      var exerciseSet = "";
      var triggeredFirstLetter = false;;
      for(var i = 0; i < controlName.length;i++){
        if(isNaN(controlName[i]) === false && triggeredFirstLetter === false){
          exerciseSet += controlName[i]
        }
        if(isNaN(controlName[i]) === true){
          triggeredFirstLetter = true;

          exerciseInput += controlName[i]
        }
        if(triggeredFirstLetter === true && isNaN(controlName[i]) === false){
          exerciseNumber += controlName[i]
        }
      }
      var objectToChange = false;
      var keyToUpdate = false;
      for(var i = 0; i < exerciseSessionCopy.length;i++){
        if(exerciseSessionCopy[i].key == exerciseNumber){
          objectToChange = exerciseSessionCopy[i];
          keyToUpdate = i;
        }
      }

      if(!objectToChange){
        //if no object to change we add a new object
        objectToChange = {};
        objectToChange["key"] = exerciseNumber;
        objectToChange[exerciseInput] = value;
        objectToChange["sets"] = {}
        this.setState({
          sessionExercises: [...this.state.sessionExercises, objectToChange]
        })
      } else {
        //if there is an object to change, we check if there is a set input
        if(exerciseSet == ""){
          objectToChange[exerciseInput] = value;
        } else {
          //if there is an object and its a set input to change, check if theres a set already
          var objectSetToChange = false;
          var objectSetKeyToChange = false
          for(var objectSetKey in objectToChange.sets){
            if(objectSetKey == exerciseSet){
              objectSetToChange = objectToChange.sets[objectSetKey];
              objectSetKeyToChange = objectSetKey
            }
          }
          //add to the object to change if no object to change
          if(!objectSetToChange){
            var objectToSetWithinSet = {};
            objectToSetWithinSet[exerciseInput] = value;
            var addObject = {};
            addObject[exerciseInput] = value;
            objectToChange.sets[exerciseSet] = addObject;
          } else {
            //found an object with the matching set, now set value within
            objectSetToChange[exerciseInput] = value;
            objectToChange["sets"][objectSetKeyToChange] = objectSetToChange
          }
        }
          exerciseSessionCopy.splice(keyToUpdate,1,objectToChange);
          this.setState({
            sessionExercises: exerciseSessionCopy
          })
      }
    }
    handleSubmit(e){
      e.preventDefault();

    }
    handleAddingGroupSet(){

      this.setState({
        numberOfExercises: this.state.numberOfExercises + 1,


      })

    }
    componentDidMount(){
      axios.get("/train/show/").then((res)=>{
        this.setState({workOuts: res.data})
      })
    }

    render(){
      var numberOfExercises = Array(this.state.numberOfExercises).fill()
       numberOfExercises = numberOfExercises.map((test,index)=>{
        return <div key={index}>
          <TrainSet sessionExercisesArray = {this.state.sessionExercises} workOuts = {this.state.workOuts} number={index}  onInputChange={this.handleInputChange} onDelete = {this.handleDelete}/>
        </div>
    })

      return(
        <form onSubmit={this.handleSubmit}>
          {numberOfExercises}

          <Button style={{marginRight:"400px"}} onClick={this.handleAddingGroupSet}>Add Exercise</Button>
          <Button type="submit">Submit </Button>
        </form>
      )
    }
  }

  export default TrainingSession;
