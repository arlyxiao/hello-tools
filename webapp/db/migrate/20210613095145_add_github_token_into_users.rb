class AddGithubTokenIntoUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :github_token, :string, after: :password
  end
end
