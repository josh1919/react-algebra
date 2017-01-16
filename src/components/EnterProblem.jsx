var React = require('react');
var ReactDOM = require('react-dom');
var ProblemRows = require('./ProblemRows.jsx');

class EnterProblem extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      currentInput:'',
      currentProblem:null
    };
  }
  onChange(e){
    this.setState({
      currentInput:e.target.value
    });
  }
  onSubmit(e){
    e.preventDefault();
    //let {} = this.state

    //removes all white space in inputed problem
    var preArray = this.state.currentInput.replace(/ /g, '');
    //TODO check to see there is only one kind of variable
    //will split string at any found operator or equal sign but leave the delimiter
    var numArray = preArray.split(/([-\+\*\/=])/g);
    this.setState({currentProblem: numArray});


    ReactDOM.render(<ProblemRows myProblem={this.state.currentInput}/>, document.getElementById('problem-row'));
    //Does this go after so this render function is not getting something empty?
    this.setState({
      currentInput: ''
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
      </div>

    )
  }
}



module.exports = EnterProblem;
