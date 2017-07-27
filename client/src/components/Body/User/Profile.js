  import React,{Component} from "react";
  import {Button,Grid,Row,Col} from 'react-bootstrap';
  class Profile extends Component{
    constructor(props){
      super(props);
      this.state = {
        firstName: "",
        lastName:"",
        currentBodyWeight:"",
        file: '',
        imagePreviewUrl: ''
      }
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleImageChange = this.handleImageChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e){
      e.preventDefault();
      console.log(this.state)
    }
    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
          this.setState({
            file: file,
            imagePreviewUrl: reader.result
          });
        }
        reader.readAsDataURL(file)
      }
    handleInputChange(name,value){
      this.setState({
        [name]:value
      })
    }
    render(){
      let {imagePreviewUrl} = this.state;
let $imagePreview = null;
if (imagePreviewUrl) {

  $imagePreview = (<img  src={imagePreviewUrl} alt="cannot find" style={{border:'1px solid black',width:'100px',height:'100px'}} />
)} else {
  $imagePreview = (<div className="previewText" style={{border:'1px solid black',width:'100px',height:'100px'}}>Please select an Image for Preview</div>);
}
      return(
        <Grid>
          <div className="imgPreview">
            {$imagePreview}
          </div>
          <form onSubmit={this.handleSubmit}>
            <Row className="show-grid">

              <Col md={2}>
                <label>Profile Pic: </label>
              </Col>
              <input className="fileInput"
                type="file"
                onChange={(e)=>this.handleImageChange(e)} />
            </Row>
            <Row className="show-grid">
              <Col md={2}>
                <label>First Name</label>

              </Col>
              <Col md={2}>

                <input onChange={(e)=>{this.handleInputChange(e.target.name,e.target.value)}} value={this.state.firstName} type="text" name="firstName"/>
              </Col>
            </Row>
            <Row className="show-grid">

              <Col md={2}>
                <label>Last Name</label>
              </Col>
              <Col md={2}>
                <input onChange={(e)=>{this.handleInputChange(e.target.name,e.target.value)}} value={this.state.lastName} type = "text" name = "lastName"/>
              </Col>
            </Row>
            <Row className="show-grid">
              <Col md={2}>
                <label>Current Weight</label>
              </Col>
              <Col md={2}>
                <input onChange={(e)=>{this.handleInputChange(e.target.name,e.target.value)}} value={this.state.currentBodyWeight} type = "number" name = "currentBodyWeight"/>
              </Col>
            </Row>
            <Row className="show-grid">

              <Button bsStyle="success" type="submit">Submit To Change </Button>
            </Row>


          </form>
        </Grid>
      )
    }
  }

  export default Profile;
