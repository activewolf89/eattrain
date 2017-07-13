  import React,{Component} from "react";
  import GroupSet from './GroupSet'
  class GroupSetParent extends Component{
    constructor(props){
      super(props);
      this.state = {
        status: this.props.status,
        pastActivity: false,
        cleanSlate: false
      }
      this.handleChildFormSubmit = this.handleChildFormSubmit.bind(this);
      }
      handleChildFormSubmit(){
        alert('submit')
    }
    componentDidMount(){

      if(!this.state.pastActivity){
        this.setState({cleanSlate:true})
      }
    }
    render(){
      return(
        <div className = "GroupSetParent">
          {this.state.cleanSlate ? <GroupSet onSubmit = {this.handleChildFormSubmit} status = {this.state.status} outcome = "" />: null}
        </div>
      )
    }
  }

  export default GroupSetParent;
