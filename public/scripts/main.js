var tasksEndpoint = 'http://localhost:4567/tasks.json';


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
  getInitialState: function() { //execute exactly once during the lifecycle of the component
    return {data: []};
  },
  componentDidMount: function() { //called automatically by React when a component is rendered
    $.ajax({
      url: this.props.tasksUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      },
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }
    });
  },
  render: function() {
    return (
      React.createElement('div', {className: "taskBox"},
        React.createElement('h1', null, "Tasks"),
        React.createElement(TaskList, {data: this.state.data}),
        React.createElement(TaskForm, null)

      )
    );
  }
});

React.render(
  React.createElement(TaskBox, {tasksUrl: tasksEndpoint}),
  document.getElementById('container')
);
