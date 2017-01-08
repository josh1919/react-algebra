var React = require('react');
var ReactDOM = require('react-dom');//TODO Delete this line
var algebra = require('algebra.js');//TODO delete this line
var ProblemRow = require('./ProblemRow.jsx');

var InitialSetup = React.createClass({
  getInitialState:function(){
    return {exportArray:[], newElementString:''};
  },
  onChange: function(e){
    this.setState({newElementString: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    /* TODO Eventual bug fixes and likely errors:
    *  should not submit empty field
    *  only one variable
    *  for now will expect "x" as variable, should be allowed to use any
    */

    //remove whitespace
    var preArray = this.state.newElementString.replace(/ /g, '');
    //TODO check to see there is only one kind of variable
    //will split string at any found operator or equal sign but leave the delimiter
    var numArray = preArray.split(/([-\+\*\/=])/g);
    this.setState({exportArray: numArray});
  //  ReactDOM.render(<ProblemRow problem={this.state.exportArray} />, document.getElementById('problem'));

  },
  render: function(){

    var divStyle = {
      marginTop: 10,
    };

    return (
      <div style={divStyle} className="col-xs-12 col-sm-12">
        <div className="panel panel-primary">
          <div className="panel-heading">
            <h3>Algebra Problem Solver</h3>
          </div>
          <div className="row panel-body">
            <form onSubmit={this.handleSubmit}>
              <div className="col-sm-9">
                <input className="form-control" onChange={this.onChange} value={this.state.newElementString} />
              </div>
              <div className="col-sm-2">
                <button className="btn btn-primary">Submit</button>
              </div>
            </form>
          </div>
          <ProblemRow>ItsMyProblem</ProblemRow>
        </div>
      </div>
    )
  }


});

module.exports = InitialSetup;
