import React,{Component} from "react";
import axios from 'axios';
import {Table,Button} from 'react-bootstrap';
import RemoveButton from './RemoveButton'
import EditButton from './EditButton';
import TableEditForm from './TableEditForm';
import {Link} from 'react-router-dom';
class Exercise extends Component{
  constructor(props){
    super(props);
    this.state = {
      arrayOfExercises: null,
      editObject: ""
    }
    this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
    this.handleTitleClick = this.handleTitleClick.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }
  componentDidMount(){
    axios.get("/train/show").then((res)=>{

      this.setState({
        arrayOfExercises: res.data
      })

    })
  }

  handleSubmitEdit(object){

    axios({
      method: 'post',
      url: '/train/update',
      data: object
    }).then(function(response){
      this.setState({arrayOfExercises: response.data, editObject:""})
    }.bind(this))
}
  handleEditClick(objectId,title){

    var singleArrayObject = this.state.arrayOfExercises.filter((single)=>{

      return single._id === objectId
    })

    singleArrayObject.forEach((data)=>{
        this.setState({editObject:data})
    });

    // alert(obj);

  }
  handleRemoveClick(objectId,title){
    var confirmed = window.confirm(`would you like to delete ${title} from database?`);
    if(confirmed){
      axios({
        method: 'post',
        url: '/train/remove',
        data: {id: objectId}
      }).then((response)=>{

      })
      var adjustedArray = this.state.arrayOfExercises.filter((singleExercise)=>{
        return (singleExercise._id !== objectId)
      });
      this.setState({arrayOfExercises: adjustedArray})
    }
  }
  handleTitleClick(){
    function newSort(arr){
      return arr.concat().sort((a,b)=>{
        var textA = a.Title.toUpperCase();
        var textB = b.Title.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
      });
    }
    var newArray = newSort(this.state.arrayOfExercises)
    this.setState({arrayOfExercises:newArray})
  }



  render(){
    return(
    <div>
      {this.state.editObject === "" ? <Table striped bordered condensed hover>
        <thead>
          <tr>
            <th> # </th>
            <th onClick={this.handleTitleClick}> Title </th>
            <th> Description </th>
            <th> Category </th>
            <th > Actions </th>
          </tr>
        </thead>
        <tbody>
          {!this.state.arrayOfExercises ? <tr><td> Loading... </td></tr> :
            this.state.arrayOfExercises.map((exer,index)=>{

              return (
                <tr key={exer._id} >
                  <td >{index+1}</td>
                  <td >{exer.Title}</td>
                  <td >{exer.Description}</td>
                  <td >{exer.Category}</td>
                  <td > <EditButton onEditClick = {this.handleEditClick} whichObject = {exer._id} whichTitle = {exer.Title}/> <RemoveButton whichTitle = {exer.Title} whichObject = {exer._id} onRemoveClick = {this.handleRemoveClick}/></td>
                </tr>
              )
            })

          }

        </tbody>
      </Table>: <TableEditForm  editObject = {this.state.editObject} onSubmitEdit = {this.handleSubmitEdit}/>}
      <Link to="exercise/add"><Button>Add Workout </Button></Link>
    </div>
    )
  }
}

export default Exercise;
