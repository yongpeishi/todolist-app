var TaskForm = React.createClass({
  handleSubmit: function(e) {
    e.preventDefault();

    var taskText = React.findDOMNode(this.refs.text).value.trim();
    if (!taskText) {
      return;
    }

    this.props.onTaskSubmit({text: taskText});
    React.findDOMNode(this.refs.text).value = ''; //clear the field
    return;
  },

  render: function() {
    return (
      React.DOM.form( {className: "taskForm", onSubmit: this.handleSubmit},
        React.DOM.input( {type: 'text', ref: 'text'}),
        React.DOM.input( {type: 'submit', value: 'Add task'})
      )
    );
  }
});


module.exports = TaskForm;