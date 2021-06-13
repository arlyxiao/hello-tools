Rails.application.routes.draw do
  root 'topics#index'

  get '/signup', to: 'users#new'
  get '/signin', to: 'sessions#new'
  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'

  resources :users do
    collection do
      get :repos
    end
  end

  post '/repos/save_github_token', to: 'repos#save_github_token'
  post '/repos/sync_issues', to: 'repos#sync_issues'
  post '/repos', to: 'repos#create'
  delete '/repos', to: 'repos#destroy'
end
