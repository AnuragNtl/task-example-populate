import * as k from  "../actions/graphActions";
import {GRAPH_STATES} from "../actions/constants";


export function graph(state = {graphStatus:"none", graph: {}}, action) {
  switch(action.type) {
    case k.GRAPH_PROCESSING_STARTED: return Object.assign({}, state, {graphStatus: GRAPH_STATES.FETCHING}); 
      break;
      case k.GRAPH_FETCH_COMPLETED: return Object.assign({}, state, {graphStatus: GRAPH_STATES.FETCHED, graph: updateGraphProperties(state.graph, action.data, action.graphFetchType)});
      break;
      case k.GRAPH_FETCH_ERROR:
          alert(action.error);
          return Object.assign({}, state, {graphStatus: GRAPH_STATES.FETCH_ERROR, error: action.error});
      break;
    default: return  state;
  }
}

function updateGraphProperties(oldGraph, graphData, graphFetchType) {

    let graph = {};

    switch(graphFetchType) {
        
        case k.GRAPH_FETCH_TYPE_ID:
            graph.graphIdList = graphData;
            break;
        case k.GRAPH_FETCH_TYPE_TASK:
            graph.task = graphData;
            break;

    }
    return Object.assign({}, oldGraph, graph);
}


