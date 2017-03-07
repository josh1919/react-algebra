var React = require('react');
var algebra = require("algebra.js");
var ProblemList = require('./ProblemList.jsx');

var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;
//TODO 3/6 fix when no solution
class ProblemContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentProblem:[this.props.myProblem],
      stepList: [this.props.stepList]
    };
    this.handleSimplify = this.handleSimplify.bind(this);
    console.log('initial constructor');
  }
  componentWillMount(){
    this.handleSimplify();
  }
  componentWillReceiveProps(nextProps){
    console.log('componentWillReceiveProps');
    if(this.props.myProblem !== nextProps.myProblem){
      this.setState({
        currentProblem: [nextProps.myProblem],
        stepList: [this.props.stepList]
      });
    }
  }

  handleSimplify(){
    var temp;
    var problemListHolder;
    var stepListHolder;
    var myCurrentProblem = this.state.currentProblem[this.state.currentProblem.length -1];
    var myStateProblemInput = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString();
    var prePush;
    var negSign = '';
    var stepListItem = 'currently undefined: fix';
    function switchFunction(item){
      switch (item) {
        case "+":
        return "-"
        break;
        case "-":
        return "+"
        break;
        default:
        return "-"
      }
    }
    function prePushToCurrentProblem(item){
      currentProblemSideA.push(item);
      currentProblemSideB.push(item);
      currentProblemSideA = currentProblemSideA.toString();
      currentProblemSideB = currentProblemSideB.toString();
      myCurrentProblem = currentProblemSideA + "=" + currentProblemSideB;
      myCurrentProblem = myCurrentProblem.replace(/,/g, '');
      myCurrentProblem = myCurrentProblem.replace(/ /g, '');
    }
    function tempSetup(mySide){
      for (var i = 0; i < mySide.length; i++) {
        if(mySide[i].match(/[A-Za-z]/) ){
          if(mySide[i-1] == null){
            temp = "-";
            stepListItem = "Subtract ";
          } else {
            temp = "+";
            stepListItem = "Add ";
          }
          temp = temp + mySide[i];
          stepListItem += mySide[i];
          break;
        }
      }
      stepListItem += " from both sides";
      return temp;
    }

    function tempSetup2(mySide){
      for (var i = 0; i < mySide.length; i++) {
        if(mySide[i].match(/\d/) && !mySide[i].match(/[A-Za-z-\+\*\/]/)){
          if(mySide[i-1] == null || mySide[i-1] == "+"){
            temp = "-"
            stepListItem = "Subtract ";
          } else {
            temp = "+"
            stepListItem = "Add "
          }
          temp = temp + mySide[i];
          stepListItem += mySide[i];
          break;
        }
      }
      stepListItem += " from both sides";
      return temp;
    }

    if(myCurrentProblem !== myStateProblemInput){
      problemListHolder = this.state.currentProblem;
      problemListHolder.push(myStateProblemInput);
      stepListHolder = this.state.stepList;
      stepListHolder.push("Combine like terms");
      this.setState({
        currentProblem: problemListHolder,
        stepList: stepListHolder
      });
    } else {
      //If it cannot simplify it will come here
      var currentProblemSplit = myCurrentProblem.split(/=/);
      var currentProblemSideA = currentProblemSplit[0];
      var currentProblemSideB = currentProblemSplit[1];

      //break up into array elements and count terms for SideA
      var countSideA = 0
      var countSideAVariables = 0
      currentProblemSideA = currentProblemSideA.split(/([-\+\*])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideA[0] === "" || currentProblemSideA[0] === " "){
        currentProblemSideA.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideA.length; i++) {
        if(!currentProblemSideA[i].match(/([-\+\*])/)){
          countSideA++;
        }
        if(currentProblemSideA[i].match(/([A-Za-z])/)){
          countSideAVariables++;
        }
      }

      //break up into array elements and count terms for SideB
      var countSideB = 0;
      var countSideBVariables = 0;
      currentProblemSideB = currentProblemSideB.split(/([-\+\*])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideB[0] === "" || currentProblemSideB[0] === " "){
        currentProblemSideB.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideB.length; i++) {
        if(!currentProblemSideB[i].match(/([-\+\*=])/)){
          countSideB++;
        }
        if(currentProblemSideB[i].match(/([A-Za-z])/)){
          countSideBVariables++;
        }
      }

      console.log("currentProblemSideA: " + currentProblemSideA);
      console.log("currentProblemSideB: " + currentProblemSideB);

      if(countSideA == countSideB){
        if(countSideA == 1){
          if(countSideAVariables == 1  && !currentProblemSideA.toString().match(/\d/) || countSideBVariables == 1  && !currentProblemSideB.toString().match(/\d/)){
            //problem is over
            //break;
            stepListItem = "Problem Solved";
            console.log("Problem is over");
          }
          if(currentProblemSideA.toString().match(/\d/) && currentProblemSideA.toString().match(/[A-Za-z]/) && !currentProblemSideA.toString().match(/\//)){
            //divide away number from side A
            stepListItem = "Divide both sides by ";
            console.log("Should DIVIDE currentProblemSideA in if when countSideA == countSideB: " + currentProblemSideA.toString());
            if(currentProblemSideA.toString().charAt(0) == "-"){
              temp = "/(-" + currentProblemSideA.toString().match(/\d/g) + ")";
              stepListItem += "negative ";
            } else {
              temp = "/(" + currentProblemSideA.toString().match(/\d/g) + ")";
            }
            stepListItem += currentProblemSideA.toString().match(/\d/g)

          } else if (currentProblemSideB.toString().match(/\d/) && currentProblemSideB.toString().match(/[A-Za-z]/) && !currentProblemSideB.toString().match(/\//)) {
            console.log("DIVIDE away currentProblemSideB");
            stepListItem = "Divide both sides by ";
            if(currentProblemSideB.toString().charAt(0) == "-"){
              temp = "/(-" + currentProblemSideB.toString().match(/\d/g) + ")"
              stepListItem += "negative ";
            } else {
              temp = "/(" + currentProblemSideB.toString().match(/\d/g) + ")";
            }
            stepListItem += currentProblemSideB.toString().match(/\d/g);
          } else if (currentProblemSideA.toString().match(/\//) && currentProblemSideA.toString().match(/[A-Za-z]/)) {
            console.log("multiply by reciprocal (SideA)");
            stepListItem = "Multiply both sides by ";
            if(currentProblemSideA.toString().charAt(0) == "-"){
              negSign = "-";
              stepListItem += "negative ";
            }
            var reciprocalPrep = currentProblemSideA.toString().replace(/[A-Za-z]/,'');
            reciprocalPrep = reciprocalPrep.replace(/-/, '');
            stepListItem += reciprocalPrep.toString();
            reciprocalPrep = reciprocalPrep.split(/\//);

            temp = "*(" + negSign +  reciprocalPrep[1].toString() + "/" + reciprocalPrep[0].toString() + ")";

          } else if (currentProblemSideB.toString().match(/\//) && currentProblemSideB.toString().match(/[A-Za-z]/)) {
            console.log("multiply by reciprocal (SideB)");
            stepListItem = "Multiply both sides by ";
            if(currentProblemSideB.toString().charAt(0) == "-"){
              negSign = "-";
              stepListItem += "negative ";
            }

            var reciprocalPrep = currentProblemSideB.toString().replace(/[A-Za-z]/,'');
            reciprocalPrep = reciprocalPrep.replace(/-/, '');
            stepListItem += reciprocalPrep.toString();
            reciprocalPrep = reciprocalPrep.split(/\//);

            temp = "*(" + negSign + reciprocalPrep[1].toString() + "/" + reciprocalPrep[0].toString() + ")";

          }
        } else { //assumes countSideA and countSideB is the same but they contain more than one term
          console.log("countSideA and countSideB is the same but they contain more than one term");
          if(currentProblemSideA[0] == "-"){
            temp = "+" + currentProblemSideA[1];
            stepListItem = "Add " + currentProblemSideA[1];
          } else {
            temp = "-" + currentProblemSideA[0];
            stepListItem = "Subtract " + currentProblemSideA[0];
          }
          stepListItem += " from both sides";

        }

      } else {//else if countSideA != countSideB {...}
      console.log("countSideA != countSideB");
      if(countSideA > countSideB && countSideBVariables > 0){
        temp = tempSetup(currentProblemSideA);
      } else if (countSideA < countSideB && countSideAVariables > 0){
        temp = tempSetup(currentProblemSideB);
      } else if(countSideA > countSideB && countSideBVariables == 0){
        temp = tempSetup2(currentProblemSideA);
      } else if (countSideA < countSideB && countSideAVariables == 0) {
        temp - tempSetup2(currentProblemSideB);
      }
    }

    console.log("temp: " + temp);
    prePushToCurrentProblem(temp);
    problemListHolder = this.state.currentProblem;
    problemListHolder.push(myCurrentProblem);
    stepListHolder = this.state.stepList;
    stepListHolder.push(stepListItem);
    console.log("problemListHolder: " + problemListHolder);
    this.setState({
      currentProblem: problemListHolder,
      stepList: stepListHolder
    });

  }

}

render(){
  return(
    <div className="col-xs-12">
      <div className="col-xs-6">
        <ProblemList myProblem={this.state.currentProblem} />
      </div>
      <div className="col-xs-6">
        <ProblemList className="col-xs-6" myProblem={this.state.stepList} />
      </div>
      <button className="btn btn-primary col-xs-12" onClick={this.handleSimplify}>Simplify</button>
    </div>
  )
}

}

module.exports = ProblemContainer;
