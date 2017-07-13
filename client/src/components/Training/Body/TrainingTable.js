  import React,{Component} from "react";

  class TrainingTable extends Component{
    render(){
      return(
        <div>
          <Table striped bordered condensed hover>
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
                    <tr key={index} >
                      <td >{index+1}</td>
                      <td >{exer.Title}</td>
                      <td >{exer.Description}</td>
                      <td >{exer.Category}</td>
                      <td > <EditButton onEditClick = {this.handleEditClick} whichIndex = {index} whichTitle = {exer.Title}/> <RemoveButton whichTitle = {exer.Title} whichIndex = {index} onRemoveClick = {this.handleRemoveClick}/></td>
                    </tr>
                  )
                })

              }

            </tbody>
          </Table>
        </div>
      )
    }
  }

  export default TrainingTable;
