var _ = require('underscore');

var Task = React.createClass({

  updateTaskCompletion: function(taskId) {
    this.props.toggleTaskCompletion(taskId);
  },

  render: function() {
    return (
      React.DOM.div({className: 'task' },
        React.DOM.input({
          type: 'checkbox',
          name: 'task-completed',
          checked: this.props.isTaskCompleted,
          onChange: _.partial( this.updateTaskCompletion, this.props.taskId )
        }),
        React.DOM.span({}, this.props.children)
       )
    );
  }

});

module.exports = Task;