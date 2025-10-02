export function Exercise4() {
    const age = [18, 22, 25, 30, 35, 40, 45, 50, 55, 60];
    //	Dùng destructuring để lấy first, bỏ qua phần tử thứ 2, lấy third (mặc định 0 nếu không tồn tại), và restAges cho phần còn lại.
	//In: first, third, restAges.
    const [first, , third = 0, ...restAges] = age;
    // In ra từng phần tử của mảng restAges
    return (
        <div>
            <h1>Exercise 4</h1>
            <p>First age: {first}</p>
            <p>Third age: {third}</p>
            <p>Rest ages: {restAges.join(', ')}</p>
            <ul>
                {restAges.map((age, index) => (
                    <li key={index}>Age {index + 4}: {age}</li>
                ))}
            </ul>
        </div>
    );
}