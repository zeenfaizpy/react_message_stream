import React from 'react'
import ReactDOM from 'react-dom'


var Form = React.createClass({
    getInitialState: function(){
        return {
            'name': '',
        }
    },
    handleClick: function(e){
        this.props.onFormSubmit({'name': this.state.name});
        this.setState({'name': ''});
        //ReactDOM.findDOMNode(this.refs.input_box).focus();
        this.refs.input_box.focus()
    },
    handleChange: function(e){
        this.setState({'name': e.target.value});
    },
    render: function(){
        return (
            <div>
                <input type="text" name="todo_item" ref="input_box" onChange={this.handleChange} value={this.state.name} />
                <button name="add" onClick={this.handleClick}>Add</button>
            </div>
        )
    }
})

var TodoItem = React.createClass({
    render: function(){
        return (
            <span>
                {this.props.name}
            </span>
        )
    }
})

var TodoList = React.createClass({
    handleDelete: function(id){
        //console.log(id)
        this.props.handleDelete(id)
    },
    render: function(){
        return (
            <div>
                {this.props.todos.map(function(todo){
                    var id = todo.id
                    var boundClick = this.handleDelete.bind(this, id)
                    return (
                        <div key={todo.id}>
                            <TodoItem id={todo.id} name={todo.name} />
                            <button onClick={boundClick}>X</button>
                        </div>
                    )
                }, this)}
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
                    'name': 'item 1',
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
                <TodoList todos={this.state.todos} handleDelete={this.handleDelete} />
            </div>
        )
    }
})
