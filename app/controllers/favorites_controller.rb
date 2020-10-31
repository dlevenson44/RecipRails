class FavoritesController < ApiController
  skip_before_action :verify_authenticity_token

  def index
    user = User.find_by_auth_token!(request.headers[:token])
    user_favorites = user.favorites
    render status: 200, json: { data: user_favorites }
  rescue => e
    render status: 400, json: { message: e}
  end

  def create
    favorite = Favorite.new(favorite_params)
    favorite.user = current_user
    if favorite.save
      render status: 200, json: { id: favorite.id }
    end
  rescue => e
    render status: 422, json: { message: e }
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorite.delete
  end

  private

  def favorite_params
    params.require(:favorite).permit(:label, :calories, :instructions, :ingredients => [])
  end
end
