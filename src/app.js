import React from 'react'


var App = React.createClass({
    render: function(){
        return (
            <div>Welcome to {this.props.name}</div>
        )
    }
})


export default App