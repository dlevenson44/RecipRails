class FavoritesController < ApiController
  def create
    favorite = Favorite.create!(favorite_params)
    render status: 200, json: { id: favorite.id }
  rescue => e
    render status: 422, json: { message: e }
  end

  def destroy
    @favorite = Favorite.find(params[:id])
    @favorite.delete
  end

  private

  def favorite_params
    params.require(:favorite).permit(:label, :calories, :instructions, :ingredients)
  end
end
