const ages = [33, 12, 20, 16];

// destructuring: take first, skip second, third with default 0, and restAges
const [first, , third = 0, ...restAges] = ages;

console.log(first);    // 33
console.log(third);    // 20
console.log(restAges); // [16]