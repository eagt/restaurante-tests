class Restaurante < ApplicationRecord
  has_many :tables, dependent: :destroy

  # Presence validation to ensure that name or other attributes neeeded to be mandatory is not empty
  validates :name, presence: true

  # Uniqueness validation to ensure that name or other attributes neeeded to be unique is/are not repeated
  validates :name, uniqueness: true
end
