


// sum using rest parameter + reduce; ignore non-numeric and NaN values
const sum = (...nums) => {
  const valid = nums.filter(n => typeof n === 'number' && !Number.isNaN(n));
  return valid.reduce((acc, cur) => acc + cur, 0);
};

// avg using rest parameter + reduce; returns 0 if no valid numbers; two decimal places
const avg = (...nums) => {
  const valid = nums.filter(n => typeof n === 'number' && !Number.isNaN(n));
  if (valid.length === 0) return 0;
  const total = valid.reduce((acc, cur) => acc + cur, 0);
  return Number((total / valid.length).toFixed(2));
};

// Print required outputs
console.log(sum(1, 2, 3));         // 6
console.log(sum(1, 'x', '4', 4));  // 5
console.log(avg(1, 2, 3, 4));      // 2.50
console.log(avg());                // 0