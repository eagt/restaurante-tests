json.extract! @table, :id, :number, :created_at, :updated_at, :restaurante_id
json.restaurante_name @restaurante.name
json.url restaurante_table_url(@restaurante, @table, format: :json)