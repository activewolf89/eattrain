  import React,{Component} from "react";
  import axios from 'axios';
  import {FormGroup,ControlLabel,FormControl} from 'react-bootstrap';
  class TrainingFormHeader extends Component{
    constructor(props){
      super(props);
      this.state = {
        temperatureInF: ""
      }
      this.handleHeaderFormChange = this.handleHeaderFormChange.bind(this);
    }
    handleHeaderFormChange(e){
      this.setState({temperatureInF:e.target.value})
    }
    componentDidMount(){
      axios({
        //12c9529dc9d4ebbf wundeground key
        method: 'get',
        url: '/show/weather'
      }).then((res)=>{

        this.setState({
        temperatureInF:res.data.WeatherObject.current_observation.temp_f})
      })

    }
    render(){
      function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

    var adjustedDate = formatDate(new Date().toDateString());

      return(
        <div>
          <FormGroup controlId="formInlineDate">
            <ControlLabel>Date</ControlLabel>
            <FormControl  defaultValue = {adjustedDate} type="date" />
          </FormGroup>
          <FormGroup controlId="formInlineTemp">
            <ControlLabel>Temp</ControlLabel>

            {this.state.temperatureInF === ""? <FormControl type="number" value={this.state.temperatureInF}/>:
              <FormControl onChange={this.handleHeaderFormChange} value={this.state.temperatureInF} type="number" />}

          </FormGroup>
          <FormGroup controlId="formRepTiming">
            <ControlLabel>Rep Timing</ControlLabel>
            <FormControl defaultValue= "7 second hang 5 second rest" type="text" />
          </FormGroup>
        </div>
      )
    }
  }

  export default TrainingFormHeader;
