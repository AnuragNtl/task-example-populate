import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGraph, valueChange, updateGraph, duplicateEntry} from "./actions/graphActions";
import "./TaskView.css";

class TaskData extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        if(!(this.props.task.graphId)) return <br />;
        return (
            <div>
            <h2>{this.props.task.id}</h2>
            <br />
            <ul>
            {this.props.task.taskList
                .map(({taskId, description}) => <li><h3><a onClick = {() => this.props.dispatch(fetchGraph(this.props.task.graphId, taskId))}> {description}</a> </h3></li>)}
        </ul>
            {this.props.task.properties.map(({key, value}) => (<div className="editable"><div>{key}</div>  <div><input type={parseInt(value) == value ? 'number' : 'text'} value={value} onChange={(e) => this.props.dispatch(valueChange(key, e.target.value))}/></div></div>))}
            <div id="actionContainer">
        <button onClick = {() => this.props.dispatch(updateGraph(this.props.task.graphId, this.props.task)) }> Update </button>
            <button onClick={() => this.props.dispatch(duplicateEntry(this.props.task.graphId, this.props.task.id))}> Duplicate Entry </button>
            </div>
            </div>
        );
    }
}

export default connect(({graph}) => {  return { ...graph } })(TaskData);

