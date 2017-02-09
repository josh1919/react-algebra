var React = require('react');
var EnterProblem = require('./EnterProblem.jsx');

class MainContainer extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    let divStyle={
      margin:10,
    };
    return(
      <div className='container'>
        <div style={divStyle} className="panel panel-primary col-xs-12 col-sm-9 col-md-6">
          <div style={divStyle} className="panel-heading">
            <h3>Basic Algebra Problem Solver</h3>
          </div>
          <EnterProblem />
        </div>
      </div>
    )
  }
}

module.exports = MainContainer;
