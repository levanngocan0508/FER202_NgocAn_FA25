const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];

const stats = ages.reduce(
  (acc, n) => {
    if (typeof n !== 'number' || Number.isNaN(n)) return acc;
    acc.total += n;
    acc.min = Math.min(acc.min, n);
    acc.max = Math.max(acc.max, n);
    if (n >= 13 && n <= 19) acc.buckets.teen += 1;
    else if (n >= 20) acc.buckets.adult += 1;
    return acc;
  },
  { total: 0, min: Infinity, max: -Infinity, buckets: { teen: 0, adult: 0 } }
);

const total = stats.total;
const min = stats.min === Infinity ? 0 : stats.min;
const max = stats.max === -Infinity ? 0 : stats.max;

console.log(`Total: ${total}, Min: ${min}, Max: ${max}`);
console.log(`Buckets: { teen: ${stats.buckets.teen}, adult: ${stats.buckets.adult} }`);
