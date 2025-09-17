const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Cara", age: 15 },
  { name: "Dan", age: 20 },
  { name: "Eve", age: 13 },
  { name: "Fay", age: 30 }
];

// Lọc tuổi 13–19 rồi map thành "Name (age)", in từng dòng
const teens = people
  .filter(p => typeof p.age === 'number' && p.age >= 13 && p.age <= 19)
  .map(p => `${p.name} (${p.age})`);

teens.forEach(line => console.log(line));