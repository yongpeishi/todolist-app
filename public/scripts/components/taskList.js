var Task = require('./task');

var TaskList = React.createClass({
  render: function() {
    var taskNodes = this.props.data.map(function(task) {
      return React.createElement(Task, {isTaskCompleted: task.isCompleted}, task.text);
    });

    return React.createElement('div', {className: 'taskList'}, taskNodes);
  }
});

module.exports = TaskList;