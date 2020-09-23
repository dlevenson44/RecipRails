Rails.application.routes.draw do
  get '/favorite' => 'favorites#index'
  post '/favorite' => 'favorites#create'
  delete '/favorite' => 'favorites#destroy'
  post '/login' => 'sessions#create'
  delete '/logout' => 'sessions#destroy'
  post '/register' => 'users#create'
  get '/profile' => 'users#profile_request'
  get '/search' =>  'recipes#search'

  # Handles all non-API/Ajax requests
  get '*page', to: 'api#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'api#index'

  resources :users
end
