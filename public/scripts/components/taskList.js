var _ = require('underscore');
var Task = require('./task');

var TaskList = React.createClass({

  render: function() {
    var tl = this;

    var taskNodes = _.values(this.props.allTodos).map(function(task) {
      return React.createElement(Task, {
        task: task,
        toggleTaskCompletion: tl.props.toggleTaskCompletion
      });
    });

    return React.createElement('div', {
      class: 'taskList',
      style: { padding: 10 }
    }, 
    taskNodes);
  }
});

module.exports = TaskList;