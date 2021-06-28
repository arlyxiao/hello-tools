Rails.application.routes.draw do
  match "/404", to: "errors#not_found", via: :all
  match "/500", to: "errors#internal_server_error", via: :all

  root 'topics#index'
  resources :topics
  
  get '/signup', to: 'users#new'
  get '/signin', to: 'sessions#new'
  post '/signin', to: 'sessions#create'
  delete '/signout', to: 'sessions#destroy'

  resources :users do
    collection do
      get :repos
    end
  end

  resources :repositories do
    collection do
      post 'save_github_token'
      post 'sync_issues'
    end
  end
  delete '/repositories', to: 'repositories#destroy'

  get '/tools/html-to-pdf', to: 'tools#html_to_pdf'
  resources :tools
end
