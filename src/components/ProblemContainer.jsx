var React = require('react');
var algebra = require("algebra.js");
var ProblemList = require('./ProblemList.jsx');

var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;


// var preArray = this.state.newElementString.replace(/ /g, '');
//TODO check to see there is only one kind of variable
//will split string at any found operator or equal sign but leave the delimiter
// var numArray = preArray.split(/([-\+\*\/=])/g);
// this.setState({exportArray: numArray});
//  ReactDOM.render(<ProblemRow problem={this.state.exportArray} />, document.getElementById('problem'));


class ProblemContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentProblem:[this.props.myProblem],
      hasSimplified:false
    };
    this.handleSimplify = this.handleSimplify.bind(this);

  }

  handleSimplify(){
    var myStateProblemInput = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString();
    var problemListHolder = this.state.currentProblem;
    problemListHolder.push(myStateProblemInput);
    this.setState({
      currentProblem: problemListHolder,
      hasSimplified: true
    });
    console.log("handleSimplify");
    console.log(this.state.hasSimplified);
  }
  render(){

    return(
      <div className="panel">

         <ProblemList myProblem={this.state.currentProblem} />

        <button className="btn btn-primary col-sm-6" onClick={this.handleSimplify}>Combine Like Terms (simplify)</button>
      </div>
    )
  }

}





module.exports = ProblemContainer;
