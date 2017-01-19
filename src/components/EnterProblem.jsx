var React = require('react');
var ReactDOM = require('react-dom');
var ProblemContainer = require('./ProblemContainer.jsx');

class EnterProblem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentInput:'',
      submitted: false
    };
    this.onReset = this.onReset.bind(this)
  }
  onReset(){
    this.setState({
      currentInput:'',
      submitted: false
    })
  }
  onChange(e){
    this.setState({
      currentInput:e.target.value
    });
  }

  onSubmit(e){
    e.preventDefault();
    //removes all white space in inputed problem
    var preArray = this.state.currentInput.replace(/ /g, '').toString();
    //TODO check to see there is only one kind of variable


    //ReactDOM.render(<ProblemContainer myProblem={preArray}/>, document.getElementById('problem-row'));
    //Does this go after so this render function is not getting something empty?
    this.setState({
      currentInput: preArray,
      submitted: true
    });
  }
  render(){
    return (

      <div className="panel-body">
        <form onSubmit={this.onSubmit.bind(this)}>

          <div className='row'>

            <input
              type='text'
              onChange={this.onChange.bind(this)}
              value={this.state.currentInput}
              />

            <button className="btn btn-primary">Submit</button>
          </div>
        </form>
          <button className="btn" onClick={this.onReset}>Reset</button>
        {this.state.submitted ? <ProblemContainer myProblem={this.state.currentInput} /> : null}
      </div>

    )
  }
}



module.exports = EnterProblem;
