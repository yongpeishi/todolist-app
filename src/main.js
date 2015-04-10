var Task = React.createClass({
  render: function() {
    return (
      React.DOM.div({className: 'task'},
                    React.DOM.input({type: 'checkbox', name: 'task-completed', checked: this.props.isTaskCompleted}),
                    React.DOM.span({}, this.props.children)
                   )
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    return (
      React.createElement('div', {className: 'taskList'},
                          React.createElement(Task, {isTaskCompleted: true}, "Sing a song"),
                          React.createElement(Task, {isTaskCompleted: false}, "Dance")
        )

    );
  }
});

var TaskForm = React.createClass({
  render: function() {
    return (
      React.createElement('div', {className: "taskForm"},
                          "I am a form"
      )
    );
  }
});


var TaskBox = React.createClass({displayName: 'TaskBox',
  render: function() {
    return (
      React.createElement('div', {className: "taskBox"},
        React.createElement('h1', null, "Tasks"),
        React.createElement(TaskList, null),
        React.createElement(TaskForm, null)

      )
    );
  }
});

React.render(
  React.createElement(TaskBox, null),
  document.getElementById('container')
);
