import React from 'react'


var Todo = React.createClass({
    render: function(){
        return (
            <li>{this.props.name}</li>
        )
    }
})


var TodoList = React.createClass({
    render: function(){
        var todo_items = this.props.todos.map(function(todo){
            return (
                <Todo key={todo.id} name={todo.name} />
            )
        })
        return (
            <div>
                <ul>
                    {todo_items}
                </ul>
            </div>
        )
    }
})

export var App = React.createClass({
    render: function(){
        var todos = [
            {
                'id': 1,
                'name': 'Item 1',
            },
            {
                'id': 2,
                'name': 'Item 2',
            },
        ]
        return (
            <div>
                <TodoList todos={todos} />
            </div>
        )
    }
})
