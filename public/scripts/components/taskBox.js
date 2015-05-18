var _ = require('underscore');

var TaskList = require('./taskList');
var TaskForm = require('./taskForm');

var TaskBox = React.createClass({ displayName: 'TaskBox',
  loadTasksFromServer: function() {
    $.ajax({
      url: this.props.tasksUrl + '/tasks.json',
      dataType: 'json',
      success: function(data) {
        this.setState({allTodos: data});
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
      success: function() {
        this.loadTasksFromServer();
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  updateTaskCompletion: function(task) {
    var patchData = [
      {
        "op": "replace",
        "path": "/" + task.taskId + "/isCompleted",
        "value": task.isCompleted
      }
    ];

    $.ajax({
      url: this.props.tasksUrl + '/tasks',
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

  getInitialState: function() { 
    return { allTodos: this.loadTasksFromServer() };
  },

  render: function() {

    var completedTasks = _.values(this.state.allTodos).filter( function(task) {return task.isCompleted;});

    return (
      React.createElement('div', {class: 'tasksBox'},
        React.createElement('h1', {}, "Tasks"),
        React.createElement('span', {}, "Completed Tasks: " + completedTasks.length),

        React.createElement(TaskList, { allTodos: this.state.allTodos, toggleTaskCompletion: this.updateTaskCompletion }),
        React.createElement(TaskForm, { onTaskSubmit: this.handleTaskSubmit })
      )
    );
  }
});

module.exports = TaskBox;