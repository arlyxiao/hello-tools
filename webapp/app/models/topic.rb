class Topic < ApplicationRecord
  belongs_to :user

  validates :title, presence: true
  validates :content, presence: true

  def self.search(query_text:, page:)
    query = self.order("created_at DESC")

    if query_text.present?
      query = query.where("lower(title) LIKE ?", "%#{query_text}%")
    end

    query.page(page)
  end
end
