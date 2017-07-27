  import React,{Component} from "react";
  import axios from 'axios';
  import {Button,Grid,Row,Col,Modal} from 'react-bootstrap';
  import TrainSet from './TrainSet.js';
  import Timer from './Timer.js';
  class TrainingSession extends Component{
    constructor(props){
      super(props);
      this.state = {
        modal: false,
        modalForTimerError:false,
        modalForTimerSuccess: false,
        workOuts: [],
        sessionExercises: [{key:1, title:"--select--", sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""}],
        defaultSessionExercises: {key:1, title:"--select--", sets:[{key:1, goal:"",reps:"",comments:"",res:"",diff:""}],notes:""},
        defaultObject: {key:1, goal:"",reps:"",comments:"",res:"",diff:""},
        exerciseTemplate: "Overall Workout",
        weight: 0,
        currentBodyWeight: 0,
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
      this.handleRemoveExercise = this.handleRemoveExercise.bind(this);
      this.handleExerciseSessionMinus = this.handleExerciseSessionMinus.bind(this);
      this.handleInputModal = this.handleInputModal.bind(this);
      this.hideModal = this.hideModal.bind(this);
    }
    componentDidMount(){

      axios.get("/train/show/").then((res)=>{
        this.setState({workOuts: res.data})
      })
    }
    hideModal(){
      this.setState({
        modalForTimerSuccess: false
      })
    }
    handleInputModal(exNum,setNum){

      for(var i = 0; i < this.state.sessionExercises.length;i++){
        if(exNum == this.state.sessionExercises[i].key){
          for(var m = 0; m < this.state.sessionExercises[i].sets.length;m++){
            if(this.state.sessionExercises[i].sets[m].key == setNum){
              if(this.state.sessionExercises[i].sets[m].reps == ""){
                this.setState({
                  modalForTimerError: true
                })
                setTimeout(()=>{this.setState({modalForTimerError:false})},3000)
              } else {
                this.setState({
                  modalForTimerSuccess: true
                })
              }
            }
          }
        }
      }
    }
    handleExerciseSessionMinus(exerciseNumber,exerciseSet){

      var CopyOfSessionExercise = this.state.sessionExercises.slice();
      for(var i = 0; i < CopyOfSessionExercise.length;i++){
        if(CopyOfSessionExercise[i].key == exerciseNumber){
          for(var m = 0; m < CopyOfSessionExercise[i].sets.length;m++){
            if(CopyOfSessionExercise[i].sets[m].key == exerciseSet){
              console.log(CopyOfSessionExercise[i])
              CopyOfSessionExercise[i].sets.splice(m,1);
              for(var x = m; x < CopyOfSessionExercise[i].sets.length;x++){
                CopyOfSessionExercise[i].sets[x].key = CopyOfSessionExercise[i].sets[x].key - 1;
              }
            }
          }
        }
      }
      this.setState({
        sessionExercises: CopyOfSessionExercise
      })
    }
    handleRemoveExercise(keyNumber){
      var arrayOfSessionExercises = this.state.sessionExercises.slice();
      for(var i = 0; i < arrayOfSessionExercises.length;i++){
        if(arrayOfSessionExercises[i].key == keyNumber){
          //this is where we remove this particular exercise//
          arrayOfSessionExercises.splice(i,1)
          for(var m = i; m < arrayOfSessionExercises.length;m++){
            arrayOfSessionExercises[m].key = arrayOfSessionExercises[m].key -1
          }
        }
      }
      this.setState({
        sessionExercises: arrayOfSessionExercises
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
        this.setState({
          [name]:value,
        })
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

      for(var i = 0; i < copyOfArrayExercise.length;i++){
        if(exNum == copyOfArrayExercise[i].key){
          var newObject = Object.assign({},this.state.defaultObject);
          newObject.key = copyOfArrayExercise[i].sets.length + 1;
          copyOfArrayExercise[i].sets.push(newObject)
        }
      }
      console.log(this.state)
      this.setState({
        sessionExercises: copyOfArrayExercise
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
        console.log(this.state)
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

        rows.push(<TrainSet inputModal = {this.handleInputModal} onRemoveExercise = {this.handleRemoveExercise} onPlusClick = {this.handleAddingSetOfExercise} onMinusClick = {this.handleExerciseSessionMinus} workOuts = {this.state.workOuts} onChangeInput = {this.handleChangeInput} key={i} sessionExercises = {sessionExercises[i]}/>)
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
          {!this.state.modalForTimerError ? null :
            // <h1> test </h1>
              <Modal show={this.state.modalForTimerError}>
                <Modal.Header> Start Error </Modal.Header>
                <Modal.Body>
                  Add reps to set before starting
                </Modal.Body>


              </Modal>

          }
          {!this.state.modalForTimerSuccess ? null :
            <div className="static-modal">
              <Modal.Dialog>
                <Modal.Header>
                  <Modal.Title>Modal title</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                  <Timer />
                </Modal.Body>

                <Modal.Footer>
                  <Button onClick={this.hideModal}>Close</Button>
                  <Button bsStyle="primary">Save changes</Button>
                </Modal.Footer>

              </Modal.Dialog>
            </div>

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
              <Col md={2}><label>Current Body Weight:</label></Col>
              <Col md={2}>
                <input name="currentBodyWeight" onChange = {(e)=>{this.handleCriteriaChange(e.target.name,e.target.value)}} type="number" style={{width:"50%"}} value = {this.state.currentBodyWeight} ></input>
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
