Feature: Error Validations

# @errorValidations
# Scenario: Attempt to login with invalid credentials
# Given I am on the saucedemo website
# When I attempt to login with empty credentials
# Then I should see an error message indicating invalid credentials


@errorValidationsMultiple
Scenario Outline: Attempt to login with invalid credentials multiple times
Given I am on the saucedemo website
When I attempt to login with credentials "<username>" and "<password>"
Then I should see an error message indicating invalid credentials "<errorMessage>"

Examples:
  | username | password | errorMessage | 
  |  |  | Epic sadface: Username is required |
  | standard_user | wrong_password | Epic sadface: Username and password do not match any user in this service |
  | wrong_user | secret_sauce | Epic sadface: Username and password do not match any user in this service |
