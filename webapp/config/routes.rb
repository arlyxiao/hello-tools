Rails.application.routes.draw do
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
