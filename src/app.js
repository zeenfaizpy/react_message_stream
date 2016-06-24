import React from 'react'


var Todo = function(props){
    return (
        <li>{props.name}</li>
    )
}


var TodoList = React.createClass({
    render: function(){
        return (
            <div>
                <ul>
                    {this.props.todos.map(function(todo){
                        return (
                            <Todo key={todo.id} name={todo.name} />
                        )
                    })}
                </ul>
            </div>
        )
    }
})

var Form = React.createClass({
    getInitialState: function(){
        return {
            'name': '',
        }
    },
    handleClick: function(e){
        this.props.onFormSubmit({'name': this.state.name});
        this.setState({'name': ''});
    },
    handleChange: function(e){
        this.setState({'name': e.target.value});
    },
    render: function(){
        return (
            <div>
                <input type="text" name="todo_item" onChange={this.handleChange} value={this.state.name} />
                <button name="add" onClick={this.handleClick}>Add</button>
            </div>
        )
    }
})

export var App = React.createClass({
    getInitialState: function(){
        return {
            todos: [
                {
                    'id': 1,
                    'name': 'Item 1',
                },
                {
                    'id': 2,
                    'name': 'Item 2',
                }
            ]
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
    render: function(){
        
        return (
            <div>
                <Form onFormSubmit={this.handleSubmit} />
                <TodoList todos={this.state.todos} />
            </div>
        )
    }
})
