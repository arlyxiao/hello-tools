get '/signup', to: 'users#new'
get '/signin', to: 'sessions#new'
post '/signin', to: 'sessions#create'
delete '/signout', to: 'sessions#destroy'
