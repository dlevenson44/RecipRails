class CreateFavorites < ActiveRecord::Migration[6.0]
  def change
    create_table :favorites do |t|
      t.string :label
      t.string :calories
      t.string :instructions

      t.timestamps
    end
    add_column :favorites, :ingredients, :text, array: true, default: []
  end
end
