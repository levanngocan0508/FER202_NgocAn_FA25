// const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// console.log("==for==");
// for(let i = 0; i < arr.length; i++){
//     console.log(arr[i]);
// }

// console.log("=== forEach ===");
// arr.forEach((value, index) => {
//   console.log(`index ${index}: ${value}`);
// });  
// console.log("=== map ===");
// const doubledArr = arr.map((value, index) => {
//   return value * 2;
// });
// console.log(doubledArr);

// console.log("=== filter ===");
// const evenArr = arr.filter((value) => value % 2 === 0);
// console.log(evenArr);

const people = [
  { id: 1, name: "An", age: 20 },
  { id: 2, name: "Binh", age: 22 },
  { id: 3, name: "Cuong", age: 19 },
  { id: 4, name: "Dung", age: 21 }
];
console.log("=== List ===");
people.forEach((person) => {
  console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});

console.log("=== People age > 20 ===");
const filteredPeople = people.filter(person => person.age > 20);
filteredPeople.forEach(person => {
  console.log(`ID: ${person.id}, Name: ${person.name}, Age: ${person.age}`);
});