var TaskForm = React.createClass({
  getInitialState: function() {
      return {text: ''};
  },

  setText: function(e) {
    this.setState({text: e.target.value});
  },

  handleSubmit: function(e) {
    e.preventDefault();

    var trimmedText = this.state.text.trim();

    if(trimmedText) {
      this.props.onTaskSubmit({text: trimmedText});
      this.setState({text: ''});
    }
  },

  render: function() {
    return (
      React.DOM.form( {class: 'taskForm', onSubmit: this.handleSubmit},
        React.DOM.input( {type: 'text', value: this.state.text, onChange: this.setText}),
        React.DOM.input( {type: 'submit', value: 'Add task'})
      )
    );
  }
});

module.exports = TaskForm;