class TablesController < ApplicationController
  before_action :set_restaurante
  before_action :set_table, only: %i[ show edit update destroy ]
 
  
  # GET /tables or /tables.json
  def index
    @tables = @restaurante.tables
    @restaurante = Restaurante.find(params[:restaurante_id]) # Added
    @table = @restaurante.tables.build # Added
  end

  # GET /tables/1 or /tables/1.json
  def show
    @restaurante = @table.restaurante
    respond_to do |format|
      format.html
      format.json
    end
  end

  # GET /tables/new
  def new
    @table = @restaurante.tables.build
  end

  # GET /tables/1/edit
  def edit
    @is_edit = params[:edit] == 'true'
    @table = @restaurante.tables.find(params[:id])
  end

  # POST /tables or /tables.json
  def create
   @table = @restaurante.tables.build(table_params)

    respond_to do |format|
      if @table.save
        format.html { redirect_to restaurante_tables_url(@restaurante, @table), notice: "Table was successfully created." }
        format.json { render :show, status: :created, location: @table }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @table.errors, status: :unprocessable_entity }
      end
    end
  end

  def update
    @table = Table.find(params[:id])
    if @table.update(table_params)
      redirect_to restaurante_tables_url(@table.restaurante), notice: 'Table was successfully updated.'
    else
      render :edit
    end
  end

  # DELETE /tables/1 or /tables/1.json
  def destroy
    @table.destroy!
    redirect_to restaurante_tables_url(@restaurante), notice: 'Table was successfully destroyed.'
    #respond_to do |format|
    #  format.html { redirect_to tables_url, notice: "Table was successfully destroyed." }
    #  format.json { head :no_content }
    #end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_table
      @table = @restaurante.tables.find(params[:id])
    end

    def set_restaurante
      @restaurante = Restaurante.find(params[:restaurante_id])
    end

    # Only allow a list of trusted parameters through.
    def table_params
      params.require(:table).permit(:number, :restaurante_id)
    end
end
