
import ApolloBoost, {gql} from 'apollo-boost';

const server = new ApolloBoost({
	uri: 'http://localhost:8082/graph' 
});

const getAllGraphIdsQuery = gql `
query {
    getAllTaskIds
}
`;

const getTaskQuery  = data => gql `
 query {
 getTask(id: "${data.id}", taskId: ${data.taskId}) {
    id,
    taskList {
      taskId,
      description
    },
    properties {
      key,
      value
    }
  }
}
`
const propertiesGql = properties => "[" + properties.map( ({key, value}) =>
    `{key:"${key}",\n value:"${value}"}\n`).join(",") + "]";
    

const updateTaskQuery = ({id, task}) => gql `

mutation
{
  updateValues(id:"${id}", task: {
    properties: ${propertiesGql(task.properties)},
    id: ${task.id} 
  }) {
    status,
    message
  }
}
`;

const duplicateTaskQuery = ({id, taskId}) => gql `

mutation {
  duplicateEntry(id:"${id}", taskId:${taskId}) {
    message
    status
  }
}
`;

export const GRAPH_PROCESSING_STARTED = "notifyGraphFetching";
export const GRAPH_FETCH_ERROR = "graphFetchError";
export const GRAPH_FETCH_COMPLETED = "graphFetchCompleted";
export const EMPTY_TASK_LIST = "emptyTaskList";
export const GRAPH_STATUS = "graphStatus";


export function notifyGraphFetching() {
    return {type:GRAPH_STATUS, fetchStatus:GRAPH_PROCESSING_STARTED};
}

export function graphFetchCompleted(graphFetchType, graphData, isFetchedBefore) {
    let description;
    if(graphFetchType == GRAPH_FETCH_TYPE_TASK_COMPLETED) {
        description = graphData.properties.filter(({key}) => key == "description");
        if(description.length == 0) {
                    description = "Desc" + graphData.id.toString();
        } else {
            description = description[0].value;
        }
    }
    graphData.description = description;
    return {type: graphFetchType, data: graphData, isFetchedBefore, fetchStatus:GRAPH_FETCH_COMPLETED};
}

export function graphFetchError(e) {
    return {type:GRAPH_STATUS, fetchStatus: GRAPH_FETCH_ERROR, error: e};
}


export const GRAPH_FETCH_TYPE_ID_COMPLETED = "graphFetchTypeId";
export const GRAPH_FETCH_TYPE_TASK_COMPLETED = "graphFetchTypeTask";
export const GRAPH_FETCH_TYPE_UPDATE_COMPLETED = "graphFetchTypeUpdate";

const TASK_SERVICE_ENDPOINT = "http://localhost:8082/graph";
const GET_TASK_BY_ID_PATH = TASK_SERVICE_ENDPOINT + '/';
const UPDATE_TASK_PATH = TASK_SERVICE_ENDPOINT + "/";


export function fetchAllGraphIds() {
    return dispatch => {
       dispatch(notifyGraphFetching());
        let query = getAllGraphIdsQuery;
       server.query({query}).then(data => 
           {
               dispatch(graphFetchCompleted(GRAPH_FETCH_TYPE_ID_COMPLETED, data.data.getAllTaskIds));
           }
       ).catch(e => dispatch(graphFetchError(e)));
    }
}

export function fetchGraph(graphId, taskId = null, isFetchedBefore = false, emptyTasks = false) {
    return dispatch => {
        if(emptyTasks) {
            dispatch(emptyTaskList());
        }
        dispatch(notifyGraphFetching());
        let query = getTaskQuery({id:graphId, taskId});
        server.query({query}, {id:graphId}).then(data => 
            {
            data.data.getTask.graphId = graphId;
            dispatch(graphFetchCompleted(GRAPH_FETCH_TYPE_TASK_COMPLETED, data.data.getTask, isFetchedBefore))
            }
        ).catch(e =>
            dispatch(graphFetchError(e))
        );
    };
}

function notifyGraphCompletion(status, message) {
    return {type: GRAPH_STATUS, fetchStatus : GRAPH_FETCH_TYPE_UPDATE_COMPLETED, status, message};
}

export function updateGraph(graphId, task) {

    return dispatch => {
        dispatch(notifyGraphFetching());
        let mutation = updateTaskQuery({id:graphId, task});
        server.mutate({mutation}).then(data => {
        
            dispatch(notifyGraphCompletion(data.data.updateValues.status));
            
        }).catch(err => dispatch(graphFetchError(err)));
    };
}

export function duplicateEntry(graphId, taskId) {
    return dispatch => {
        dispatch(notifyGraphFetching());
        let mutation = duplicateTaskQuery({id:graphId, taskId});
        server.mutate({mutation}).then(data => {

            dispatch(notifyGraphCompletion(data.data.duplicateEntry.status));
        }).catch(err => dispatch(graphFetchError(err)));
    };
}

export function fetchGraphBack(graphId, taskId = 0) {

    return fetchGraph(graphId, taskId, true);
}

export function emptyTaskList() {

    return {type: EMPTY_TASK_LIST};
}

export const VALUE_CHANGE = "valueChange";

export function valueChange(key, value) {
    return (dispatch) => dispatch({type: VALUE_CHANGE, key, value});
}


