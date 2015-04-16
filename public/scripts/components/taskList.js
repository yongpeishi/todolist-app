var _ = require('underscore');

var Task = require('./task');

var TaskList = React.createClass({

  render: function() {
      var tl = this;

    var taskNodes = _.map(this.props.data, function(task, key) {
      return React.createElement(Task,
        {taskId: key,
          isTaskCompleted: task.isCompleted,
          toggleTaskCompletion: tl.props.toggleTaskCompletion},
          task.text);
    });

    return React.createElement('div', {className: 'taskList'}, taskNodes);
  }
});

module.exports = TaskList;