// ...existing code...
// Arrow function to double a number
const double = n => n * 2;

// Arrow function to check if a number is even
const isEven = n => n % 2 === 0;

// Print results
console.log(double(7));      // 14
console.log(isEven(10));     // true
console.log(isEven(7));      // false

// ...existing code...
// Alternative arrow-function style (explicit return and block body)
const double2 = (n) => {
    return n * 2;
};

const isEven2 = (n) => {
    return n % 2 === 0;
};

// Print results for alternative functions
console.log(double2(7));   // 14
console.log(isEven2(10));  // true
console.log(isEven2(7));   // false
// ...existing code...