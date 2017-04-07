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
    this.onReset = this.onReset.bind(this);
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
    //Input validation
    if(!preArray.match(/[a-z][a-z]|[A-Z][A-Z]|[A-Z][a-z]|[a-z][A-Z]/g)){//if it does not contain two variables in a row continue

      this.setState({
        currentInput: preArray,
        stepList: "Initial Problem",
        submitted: true
      });

    } else {//if input invalid
      this.setState({
        submitted: false
      })
      alert("input invalid, try something else");
    }
  };

  render(){
    let divStyle={margin:10,};

    return (

      <div className='row' style={divStyle}>
        {!this.state.submitted ?
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className='input-group'>

              <input className='form-control' onChange={this.onChange.bind(this)} value={this.state.currentInput}/>
              <span className='input-group-btn'>
                <button className='btn btn-primary'>Submit</button>
              </span>
            </div>
          </form>
          :
          <div>
            <div className="col-xs-9 text-right">{this.state.currentInput}</div>
            <button className="btn" onClick={this.onReset}>Reset</button>
          </div>
        }
        {this.state.submitted ? <ProblemContainer myProblem={this.state.currentInput} stepList={this.state.stepList} /> : null}

      </div>

    )
  }
}

module.exports = EnterProblem;
