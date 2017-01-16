var React = require('react');
var ReactDOM = require('react-dom');
var algebra = require("algebra.js");
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

class ProblemRows extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentProblem:this.props.myProblem,
      hasSimplified: false
    };

    this.handleSimplify = this.handleSimplify.bind(this);
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.myProblem !== this.props.myProblem){
      this.setState ({
        currentProblem:this.props.myProblem,
        hasSimplified: false
      })
    }
  }
   handleSimplify(){


    var myStateProblemInput = algebra.parse(this.state.currentProblem);
    this.setState({
    //currentProblem: myStateProblemInput,
      hasSimplified: true
    });

  }

    render(){
    //   var preArray = this.state.currentProblem.replace(/ /g, '');
    //   //TODO check to see there is only one kind of variable
    //   //will split string at any found operator or equal sign but leave the delimiter
    //   var numArray = preArray.split(/([-\+\*\/=])/g);
    // //  this.setState({currentProblem: numArray});

  let x1 = algebra.parse(this.state.currentProblem).toString();


//In this return goes next step which will make a new step after this one but it should append it to the end of the last one.
      return (
        <div>

          <div>Problem => {this.state.currentProblem}</div>

          <button onClick={this.handleSimplify}>Combine Like Terms (simplify)</button>
          {
            this.state.hasSimplified == true ? <ProblemRows myProblem={algebra.parse(this.state.currentProblem).toString()} /> : null
          }


        </div>
      )
    }
}

module.exports = ProblemRows;
