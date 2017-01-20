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
    let divStyle={
      margin:10,
    };

    return (

      <div className='row' style={divStyle}>
        <form onSubmit={this.onSubmit.bind(this)}>
          <div className='input-group'>

            <input className='form-control' onChange={this.onChange.bind(this)} value={this.state.currentInput}/>
            <span className='input-group-btn'>
              <button className='btn btn-primary' >Submit</button>
            </span>
          </div>
        </form>

        {this.state.submitted ? <ProblemContainer myProblem={this.state.currentInput} /> : null}
        <button className="btn col-xs-12" onClick={this.onReset}>Reset</button>
      </div>

    )
  }
}







module.exports = EnterProblem;
