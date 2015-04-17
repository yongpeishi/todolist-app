var _ = require('underscore');

var TaskList = require('./taskList');
var TaskForm = require('./taskForm');

var TaskBox = React.createClass({
  displayName: 'TaskBox',
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.tasksUrl + '/tasks.json',
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
    $.ajax({
      url: this.props.tasksUrl + '/tasks',
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(newTask),
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  updateTask: function(task) {
    var patchData = [
      {
        "op": "replace",
        "path": "/" + task.taskId + "/isCompleted",
        "value": task.isCompleted
      }
    ];

    $.ajax({
      url: this.props.tasksUrl + '/tasks/' + task.taskId,
      dataType: 'text',
      type: 'PATCH',
      data: JSON.stringify(patchData),
      success: function() {
        this.loadTasksFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() { //execute exactly once during the lifecycle of the component
    return { data: [] };
  },

  // probably dont need this
  componentDidMount: function() {  //called automatically by React when a component is rendered
    this.loadTasksFromServer();
  },

  render: function() {

    var completedTasks = _.values(this.state.data).filter( function(task) {return task.isCompleted;});

    return (
      React.createElement('div', {className: "taskBox"},
        React.createElement('h1', null, "Tasks"),
        React.createElement('span', null, "Completed Tasks: " + completedTasks.length),

        React.createElement(TaskList, { data: this.state.data, toggleTaskCompletion: this.updateTask }),
        React.createElement(TaskForm, { onTaskSubmit: this.handleTaskSubmit })
      )
    );
  }
});

module.exports = TaskBox;