class CreateTables < ActiveRecord::Migration[7.1]
  def change
    create_table :tables do |t|
      t.string :number
      t.references :restaurante, null: false, foreign_key: true

      t.timestamps
    end
  end
end
