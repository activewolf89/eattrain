  import React,{Component} from "react";
  import {Form,FormGroup,Col,FormControl,Button,ControlLabel} from 'react-bootstrap';
  import PropTypes from 'prop-types';
  class TableEditForm extends Component{
    constructor(props){
      super(props);
      this.state = {
        id: props.editObject._id,
        title: props.editObject.Title,
        description: props.editObject.Description,
        category: props.editObject.Category
      }
      this.handleTitleInput = this.handleTitleInput.bind(this);
      this.handleDescriptionInput = this.handleDescriptionInput.bind(this);
      this.handleCategoryInput = this.handleCategoryInput.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
      e.preventDefault();
      this.props.onSubmitEdit(this.state)
    }

    handleTitleInput(e){
      this.setState({title:e.target.value})
    }
    handleDescriptionInput(e){
      this.setState({description:e.target.value})
    }
    handleCategoryInput(e){
      this.setState({category:e.target.value})
    }
    render(){
      var arrayOfOptions = ["fingers","upperBody","abs"];
      var options = arrayOfOptions.map((anOption)=>{
        return (
          <option key={anOption}>{anOption}</option>
        )
      }).filter((anOption)=>{

        return anOption.props.children !== this.state.category
      })
      return(

        <Form horizontal onSubmit={this.handleSubmit}>
          <FormGroup controlId="EditTitle">
            <Col componentClass={ControlLabel} sm={2}>
              Edit Title
            </Col>
            <Col sm={10}>
              <FormControl type="text"  value = {this.state.title} placeholder="edit title of workout" onChange={this.handleTitleInput} />
            </Col>
          </FormGroup>

          <FormGroup controlId="EditDescription">
            <Col componentClass={ControlLabel} sm={2}>
              Edit Description
            </Col>
            <Col sm={10}>
              <FormControl type="text" placeholder="describe workout" value = {this.state.description} onChange={this.handleDescriptionInput}/>
            </Col>
          </FormGroup>
          <FormGroup controlId="workoutCategory">
            <Col componentClass={ControlLabel} sm={2}>
              Edit Category
            </Col>
            <Col sm={10}>
              <FormGroup controlId="formControlsSelect">
                <FormControl componentClass="select" onChange={this.handleCategoryInput} >
                  <option>{this.state.category} </option>
                  {options}
                </FormControl>
              </FormGroup>
            </Col>
          </FormGroup>

          <FormGroup>
            <Col smOffset={2} sm={10}>
              <Button type="submit">
                Edit Workout
              </Button>
            </Col>
          </FormGroup>
        </Form>
      )
    }
  }
  TableEditForm.propTypes = {
    editObject: PropTypes.object.isRequired,
    onSubmitEdit: PropTypes.func.isRequired
  };
  export default TableEditForm;
