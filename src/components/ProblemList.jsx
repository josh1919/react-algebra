var React = require('react');
var ProblemListItem = require('./ProblemListItem.jsx');

class ProblemList extends React.Component{
  constructor(props){
    super(props);
  }
  render() {

    var createItem = function(text, index) {
      return <ProblemListItem key={index} text={text} />;
    };
    return (<ul>{this.props.myProblem.map(createItem)}</ul>)
  }
}

module.exports = ProblemList;
