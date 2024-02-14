class Table < ApplicationRecord
  belongs_to :restaurante

  # Presence validation to ensure that number is not empty
  validates :number, presence: true

  # Numericality validation to ensure that number is an integer
  validates :number, numericality: { only_integer: true }

  # Uniqueness validation to ensure that number is unique
  validates :number, uniqueness: true

  # Greater than validation to ensure that number is greater than 0
  validates :number, numericality: { greater_than: 0 }

end
