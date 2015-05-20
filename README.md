# TodoList in Reactjs

A simple todo list application using reactjs as the view, and a simple Sinatra server.

# Dependency

## Client
* ReactJS
* Browserify
* Watchify
* Underscore.js

## Server
* Ruby 2.2.1
* Sinatra

# Getting started
These are the general setup steps. Instructions are very brief.
 
1. Server side: Setup your local environment with Ruby 2.2.1. Get bundler with `gem install bundler` and do `bundle install`.
2. Client side: Run `npm install` to get node modules.
3. You will need a file *tasks.json* in the root directory. An example (*tasks.json.sample*) is provided.
4. Start the server by `ruby src/todolist-server.rb` at the project directory. Server will run on `http://localhost:4567`.
5. Get watchify command by `npm install -g watchify` and run it by `watchify public/scripts/main.js -o public/scripts/bundle.js`.



