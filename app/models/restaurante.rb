class Restaurante < ApplicationRecord
  has_many :tables, dependent: :destroy
end
