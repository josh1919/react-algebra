var React = require('react');
var EnterProblem = require('./EnterProblem.jsx');

class First extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    let divStyle={
      margin:10,
    };
    return(
      <div style={divStyle} className="panel panel-primary col-sm-6">
        <div style={divStyle} className="panel-heading">
          <h3>Algebra Problem Solver</h3>
        </div>
        <EnterProblem />
      </div>
    )
  }
}

module.exports = First;
