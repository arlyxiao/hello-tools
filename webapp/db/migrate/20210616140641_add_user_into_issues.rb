class AddUserIntoIssues < ActiveRecord::Migration[6.1]
  def change
    add_column :github_issues, :user_id, :integer, after: :id
    add_column :topics, :user_id, :integer, after: :id
  end
end
