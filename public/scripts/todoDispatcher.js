var Dispatcher = require('flux').Dispatcher;
var todoDispatcher = new Dispatcher();

todoDispatcher.handleViewAction = function(action) {
  this.dispatch({
    source: 'VIEW_ACTION',
    action: action
  });
}

module.exports = todoDispatcher;