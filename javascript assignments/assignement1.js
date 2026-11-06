// Create an array called expenses that contains at least 5 different expense amounts.
let expenses = [45,35,24,89,56]

// Calculate the total expenses by summing all the elements of the array.
const totalExpenses = expenses.reduce((accumulator, currentValue) =>{ return accumulator+currentValue }, 0)
console.log(totalExpenses);

// Find the highest and lowest individual expenses within the array.
const highest = Math.max(...expenses);
const lowest = Math.min(...expenses);
console.log(highest,lowest);