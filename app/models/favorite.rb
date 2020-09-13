class Favorite < ApplicationRecord
  validates :label, :calories, :instructions, :ingredients, :presence => true
  belongs_to :user
end
