require "rails_helper"

RSpec.describe Restaurante, type: :model do
  it "is valid with valid attributes" do
    restaurante= Restaurante.new(name: "Test Restaurante") # more attributes can be added
    expect(restaurante).to be_valid
  end

  it "is not valid without a name" do
    restaurante = Restaurante.new(name: nil)
    expect(restaurante).to_not be_valid
  end

  it "is not valid with a duplicate name" do
    Restaurante.create!(name: "Test Restaurante")
    restaurante = Restaurante.new(name: "Test Restaurante")
    expect(restaurante).to_not be_valid
  end
end