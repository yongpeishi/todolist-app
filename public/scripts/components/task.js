var Task = React.createClass({

  updateTaskCompletion: function() {
    // replace this to update the task
    console.log('calling updateTaskCompletion');
    return false;
  },

  render: function() {
    return (
      React.DOM.div({className: 'task'},
        React.DOM.input({
          type: 'checkbox',
          name: 'task-completed',
          checked: this.props.isTaskCompleted,
          onChange: this.updateTaskCompletion
        }),
        React.DOM.span({}, this.props.children)
       )
    );
  }
});

module.exports = Task;