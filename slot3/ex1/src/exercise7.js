// Companies list (can replace with imported one if desired)
const companies = [
  { name: "Apple", category: "Technology", start: 1976, end: 2023 },
  { name: "Google", category: "Technology", start: 1998, end: 2023 },
  { name: "Ford", category: "Auto", start: 1903, end: 2020 }
];

// create company0New from companies[0] with start incremented by 1, without mutating original
const company0New = { ...companies[0], start: companies[0].start + 1 };

// concatAll using rest parameter to accept any number of arrays
const concatAll = (...arrays) => arrays.reduce((acc, arr) => acc.concat(arr), []);

console.log('original company[0]:', companies[0]);
console.log('company0New:', company0New);
console.log('concatAll([1,2],[3],[4,5]):', concatAll([1,2],[3],[4,5]));
