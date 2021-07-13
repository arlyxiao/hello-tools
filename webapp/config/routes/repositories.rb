resources :repositories do
  collection do
    get  'welcome'
    post 'save_github_token'
    post 'sync_issues'
  end
end
delete '/repositories', to: 'repositories#destroy'
