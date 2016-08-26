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
        var divStyle = {
            color: 'red',
            textDecoration: 'line-through'
        }
        var span_item;
        if(this.props.item.is_complete){
            span_item = <span style={divStyle} onClick={this.props.onClick}>{this.props.name}</span>
        }
        else{
            span_item = <span onClick={this.props.onClick}>{this.props.name}</span>
        }
        return (
            <div>
                {span_item}
                <button onClick={this.props.onDelete}>X</button>
            </div>
        )
    }
})

var TodoList = React.createClass({
    handleDelete: function(id){
        this.props.handleDelete(id)
    },
    handleClick: function(id){
        this.props.handleClick(id)
    },
    render: function(){
        var todos = this.props.todos.map(function(todo){
            return (
                <Todo key={todo.id} name={todo.name} id={todo.id} item={todo} onDelete={this.handleDelete.bind(this, todo.id)} onClick={this.handleClick.bind(this, todo.id)} />
            )
        }, this)
        return (
            <div>{todos}</div>
        )
    }
})

var CountBox = React.createClass({
    getCompletedItems: function(todos){
        var completed_items = todos.filter(function(todo){
            if(todo.is_complete){
                return todo
            }
        })
        return completed_items
    },
    render: function(){
        return (
            <div>
                <div>Total Items: {this.props.todos.length}</div>
                <div>Completed Items: {this.getCompletedItems(this.props.todos).length}</div>
            </div>
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
            'name': item.name,
            'is_complete': false,
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
    handleClick: function(id){
        var all_items = this.state.todos.map(function(todo){
            if(todo.id == id){
                todo.is_complete = !todo.is_complete
                return todo
            }
            return todo
        })
        this.setState({todos: all_items})
    },
    render: function(){
        return (
            <div>
                <Form onFormSubmit={this.handleSubmit} />
                <TodoList todos={this.state.todos} handleDelete={this.handleDelete} handleClick={this.handleClick}/>
                <CountBox todos={this.state.todos} />
            </div>
        )
    }
})
