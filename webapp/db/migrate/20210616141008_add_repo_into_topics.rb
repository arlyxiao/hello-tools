class AddRepoIntoTopics < ActiveRecord::Migration[6.1]
  def change
    add_column :topics, :repo, :string, after: :id
  end
end

