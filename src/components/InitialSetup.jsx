var React = require('react');
var ReactDOM = require('react-dom');
var algebra = require('algebra.js');

var InitialSetup = React.createClass({
  getInitialState:function(){
    return {newElementString:''};
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

  //TODO The magic of the setup happens here then moves to the next step <Item />

//remove whitespace
var preArray = this.state.newElementString.replace(/ /g, '');
//TODO check to see there is only one kind of variable
//will split string at any found operator or equal sign but leave the delimiter
var numArray = preArray.split(/([-\+\*\/=])/g);
      //console.log(operatorArray);
      console.log(numArray);

  },
  render: function(){

      var divStyle = {
        marginTop: 10,
      };

      return (
        <div style={divStyle} className="col-xs-12 col-sm-6">
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
             {/*<List items={this.state.items} /> TODO Will need next step of problem to continue */}
          </div>
        </div>
      )
    }


});

module.exports = InitialSetup;
