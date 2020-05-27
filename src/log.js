import React from 'react';
import {connect} from 'react-redux';
import {fetchAllGraphIds, fetchGraph} from "./actions/graphActions";
import TaskView from "./TaskView";

class Log extends React.Component {
  
  constructor(props) {
    super(props);
  }

    componentDidMount() {
        this.props.dispatch(fetchAllGraphIds());
    }

  render() {
    return (
      <div className="log">
       <h2 class="status">
      {this.props.status}
        </h2>
      <br />
      {this.props.graphIds.map( graphId => ( <a onClick={() => this.props.dispatch(fetchGraph(graphId))}>{graphId + " > "}</a> ))}
      <br />
       <TaskView /> 
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

