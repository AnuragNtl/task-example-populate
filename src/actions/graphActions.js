
import ApolloBoost, {gql} from 'apollo-boost';

const server = new ApolloBoost({
    uri: 'http://localhost:8082/graph' 
});

const getAllGraphIdsQuery = gql `
query {
    getAllTaskIds
}
`;

/*const getTaskQuery  = gql `

 getTask(id:$graphId, taskId:$subtaskId) {
    id,
    taskList,
    properties {
      key,
      value
    }
  }
}
*/

export const GRAPH_PROCESSING_STARTED = "notifyGraphFetching";
export const GRAPH_FETCH_ERROR = "graphFetchError";
export const GRAPH_FETCH_COMPLETED = "graphFetchCompleted";


export function notifyGraphFetching() {
    return {type:GRAPH_PROCESSING_STARTED};
}

export function graphFetchCompleted(graphFetchType, graphData) {
    return {type: GRAPH_FETCH_COMPLETED, data: graphData, graphFetchType: graphFetchType};
}

export function graphFetchError(e) {
    return {type: GRAPH_FETCH_ERROR, error: e};
}


export const GRAPH_FETCH_TYPE_ID = "graphFetchTypeId";
export const GRAPH_FETCH_TYPE_TASK = "graphFetchTypeTask";
export const GRAPH_FETCH_TYPE_UPDATE = "graphFetchTypeUpdate";

const TASK_SERVICE_ENDPOINT = "http://localhost:8082/graph";
const GET_TASK_BY_ID_PATH = TASK_SERVICE_ENDPOINT + '/';
const UPDATE_TASK_PATH = TASK_SERVICE_ENDPOINT + "/";


export function fetchAllGraphIds() {
    return dispatch => {
       dispatch(notifyGraphFetching());
        let query = getAllGraphIdsQuery;
       server.query({query}).then(data => 
           {
               dispatch(graphFetchCompleted(GRAPH_FETCH_TYPE_ID, data.data.getAllTaskIds));
           }
       ).catch(e => dispatch(graphFetchError(e)));
    }
}

/*export function fetchGraph(graphSearchData) {

    return (dispatch) => {

        dispatch(notifyGraphFetching());
        ser
        
            dispatch(graphFetchCompleted(graphSearchData));
    }
}
*/

