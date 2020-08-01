class UsersController < ApiController
  skip_before_action :verify_authenticity_token

  def index; end

  def create
    user = User.create!(user_params)
    render json: { token: user.auth_token, id: user.id }
  end

  def profile_request
    if request.headers[:token]
      user = User.find_by_auth_token!(request.headers[:token])
      render json: {
        user: { username: user.username, email: user.email, name: user.name, id: user.id }
      }
    else
      render_unauthorized('Profile Token Error')
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password_digest, :name)
  end
end
