var tasksEndpoint = 'http://localhost:4567/tasks.json';


var TaskForm = React.createClass({
  handleSubmit: function() {
    e.preventDefault(); //prevent the browser's default action of submitting the form
    var taskText = React.findDOMNode(this.refs.text).value.trim();
    if (!taskText) {
      return;
    }
    this.props.onTaskSubmit({text: taskText})

    React.findDOMNode(this.refs.text).value = '' ; //clear the field
    return;
  },

  render: function() {
    return (
      React.DOM.form( {className: "taskForm", onSubmit: this.handleSubmit},
        React.DOM.input( {type: 'text', ref: 'text'}),
        React.DOM.input( {type: 'submit', value: 'Add task'})
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
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.tasksUrl,
      dataType: 'json',
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleTaskSubmit: function(newTask) {
    // TODO: submit to the server and refresh the list
  },
  getInitialState: function() { //execute exactly once during the lifecycle of the component
    return {data: []};
  },
  componentDidMount: function() {  //called automatically by React when a component is rendered
    this.loadTasksFromServer();
  },
  render: function() {
    return (
      React.createElement('div', {className: "taskBox"},
        React.createElement('h1', null, "Tasks"),
        React.createElement(TaskList, {data: this.state.data}),
        React.createElement(TaskForm, { onTaskSubmit: this.handleTaskSubmit })

      )
    );
  }
});

React.render(
  React.createElement(TaskBox, {tasksUrl: tasksEndpoint}),
  document.getElementById('container')
);
