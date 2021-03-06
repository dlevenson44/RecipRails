class User < ApplicationRecord
  @username_length = (3..20)
  PASSWORD_REQUIREMENTS = /\A
  (?=.{8,})          # Must contain 8 or more characters
  (?=.*\d)           # Must contain a digit
  (?=.*[a-z])        # Must contain a lower case character
  (?=.*[A-Z])        # Must contain an upper case character
/x

  validates :username, uniqueness: true, length: @username_length
  has_secure_password
  validates :password, format: { with: PASSWORD_REQUIREMENTS }
  has_secure_token :auth_token
  has_many :favorites

  # used to logout
  def invalidate_token
    self.update_columns(auth_token: nil)
  end

  # makes sure use of built-in auth method bcrypt gives and hashes the password
  # against the password_digest in the db
  def self.validate_login(username, password)
    user = find_by(username: username)
    if user && user.authenticate(password)
      user
    end
  end
end
