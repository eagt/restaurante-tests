# spec/models/table_spec.rb

require 'rails_helper'

RSpec.describe Table, type: :model do
  let(:restaurante) { Restaurante.create!(name: 'Test Restaurante') }

  it "is valid with valid attributes" do
    table = Table.new(number: 1, restaurante: restaurante)
    expect(table).to be_valid
  end

  it "is not valid without a number" do
    table = Table.new(number: nil, restaurante: restaurante)
    expect(table).to_not be_valid
  end

  it "is not valid with a non-integer number" do
    table = Table.new(number: "one", restaurante: restaurante)
    expect(table).to_not be_valid
  end

  it "is not valid with a duplicate number" do
    Table.create!(number: 1, restaurante: restaurante)
    table = Table.new(number: 1, restaurante: restaurante)
    expect(table).to_not be_valid
  end

  it "is not valid with a number less than or equal to 0" do
    table = Table.new(number: 0, restaurante: restaurante)
    expect(table).to_not be_valid
  end
end