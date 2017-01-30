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
  componentWillReceiveProps(nextProps){
    if(this.props.myProblem !== nextProps.myProblem){
      this.setState({
        currentProblem: [nextProps.myProblem], //TODO solution may be here
        hasSimplified: false
      });
    }
  }

  handleSimplify(){
    var myCurrentProblem = this.state.currentProblem[this.state.currentProblem.length -1];
    var myStateProblemInput = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString();
    var prePush;
    if(myCurrentProblem === myStateProblemInput){
      var currentProblemSplit = myCurrentProblem.split(/=/);
      var currentProblemSideA = currentProblemSplit[0];
      var currentProblemSideB = currentProblemSplit[1];

      //break up into array elements and count terms for SideA
      var countSideA = 0
      var countSideAVariables = 0
      currentProblemSideA = currentProblemSideA.split(/([-\+\*\/=])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideA[0] === ""){
        currentProblemSideA.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideA.length; i++) {
        if(!currentProblemSideA[i].match(/[-\+\*\/=]/)){
          countSideA++;
        }
        if(currentProblemSideA[i].match(/[A-Z-a-z]/)){
          countSideAVariables++;
        }
      }

      //break up into array elements and count terms for SideB
      var countSideB = 0;
      var countSideBVariables = 0;
      currentProblemSideB = currentProblemSideB.split(/([-\+\*\/=])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideB[0] === ""){
        currentProblemSideB.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideB.length; i++) {
        if(!currentProblemSideB[i].match(/[-\+\*\/=]/)){
          countSideB++;
        }
        if(currentProblemSideB[i].match(/[A-Z-a-z]/)){
          countSideBVariables++;
        }
      }


      //move term from one side to the other
      if(countSideAVariables > countSideBVariables && countSideA == countSideB){
        console.log("move varibales from Side B to Side A");
        //console.log("countSideAVariables > countSideBVariables && (countSideA-countSideAVariables) > (countSideB - countSideBVariables)");
        //move variables to sideA
        //move numbers to sideB
        var tempVariableNum;
        for (var i = 0; i < currentProblemSideB.length; i++) {
          if(currentProblemSideB[i].match(/[A-Za-z]/)){
            tempVariableNum = i;
            break;
          }
        }


        switch (currentProblemSideB[tempVariableNum -1]) {

          case "+":
          prePush = "-"
          break;
          case "-":
          prePush = "+"
          break;
          default:
          prePush = "-"
        }

        prePush = prePush + currentProblemSideB[tempVariableNum];
        currentProblemSideA.push(prePush);
        currentProblemSideB.push(prePush);
        currentProblemSideA = currentProblemSideA.toString();
        currentProblemSideB = currentProblemSideB.toString();
        myCurrentProblem = currentProblemSideA + "=" + currentProblemSideB;
        myCurrentProblem = myCurrentProblem.replace(/,/g, '');
        myCurrentProblem = myCurrentProblem.replace(/ /g, '');
        var problemListHolder = this.state.currentProblem;
        problemListHolder.push(myCurrentProblem);
        console.log("problemListHolder: " + problemListHolder);
        this.setState({
          currentProblem: problemListHolder
        })
      } else {
        console.log("countSideAVariables < countSideBVariables-- ELSE");
        //move numbers to sideB
        var tempNumTermNum;
        for (var i = 0; i < currentProblemSideA.length; i++) {
          if(!currentProblemSideA[i].match(/[A-Za-z-\+\*\/=]/)){
            tempNumTermNum = i;
            break;
          }
        }
console.log("tempNumTermNum: " + tempNumTermNum);
        switch (currentProblemSideA[tempNumTermNum -1]) {

          case "+":
          prePush = "-"
          break;
          case "-":
          prePush = "+"
          break;
          default:
          prePush = "-"
        }

        prePush = prePush + currentProblemSideA[tempNumTermNum];
        console.log("prePush+currentProblemSideA: " + prePush );
        currentProblemSideA.push(prePush);
        currentProblemSideB.push(prePush);
        currentProblemSideA = currentProblemSideA.toString();
        currentProblemSideB = currentProblemSideB.toString();
        myCurrentProblem = currentProblemSideA + "=" + currentProblemSideB;
        myCurrentProblem = myCurrentProblem.replace(/,/g, '');
        myCurrentProblem = myCurrentProblem.replace(/ /g, '');
        var problemListHolder = this.state.currentProblem;
        problemListHolder.push(myCurrentProblem);
        console.log("problemListHolder: " + problemListHolder);
        this.setState({
          currentProblem: problemListHolder
        })

      }


    } else{
      console.log("Here when can simply simpify");
      var problemListHolder = this.state.currentProblem;
      problemListHolder.push(myStateProblemInput);
      this.setState({
        currentProblem: problemListHolder,
        hasSimplified: true
      });
    }
  }

  render(){
    return(
      <div className="panel">
        <ProblemList myProblem={this.state.currentProblem} />
        <button className="btn btn-primary col-sm-6" onClick={this.handleSimplify}>Simplify</button>
      </div>
    )
  }

}





module.exports = ProblemContainer;
