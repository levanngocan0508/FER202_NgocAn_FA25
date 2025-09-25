export function Exercise5() {
    // khai báo một mảng people có thuộc tính name và age
    const people = [
        { name: 'Ann', age: 19 },
        { name: 'Bob', age: 17 },
        { name: 'Charlie', age: 25 },
        { name: 'David', age: 15 },
        { name: 'Eve', age: 30 },
        { name: 'Frank', age: 13 },
        { name: 'Grace', age: 19 },
        { name: 'Hannah', age: 28 },
        { name: 'Ivy', age: 14 },
        { name: 'Jack', age: 21 },
    ];
    // sử dụng phương thức filter để lọc ra những người có tuổi từ 13 đến 19 tuổi
    const teenagers = people.filter(person => person.age >= 13 && person.age <= 19);
    //Map sang chuỗi "Ann (19)".
    const teenagerStrings = teenagers.map(person => `${person.name} (${person.age})`);
    // In ra từng dòng trong mảng kết quả
    return (
        <div>
            <h1>Exercise 5</h1>
            {teenagerStrings.map((str, index) => (
                <div key={index}>{str}</div>
            ))}
        </div>
    );
}