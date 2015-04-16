var TaskBox = require('./components/taskBox');

var tasksEndpoint = 'http://localhost:4567';

React.render(
  React.createElement(TaskBox, {tasksUrl: tasksEndpoint}),
  document.getElementById('container')
);
