var React = require('react');
var algebra = require("algebra.js");
var ProblemList = require('./ProblemList.jsx');
var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

class ProblemContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentProblem:[this.props.myProblem],
      stepList: [this.props.stepList],
      finale: false,
      problemType: null
    };
    this.handleSimplify = this.handleSimplify.bind(this);
    this.handleHandler = this.handleHandler.bind(this);
    console.log('initial constructor');
  }
  componentWillMount(){
    if(this.state.currentProblem[0].match(/=/) != null && this.state.currentProblem[0].match(/[A-Za-z]/) != null){
      this.handleSimplify();
    } else {
      this.handleExpression();
    }

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

//  Decide if expression or equation
  handleHandler(){
    if(this.state.currentProblem[this.state.currentProblem.length -1].match(/=/) !== -1){
      this.handleSimplify();
    } else {
      this.handleExpression();
    }
  }
  //simplifies expressions
  handleExpression(){    
    let currentExpression = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString().replace(/ /g, '');
    let currentExpressionList = this.state.currentProblem;
    currentExpressionList.push(currentExpression);
    let currentExpressionStepList = this.state.stepList;
    currentExpressionStepList.push("Simplify");
    this.setState({
      currentProblem:currentExpressionList,
      stepList:currentExpressionStepList,
      finale: true,
      problemType:"Expression has been simplified"
    })

  }

  //simplifies equations
  handleSimplify(){
    var temp;
    var problemListHolder;
    var stepListHolder;
    var myCurrentProblem = this.state.currentProblem[this.state.currentProblem.length -1].replace(/ /g, '');
    var myStateProblemInput = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString().replace(/ /g, '');
    var prePush;
    var negSign = '';
    var currentProblemSplit;
    var currentProblemSideA;
    var currentProblemSideB;
    var countSideA;
    var countSideAVariables;
    var countSideB;
    var countSideBVariables;
    var stepListItem = 'currently undefined: fix';

    function prePushToCurrentProblem(item){
      currentProblemSideA.push(item);
      currentProblemSideB.push(item);
      currentProblemSideA = currentProblemSideA.toString();
      currentProblemSideB = currentProblemSideB.toString();
      myCurrentProblem = currentProblemSideA + "=" + currentProblemSideB;
      myCurrentProblem = myCurrentProblem.replace(/,/g, '');
      myCurrentProblem = myCurrentProblem.replace(/ /g, '');
    }

    function problemSplitSidesAndCount(){
      currentProblemSplit = myCurrentProblem.split(/=/);
      currentProblemSideA = currentProblemSplit[0];
      currentProblemSideB = currentProblemSplit[1];

      //break up into array elements and count terms for SideA
      countSideA = 0
      countSideAVariables = 0
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
      countSideB = 0;
      countSideBVariables = 0;
      currentProblemSideB = currentProblemSideB.split(/([-\+\*])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideB[0] === "" || currentProblemSideB[0] === " "){
        currentProblemSideB.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideB.length; i++) {
        if(!currentProblemSideB[i].match(/([-\+\*])/)){
          countSideB++;
        }
        if(currentProblemSideB[i].match(/([A-Za-z])/)){
          countSideBVariables++;
        }
      }
    }

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
      //
      problemSplitSidesAndCount();

      console.log("currentProblemSideA: " + currentProblemSideA);
      console.log("currentProblemSideB: " + currentProblemSideB);

      if(countSideA == countSideB){
        if(countSideA == 1){

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
            stepListItem += currentProblemSideA.toString().match(/\d/g);

          } else if (currentProblemSideB.toString().match(/\d/) && currentProblemSideB.toString().match(/[A-Za-z]/) && !currentProblemSideB.toString().match(/\//)) {
            console.log("DIVIDE away currentProblemSideB");
            stepListItem = "Divide both sides by ";
            if(currentProblemSideB.toString().charAt(0) == "-"){
              temp = "/(-" + currentProblemSideB.toString().match(/\d/g) + ")";
              stepListItem += "negative ";
            } else {
              temp = "/(" + currentProblemSideB.toString().match(/\d/g) + ")";
            }
            stepListItem += currentProblemSideB.toString().match(/\d/g);
          } else if (currentProblemSideA.toString().match(/\//g) && currentProblemSideA.toString().match(/[A-Za-z]/g)) {
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
    stepListHolder.push(stepListItem.replace(/,/,''));
    console.log("problemListHolder: " + problemListHolder);
    this.setState({
      currentProblem: problemListHolder,
      stepList: stepListHolder,
      problemType:"Problem Solved"
    });

  }

  myCurrentProblem = this.state.currentProblem[this.state.currentProblem.length -1].replace(/ /g, '');
  problemSplitSidesAndCount();

  if(countSideA == countSideB && countSideA == 1){
    //finale = false;
    if(countSideAVariables == 1  && !currentProblemSideA.toString().match(/\d/) || countSideBVariables == 1  && !currentProblemSideB.toString().match(/\d/)){
      //problem is over
      this.setState({finale: true});
      stepListItem = "Problem Solved";
      console.log("Problem is over");

    } else if (currentProblemSideA.toString().replace(/ /g, '') == currentProblemSideB.toString().replace(/ /g, '') && countSideAVariables + countSideBVariables == 0 ) {
      this.setState({finale: true});
      console.log("infinite solutions");
      stepListItem = "Problem finished, infinite solutions";
    } else if (currentProblemSideA.toString().replace(/ /g, '') !=  currentProblemSideB.toString().replace(/ /g, '') && countSideAVariables + countSideBVariables == 0 ) {
      this.setState({finale: true});
      console.log("No Soution");
      stepListItem = "Problem finished, no solution";

    }
    if(this.state.finale == true){
      stepListHolder = this.state.stepList;
      stepListHolder.push(stepListItem);
      this.setState({
        stepList: stepListHolder
      });
    }
  }
}

render(){
  let divStyle={
    backgroundImage: 'linear-gradient(to bottom,#337ab7 0,#2e6da4 100%)',
    color:'white'
  }
  return(
    <div className="col-xs-12">
    <div className="col-xs-6">
    <ProblemList myProblem={this.state.currentProblem} />
    </div>
    <div className="col-xs-6">
    <ProblemList className="col-xs-6" myProblem={this.state.stepList} />
    </div>

    {
      this.state.finale == true ?
      <div className="col-xs-12 text-center" style={divStyle}>
      <h2>{this.state.problemType}</h2>
      <h2>{this.state.currentProblem[this.state.currentProblem.length -1]}</h2>
      </div>
      :
      <button className="btn btn-primary col-xs-12" onClick={this.handleHandler}>Next Step</button>
    }
    </div>
    )
}

}

module.exports = ProblemContainer;