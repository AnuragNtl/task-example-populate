import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGraph} from "./actions/graphActions";

class TaskData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!this.props.task) {
            return (
                <div>
                No task selected
                </div>
            );
        }
        return (
            <div>
            <h2>{this.props.task.id}</h2>
            <br />
            {this.props.task.taskList
                .map(taskId => <h1><a onClick = {() => this.props.dispatch(fetchGraph(this.props.task.graphId, taskId))}> { taskId}</a> </h1>)}
            {this.props.task.properties.map(({key, value}) => (<div><span>{key}</span>  <span>{value}</span></div>))}
            </div>
        );
    }
}

export default connect(({graph}) => { return { ...graph } })(TaskData);

