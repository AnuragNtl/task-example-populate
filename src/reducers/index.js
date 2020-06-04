import * as k from  "../actions/graphActions";
import {GRAPH_STATES} from "../actions/constants";
import { combineReducers } from 'redux';

export function graphStatus(state = {graphStatus:"none"}, action) {
    let statusText = state;
    const {GRAPH_PROCESSING_STARTED, GRAPH_FETCH_COMPLETED, GRAPH_FETCH_ERROR, GRAPH_FETCH_TYPE_UPDATE_COMPLETED} = k;
    switch(action.fetchStatus) {
        case GRAPH_PROCESSING_STARTED : graphStatus = {statusText: GRAPH_STATES.FETCHING};
            break;
        case GRAPH_FETCH_ERROR: 
            graphStatus = {statusText:GRAPH_STATES.FETCH_ERROR, error: action.error};
            break;
        case GRAPH_FETCH_TYPE_UPDATE_COMPLETED:
            graphStatus = {statusText:action.status};
            break;
        case GRAPH_FETCH_COMPLETED: graphStatus = {statusText:GRAPH_STATES.FETCHED};
            break;
        default:
            return state;
            break;
    }
    return Object.assign({}, state, {...graphStatus});
        
}


export function taskPath(state = [], action) {

    switch(action.type) {
        case k.EMPTY_TASK_LIST: return [];
            break;
        case k.GRAPH_FETCH_TYPE_TASK_COMPLETED:
            let path = [];
           if(action.isFetchedBefore) 
                path = state.slice(0, state.map(p => p.taskId).indexOf(parseInt(action.data.id)) + 1);
            else {
                path = state.concat([{taskId: action.data.id, description: action.data.description}]);
                console.log(graph.taskPath + " " + JSON.stringify(path));
            }
            return path;
            break;
        default:
            return state;
    }
}

function graphIdList(state = [], action) {
   if(action.type == k.GRAPH_FETCH_TYPE_ID_COMPLETED)
        return action.data;
    return state;
}


function properties(state = [], action) {
    if(k.GRAPH_FETCH_TYPE_TASK_COMPLETED == action.type) {
        return action.data.properties;
    }

    switch(action.type) {
        case k.VALUE_CHANGE: 
            let propertyList = [].concat(state);
            let property = propertyList.filter(p => p.key == action.key);
            if(property.length > 0) {
                property = property[0];
                property.value = action.value;
            }
            return propertyList;
        default:
            return state;
    }
    return state;
}


function id(state = null, action) {
    if(k.GRAPH_FETCH_TYPE_TASK_COMPLETED == action.type) {
        return action.data.id;
    }
    return state;
}

function graphId(state = null, action) {
    if(k.GRAPH_FETCH_TYPE_TASK_COMPLETED == action.type) {
        return action.data.graphId;
    }
    return state;
}


function taskList(state = [], action) {
    if(k.GRAPH_FETCH_TYPE_TASK_COMPLETED == action.type) {
        return action.data.taskList;
    }
    return state;
}

const task = combineReducers({
properties,
id,
taskList,
graphId
});

const graph = combineReducers({
    taskPath,
    task
});

const graphApp = combineReducers({
    graph,
    graphIdList,
    graphStatus
});

export default graphApp;

