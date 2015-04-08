var TaskList = React.createClass({
  render: function() {
    return (
      React.createElement('div', {className: 'taskList'},
                          "I am a task list"
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
