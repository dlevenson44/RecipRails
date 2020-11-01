class RecipesController < ApiController
  def search
    app_id = ENV['APP_ID']
    app_key = ENV['APP_KEY']
    payload = request.headers['payload']
    recipes = Recipe.where(query: payload)
    if recipes.empty?
      @search = Faraday.get("https://api.edamam.com/search?q=#{payload}&app_id=#{app_id}&app_key=#{app_key}&from=0&to=100") do |req|
        req.headers['content-type'] = 'application/json'
      end
      @results = JSON.parse(@search.body)
      @results['hits'].each do |result|
        db_recipe = { query: payload }
        result['recipe'].each do |key, value|
          puts "Key123:   #{key}"
          puts "value123:   #{value}"
          case key
          when 'label'
            db_recipe[:label] = value
          when 'shareAs'
            db_recipe[:instructions] = value
          when 'ingredientLines'
            db_recipe[:ingredients] = value
          when 'calories'
            db_recipe['calories'] = value
          end
        end
        Recipe.create!(db_recipe)
      end
      render json: { results: @results, status: 200 }
    else
      puts "hitting else condition #{recipes.inspect}"
      render json: { results: { hits: recipes, count: recipes.length }, status: 200 }
    end
  end
end
