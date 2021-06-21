FactoryBot.define do
  factory :user do
    email { 'test@test.com' }
    username { 'testname' }
    password { '111111' }
  end
end
