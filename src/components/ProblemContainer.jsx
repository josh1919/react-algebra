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
      hasSimplified:false
    };
    this.handleSimplify = this.handleSimplify.bind(this);

  }
  componentWillReceiveProps(nextProps){
    if(this.props.myProblem !== nextProps.myProblem){
      this.setState({
        currentProblem: [nextProps.myProblem],
        hasSimplified: false
      });
    }
  }

  handleSimplify(){
    //TODO figure out what to do when I get a division problem
    var myCurrentProblem = this.state.currentProblem[this.state.currentProblem.length -1];
    var myStateProblemInput = algebra.parse(this.state.currentProblem[this.state.currentProblem.length -1]).toString();
    var prePush;
    console.log("*******************************************");
    console.log("this.state.currentProblem: " + this.state.currentProblem);
    console.log("myCurrentProblem: " + myCurrentProblem);
    console.log("myStateProblemInput: " + myStateProblemInput);
    if(myCurrentProblem == myStateProblemInput){
      var currentProblemSplit = myCurrentProblem.split(/=/);
      var currentProblemSideA = currentProblemSplit[0];
      var currentProblemSideB = currentProblemSplit[1];

      //break up into array elements and count terms for SideA
      var countSideA = 0
      var countSideAVariables = 0
      currentProblemSideA = currentProblemSideA.split(/([-\+\*\/])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideA[0] === "" || currentProblemSideA[0] === " "){
        currentProblemSideA.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideA.length; i++) {
        if(!currentProblemSideA[i].match(/([-\+\*\/=])/)){
          countSideA++;
        }
        if(currentProblemSideA[i].match(/([A-Za-z])/)){
          countSideAVariables++;
        }
      }

      //break up into array elements and count terms for SideB
      var countSideB = 0;
      var countSideBVariables = 0;
      currentProblemSideB = currentProblemSideB.split(/([-\+\*\/])/g);
      //remove empty space created if leading term is negative
      if(currentProblemSideB[0] === "" || currentProblemSideB[0] === " "){
        currentProblemSideB.splice(0,1);
      }
      for (var i = 0; i < currentProblemSideB.length; i++) {
        if(!currentProblemSideB[i].match(/([-\+\*\/=])/)){
          countSideB++;
        }
        if(currentProblemSideB[i].match(/([A-Za-z])/)){
          countSideBVariables++;
        }
      }

      console.log("countSideA: " + countSideA);
      console.log("countSideAVariables: " + countSideAVariables);
      console.log("countSideB: " + countSideB);
      console.log("countSideBVariables: " + countSideBVariables);

      //move term from one side to the other // Moves variables to sideA
      if(countSideBVariables > 0){
        console.log("move variables from Side B to Side A");
        //console.log("countSideAVariables > countSideBVariables && (countSideA-countSideAVariables) > (countSideB - countSideBVariables)");
        //move variables to sideA

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
      } else if(countSideA > countSideAVariables) { //TODO fix this so that if the number are on sideA
        //move numbers to sideB
        console.log("countSideA - countSideAVariables > countSideA - countSideBVariables ELSE IF");
        var tempNumTermNum;
        console.log("currentProblemSideA: " + currentProblemSideA);
        for (var i = 0; i < currentProblemSideA.length; i++) {
          if(!currentProblemSideA[i].match(/[A-Za-z\+\*\/=-]/)){
            tempNumTermNum = i;
            break;
          }
        }

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

      } else if(countSideA == countSideB && countSideA == 1){
        console.log("should be division");
        console.log("currentProblemSideA[0]: " + currentProblemSideA[0]);
        //TODO fix these next lines. they are wrong because they assume they are recieving a string [actually receives an array]. I need to fix them to prepare for the Simplification
        // when I go to
         var temp;
        // var divider = currentProblemSideA.match(/\d/g);
        // currentProblemSideA = currentProblemSideA + "/" + divider;

        if(currentProblemSideA[0] == "-"){
          temp = "/(-" + currentProblemSideA[1].match(/\d/g) + ")"
        } else {
          temp = "/(" + currentProblemSideA[0].match(/\d/g) + ")";
        }

        //prePush = prePush + currentProblemSideA[tempNumTermNum];
        console.log("temp before pushed to array: " + temp );
        currentProblemSideA.push(temp);
        currentProblemSideB.push(temp);
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


    } else {
      console.log("Simplification");
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
