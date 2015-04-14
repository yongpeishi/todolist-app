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
  tasks = tasks_from_file
  tasks << new_task
  tasks_to_file( tasks )

  content_type :json
  tasks.to_json
end


def tasks_from_file
  raw_json_data = File.read('tasks.json')
  JSON.parse(raw_json_data)
end

def tasks_to_file tasks
  File.write('tasks.json', JSON.pretty_generate(tasks, :indent => '  '))
end