const people = [
  { name: "Ann", age: 19 },
  { name: "Bob", age: 12 },
  { name: "Cara", age: 15 },
  { name: "Dan", age: 20 },
  { name: "Eve", age: 13 },
  { name: "Fay", age: 30 }
];

// Lấy 2 người đầu (không thay đổi mảng gốc)
const firstTwo = people.slice(0, 2);
console.log('firstTwo:', firstTwo);

// Lọc ra tuổi teen (13–19), sắp xếp theo tên tăng dần, rồi map thành "Name (age)", in từng dòng
const teens = people
  .filter(p => typeof p.age === 'number' && p.age >= 13 && p.age <= 19)
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(p => `${p.name} (${p.age})`);
