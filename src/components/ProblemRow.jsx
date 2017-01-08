var React = require('react');
var ReactDOM = require('react-dom');

var ProblemRow = React.createClass({
  getInitialState:function(){
    return  {currentProblem: null};
  },
  componentWillReceiveProps: function(){
    this.setState({currentProblem: this.props.problem});
    console.log("componentWillReceiveProps: " + this.state.currentProblem);
  },
  render: function(){



    //TODO: this works (kindof) return <div>{this.props.problem}</div>
    return <div>{this.state.currentProblem}</div>

    //  return ReactDOM.render(<div>Test{this.state.currentProblem}</div>, document.getElementById('problem'));
  }
});

module.exports = ProblemRow;
