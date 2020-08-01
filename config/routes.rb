Rails.application.routes.draw do
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  post '/register' => 'users#create'
  get '/profile' => 'users#profile_request'

  resources :users
end
