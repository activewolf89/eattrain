  import React,{Component} from "react";
  import TrainingForm from './Body/TrainingForm';
  import TrainingHeader from './Header/TrainingHeader';
  import TrainingBody from './Body/TrainingBody';
  import TrainingSession from './Body/TrainingSession';
  import GroupSetParent from './Body/GroupSetParent';
  import {withMultipleDates,Calendar,defaultMultipleDateInterpolation} from 'react-infinite-calendar';
  import InfiniteCalendar  from 'react-infinite-calendar';
  import 'react-infinite-calendar/styles.css';
  import {Route} from 'react-router';

  class Training extends Component{
    constructor(props){
      super(props);
      this.state = {
        session: "",
        redirectCalendar: ""

      }
      this.handleCalendarSelect = this.handleCalendarSelect.bind(this);
      this.handleBackClick = this.handleBackClick.bind(this);
    }
    handleBackClick(){
      this.setState({redirectCalendar:""})
    }
    handleCalendarSelect(clickedDate){
      var today = new Date();
      if (today <= clickedDate){
          //if date is now/future date, have an add record. first thing to do is add
          this.setState({session:"add", redirectCalendar:`${clickedDate}`})
          } else {
            //if date is a past date, pull the record of the date to see

            this.setState({session:"see", redirectCalendar:`${clickedDate}`})
          }
          }
          render(){

            var testDates = [
            new Date()
            ];

                return (

                <div>
                  <TrainingHeader />
                  {this.state.redirectCalendar === "" ?
                    <Route exact path = "/training"  render={() =><InfiniteCalendar
                      onSelect = {this.handleCalendarSelect}
                      Component={withMultipleDates(Calendar)}
                      width={600}
                      height={200}
                      selected={testDates}
                      interpolateSelection={defaultMultipleDateInterpolation}
                                                                  />} />
                    : <Route exact path = "/training" render={()=><TrainingSession
                      onBackClick={this.handleBackClick} date={this.state.redirectCalendar}/>} />}

                  <Route exact path = "/training/add" component={TrainingForm} />
                  <Route exact path = "/training/show" component= {TrainingBody} />
                  <Route exact path = "/training/session/present" render={()=>
                    <GroupSetParent status = "present"/>} />}
                </div>
      )
    }
  }

  export default Training;
