  import React,{Component} from "react";
  import PropTypes from 'prop-types';
  import {Grid,Button,Select,Row,Col,ControlLabel,FormGroup,FormControl,HelpBlock} from 'react-bootstrap';
  class TrainSet extends Component{
    render(){
      const {workOuts} = this.props;
      if(typeof(workOuts) == "object"){

      var optionWorkOuts = workOuts.map((workout)=>{
        return <option key={workout._id}>{workout.Title}</option>
      })
    }
      return(
        <div className="setContainer">
          <FormGroup controlId={this.props.number + "Grip"}>
            <ControlLabel>Exercise {this.props.number} Grip</ControlLabel>
            <FormControl componentClass="select" placeholder="select" style={{marginLeft:'10px',marginRight:'10px',display:'inline-block', width: '50%'}}>
              {optionWorkOuts}
            </FormControl>
            {this.props.onPlusClick && <Button onClick={this.props.onPlusClick} style={{display:'inline-block'}}>+</Button>}
          </FormGroup>


        </div>
      )
    }
  }
  TrainSet.propTypes = {
    number: PropTypes.number.isRequired,
    workOuts: PropTypes.array.isRequired,
    onPlusClick: PropTypes.func
  }
  export default TrainSet;
