class SessionsController < ApiController
	skip_before_action :require_login, only: [:create], raise: false
  protect_from_forgery with: :null_session

  def create
    if user = User.validate_login(params[:username], params[:password])
      allow_token_to_be_used_only_once_for(user)
      send_token_for_valid_login_of(user)
    else
      render_unauthorized('Error with your login or password')
    end
  end

  def destroy
    logout
    head :ok
  end

  private

  def send_token_for_valid_login_of(user)
    @account = User.find(user.id)
    render json: { token: @account.auth_token }
  end

  def generate_unique_secure_token
    SecureRandom.base58(24)
  end

  def allow_token_to_be_used_only_once_for(user)
    @account = User.find(user.id)
    new_auth_token = generate_unique_secure_token
    @account.update_attribute(:auth_token, new_auth_token)
  end

  def logout
    current_user.invalidate_token
  end
end
