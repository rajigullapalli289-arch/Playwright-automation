// Create an array named studentNames with the names of your students.
let studentNames = ['tim', 'john', 'sia', 'apple'];

// Add a new student name to the beginning of the array.
const newList = studentNames.unshift('simran')
console.log(newList);
console.log(studentNames);

// Remove the last student name from the array.
const modifiedList = studentNames.pop();
console.log('Modified List:', modifiedList);
console.log(studentNames);


// Alphabetize the student names within the array.
const alphabetizeList = studentNames.sort();
console.log('ordered list',alphabetizeList);
console.log(studentNames);