class AddMoreGithubColumns < ActiveRecord::Migration[6.1]
  def change
    add_column :topics, :source_id, :integer, after: :id
    add_column :topics, :label_text, :string
  end
end
