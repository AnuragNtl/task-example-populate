import "./actions/constants";



function graph(state = {}, action) {
  switch(action.type) {
    case GET_GRAPH: return Object.assign({}, state, {graphStatus: GRAPH}) 
      break;
    case GRAPH_PROCESSING: return 
  }
}

