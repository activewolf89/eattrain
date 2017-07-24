  import React,{Component} from "react";
  import axios from 'axios';
  import {Button,Grid,Row,Col,Modal} from 'react-bootstrap';
  import TrainSet from './TrainSet.js';
  class TrainingSession extends Component{
    constructor(props){
      super(props);
      this.state = {
        modal: false,
        workOuts: [],
        sessionExercises: [{key:1, title:"--select--", sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""}],
        defaultSessionExercises: {key:1, title:"--select--", sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""},
        exerciseTemplate: "Overall Workout",
        weight: 0,
        reps: 0,
        criteria: false,
        sortFrom: "Most Recent Session"

      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChangeInput = this.handleChangeInput.bind(this);
      this.handleAddingGroupSet = this.handleAddingGroupSet.bind(this);
      this.handleAddingSetOfExercise = this.handleAddingSetOfExercise.bind(this);
      this.handleCriteriaSubmit = this.handleCriteriaSubmit.bind(this);
      this.handleCriteriaChange = this.handleCriteriaChange.bind(this);
      this.handleClearCriteria = this.handleClearCriteria.bind(this);
    }
    componentDidMount(){

      axios.get("/train/show/").then((res)=>{
        this.setState({workOuts: res.data})
      })
    }
    handleClearCriteria(){

      this.setState({
        sessionExercises: [this.state.defaultSessionExercises],
        criteria: false,
        weight: 0,
        reps: 0,
        defaultSessionExercises: {key:1, title:"--select--", sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""},

      })
    }
    handleCriteriaChange(name,value){
      if(value == "Fitness Test"){
        this.setState({
          [name]:value,
        })
      } else {
        this.setState({
          [name]:value,
        })

      }

    }
    handleCriteriaSubmit(e){
      e.preventDefault();
      axios({
        method: 'get',
        url: `/train/hangboardsession/get/${this.state.exerciseTemplate}/${this.state.sortFrom}`,
      }).then((res)=>{
        if(res.data){
          for(var i = 0; i < res.data.ArrayOfExercises.length;i++){

            for(var m = 0; m < res.data.ArrayOfExercises[i].sets.length;m++){
            res.data.ArrayOfExercises[i].sets[m].goal = Number(res.data.ArrayOfExercises[i].sets[m].res) + Number(this.state.weight);
            res.data.ArrayOfExercises[i].sets[m].reps = Number(res.data.ArrayOfExercises[i].sets[m].reps) + Number(this.state.reps);
            res.data.ArrayOfExercises[i].sets[m].res = "";
            }
          }
          this.setState({
            sessionExercises: res.data.ArrayOfExercises
          })
        } else {
          this.setState({
            criteria: false,
            modal: true
          })
          setTimeout(()=>{this.setState({modal:false})},2000)

        }
      })
      this.setState({
        criteria: true
      })
    }

    handleAddingSetOfExercise(exNum){
      var copyOfArrayExercise = this.state.sessionExercises.slice();
      var newSessionExercise = Object.assign({},this.state.defaultSessionExercises);
      var newKey;
      for(var i = 0; i < copyOfArrayExercise.length ;i++){
        if(copyOfArrayExercise[i].key == exNum){

          newKey = copyOfArrayExercise[i].sets.length + 1
          newSessionExercise.key = newKey;
          copyOfArrayExercise[i].sets.push(newSessionExercise);
        }
      }
      this.setState({
        sessionExercises: copyOfArrayExercise,
        defaultSessionExercises: {key:1, title:"--select--",sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""}
      })
    }
    handleAddingGroupSet(){
      var currentCount = 1;
      var newSesh = Object.assign({},this.state.defaultSessionExercises);

      var currentArrayOfSession = this.state.sessionExercises.slice()
      for(var i = 0; i < currentArrayOfSession.length;i++){
        currentCount++;
      }
      newSesh.key = currentCount;
      currentArrayOfSession.push(newSesh);
      this.setState({
        sessionExercises: currentArrayOfSession,
        defaultSessionExercises: {key:1, title:"--select--",sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""}
      })
    }
    handleChangeInput(name,value){

      var exerciseNumber = "";
      var exerciseInput = "";
      var exerciseSet = "";
      var triggeredStartOfTitle = false;
      var CopyOfSessionExercise = this.state.sessionExercises.slice();

      for(var i = 0; i < name.length;i++){
        if(isNaN(name[i]) == false && triggeredStartOfTitle==false){
          exerciseNumber += name[i];
        }
        if(isNaN(name[i]) == true){
          triggeredStartOfTitle = true;
          exerciseInput += name[i];
        }
        if(isNaN(name[i]) == false && triggeredStartOfTitle ==true){
          exerciseSet += name[i];
        }
      }
      for(var i = 0; i < CopyOfSessionExercise.length;i++){
        if(CopyOfSessionExercise[i].key == exerciseNumber){
          if(exerciseSet ==""){
            CopyOfSessionExercise[i][exerciseInput] = value;
          } else {
            for(var m = 0; m < CopyOfSessionExercise[i].sets.length;m++){
              if( CopyOfSessionExercise[i].sets[m].key == Number(exerciseSet)){
                CopyOfSessionExercise[i].sets[m][exerciseInput] = value;
              }
            }
          }
        }
      }
      this.setState({
        sessionExercises: CopyOfSessionExercise,
        defaultSessionExercises: {key:1, title:"--select--",sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""}
      })
    }

    handleSubmit(e){
      e.preventDefault();
      axios({

        method: 'post',
        url: "/train/hangboardsession/",
        data: {
          type:this.state.exerciseTemplate,
          sessionArray: this.state.sessionExercises
        }
      })
      this.setState({
        sessionExercises: [this.state.defaultSessionExercises],
        criteria: false,
        exerciseTemplate: "Overall Fitness",
        defaultSessionExercises: {key:1, title:"--select--",sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""}
      })
    }

    render(){
      var rows = [];
      const {sessionExercises} = this.state;
      for(var i = 0; i < sessionExercises.length;i++){

        rows.push(<TrainSet onPlusClick = {this.handleAddingSetOfExercise} workOuts = {this.state.workOuts} onChangeInput = {this.handleChangeInput} key={i} sessionExercises = {sessionExercises[i]}/>)
      }
      return(
        <Grid>
          {!this.state.modal ? null :
            // <h1> test </h1>
              <Modal show={this.state.modal}>
                <Modal.Header> Template Not Found </Modal.Header>
                <Modal.Body>
                  First Manually Add
                </Modal.Body>


              </Modal>

          }
          <form style={{border:"2px solid black"}} onSubmit = {this.handleCriteriaSubmit}>
            <Row style={{marginBottom:"20px"}} className="show-grid">
              <Col md={1}><label>Start a: </label></Col>
              <Col md={2}>

                <select name="exerciseTemplate" onChange = {(e)=>{this.handleCriteriaChange(e.target.name,e.target.value)}} value={this.state.exerciseTemplate}>
                  <option>Overall Workout</option>
                  <option>Ab Workout</option>
                  <option>Upper Body Workout</option>
                  <option>Finger Workout</option>
                  <option>Fitness Test</option>
                </select>
              </Col>
              <Col md={1}><label>sortFrom:</label></Col>
              <Col md={2}>
                <select value= {this.state.sortFrom} name= "sortFrom" onChange={(e)=>{this.handleCriteriaChange(e.target.name,e.target.value)}}>
                  <option>Most Recent Session</option>
                  <option>First Ever Session</option>
                </select>
              </Col>
              <Col md={1}><label>^weight:</label></Col>
              <Col md={2}>
                <input name="weight" onChange = {(e)=>{this.handleCriteriaChange(e.target.name,e.target.value)}} type="number" style={{width:"50%"}} value = {this.state.weight} ></input>
              </Col>

              <Col md={1}><label>^reps:</label></Col>

              <Col md={2}>
                <input name="reps" onChange = {(e)=>{this.handleCriteriaChange(e.target.name,e.target.value)}} type="number" style={{width:"50%"}} value = {this.state.reps} ></input>
              </Col>


            </Row>

              <Row className= "show-grid">
              { !this.state.criteria &&
                <Col md={2}>
                  <Button bsStyle = "primary" type="submit">Establish Criteria</Button>

                </Col>

              }
              {
                  this.state.criteria &&
                    <Col md={2}>
                      <Button bsStyle = "danger" onClick = {this.handleClearCriteria}>Clear Criteria</Button>
                    </Col>
                }
              </Row>
            </form>


          <form onSubmit={this.handleSubmit}>
            {rows}
            <Row className = "show-grid">
              <Col md={3}>
                <Button onClick={this.handleAddingGroupSet}>Add Exercise</Button>
              </Col>
              <Col md={3}>
                <Button bsStyle="primary" type="submit">Submit </Button>
              </Col>

            </Row>
          </form>
        </Grid>

      )
    }
  }

  export default TrainingSession;
