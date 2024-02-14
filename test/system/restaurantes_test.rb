require "application_system_test_case"

class RestaurantesTest < ApplicationSystemTestCase
  setup do
    @restaurante = restaurantes(:one)
  end

  test "visiting the index" do
    visit restaurantes_url
    assert_selector "h1", text: "Restaurantes"
  end

  test "should create restaurante" do
    visit restaurantes_url
    click_on "New restaurante"

    fill_in "Name", with: @restaurante.name
    click_on "Create Restaurante"

    assert_text "Restaurante was successfully created"
    click_on "Back"
  end

  test "should update Restaurante" do
    visit restaurante_url(@restaurante)
    click_on "Edit this restaurante", match: :first

    fill_in "Name", with: @restaurante.name
    click_on "Update Restaurante"

    assert_text "Restaurante was successfully updated"
    click_on "Back"
  end

  test "should destroy Restaurante" do
    visit restaurante_url(@restaurante)
    click_on "Destroy this restaurante", match: :first

    assert_text "Restaurante was successfully destroyed"
  end
end
