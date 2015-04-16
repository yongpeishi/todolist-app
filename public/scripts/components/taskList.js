var _ = require('underscore');

var Task = require('./task');

var TaskList = React.createClass({
  render: function() {
    var taskNodes = _.map(this.props.data, function(task, key) {
      console.log("key", key);
      console.log("task", task);
      return React.createElement(Task, {taskId: key, isTaskCompleted: task.isCompleted}, task.text);
    });

    return React.createElement('div', {className: 'taskList'}, taskNodes);
  }
});

module.exports = TaskList;