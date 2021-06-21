require 'rails_helper'

RSpec.describe Topic, type: :model do
  describe "search" do
    before do
      user = create(:user)

      @topic1 = Topic.create(
        user: user,
        title: 'test title1',
        content: 'test content1'
      )
      @topic2 = Topic.create(
        user: user,
        title: 'test title2',
        content: 'test content2'
      )
    end

    it "Test search function" do
      result = Topic.search(query_text: 'title1', page: nil)
      expect(result.length).to eq(1)

      result = Topic.search(query_text: 'title', page: nil)
      expect(result.length).to eq(2)
    end
  end
end
