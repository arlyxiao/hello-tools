class User < ApplicationRecord
  attr_accessor :password_confirmation

  validates :username, presence: true, length: { minimum: 4 }
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i
  validates :email, presence: true, format: { with: VALID_EMAIL_REGEX }, uniqueness: { case_sensitive: false }
  validates :password, presence: true, length: { minimum: 6 }

  has_many :user_repos

  def authenticate(password)
    Digest::MD5.hexdigest(password) == self.password
  end
end
