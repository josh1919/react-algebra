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
      currentProblem:[this.props.myProblem]
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
        currentProblem: [nextProps.myProblem]
      });
    }
  }

  handleSimplify(){
    var temp;
    var problemListHolder;
    var myCurrentProblem = this.state.currentProblem[this.state.currentProblem.length -1];
    var myStateProblemInput = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString();
    var prePush;
    var negSign = '';
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

    if(myCurrentProblem !== myStateProblemInput){
      problemListHolder = this.state.currentProblem;
      problemListHolder.push(myStateProblemInput);
      this.setState({
        currentProblem: problemListHolder
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

      if(countSideA == countSideB){//TODO 2/22 Multiply away the reciprocal
        if(countSideA == 1){
          if(countSideAVariables == 1  && !currentProblemSideA.toString().match(/\d/) || countSideBVariables == 1  && !currentProblemSideB.toString().match(/\d/)){
            //problem is over
            //break;
            console.log("Problem is over");
          }
          if(currentProblemSideA.toString().match(/\d/) && currentProblemSideA.toString().match(/[A-Za-z]/) && !currentProblemSideA.toString().match(/\//)){ // Divide or multiply away to simplify
            //divide away number from side A
            console.log("Should DIVIDE currentProblemSideA in if when countSideA == countSideB: " + currentProblemSideA.toString());
            if(currentProblemSideA.toString().charAt(0) == "-"){
              temp = "/(-" + currentProblemSideA.toString().match(/\d/g) + ")"
            } else {
              temp = "/(" + currentProblemSideA.toString().match(/\d/g) + ")";
            }

          } else if (currentProblemSideB.toString().match(/\d/) && currentProblemSideB.toString().match(/[A-Za-z]/) && !currentProblemSideB.toString().match(/\//)) {
            console.log("DIVIDE away currentProblemSideB");
            if(currentProblemSideB.toString().charAt(0) == "-"){
              temp = "/(-" + currentProblemSideB.toString().match(/\d/g) + ")"
            } else {
              temp = "/(" + currentProblemSideB.toString().match(/\d/g) + ")";
            }
          } else if (currentProblemSideA.toString().match(/\//) && currentProblemSideA.toString().match(/[A-Za-z]/)) {
            console.log("multiply by reciprocal (SideA)");
            if(currentProblemSideA.toString().charAt(0) == "-"){
              negSign = "-";
            }
            var reciprocalPrep = currentProblemSideA.toString().replace(/[A-Za-z]/,'');
            reciprocalPrep = reciprocalPrep.replace(/-/, '');
            reciprocalPrep = reciprocalPrep.split(/\//);

            temp = "*(" + negSign +  reciprocalPrep[1].toString() + "/" + reciprocalPrep[0].toString() + ")";

          } else if (currentProblemSideB.toString().match(/\//) && currentProblemSideB.toString().match(/[A-Za-z]/)) {
            console.log("multiply by reciprocal (SideB)");
            if(currentProblemSideB.toString().charAt(0) == "-"){
              negSign = "-";
            }

            var reciprocalPrep = currentProblemSideB.toString().replace(/[A-Za-z]/,'');
            reciprocalPrep = reciprocalPrep.replace(/-/, '');
            reciprocalPrep = reciprocalPrep.split(/\//);

            temp = "*(" + negSign + reciprocalPrep[1].toString() + "/" + reciprocalPrep[0].toString() + ")";

          }
        } else { //assumes countSideA and countSideB is the same but they contain more than one term
          console.log("countSideA and countSideB is the same but they contain more than one term");
          if(currentProblemSideA[0] == "-"){
            temp = "+" + currentProblemSideA[1];
          } else {
            temp = "-" + currentProblemSideA[0];
          }

        }

      } else {//else if countSideA != countSideB {...}
      console.log("countSideA != countSideB");
      if(countSideA > countSideB && countSideBVariables > 0){
        for (var i = 0; i < currentProblemSideA.length; i++) {
          if(currentProblemSideA[i].match(/[A-Za-z]/) ){
            if(currentProblemSideA[i-1] == null){
              temp = "-"
            } else {
              temp = "+"
            }
            temp = temp + currentProblemSideA[i];
            break;
          }
        }
      } else if (countSideA < countSideB && countSideAVariables > 0){
        for (var i = 0; i < currentProblemSideB.length; i++) {
          if(currentProblemSideB[i].match(/[A-Za-z]/)){
            if(currentProblemSideB[i-1] == null){
              temp = "-"
            } else {
              temp = "+"
            }
            temp = temp + currentProblemSideB[i];
            break;
          }
        }
      } else if(countSideA > countSideB && countSideBVariables == 0){
        for (var i = 0; i < currentProblemSideA.length; i++) {
          if(currentProblemSideA[i].match(/\d/) && !currentProblemSideA[i].match(/[A-Za-z-\+\*\/]/)){
            if(currentProblemSideA[i-1] == null || currentProblemSideA[i-1] == "+"){
              temp = "-"
            } else {
              temp = "+"
            }
            temp = temp + currentProblemSideA[i];
            break;
          }
        }
      } else if (countSideA < countSideB && countSideAVariables == 0) {
        for (var i = 0; i < currentProblemSideB.length; i++) {
          if(currentProblemSideB[i].match(/\d/) && !currentProblemSideB[i].match(/[A-Za-z-\+\*\/]/)){
            if(currentProblemSideB[i-1] == null || currentProblemSideB[i-1] == "+"){
              temp = "-"
            } else {
              temp = "+"
            }
            temp = temp + currentProblemSideB[i];
            break;
          }
        }
      }
    }

    console.log("temp: " + temp);
    prePushToCurrentProblem(temp);
    problemListHolder = this.state.currentProblem;
    problemListHolder.push(myCurrentProblem);
    console.log("problemListHolder: " + problemListHolder);
    this.setState({
      currentProblem: problemListHolder
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
