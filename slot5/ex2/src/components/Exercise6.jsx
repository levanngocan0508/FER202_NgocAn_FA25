export function Exercise6() {
    // Khai báo một mảng companies có thuộc tính name, category, start, end
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
        // Tạo bảng sao đã sắp xếp theo end tăng dần
        const sortedCompanies = [...companies].sort((a, b) => a.end - b.end);
        // In ra 3 công ty đầu theo định dạng "Company - EndYear" dưới dạng bảng 
    return (
        <div>
            <h1>Exercise 6</h1>
            <table border="1" cellPadding="5">
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>End Year</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedCompanies.slice(0, 3).map((company, index) => (
                        <tr key={index}>
                            <td>{company.name}</td>
                            <td>{company.end}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}