var React = require('react');
var algebra = require("algebra.js");
var ProblemRows = require("./ProblemRows.jsx");
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

class ProblemContainer extends React.Component{
  // constructor(props){
  //   super(props);
  //   this.state = {
  //     currentProblem:this.props.myProblem
  //   };
  // }
  render(){
    return(
      <div className="panel">
        <ProblemRows myProblem={this.props.myProblem} />
      </div>
    )
  }

}

module.exports = ProblemContainer;
