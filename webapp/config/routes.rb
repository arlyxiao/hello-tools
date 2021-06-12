Rails.application.routes.draw do
  root 'topics#index'

  get '/signup', to: 'users#new'
  get '/signin',   to: 'sessions#new'
  post '/signin',   to: 'sessions#create'
  delete '/signout',  to: 'sessions#destroy'
  resources :users
end
