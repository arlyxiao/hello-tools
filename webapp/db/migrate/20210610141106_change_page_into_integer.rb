class ChangePageIntoInteger < ActiveRecord::Migration[6.1]
  def change
    change_column :github_issues, :page, :integer
  end
end
