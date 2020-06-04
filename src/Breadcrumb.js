import React from 'react';
import {connect} from 'react-redux';
import {fetchGraphBack} from "./actions/graphActions";
import './Breadcrumb.css'

class BreadCrumb extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {graphId, taskPath} = this.props;
        
        return (
            <div id="breadcrumbContainer">
         {taskPath.map(({taskId, description}) => 

             <h3>
        <a className="breadcrumbItems" onClick={() => this.props.dispatch(fetchGraphBack(graphId, taskId))}>{description}</a> </h3>
        )}
            </div> );
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


