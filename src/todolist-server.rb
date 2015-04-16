require 'sinatra'
require 'json'

set :public_folder, 'public/'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/tasks.json' do
  content_type :json
  cache_control :no_cache
  tasks_from_file.to_json
end

post '/tasks' do
  request.body.rewind
  new_task = JSON.parse(request.body.read)
  new_task['isCompleted'] = false

  updated_tasks = add_task( new_task )

  content_type :json
  updated_tasks.to_json
end

def add_task task
  existing_tasks = tasks_from_file

  id = existing_tasks.last.key + 1
  updated_tasks = existing_tasks << {id => task}
  tasks_to_file( updated_tasks )

  updated_tasks
end

def tasks_from_file
  raw_json_data = File.read('tasks.json')
  JSON.parse(raw_json_data)
end

def tasks_to_file tasks
  File.write('tasks.json', JSON.pretty_generate(tasks, :indent => '  '))
end