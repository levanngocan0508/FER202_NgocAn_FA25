export function Exercise3() {
    const person = {
  name: "Costas",
  address: { street: "Lalaland 12" }
};

//Dùng destructuring để lấy street, city (mặc định "Unknown City" nếu không có).
//In: name, street, city.
//Ràng buộc: Không truy cập kiểu person.address.street trực tiếp.

    const { address: { street, city = "Unknown City" } } = person;


    return (
        <div>
            <h1>Exercise 3</h1>
            <div>
                <p>Name: {person.name}</p>
                <p>Street: {street}</p>
                <p>City: {city}</p>
            </div>
        </div>
    );
}
