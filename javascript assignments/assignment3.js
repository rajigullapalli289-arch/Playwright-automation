// Apply transformations and calculations to array elements, and filter elements based on a condition
// You have an array called productPrices with various product prices.
let productPrices = [34,12,67,90,3]

// Apply a 10% discount to all prices using the map method and store the results in a new array called discountedPrices.
const discountedPrices = productPrices.map(price => price * 0.90 )
console.log('Discounted Price:', discountedPrices)

// Use the filter method to create a new array called affordableProducts containing only products priced below $50
const affordableProducts = discountedPrices.filter(affordable => affordable < 50)
console.log('Prices of afforable products',affordableProducts)

// Calculate the total cost of all items in the affordableProducts array using the reduce method.
const totalCost = affordableProducts.reduce((totalAmt , cost) => { return totalAmt+cost}, 0)
console.log('Total Cost of Affordable products:', totalCost);