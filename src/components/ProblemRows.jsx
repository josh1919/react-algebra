var React = require('react');
var ReactDOM = require('react-dom');
//var algebra = require('../../node_modules/algebra.js/algebra.js');
var algebra = require("algebra.js");
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

class ProblemRows extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentProblem:this.props.myProblem
    };
  }

  //TODO: receive the raw current problem from previous component. fix the array here. and prepare for next step //TODO: may not need array afterall
    render(){
      var preArray = this.state.currentProblem.replace(/ /g, '');
      //TODO check to see there is only one kind of variable
      //will split string at any found operator or equal sign but leave the delimiter
      var numArray = preArray.split(/([-\+\*\/=])/g);
    //  this.setState({currentProblem: numArray});
    //TODO algebra logic goes here

var x = new Expression("x");

var x1 = algebra.parse(this.state.currentProblem);
var output = 1;
      //var myData = "my numArray is: " + numArray;

//In this return goes next step which will make a new step after this one but it should append it to the end of the last one.
      return (
        <div>
          <h4>Here is your problem's current state</h4>
          <div>Problem = {this.state.currentProblem}</div>
          <div>Simplified => {x1.toString()}</div>
        </div>
      )
    }
}

module.exports = ProblemRows;
