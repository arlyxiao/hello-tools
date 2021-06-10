class CreateGithubIssues < ActiveRecord::Migration[6.1]
  def change
    create_table :github_issues do |t|
      t.string :repo
      t.text :json_data
      t.integer :page

      t.timestamps
    end
  end
end
