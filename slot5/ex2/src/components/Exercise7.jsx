export function Exercise7() {
     const companies = [
            { name: "Apple", category: "Technology", start: 1976, end: 2023 },
            { name: "Microsoft", category: "Technology", start: 1975, end: 2019 },
            { name: "Amazon", category: "E-commerce", start: 1994, end: 2025 },
            { name: "Google", category: "Technology", start: 1998, end: 2021 },
            { name: "Facebook", category: "Social Media", start: 2004, end: 2017 },
            { name: "Tesla", category: "Automotive", start: 2003, end: 2011 },
            { name: "Netflix", category: "Entertainment", start: 1997, end: 2025 },
            { name: "Coca-Cola", category: "Beverages", start: 1892, end: 2024 },
            { name: "Nike", category: "Apparel", start: 1964, end: 2023 },
            { name: "Samsung", category: "Technology", start: 1938, end: 2005 },
            { name: "Intel", category: "Technology", start: 1968, end: 2024 },
            { name: "IBM", category: "Technology", start: 1911, end: 2022 },
            { name: "Disney", category: "Entertainment", start: 1923, end: 2022 },
            { name: "PepsiCo", category: "Beverages", start: 1898, end: 2019 },
            { name: "Toyota", category: "Automotive", start: 1937, end: 2025 },
        ];
        // Từ companies[0], tạo company0New với start += 1 mà không làm đổi companies[0].
        const company0New = { ...companies[0], start: companies[0].start + 1 };
        // Viết hàm concatAll(...arrays) trả về mảng gộp của mọi mảng truyền vào.
        function concatAll(...arrays) {
            return arrays.reduce((acc, curr) => acc.concat(curr), []);
        }
        //	In: companies[0] và company0New; kết quả concatAll([1,2],[3],[4,5]).
    return (
        <div>
            <h1>Exercise 7</h1>
            <p>Company 0: {JSON.stringify(companies[0])}</p>
            <p>Company 0 New: {JSON.stringify(company0New)}</p>
            <p>Concat All [1,2], [3], [4,5]: {JSON.stringify(concatAll([1, 2], [3], [4, 5]))}</p>
        </div>
    );
}