class CreateRestaurantes < ActiveRecord::Migration[7.1]
  def change
    create_table :restaurantes do |t|
      t.string :name

      t.timestamps
    end
  end
end
