import React from 'react'
import ReactDOM from 'react-dom'


var Form = React.createClass({
    getInitialState: function(){
        return {
            'name': '',
        }
    },
    handleClick: function(e){
        if(this.state.name){
            this.props.onFormSubmit({'name': this.state.name});
            this.setState({'name': ''});
        }
        this.refs.input_box.focus()
    },
    handleChange: function(e){
        this.setState({'name': e.target.value});
    },
    handleKeyPress: function(e) {
        if (e.key === 'Enter') {
            this.handleClick(e);
        }
    },
    render: function(){
        return (
            <div>
                <input type="text" name="todo_item" ref="input_box" onKeyPress={this.handleKeyPress} onChange={this.handleChange} value={this.state.name} />
                <button name="add" onClick={this.handleClick}>Add to List</button>
            </div>
        )
    }
})

var Todo = React.createClass({
    render: function(){
        return (
            <div>
                <span>{this.props.name}</span>
                <button onClick={this.props.onDelete}>X</button>
            </div>
        )
    }
})

var TodoList = React.createClass({
    handleDelete: function(id){
        this.props.handleDelete(id)
    },
    render: function(){
        var todos = this.props.todos.map(function(todo){
            return (
                <Todo key={todo.id} name={todo.name} id={todo.id} onDelete={this.handleDelete.bind(this, todo.id)} />
            )
        }, this)
        return (
            <div>{todos}</div>
        )
    }
})


export var App = React.createClass({
    getInitialState: function(){
        return {
            todos: []
        }
    },
    handleSubmit: function(item){
        var new_item = {
            'id': this.state.todos.length + 1,
            'name': item.name
        }
        var all_items = this.state.todos.concat([new_item])
        this.setState({todos: all_items})
    },
    handleDelete: function(id){
        var all_items = this.state.todos.filter(function(todo){
            if(todo.id != id){
                return todo
            }
        })
        this.setState({todos: all_items})
    },
    render: function(){
        return (
            <div>
                <Form onFormSubmit={this.handleSubmit} />
                <TodoList todos={this.state.todos} handleDelete={this.handleDelete.bind(this)} />
            </div>
        )
    }
})
