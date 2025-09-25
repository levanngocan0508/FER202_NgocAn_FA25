export function Exercise8() {
    // khai một mảng tuổi 
    const ages = [33, 12, 20, 16, 5, 54, 21, 44, 61, 13, 15, 45, 25, 64, 32];
    // tính total, min, max
    const total = ages.reduce((acc, curr) => acc + curr, 0);
    const min = Math.min(...ages);
    const max = Math.max(...ages);
    // đếm theo nhóm bằng buckets có dạng buckets: { teen: count(13–19), adult: count(>=20) }
    const buckets = ages.reduce((acc, age) => {
        if (age >= 13 && age <= 19) {
            acc.teen = (acc.teen || 0) + 1;
        } else if (age >= 20) {
            acc.adult = (acc.adult || 0) + 1;
        }
        return acc;
    }, {});
    // 	In dạng:
    //Total: X, Min: Y, Max: Z
    //Buckets: { teen: a, adult: b }

    return (
        <div>
            <h1>Exercise 8</h1>
            <p>Total: {total}</p>
            <p>Min: {min}</p>
            <p>Max: {max}</p>
            <p>Buckets: {JSON.stringify(buckets)}</p>
        </div>
    );
}
