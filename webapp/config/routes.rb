class ActionDispatch::Routing::Mapper
  def draw(routes_path)
    instance_eval(File.read(Rails.root.join("config/routes/#{routes_path}.rb")))
  end
end


Rails.application.routes.draw do
  root 'topics#index'

  draw :errors
  draw :topics
  draw :sessions
  draw :users
  draw :repositories
  draw :tools
end
