require 'sinatra'
require 'json'

set :public_folder, 'public/'

get '/' do
  send_file File.join(settings.public_folder, 'index.html')
end

get '/tasks.json' do
  raw_json_data = File.read('tasks.json')
  tasks = JSON.parse(raw_json_data)

  content_type :json
  cache_control :no_cache
  tasks.to_json
end
