require 'faker'

User.destroy_all

# Remove @ char and post-characters
def generate_username(value)
  username = value[/[^@]+/]
  username
end

p 'Creating 50 users from seed file'

50.times do |n|
  User.create! username: generate_username(Faker::Internet.email(name: 3..20)),
               password_digest: 'abcdefG*9',
               name: Faker::Name.name,
               email: Faker::Internet.email

  #  Clear the auth_token generated on account creation
  User.update_all(auth_token: '')
end
