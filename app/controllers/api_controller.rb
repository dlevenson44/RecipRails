class ApiController < ApplicationController
  def require_login
    authenticate_token || render_unauthorized('Access Denied: Unauthorized Access')
  end

  def current_user
    @user = User.find_by!(auth_token: request.headers['token'])
    @user ||= authenticate_token
  end

  protected

  def render_unauthorized(message)
    errors = { errors: [detail: message] }
    render json: errors, status: :unauthorized
  end

  private

  def authenticate_token
    authenticate_with_http_token do |token|
      User.find_by!(auth_token: token)
    end
  end
end
