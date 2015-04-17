var Task = React.createClass({

  updateTaskCompletion: function() {
    var id = this.props.task.taskId;
    var taskToUpdate = {
      taskId: this.props.task.taskId,
      isCompleted: !(this.props.task.isCompleted),
      text: this.props.task.text
    }

    this.props.toggleTaskCompletion(taskToUpdate);
  },

  render: function() {
    return (
      React.DOM.div({className: 'task' },
        React.DOM.input({
          type: 'checkbox',
          name: 'task-completed',
          checked: this.props.task.isCompleted,
          onChange: this.updateTaskCompletion
        }),
        React.DOM.span({}, this.props.task.text)
       )
    );
  }

});

module.exports = Task;