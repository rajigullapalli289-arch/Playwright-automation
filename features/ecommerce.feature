Feature: Ecommerce

Scenario: Add item to cart and proceed to checkout
Given I am on the ecommerce website, login with valid credentials
When I Add an item to the cart
Then I should see the item in the cart
When I proceed to checkout and place the order
Then I should see the order confirmation message and should see the order details in Order History page