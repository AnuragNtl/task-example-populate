    
var sampleGraph = {
   id:426,
   description: "Sample Graph",
   taskList: [
     {
       id: 427,
       description: "Sample Node 1";
     },
     {
       id: 427,
       description: "Sample Node 2";
     },
     {
       id: 427,
       description: "Sample Node 3";
     }
    ]
 };

    export const NOTIFY_GRAPH_FETCHING = "notifyGraphFetching";
    export const GRAPH_FETCH_ERROR = "graphFetchError";
    export const GRAPH_FETCH_COMPLETED = "graphFetchCompleted";
    export const SELECT_POINT = "selectValue";
    export const ENTER_VALUE = "enterValue";
    export const CREATE_NEW_EXAMPLE_PANEL = "createNewExamplePanel";
    export const EDIT_EXISTING_EXAMPLE_PANEL = "editExistingPanel";

export function getGraph(searchDetails) {
  return {type: GET_GRAPH, searchDetails};
}

export function notifyGraphFetching() {
  return {type: NOTIFY_GRAPH_FETCHING};
}

export function graphFetchCompleted(graphData) {
  return {type: GRAPH_FETCH_COMPLETED, graphData};
}

export function graphFetchError() {
  return {type: GRAPH_FETCH_ERROR};
}



export async function fetchGraph(graphSearchData) {
  
  return await new Promise((resolve, reject) => {

    setTimeout(() => {
      resolve(sampleGraph);
    }, 2000);

  });
}

