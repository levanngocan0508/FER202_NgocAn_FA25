export function Exercise2() {
    //1. tạo 1 mảng số nguyên, in ra danh sách list
    const numbers = [1, 12, -3, 4, 15, 20, 7, -18, 9, 30];
    // 2. tính tổng các phần tử trong mảng
    const sum = numbers.reduce((acc, curr) => acc + curr, 0);
    // 3. tính trung bình cộng các phần tử trong mảng
    const average = sum / numbers.length;
    // 4. khai mảng chuỗi names, in ra danh sách các tên, theo thứ tự tăng dần Alphabet tiếng việt
    const names = ["Ẩn", "Linh", "Tiến", "Quý", "Cường", "Quân", "Minh", "Quốc", "Phú", "Tuệ"];
    names.sort((a, b) => a.localeCompare(b, 'vi'));
    // 5 . Khai bảo 1 mảng students chứa 10 đối tượng students

    // Mỗi đối tượng students có các thuộc tính: id, name, age, grade
    // id là số nguyên, name là chuỗi, age là số nguyên, grade là số thực
    const students = [
        { id: 1, name: "Ẩn", age: 20, grade: 10.0 },
        { id: 2, name: "Linh", age: 22, grade: 7.0 },   
        { id: 3, name: "Tiến", age: 20, grade: 5.0 },
        { id: 4, name: "Quý", age: 23, grade: 9.0 },
        { id: 5, name: "Cường", age: 20, grade: 8.0 },
        { id: 6, name: "Quân", age: 22, grade: 7.5 },
        { id: 7, name: "Minh", age: 21, grade: 9.5 },
        { id: 8, name: "Quốc", age: 23, grade: 6.0 },
        { id: 9, name: "Phú", age: 20, grade: 8.8 },
        { id: 10, name: "Tuệ", age: 22, grade: 7.2 },
    ];
    // In ra danh sách students có grade >= 7.5, sắp xếp theo grade giảm dần
    const topStudents = students.filter(student => student.grade >= 7.5)
        .sort((a, b) => b.grade - a.grade);
    
  return (
    <div>
      <h1>Exercise 2</h1>
      <p>In mảng số nguyên</p>
        <ul>
          {numbers.map((num,i) => (
            <li key={i}>Phần tử thứ {i}:  {num}</li>
          ))}
        </ul>
        <p>Tổng các phần tử trong mảng: {sum}</p>
        <p>Trung bình cộng các phần tử trong mảng: {average.toFixed(2)}</p>
        <p>In mảng tên theo thứ tự Alphabet</p>
        <ul>
          {names.map((name, i) => (
            <li key={i}>Tên thứ {i}: {name}</li>
          ))}
        </ul>
        <p>Danh sách students có grade {">"}= 7.5, sắp xếp theo grade giảm dần</p>
        <ul>
          {topStudents.map((student) => (
            <li key={student.id}>Tên: {student.name}, Tuổi: {student.age}, Điểm: {student.grade}</li>
          ))}
        </ul>
        <p>Hiển thị lại danh sách topStudent và điểm trung bình cộng dưới dạng bảng </p>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Age</th>
                <th>Grade</th>
            </tr>
            </thead>
            <tbody>
            {topStudents.map((student) => (
                <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.grade}</td>
                </tr>
            ))}
            </tbody>
            <tfoot>
                <tr>
                    <td colSpan="3"><strong>Average Grade</strong></td>
                    <td><strong>{(topStudents.reduce((acc, student) => acc + student.grade, 0) / topStudents.length).toFixed(2)}</strong></td>
                </tr>
            </tfoot>
        </table>    
        
    </div>
  );
}   

