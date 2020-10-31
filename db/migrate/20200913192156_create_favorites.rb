class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :label
      t.string :calories
      t.string :instructions
      t.string :ingredients, array: true
      # NEXT STEP TODO IS FIX ADDING RECIPES
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
