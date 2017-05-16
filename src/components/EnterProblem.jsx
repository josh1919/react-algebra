var React = require('react');
var ReactDOM = require('react-dom');
var ProblemContainer = require('./ProblemContainer.jsx');

class EnterProblem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentInput:'',
      submitted: false
    };
    this.onReset = this.onReset.bind(this);
  }

  onReset(){
    this.setState({
      currentInput:'',
      submitted: false
    })
  }
  onChange(e){
    this.setState({
      currentInput:e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    //removes all white space in inputed problem
    var preArray = this.state.currentInput.replace(/ /g, '').toString();


    //Input validation
    let isValid = true;
    let validityMessage = "OK";

    if(preArray.match(/[a-zA-Z][a-zA-Z]/g) != null){
      isValid = false;
      validityMessage = "You cant put two variables next to each other.";
    }
    if (preArray.match(/[\d][a-zA-Z][\d]/g) != null){
      isValid = false;
      validityMessage = "You can't put a number next to a variable next to another number like this: 2x2";
    } else if(preArray.match(/[a-zA-Z][\d]+[a-zA-Z]/g) != null){
      isValid = false;
      validityMessage = "You can't put a variable next to a number next to another variable like this: x32x";
    } else if(preArray.match(/[a-zA-Z][\d]/g) != null){
      isValid = false;
      validityMessage = "You shouldn't put the variable in front of the number";
     } else if(preArray.match(/=/g) > 1 ){
      isValid = false;
      validityMessage = "You can only have one equal sign per equation";
    } else if(preArray.charAt(0) == '='){
      isValid = false;
      validityMessage = "You cannot have an equal sign as the first term in an equation.";
    } else if(preArray.charAt(preArray.length -1 ) == '='){
      isValid = false;
      validityMessage = "You cannot end an eqution with an equal sign";
    } 
    //TODO Continue data validation: I need a method for simplify or to at least check that problem is already fully simplified.


    if(isValid){

      this.setState({
        currentInput: preArray,
        stepList: "Initial Problem",
        submitted: true
      });

    } else {//if input invalid
      this.setState({
        submitted: false
      })

      console.log(validityMessage);
      alert("Fix your syntax, " + validityMessage);
    }
  };

  render(){
    let divStyle={margin:10};
    let postStyle = {
      paddingBottom:'10px',
      margin:'10px',
      marginBottom:'10px',
      borderBottom:'#337ab7',
      borderBottomStyle:'solid',
      verticalAlign:'middle'
    }

    return (

      <div className='row' style={divStyle}>
        {!this.state.submitted ?
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='input-group'>

              <input className='form-control' onChange={this.onChange.bind(this)} value={this.state.currentInput}/>
              <span className='input-group-btn'>
                <button className='btn btn-primary'>Submit</button>
              </span>
            </div>
          </form>
          :
          <div className="text-center" style={postStyle}>
            <div className="col-xs-10" style={{fontWeight:'bold', fontSize:'1.6em'}}>{this.state.currentInput}</div>
            <button className="btn" onClick={this.onReset}>Reset</button>
          </div>
        }
        {this.state.submitted ? <ProblemContainer myProblem={this.state.currentInput} stepList={this.state.stepList} /> : null}
      </div>

    )
  }
}

module.exports = EnterProblem;
