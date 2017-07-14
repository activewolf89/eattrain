import React,{Component} from "react";
import {Form,FormGroup,Col,FormControl,ControlLabel,Button,Modal} from 'react-bootstrap';
import axios from 'axios';
class AddExercise extends Component{
  constructor(props){
    super(props);
    this.state = {
      modal: false,
      formTitle: "",
      formDescription: "",
      formCategory: "fingers"
    }
    this.handleTitle = this.handleTitle.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleCategory(e){
    this.setState({
      formCategory: e.target.value
    })
  }
  handleTitle(e){
    this.setState({
      formTitle: e.target.value
    })
  }
  handleDescription(e){
    this.setState({
      formDescription: e.target.value
    })
  }
  handleFormSubmit(e){
    e.preventDefault();

  axios.post('/train/add',{
      title: this.state.formTitle,
      description: this.state.formDescription,
      category: this.state.formCategory
    })
    .then(function (response) {
      this.setState({

        modal: true
      })
    }.bind(this))
    .catch(function (error) {
      console.log(error);
    });
    setTimeout(()=>{this.setState({modal:false, formDescription: "", formTitle: "", formCategory:"fingers"})},2000)
  }
  render(){
    var newMap = ["fingers","upperBody","abs"].map((single)=>{
      if(single === "fingers"){
        return <option selected="selected"> {single} </option>
      } else {
        return <option>{single}</option>
      }
    })
    return(

      <Form horizontal onSubmit={this.handleFormSubmit}>
        {!this.state.modal ? null :
          // <h1> test </h1>
            <Modal show={this.state.modal}>
              <Modal.Header> Successfully Added </Modal.Header>
              <Modal.Body>
                You have added <b>{this.state.formTitle}</b> to list of workouts
              </Modal.Body>


            </Modal>

        }
        <FormGroup controlId="workoutTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <FormControl  type="text" placeholder="add title of workout" onChange={this.handleTitle} value={this.state.formTitle}/>
          </Col>
        </FormGroup>

        <FormGroup controlId="workoutDescription" onChange = {this.handleDescription}>
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10}>
            <FormControl type="text" placeholder="describe workout" onChange={this.handleDescription} value={this.state.formDescription} />
          </Col>
        </FormGroup>
        <FormGroup controlId="workoutCategory">
          <Col componentClass={ControlLabel} sm={2}>
            Category
          </Col>
          <Col sm={10}>
            <FormGroup controlId="formControlsSelect">
              <FormControl componentClass="select" value={this.state.formCategory} onChange = {this.handleCategory} placeholder="select">
                {newMap}


              </FormControl>
            </FormGroup>
          </Col>
        </FormGroup>

        <FormGroup>

          <Col smOffset={2} sm={10}>
            <Button type="submit">
              Add Workout
            </Button>
          </Col>
        </FormGroup>

      </Form>

    )
  }
}
//prop types check if prop is what you want it to be..
export default AddExercise;
