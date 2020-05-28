import React from 'react';
import {connect} from 'react-redux';
import {fetchGraphBack} from "./actions/graphActions";

class BreadCrumb extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {graphId, taskPath} = this.props;
        
        return taskPath.map(({taskId, description}) => 

        <a onClick={() => this.props.dispatch(fetchGraphBack(graphId, taskId))}>{description}</a>
        );
    }
};

export default connect(({graph, taskPath}) => {

    if(!graph.task || !graph.task.graphId)
        return {graphId:null, taskPath:[]};
    else 
        return {
            graphId: graph.task.graphId,
            taskPath: graph.taskPath
        };
})(BreadCrumb);


