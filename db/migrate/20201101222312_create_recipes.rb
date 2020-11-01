class CreateRecipes < ActiveRecord::Migration[6.0]
  def change
    create_table :recipes do |t|
      t.string :query
      t.string :label
      t.string :calories
      t.string :instructions
      t.string :ingredients, array: true
      t.belongs_to :favorites, index: true

      t.timestamps
    end
  end
end
