var _ = require('underscore');

var Task = require('./task');

var TaskList = React.createClass({

  render: function() {
    var tl = this;

    var taskNodes = _.values(this.props.data).map(function(task) {
      return React.createElement(Task, {
        task: task,
        toggleTaskCompletion: tl.props.toggleTaskCompletion
      });
    });

    return React.createElement('div', {className: 'taskList'}, taskNodes);
  }
});

module.exports = TaskList;