require 'sinatra'
require 'json'
require 'hana'

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
  task_details = JSON.parse(request.body.read)

  updated_tasks = add_task( task_details )

  content_type :json
  updated_tasks.to_json
end

patch '/tasks' do
  request.body.rewind
  patchData = JSON.parse(request.body.read)

  patch = Hana::Patch.new(patchData)
  updated_tasks = patch.apply(tasks_from_file)
  tasks_to_file(updated_tasks)

  status 200
  body 'OK'
end

def add_task task_details
  allTasks = tasks_from_file

  new_task_id = allTasks.keys.sort.last.to_i + 1
  task_details['isCompleted'] = false
  task_details['taskId'] = new_task_id

  allTasks[new_task_id] = task_details
  tasks_to_file( allTasks )

  allTasks
end

def tasks_from_file
  raw_json_data = File.read('tasks.json')
  JSON.parse(raw_json_data)
end

def tasks_to_file tasks
  File.write('tasks.json', JSON.pretty_generate(tasks, :indent => '  '))
end