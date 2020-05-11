import React from 'react';
import {connect} from 'react-redux';
import {GRAPH_PROCESSING, GRAPH_FETCH_COMPLETED} from "./actions/actions";
import {fetchGraph} from "./actions/actions";
import {GRAPH_STATES} from "./actions/constants";

class Log extends React.Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="log">
      {this.props.status}
      <br />
      {this.props.value * 4}
      <br />
      <button onClick={() => this.props.dispatch(fetchGraph(4))}>::</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { status: state.graphStatus, value : state.value};
}

function mapDispatchToProps(dispatch, state) {
    console.log("own = " + JSON.stringify(state));
  return {
    changeStatus: () => dispatch({value: (Math.random()), type: "graphFetchCompleted" })
  };
}

export default connect(mapStateToProps)(Log);

