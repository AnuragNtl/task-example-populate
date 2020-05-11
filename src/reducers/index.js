import * as k from  "../actions/actions";
import {GRAPH_STATES} from "../actions/constants";


export function graph(state = {graphStatus:"none", value : 0 }, action) {
  switch(action.type) {
    case k.GRAPH_PROCESSING : return Object.assign({}, state, {graphStatus: GRAPH_STATES.FETCHING}); 
      break;
    case k.GRAPH_FETCH_COMPLETED: return Object.assign({}, state, {graphStatus: GRAPH_STATES.FETCHED, value: (action.value * 4)});
      break;
    default: return  state;
  }
}

