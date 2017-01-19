var React = require('react');

class ProblemListItem extends React.Component{
  render(){
    return(
      <li>
        {this.props.text}
      </li>
    )
  }
}


module.exports = ProblemListItem;
