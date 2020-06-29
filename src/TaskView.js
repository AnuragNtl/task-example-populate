import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchGraph, valueChange, updateGraph, duplicateEntry} from "./actions/graphActions";
import "./TaskView.css";
import {Button, Switch, Select, MenuItem} from '@material-ui/core';

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
            {this.props.task.properties.map(({key, value, type, options}) => (<div className="editable"><div>{key}</div>  <div>
                {this.getAppropriateInput(key, value, type, options)}
                </div></div>))}
            <div id="actionContainer">
        <Button onClick = {() => this.props.dispatch(updateGraph(this.props.task.graphId, this.props.task)) }> Update </Button>
            <Button onClick={() => this.props.dispatch(duplicateEntry(this.props.task.graphId, this.props.task.id))}> Duplicate Entry </Button>
            </div>
            </div>
        );
    }

    getAppropriateInput(key, value, type, options) {

        let changeHandler = (e) => this.props.dispatch(valueChange(key, e.target.value));

        switch(type) {

            case 'string' : 
                return (<input type="text" value={value} onChange={changeHandler}/>);
                break;
            case 'number':
                return (<input type="number" value={value} onChange={changeHandler}/>);
            case 'object':
                return (
                    <Select onChange={changeHandler} defaultValue={value}>

                    {options.map(option => (<MenuItem value={option}> {option} </MenuItem>))}
                    </Select>
                );
            case 'boolean':
                value = ( value == "false" ? false : value);
                return (<Switch  checked={value} onChange={(e) => this.props.dispatch(valueChange(key, e.target.checked))}/>);

            default:
                throw "no handling for type " + type ;


        }
    }

}

export default connect(({graph}) => {  return { ...graph } })(TaskData);

