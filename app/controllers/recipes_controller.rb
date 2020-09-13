class RecipesController < ApiController
  def search
    app_id = ENV['APP_ID']
    app_key = ENV['APP_KEY']
    payload = request.headers['payload']
    @search = Faraday.get("https://api.edamam.com/search?q=#{payload}&app_id=#{app_id}&app_key=#{app_key}&from=0&to=100") do |req|
      req.headers['content-type'] = 'application/json'
    end
    @result = JSON.parse(@search.body)
    render json: { results: @result, status: 200 }
  end
end
