// Pretend this come from the backend
var data = [
  {isCompleted: true,  text: "Sing a song"},
  {isCompleted: false, text: "Dance"}
];


var TaskForm = React.createClass({
  render: function() {
    return (
      React.createElement('div', {className: "taskForm"},
                          "I am a form"
      )
    );
  }
});


var Task = React.createClass({

  updateTaskCompletion: function() {
    // replace this to update the task
    console.log('calling updateTaskCompletion');
    return false;
  },

  render: function() {
    return (
      React.DOM.div({className: 'task'},
                    React.DOM.input({type: 'checkbox',
                                     name: 'task-completed',
                                     checked: this.props.isTaskCompleted,
                                     onChange: this.updateTaskCompletion
                                     }),
                    React.DOM.span({}, this.props.children)
                   )
    );
  }
});

var TaskList = React.createClass({
  render: function() {
    var taskNodes = this.props.data.map(function(task) {
      return React.createElement(Task, {isTaskCompleted: task.isCompleted}, task.text);
    });

    return React.createElement('div', {className: 'taskList'}, taskNodes);
  }
});

var TaskBox = React.createClass({
  displayName: 'TaskBox',

  render: function() {
    return (
      React.createElement('div', {className: "taskBox"},
        React.createElement('h1', null, "Tasks"),
        React.createElement(TaskList, {data: data}),
        React.createElement(TaskForm, null)

      )
    );
  }
});

React.render(
  React.createElement(TaskBox, {data: data}),
  document.getElementById('container')
);
