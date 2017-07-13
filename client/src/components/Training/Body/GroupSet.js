  import React,{Component} from "react";
  import axios from 'axios';
  import {Form,Button, FormGroup,ControlLabel,FormControl,Col} from 'react-bootstrap';
  import PropTypes from 'prop-types';
  import TrainingFormHeader from './TrainingFormHeader';

  class GroupSet extends Component{
    constructor(props){
      super(props);
      this.state = {
        status: this.props.status,
        Ex1Set1Res1: this.props.outcome,
        Ex1Set2Res2: this.props.outcome,
        Ex1Set2Res3: this.props.outcome,
        Ex1Set1Rep1: this.props.outcome,
        Ex1Set2Rep2: this.props.outcome,
        Ex1Set3Rep3: this.props.outcome,
        Ex1Set1Diff1: this.props.outcome,
        Ex1Set2Diff2: this.props.outcome,
        Ex1Set3Diff3: this.props.outcome,
        Ex1Set1Comm1: this.props.outcome,
        Ex1Set2Comm2: this.props.outcome,
        Ex1Set3Comm3: this.props.outcome,
        arrayOfExercises: []
      }
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFormChange = this.handleFormChange.bind(this);
    }
    componentDidMount(){
      axios({
        method: 'get',
        url: `/training/session/exercises/all`
      }).then((res)=>{
        this.setState({arrayOfExercises: res.data})
      })
    }
    handleSubmit(e){
      e.preventDefault();
      this.props.onSubmit();
    }
    handleFormChange(e){


      this.setState({[e.target.id]: e.target.value})
    }
    render(){
      var options = Array(1);
      if(this.state.arrayOfExercises.length < 2){
        options = options.map((exercise)=>{
          return <option>Add an Option</option>
        })
      } else {
        options = this.state.arrayOfExercises;
        options = options.map((exercise)=>{
          return <option key={exercise._id}> {exercise.Title} </option>
        })
      }
      return(
        <div className="form">
          <Form onSubmit={this.handleSubmit}>
            <TrainingFormHeader status = {this.state.status}/>
            <Col md={12}><h3>Exercise 1</h3>
              <FormGroup controlId="formControlsSelect">
                <ControlLabel>Select</ControlLabel>
                <FormControl componentClass="select" placeholder="select">
                  <option>select a workout</option>
                  {options}
                </FormControl>
              </FormGroup>
            </Col>
            <Col md={1}>

              <ControlLabel>Set </ControlLabel>
              <FormGroup controlId="Ex1Set1">
                <ControlLabel>1</ControlLabel>


              </FormGroup>
              <FormGroup controlId="Ex1Set2">
                <ControlLabel>2</ControlLabel>


              </FormGroup>
              <FormGroup controlId="Ex1Set3">
                <ControlLabel>3</ControlLabel>
              </FormGroup>
            </Col>
            <Col sm={1}>
              <ControlLabel>Resistance </ControlLabel>
              <FormGroup controlId="Ex1Set1Res1">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set1Res1}
                  onChange={this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set2Res2">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set2Res2}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set3Res3">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set3Res3}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <ControlLabel>#Reps</ControlLabel>
              <FormGroup controlId="Ex1Set1Rep1">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set1Rep1}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set2Rep2">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set2Rep2}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set3Rep3">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set3Rep3}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
            </Col>
            <Col md={2}>
              <ControlLabel>Difficulty</ControlLabel>
              <FormGroup controlId="Ex1Set1Diff1">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set1Diff1}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set2Diff2">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set2Diff2}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set3Diff3">
                <FormControl
                  type="number"
                  value={this.state.Ex1Set3Diff3}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
            </Col>
            <Col md={4}>
              <ControlLabel>Comments</ControlLabel>
              <FormGroup controlId="Ex1Set1Comm1">
                <FormControl
                  type="text"
                  value={this.state.Ex1Set1Comm1}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set2Comm2">
                <FormControl
                  type="text"
                  value={this.state.Ex1Set2Comm2}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
              <FormGroup controlId="Ex1Set3Comm3">
                <FormControl
                  type="text"
                  value={this.state.Ex1Set3Comm3}
                  onChange = {this.handleFormChange}
                />
              </FormGroup>
            </Col>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
          )
          }
          }
          GroupSet.propTypes = {
            onSubmit: PropTypes.func.isRequired
          }
          export default GroupSet;
