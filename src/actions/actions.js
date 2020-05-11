    
var sampleGraph = {
   id:426,
   description: "Sample Graph",
   taskList: [
     {
       id: 427,
       description: "Sample Node 1"
     },
     {
       id: 427,
       description: "Sample Node 2"
     },
     {
       id: 427,
       description: "Sample Node 3"
     }
    ]
 };

    
    export const GRAPH_PROCESSING = "notifyGraphFetching";
    export const GRAPH_FETCH_ERROR = "graphFetchError";
    export const GRAPH_FETCH_COMPLETED = "graphFetchCompleted";
    export const SELECT_POINT = "selectValue";
    export const ENTER_VALUE = "enterValue";
    export const CREATE_NEW_EXAMPLE_PANEL = "createNewExamplePanel";
    export const EDIT_EXISTING_EXAMPLE_PANEL = "editExistingPanel";


export function notifyGraphFetching() {
  return {type:GRAPH_PROCESSING};
}

export function graphFetchCompleted(graphData) {
  return {type: GRAPH_FETCH_COMPLETED, value: graphData};
}

export function graphFetchError() {
  return {type: GRAPH_FETCH_ERROR};
}



export function fetchGraph(graphSearchData) {
  
  alert("Fetching graph");
  return (dispatch) => {
    
    dispatch(notifyGraphFetching());
      setTimeout(() => {
        dispatch(graphFetchCompleted(graphSearchData));
      }, 2000);
  }
}

