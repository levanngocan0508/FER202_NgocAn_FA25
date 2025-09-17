// ...existing code...
const companies = [
  { name: "Apple", category: "Technology", start: 1976, end: 2023 },
  { name: "Google", category: "Technology", start: 1998, end: 2023 },
  { name: "Ford", category: "Auto", start: 1903, end: 2020 },
  { name: "Walmart", category: "Retail", start: 1962, end: 2022 },
  { name: "Microsoft", category: "Technology", start: 1975, end: 2021 },
  { name: "JPMorgan", category: "Finance", start: 1871, end: 2022 },
  { name: "Toyota", category: "Auto", start: 1937, end: 2019 },
  { name: "Samsung", category: "Technology", start: 1938, end: 2020 },
  { name: "Amazon", category: "Retail", start: 1994, end: 2021 }
];

// Immutable sort by end year (ascending) and take first 3
const sortedByEndAsc = [...companies].sort((a, b) => a.end - b.end);
const firstThree = sortedByEndAsc.slice(0, 3);


firstThree.forEach(c => console.log(`${c.name} - ${c.end}`));
