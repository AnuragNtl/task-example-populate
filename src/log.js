import React from 'react';
import {connect} from 'react-redux';
import {GRAPH_PROCESSING, GRAPH_FETCH_COMPLETED} from "./actions/actions";
import {fetchAllGraphIds} from "./actions/graphActions";
import {GRAPH_STATES} from "./actions/constants";

class Log extends React.Component {
  
  constructor(props) {
    super(props);
  }

    :
  render() {
    return (
      <div className="log">
       <h2 class="status">
      {this.props.status}
        </h2>
      <br />
      {this.props.graphIds.map( graphId => ( <a onClick={() =>{}}>{graphId + " > "}</a> ))}
      <br />
      <button onClick={() => this.props.dispatch(fetchAllGraphIds())}>::</button>
      </div>
    );
  }
};

function mapStateToProps(state) {
  return { status: state.graphStatus, graphIds: state.graph.graphIdList ? state.graph.graphIdList : []};
}

function mapDispatchToProps(dispatch, state) {
    console.log("own = " + JSON.stringify(state));
  return {
    changeStatus: () => dispatch({value: (Math.random()), type: "graphFetchCompleted" })
  };
}

export default connect(mapStateToProps)(Log);

