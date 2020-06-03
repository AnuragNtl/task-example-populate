import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGraph, valueChange, updateGraph, duplicateEntry} from "./actions/graphActions";

class TaskData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!(this.props.task.graphId)) return <br />;
        return (
            <div>
            <h2>{this.props.task.id}</h2>
            <button onClick={() => this.props.dispatch(duplicateEntry(this.props.task.graphId, this.props.task.id))}> Duplicate Entry </button>
            <br />
            {this.props.task.taskList
                .map(({taskId, description}) => <h1><a onClick = {() => this.props.dispatch(fetchGraph(this.props.task.graphId, taskId))}> {description}</a> </h1>)}
            {this.props.task.properties.map(({key, value}) => (<div><span>{key}</span>  <span><input type={parseInt(value) == value ? 'number' : 'text'} value={value} onChange={(e) => this.props.dispatch(valueChange(key, e.target.value))} class="slider" id="myRange"/> {value} </span></div>))}
        <button onClick = {() => this.props.dispatch(updateGraph(this.props.task.graphId, this.props.task)) }> Update </button>
            </div>
        );
    }
}

export default connect(({graph}) => {  return { ...graph } })(TaskData);

