import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGraph, valueChange} from "./actions/graphActions";

class TaskData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
            <h2>{this.props.task.id}</h2>
            <br />
            {this.props.task.taskList
                .map(taskId => <h1><a onClick = {() => this.props.dispatch(fetchGraph(this.props.task.graphId, taskId))}> { taskId}</a> </h1>)}
            {this.props.task.properties.map(({key, value}) => (<div><span>{key}</span>  <span><input type="range" min="1" max="100" value={value} onChange={(e) => this.props.dispatch(valueChange(key, e.target.value))} class="slider" id="myRange"/> {value} </span></div>))}
            </div>
        );
    }
}

export default connect(({graph}) => {  return { ...graph } })(TaskData);

